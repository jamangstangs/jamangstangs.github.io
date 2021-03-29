---
title: Operating System Chapter 3

toc: true

use_math: true

categories:

 - Operating system


---

## Processes

### 목표

#### 배우는 개념

- 프로세스의 개념
- Process Scheduling 
- 프로세스에서 일어나는 Operations의 종류
- 프로세스간 communication
- Inter Process Communication System 의 예시
- Client Server system상에서 통신

#### 알아야 할 것

- virtual memory를 배우기 전까지는 모든 Program이 memory에 올라가는 것이라고 알아두자.
  - Virtual memory에서 program을 부분적으로 올리는 것을 배울 것이다.
- Processes의 특징, Process Scheduling, Process Creation, Process Termination 그리고 Process Communication이 어떻게 일어나는지 알아보자.
- shared memory와 message passing을 사용하여 interprocess communication을 알아보자.
- Client Server system상에서 통신

### Process의 개념

OS는 다양한 프로그램을 돌리는데, 돌리는 것에 따라 부르는 명칭이 다르다.

- Batch system을 돌린다 : jobs로 여긴다.
  - 여러개의 jobs가 있다 -> **sequentially**하게 돌린다. (A작업 끝낸 뒤 B, B작업 뒤 C..)
  - Process는 job으로 여겨진다.
- Time-shared systems를 돌린다 : user programs 또는  tasks라고 부른다.
  - 여러개의 processes을 Simultaneously하게 돌린다.
  - Process는 user program 또는 tasks라고 부른다.

책에서는 job이랑 process가 거의 대체가능하지만, 자세히 읽어보고 뉘앙스의 차이를 알도록 하자.

#### Process

실행중인 Program(main memory에 loaded된.)

process실행은 sequential하게 진행된다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 6.24.17.png" style="zoom:33%;" />

- program을 메모리에 로드하면 프로세스라 하고, 위의 logical address임을 알고 있다고 하자.
- process입장에서는 0에서 시작하고 max에서 끝나지만, 그들은 사실 physical memory주소에 저장이 되어있다. 
  - 그렇다면, process를 physical main memory의 0 주소에 할당이 가능할까?
  - 절대 안된다. 모든 OS는 kernel에서 로딩을 시작하고,  physical main memory의 0의 주소에서 부터 올라간다. 따라서 user process는 physical main memory의 0의 주소에 절대 할당이 불가능하다.
- 따라서 위는 logical memory이다.

Program이 메모리에 올라가면 위와 같이

- test, data, heap 을 dynamically loaded variables이다.
- stack은 specific type of variable이다.

malloc을 사용하면 heap 영역이 늘어나면서 늘어난 영역의 address를 반환한다.

- text section : program code이며, program code가 text section에 load된다.
  - 이 영역에서 **program counter**(CPU가 실행시키는 코드의 memory 주소를 가르키기 때문에 현재 실행정보를 알 수 있다고 하는 것이다.)와 **processors's의 registers의 content**(현재의  status를 나타내는 것)으로 나타내지는 현재 활동을 포함한다.
- Stack 영역 : temporary data를 저장하는 구역 (함수의 parameters,  return addresses, local variables) 
- data section : global variables를 저장한다.
- heap : runtime variable을 다루고, 자료구조의 heap을 쓰는 것이 아니다.

따라서 아래와 같이 정리할 수 있다.

- Program : passive
- Process : active 

#### Process State

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 8.47.55.png)

OS는 process의 시작부터 종료까지 관리해야 한다. **OS는 이것을 5가지 상태로 관리**한다.

- new : user가 아이콘을 클릭하거나 어플리케이션의 이름을 친다 OS는 해당 **program을 process로 변경한다.** 이것은 process가 생성됨을 의미하지 main memory에 **load되었다는 것을 의미하진 않는다.** 따라서 OS에 의해 main memory에 로딩될때까지 기다린다.
  - OS가 process control block (PCB)를 할당한다. PCB는 process의 abtract information을 저장한다. PCB가 완벽하게 contruct되는 것은 아니다. OS가 process를 running함에 따라 PCB를 채워나가는 것이다. 연관된 user mode address가 해당 process에 할당되고 해당 코드가 main memory에 올라간다. -> 이것이 끝나면 ready로 간다.
  - admitted : OS가 해당 프로세스에 요구되는 main memory를 할당했음을 의미한다.
- ready : OS의 Process Scheduler가 running할 준비가 되어있는 ready 상태의 process들 중 하나를 선택한다.
- runing : 만약 실행이 되고 있다면, CPU가 **PCB에서 PC와 Process의 Address를 받아** PC가 위치한 포인터로 이동하여 Instruction을 실행시킨다.
  - Application이 실행되고 있다 -> CPU가 Process의 데이터를 가지고 있음을 의미한다.
  - Interrupt vs I/O 
    - Interrupt : 이 다이어그램에서의 의미는 another user Process가 현재 process보다 우선하여 running하려고 하는 것이다. 혹은 다른 system program이 현재 process보다 우선하여 running 하려고 하는 것이다. => OS가 현재 프로세스와 관련이 없는 다른 프로세스가 더 긴급하다고 판단하여 현재 프로세스를 ready state로 보낸다. 또한 interrupted process는 현재의 process보다 우선적으로 실행이 된다.
    - I/O or event wait : 현재 프로세스가 I/O device와 interaction이 필요하거나, 현재 프로세스가 file을 read해야 하는 경우를 **I/O wait** , 현재 프로세스가 다른 user process 나 다른 system proram로부터 응답을 해야할 경우, event wait으로 보내지고 다른process가 실행되고 관련된 data를 저장하면(shared memory 혹은 message passing과 같은) **event wait** => 현재 process는 waiting으로 바뀜.
    - I/O or event completion : I/O나 event가 끝나면 현재 process는 ready로 바뀜.
      - OS의 schedular dispatch가 CPU로 할당하면 그때 다시 running state가 되는 것이다.
- waiting
- terminated : 만약 Interrut나 System call 이 없다면 모든 process를 진행시키고 process를 종료한다. 그리고 main memory에 있는 정보는 지워진다.
  - 지워야 OS가 main memory파트를 다른 프로세스를 위해 사용이 가능하다.

#### Process Control Block(PCB)

kernel area : OS의 주요 구역

User area : user application의 주요 구역

만약 OS가 user area에 존재하는 process의 정보를 얻고싶다. 그럴때 OS는 **kernel mode**에서 **user mode**로 변경하여 user process의 data를 확인하고, 다시 돌아와서 어떤 process를 실행시킬지 결정해야 한다. => **매우 cost가 많이 든다**. => 따라서 OS가 kernel area에 process의 관련된 모든 정보를 kernel area에 저장한다.(kernel mode에서 user mode로 비효율적으로 움직이지 않기 위해). 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 9.37.02.png" style="zoom:33%;" />

- kernel area에 PCB의 리스트가 존재. OS가 user mode에 있는 정보를 찾기위해 직접 user mode로 가지 않고 PCB에서 해당 프로세스의 정보를 찾는다. 따라서 scheduling을 할 때 user area에서 찾지 않고 PCB에서 프로세스들의 정보를 찾아 다음에 어떤 process를 실행시킬지 결정한다.
- OS가 PCB형식으로 process의 정보를 저장하고(저장하는 정보는 OS마다 다르다. 하지만 모든 OS가 공유하는 **공통되는 정보는 위에서 배운 Process State**를 저장한다.(new, ready, running, wait, terminated)

PCB의 형태는 아래와 같다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 9.44.48.png" style="zoom:33%;" />

각 프로세스와 관련된 정보

- Process number : id number이다. => 보통 연속적으로 정해진다. 
- Program Counter : 해당하는 Process의 next instruction의 위치를 알려준다.
  - Process가 현재 실행되고 있는 중이면 update되지 않는다.
  - **하지만,** 현재 process가 interrupt된다면 현재 **process의 counter 와 register 정보**를 저장한다.
- registers : 현재 Process가 위에서 interrupt 된다면 현재 Process의 register 정보를 저장한다.
- CPU Scheduling information : process의 우선도, scheduling queue pointers를 저장.
  - 나중에 배울 것.
- memory limits : memory-management information을 저장. 즉, process에 할당된 memory를 저장한다.
- list of open files : OS가 open file을 **반드시 release**해야하는데, open된 file 정보를 PCB에 저장되어 있어야 release가 가능하다.
- Accounting information : CPU 사용, clock time elapsed since start, time limits => scheduler에 의해 사용되는 정보
- I/O status information : 프로세스에 할당된 I/O devices, list of open files

#### CPU Switch From Process to Process

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 10.01.53.png" style="zoom:33%;" />

오직 2개의 프로그램이 같은 시스템에서 작동되는 모습을 보여준다. 실제 상황에서는 한 시스템에 훨씬 많은 프로세스가 작동이 된다.

- 프로세스0가 running state에서 실행
- 프로세스0가 interrupt or system call 받음
  - 프로세스0의 PC와 CPU register, 관련된 정보를 **PCB0**에 저장
- 그 이후 OS의 Scheduler가 interrup 이후 다음에 어떤 Process를 실행시킬 것인지 선택한다.
  - Process1을 실행시키기로 결정하고 PCB1에 있는 정보(Process1의 PC랑 register와 CPU와 관련된 정보)를 복구하고, CPU가 program counter가 가리키는 메모리를 실행시키려고 한다.
- Process0의 interrupt handling이 끝날때까지 Process1은 ready queue에서 대기, 그 후 interrupt나 system call이 발생할 때 까지 실행시킨다.
- Process1의 PC와  CPU register, 관련된 정보를  PCB1에 저장, interupt handling을 하고 PCB0를 다시 복구시켜 Process1을 실행시킨다.

### Threads

지금까지 single thread process를 설명한 것이다. **PCB 1개는 PC 1개를** 가진다. 그리고 어떤 프로그램은 다른 code, data, text를 받기위해 multiple program counter이 하나의 process에서 다뤄야 할 것이다. 이 경우에 OS가 해당 process를 **multiple program counters(multiple threads)**로 한번에 다뤄야 한다. (동시에 simultaneous하게 실행된다는 의미는 아니다.)

다음 챕터에서 배운다.

single process 는 single program counter을 가짐. -> context switch 발생 -> 현재 process는 waiting queue혹은 ready queue로 들어가며, 다른 process는 running state가 된다.

### Process Control Block in Linux

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 10.47.12.png)

- t_pid : 프로세스를 구별하기 위한 process identifier
- state : process state
- time_slice : process scheduler가 사용하는 정보.
  - 리눅스의 scheduler 보통 CPU를 사용하기 위한 권한을 각각의 process의 time의 양에 따라 할당한다.
  - **이 값이 0 또는 음수면 OS scheduler는 이 프로세스가 실행되지 않게 한다.**
  - **가장 높은 값을 가진 process가 먼저 실행이 된다.** => 다른 기준을 가진scheduler을 설계할 수 있다. 
- *parent : task_struct의 포인터 값을 받으므로 parent가 하나이다.
- children : list struct를 받으므로 여러개의 children이 존재할 수 있다.
- *files : list of open files
- *mm : 현재 process의 address값의 공간이다.

Kernel이 위와같은 구조의 **PCB를 queue**에서 관리한다.

### Process Scheduling

CPU 사용을 극대화하기 위해서 요구되며, multiple processor가 simultaneous하게 실행되는 것과 같이 CPU상에서 **time sharing(뒤에서 배울 예정)**을 위해 processed switch가 빠르게 일어난다.

Process schedular : CPU에서 사용 가능한 processes중에서 하나를 선택한다. 이를 위해 아래와 같은 Scheduling queues of processes를 유지한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-17 오후 11.45.41.png)

- Job queue : 어떤 process가 ready해야할 지 결정한다.
- Ready queue : OS가 job queue에 있는 process중 하나를 선택하여 ready queue로 이동시키고, OS가 해당 process를 메모리에 할당시키고, 해당 process를 **ready state**로 바꾼다.
  - ready state에 있는 process -> schedular가 prioruty와 time slice를 가지고 어떤 process부터 CPU에서 running 할지 결정한다. -> CPU에서 해당 프로세스 실행

+이전 process state그림과 비교하여 **두 가지** 추가된 점을 보여주겠다.

- **fork a child** : 리눅스에서 program을 실행시키면, fork a child하고 새로운 프로세스를 생성한다. **기존 process는 ready queue**에 들어간다. 
- **time slice expired** : time slice variable이 0 또는 1이면 바로 ready queue로 들어간다. 그러고 나서 scheduler에 의해 time slice variable을 다시 받을 때 까지 기다린다.

- Device queues : 다른 device는 각자의 고유한 device queue를 가짐. 각각의 IO device는 각자의 device queue를 가지고, 이것으로 multiple process를 다룰 수 있다.

#### schedulers 

스케쥴러의 종류는 아래와 같다.

- Short-term Schedular (or CPU scheduler) : **어떤 process가 running될지 결정하므로 CPU와 ready queue사이에 있다.**
  - time sharing을 위해 보통 CPU Scheduler가 multiple processes switch를 빨리 하려고 한다. 따라서 **short-term**이다.
  - 시스템이 간단하면 CPU scheduler만 OS에 있다.
- Long-term Schedular (or job scheduler) : 어떤 process가 ready queue(state로 보면 된다.)로 들어갈지 결정한다. **job queue와 ready queue사이에 있다**.
  - job queue에 있는 프로세스들을 ready queue에 넣음으로서 **main memory에 load**하고  process들의 선택되어 실행되게 한다.
  - 따라서, degree of Multi Programming을 control한다. (메모리에 있는 프로세스의 수를 조절한다.)

Scheduler 입장에서 프로세스는 아래와 같이 정의할 수 있다.

- I/O bound Process : CPU 연산보다  I/O 실행에 더 많은 시간을 소요한다. disk, display, printer 로부터의 응답에 시간을 많이 소모한다는 것이다.
  - CPU use에는 어려움을 겪지 않는다. 따라서 CPU점유율은 10퍼센트 이하인데 컴퓨터가 느리면 I/O bound process를 많이 돌리는 것이다.
- CPU-bound process : I/O 처리보다  CPU 연산에 더 많은 시간을 쏟는 process. 거의 CPU 연산에만 사용한다. deep learning library가 그렇다. 
- 따라서 **Long-term scheduler**는 위의 **두 종류의 프로세스를 적절히 섞어 내려고 노력한다.**

추가적으로 어떤 OS는 Medium term scheduler을 추가하기도 한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 2.00.21.png)

- Medium-term Scheduler : 시스템의 성능을 향상시키기 위한 추가적인 개념으로, 프로세스의 특성(I/O bound 혹은 cpu bound와 같은 특성)에서 부터 오는 개념이다. (VM에서 다시 배우게 될 것이다.)
  - 각 process는 CPU혹은 I/O bound일 것이다.
  - 매우 작은 시간안에 CPU bound process가 I/O bound process를 호출할 수 있다.
  - 어떨때는 job scheculer가 I/O bound 와 CPU bound 프로세스를 묶어서 관리하고
  - 어떨때는 현재 돌리고 있는 프로세스가 한쪽으로 편향된 process 일것이다.(한 프로세스의 90프로가 I/O bound action을 한다고 생각하자.) 
    - 이 경우에 midium term scheduler가 현재 process를 지연시키고 해당 프로세스를 memory에서 지우고 disk로 이동시키고 난 뒤, bottle neck events를 처리하고 지연된 process를 ready queue에 저장하고 

#### Multitasking in Mobile System 

현재까지 본 것은 전원에 제한이 없는 일반적인 시스템이지만, Mobile System은 제한적인 자원과 전원때문에 저장공간에 접근을 자주 안하려고 한다. 이러한 이유때문에 한 번에 하나의 프로세스를 foreground에서 실행시키려고 한다.

- 하지만 IOS 4이후로 Multitasking 지원
  - Single foregroung process : user 인터페이스로 조종됨
  - Multiple backgrount processes : 메모리에는 있지만 디스플레이에는 안나타남, 성능에 차이가 있다.
- 안드로이드는 처음부터 Multitasking을 지원하느라 iOS보다 뻑뻑했지만, 기기 성능이 향상됨으로써 둘 사이에 별 차이가 없게 된다.

#### Context Switch (중요)

**CPU가 한 프로세스에서 다른 프로세스로 switch하는 것이다.** System이 context switch를 통해 old process의 state를 저장하고 저장된 새로운 process의 state를 불러온다.

- Context : PCB에 저장되어있다. 특히  PC와 register가 저장되어있다. 
- Context switch하는 시간은 running process에 어떤 기여도 하지 않기 때문에 **overhead**로 취급된다.
  - CPU사용률을 100퍼센트인데, 정작 실행중인 프로세스는 하나도 없는 경우 몇 백개의 process간 context switch를 시도하려는 것이다. **더 복잡한  OS나 PCB 가질 경우 context switch도 더 오래 걸린다.**
  - 이러한 문제를 해결하기 위해 CPU안에 있는 Multiple register을 사용하여 context switch하려고 한다. -> main memory에 접근하여 PCB를 빼오는 것 보다는 register에 접근해여 얻어오는 것이 시간이 더 빠르기 때문이다.

### Processes의 동작

- Process Creation
- Process Termination
- 그 외의 디테일

#### Process Creation 

**Parent Process** : 생성하는 프로세스

**Children Process** : 생성되는 프로세스

=> Parent Process가 Children Process를 생성하고, Children Process가 다시 parent process가 되어 새로운 프로세스를 생성한다. 그 결과 **tree of processes**가 형성된다.

이때 일반적으로 **process identifier(pid)**를 통해 구별되고 관리된다.

1. **parent와 children 사이에 resource를 공유하는 방법**은 아래와 같다. (Resource : memory address given to process, open files, device I/O)

- parent 와 children process는 모든 resources를 공유한다.
- children는 parent의 resource의 부분을 공유한다. 
- parent와 children이 resource를 공유하지 않는다.

2. **Execution Option**은 아래와 같다.

- parent와  children이 concurrently하게 실행된다. (서로 관련이 없기 때문에 동시에 처리해도 상관이 없다.)
- parent가 children이 종료될때까지 기다린다. (parent가 children의 I/O operation이 필요할 경우)

3. **Address space**를 설정하는 option

- child process가 parent process의 복제품일때, 즉, child가 parent의 PCB와 memory address를 복제한 경우.
- child가 전혀 새로운 process일때,

4. UNIX 예제

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 2.51.55.png)

- fork() system call : 새로운 process를 생성한다. (보통 현재 process를 복제하여 생성한다.)
- exec() system call : **fork()뒤에 써야하며**, process의 공간을 새로운 program으로 대체한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 2.54.31.png)

- pid = fork(); -> child process를 fork한다. 이 시점에서는 parent와 child가 **pid를 제외하고** 같은 code를 가지게 된다. 그 다음  pid에따라 어떤 행동을 해야할지 결정한다.
  - pid<0 : child가 제대로 생성이 안됨 -> fork failed하고 1를 리턴한다.
  - pid == 0 : child process가 실행됨을 알 수 있다. 
  - pid > 0 : parent process임을 알 수 있고, child process가 종료될때까지 기다리며, 종료되면 printf한다.
- return 0가 wait(NULL)을 트리거한다.
- parent는 0보다 큰 pid를 리턴, child는 0을 리턴한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 2.43.13.png)

#### Process Termination

process가 final instruction에 도달하면 Process는 OS에게 **exit() system call**을 실행해서 process를 삭제하게 해야한다.

- exit()이 process에 의해 실행 -> status data를 child에서 parent로 보냄(wait()를 통해)
- 그 후 process의 resources가 OS에서 배제된다.

parent process가 children processes를 **abort() system call**을 사용하여 중단시킬 수 있다. 

- child가 할당된 resource를 초과한다면
- 다른 child가 task를 끝내 다른 child가 더 이상 필요하지 않다면
- parent가 exit()을 입력하였고, OS가 children들이 진행되는 것을 허락하지 않을 때(허락하는 경우도 있다.)
  - 몇몇 OS는 parent가 종료되면 children이 존재하는 것 자체를 허락하지 않는 경우가 있다. (process termination하면, child 또한 terminates되어야 한다는 의미)

process가 종료되는 방식

- cascading termination : 한 프로세스가 종료되면, 그것의 children들이 종료되는 termination을 의미한다. 
- parent process가 wait() system call을 사용하여 child process가 종료될 때 까지 기다리는 것이다. (cascading termination을 막기 위해)
  - pid = wait(&status) : children의 process id

process termination의 대표적인 오류

- zombie process : 프로세스가 종료되었지만, parent가 wait()을 통해 status를 보고받지 못했을 경우(child process가 종료되었지만, 그것의 status가 parent로 전달되지 않음)
  - 따라서 main memory상에서 process의 정보가 남아있다.
- orphan : parent process가 wait() 호출하지 않고 종료되었을 때, 그것의 child process를 의미한다.

### Interprocess Communication

system 안에서 어떤 프로세스는 **독립적으로** 실행되거나 다른 process들과 **communication**이 필요할 수 있다. cooperating하는 이유는 아래와 같다.

- Information Sharing : 여러 user가 같은 정보에 관심이 있으면, 그 정보에 대해 동시에 접근 가능하게 해야한다.
- 연산속도 향상 : 복잡한 계산이 있다면 나눠서 해결이 가능.
- modularity : 모듈화 해서 system을 다루고 싶다.
- convenience 

따라서 서로 협력하는 process는 **IPC(interprocess communication)**이 필요하다. 아래 두 가지의 대표적인 모델이 있다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 3.56.46.png)

- Shared Memory : message passing보다 간단해 보이며, shared memory area를 선언하여 두 프로세스가 이 영역에 접근 가능하여 data를 얻거나 data를 보낸다.

- Message Passing : OS가 제공하는 외부 툴을 사용하여 프로세서간 communication이 가능한 모델이다.
  - queue를 사용하여 process A가 queue에 message를 넣고, process B가 dequeue하여 message를 얻는 것.

#### Producer - Consumer Problem

**Producer Process** : 전송될 데이터를 create하는 process

**Consumer Process** : 데이터를 use, receive 하는 process

만약 우리가 위와 같은 모델로 information transfer와 receiver을 설정했다고 하면 아래와 같은 개념이 매우 중요해진다.

- Unbounded buffer : buffer size에 제한이 없다.
- Bounded buffer : 고정된 buffer size가 있다.

#### Bounded Buffer

##### Shared Memory Solution

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 5.29.07.png" style="zoom:33%;" />

- buffer size 를 10으로 설정함.
- item의 자료형을 설정함.
- 설정한 buffer size로 item array를 만든다.
- **in(producer pointer)**, out(consumer pointer) : 어떤 element가 생산되고 소비되는지 파악하는 pointer

##### Producer

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 5.33.38.png)

- item 자료형으로 next-produced 되는 것을 하나 선언함.
- 무한정으로 실행되는 반복문에서
  - in의 다음 포인터가 out이 가리키는 pointer와 같다. -> 같으면 아무것도 하지 않는다. => (같으면 하지 않는 과정 때문에 buffer_size - 1개 만큼의 데이터만 다룰 수 있다.)
  - in의 다음 포인터가 out이 가리키는 pointer와 같지 않다. -> 같으면 데이터를 만들고 in포인터를 다음 element를 가리키도록 증가시킨다.

##### Consumer 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-22 오후 5.41.43.png)

- item 자료형으로 next-consumed 되는 것을 하나 선언함.
- 무한정으로 실행되는 반복문에서
  - in==out : 더 이상 생성된 item이 없기 때문에 out도 더 이상 나아가지 않는다.
  - in!=out  : producer가 consume할 데이터를 만들어 냈기 때문에 pointer가 다음 element로 이동한다.

#### IPC - Shared Memory

n사이즈의 buffer을 선언하고, n-1 공간만 사용하는 이유

- 만약 하나의 element가 written되어야 한다고 하고 consumer와 producer가 같은 element를 공유한다는 조건이 있다고 하자. 
- 하지만, producer와 consumer은 실행 순서에 차이가 있다.(위에서 구현한 코드, 어쨌든 producer가 먼저 실행되어야 consumer가 data를 소비가 가능하니까 실행 순서에 있어서는 차이가 있다는 것을 알 수 있다.)
- 이때, **overlap**이 발생할 수 있다.

```c
Buffer[in] = next_item; // 이 코드를 실행시키면
	load data from next_item // 이 사이클에서 consumer가 어떤 일을 하려고 한다면 data가 overlap될 수 있다.
	cacultate something
  store the data to buffer[in]
    //각각의 code는 single cycle에 의해 결정되지 않는다.
```

**=> Synchronization 파트에서 다시 다루자.**

위와 같은 이유로 전체 size의 버퍼를 사용할 수 없다.

#### IPC - Message Passing 

shared memory와 다르게 process가 communicate하는 것 이외에 추가로 **synchronize**하는 mechanism이다. -> **따라서 추가적으로 synchronization하는 기능이 필요하다.**

message system으로 인해 공유된 variable에 드나들 필요 없이 process communication 가능하다.

share memory에서 **write() read()**하는 것과 같이 message system에도 아래와 같은 기능이 있다.

- **send(message)** 
- **receive(message)** 

message의 size는 buffer의 구조에 따라 고정되거나 변할 수 있다. 

##### Message Passing 구현 과정

- Process P 와 Process Q가 서로 통신하고 싶다면?
  - 둘 사이에 **Communication Link** 를 설치해야 한다.
  - **send/receive**로 메세지를 교환한다.
- 또한, shared memory와 다르게 구현할 때 아래와 같은 issue를 고려해야 한다.
  - Process간 Link를 구성한다면 최대 몇 개의 Link가 설립될 수 있나?
  - Link가 two processes이상 보다 더 연관될 수 있나?
  - 각 Communicating processes간에 link는 최대 몇 개가 연결될 수 있나?
    - 
  - Link 한 개에 적당한 용량은?
    - 서버와 client 사이에 single link를 만들었다고 하자. 엄청 컸으면 좋겠다.
  - link가 수용할 수 있는 message의 size는 fixed인가 variable인가?
    - variable
  - Link가 unidirectional한지 bi- directional한지?
    - **bi-directional**해야한다.

#### Implementation of Communication Link

- Physical 
  - shared memory(process area가 아닌 곳에)
  - hardware bus
  - network
- Logical 
  - Direct or Indirect
  - Synchronous(blocking) or asynchronous(non-blocking)
  - Automatic(OS가 모두 정함.) or Explicit buffering(process가 buffer사이즈와 같은것을 모두 정함) 

##### Direct Communication

두 개의 processs가 서로 통신하는 것을 위해 **target process의 정보가 필요하다**. pid만 아는거 가지고는 direct Communication이 설립되기는 어렵다. 따라서 아래와 같은 형식으로 process간 **명시적으로 이름을 지어야 한다.**

- send(P, message) : send a message to Process P
- receive(Q, message) : receive a message from Process Q

Direct communication link의 특징은 아래와 같다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 2.47.34.png)

- Link는 자동으로 establish된다. 따라서 communication 전에 설치해줄 필요는 없다.
  - send를 하면 OS가 call을 받고 OS적으로 communication link를 만들어주어 메세지를 전달한다.
  - receive가 작동하지 않으면 두 process가 종료될때가지 memory에 저장되어있는다.
- Link는 정확히 **한 쌍의 communicating process와 연관이 되어있다.**
  - multiple process간의 communication은 허락되지 않는다.
- **한 쌍의 process에 하나의 link만 존재한다.**
- **unidirectional 가능**하지만 **보통 bi-directional**하다.

##### Indirect Communication

Process가 통신하기 위해 **target process가 누구인지는 알 필요가 없다**. 하지만 **target processes들의 properties는 알아야 한다**.

두 프로세서간 communication을 위하여 **intermedium(mailbox, ports)**이 필요하다. 여기서 intermedium 을 **mailbox 또는 ports** 와 같이 부른다. 이것들의 특징은 아래와 같다.

- 각 mailbox 는 **고유의 id**를 가지고 있다. (숫자는 1000아래로 구성됨.)
- processes들은 mailbox를 공유해야만 communication이 가능하다.

Indirect Communication link의 특징은 아래와 같다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 2.47.43.png)

- Link는 Processes들이 **공동의 mail box를 공유**해야만 establish된다. (single mailbox에 single process는 communication 불가능, mailbox에 혼자만 있으니까)
- mailbox와 관련된 하나의 link는 다른 여러 프로세스들과 관련이 될 수 있다. (위의 그림 참조, mailbox A 는 4개의 process와 연관. mailbox B도 4개의 process와 연관)
- 각 쌍의 processes들은 다른 mailboxes를 통해 communication이 가능하다(교집합 부분에 process들은 mailbox A와 mailbox B를 통해 communication가능하다.)
- Link는 특성에따라 unidirectional하거나 bi-directional하다.

작동과정은 아래와 같다.

- 새로운 mailbox를 만든다(새로운 port를 open한다.)
- mailbox를 통해 message를 송수신한다.
- process가 끝나면 mailbox를 없애준다.

또한 위의 direct communication와 같이 primitives(동작)은 아래와 같이 정의된다. 여기서 A는 direct communication과 다르게 target mailbox이며 target port number이다.

- send(**A**, message) : mailbox A로 message를 보낸다.
- receive(**A**, message) : mailbox A에서 message를 받는다.

그 뒤로 좀 더 detail하게 indirect communication을 알아보겠다. 하나의 mailbox에 여러개의 process가 있다고 하자. 이때 **mailbox synchronization**이 중요해진다.

mailbox synchronization을 아래와 같은 상황을 예로 들어 설명을 해보겠다.

- P1 P2 P3가 mailbox A를 공유하며 P1이 send한다면 mailbox를 P1과 공유하고 있는 P2 P3가 receive할 것이다. 그렇다면 누가 message를 받게 되는 것인가?

- solution은 아래와 같이 3개로 나뉜다.

  1. 이 경우에는 mailbox A가 접근할 수 있는 process를 최대 2개로 설정하는 것이다. (**P1이 message를 보내면 mailbox A가 P2의 receive를 사용하여 제한**을 건다.

  2. 이것은 target specific 송수신 방식이 아니긴 한데, sender가 보내고 process 한 개만 필요하다면 그 경우에 mailbox A가 한 개의 receive operation을 실행하는 것을 허락할 수 있다. -> P1이 보내고 P2가 받았다면 mailbox A가 메세지를 지운다.

  3. process P가 message를 R Q S에게 보냈다고 했을 때, 발신자가 누가 수신자였는지 알림을 받는다.

     ![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 3.23.35.png)

#### Synchronization

message passing은 **blocking**이거나 **non-blocking**일 수도 있다.

- Blocking (synchronous) : 실행시키면 response가 올 때 까지 기다린다.
  - A+B = C 는 A와 B를 알아야 C를 알 수 있듯이 순서가 매우 중요하다. 따라서 위와 같이 **처리 순서가 매우 중요할 때 blocking을 사용해야 한다.**
  - Blocking send : message가 receive될 때 까지 sender가 block된다.
  - Blocking receive : message가 available할 때 까지 receiver가 block된다.
    - **sender와 receiver가 송수신이 완료 될 때 까지 기다린다.**
- non-blocking (asynchronous) : 실행시키면 response가 올 때 까지 기다리지 않고 다음을 실행시킨다.
  - non-blocking send : sedner가 message를 보내고 계속 continue
  - non-blocking receive : receiver가 유효한 message 혹은 null을 받는다.
    - **sender와 receiver가 송수신 완료를 신경 쓰지 않고 그냥 할일을 한다.**

blocking끼리, non blocking끼리 사용하지만, 서로 섞어서 사용이 가능하고, 아래와 같이 send와 receive가 blocking된 링크롤 **rendezvous link**라고 한다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 3.45.49.png" style="zoom: 50%;" />

아래와 같은 rendezvous link 상황에서는 서로간 response를 기다리기만 하며 block을 cancel할 수가 없다. 이 combination이 완료되면 PQR은 작동될 수 없으므로  OS가 재 시작해줘야 한다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 3.49.16.png" style="zoom:50%;" />

blocking send()와 receive()는 아래와 같다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 3.53.09.png" style="zoom:50%;" />

- send(next_produced) -> blocking으로 구현되어서 send가 끝나야 다음 반복분 실행이 가능
- receive(next_consumed) -> blocking으로 구현되어서 receive가 끝나여 consum이 가능하다.
- no buffer 또는 blocking size variable로 말해 size1 buffer일 수 있다. 무한일 수 있지만 의미가 없다.

#### Buffering

링크에 붙은 message queue가 있다고 하자. (여기서 buffer는 message가 대기하는 장소라고 보자.) 링크에 메모리를 할당해야 한다. communication이 direct하던 indirect하던 message 는 temporary queue(buffer)에 존재한다. 그러한 queue의 구현 방법은 아래와 같이 3개로 나뉜다.

- zero capacity : link에 붙은 queue가 없다(buffer을 할당할 필요가 없다.). 왜냐하면 rendezvous 같은 경우에는 sender는 receiver를 기다려야 하기 때문이다.
- bounded capacity : queue가 **n messages의 유한한 길이**를 가진다. 따라서 최대 n message가 잠시 저장될 수 있는 buffer가 할당된다.
  - **queue가 넉넉할 경우** : message는 queue에 저장되며 **sender는 기다릴 필요가 없이 다음 동작을 실행이 가능하다.**
  - **queue가 찼을 경우** : queue에 공간이 나올 때 까지 **sender는 wait한다.**
- Unbounded capacity : buffer size에 제한이 없으므로 **sender는 wait하지 않는다.**

#### Example of IPC Systems - POSIX

이러한 방식으로 구현할 수 없지만, OS가 shared memory와 message passing을 구현했는지 보기만 하자. POSIX로 부터 나온 코드는 아래와 같은 코드를 아래와 같은 형태의 코드를 공유한다.

아래 코드는 **shared memory object를 만드는 코드**이다.

##### shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);

```c
shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);
// return file discriptor 정수로 리턴된다.
```

- name : shared memory **object**를 나타내는 이름이다. 따라서 이 shared memory에 접근하고 싶은 process는 이 객체를 언급해야 한다.
- O_CREAT : shared memory **object**가 생성되지 않았다면 shared memory object가 생성 될 것인지 명시해주는 parameter
- O_RDRW : reading and writing을 위한 **object**인지 아닌지 명시해주는 parameter
- 0666 : 얘는 **file의 permission**이다.
  - umask 
  - <img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 4.46.17.png" style="zoom:50%;" />
  - read : 4 write : 2 execute : 1 
  - d 는 file type으로 0, c, d가 나올 수 있다.
  - user, group, others에게 허가권을 부여하는 것이다. 각 부분을 3비트로 나타내서 위와 같은 코드가 나오게 된다.
- 또한 현재 존재중인 segment를 열기위해 사용되는 코드이다.
- **file discriptor 이란? :  리눅스 계열의 시스템에서 프로세스에서 특정 파일에 접근할 때 사용하는 추상적인 값이다.**

##### ftruncate(shm_fd, 4096)

```c
ftruncate(shm_fd, 4096);
```

- shm_fd : 이것의 결과로 file discriptor을 넘기게 되고, shared memory file에 접근이 가능하다.
- 4096 : 4096B의 크기로 object의 size를 정한다.

##### ptr = mmap(0, SIZE, PROT_WRITE, MAP_SHARED, shm-fd, 0);

```c
ptr = mmap(0, SIZE, PROT_WRITE, MAP_SHARED, shm_fd, 0);
```

- mmap() : shared memory object를 포함한 memory-mapped file을 설립하게 해준다.
  - 이것을 통해 프로세스의 가상 메모리 주소 공간에 파일을 매핑한 뒤 가상 메모리 주소에 직접 접근하는 것으로 파일 읽기/쓰기를 댓니한다.

##### sprintf(ptr, "Writing to shared memory");

이것으로 shared memory 영역에 process가 message를 작성할 수 있다.

##### 전체적인 그림

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 5.16.01.png" style="zoom:50%;" />

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 5.18.35.png" style="zoom:50%;" />

#### Examples of IPC Systems - Mach

Mach는 microkernel system으로 mac os의 기초이다. 

모든 communication 은 message를 기반으로 이루어 진다. 

- 모든 process는 **생성될 때** **kernel 과 notify라는 두 개의 mailbox**를 받는다. 다른 프로세서와 communication하고 싶으면 추가적으로 mailbox를 만들면 된다.
- message transfer을 위해서는 3개의 system call이 필요하다.
  - msg_send(), msg_receive(), msg_rpc() -> 마지막 이 친구는 remote procedure call이며 나중에 볼 것이다. 
- mailbox가 나중에 c**ommunication을 위해서 만들어 진다**면(첫 번째때 말한 것) system call **port_allocate()**에 의해 만들어 진다.
- send 와 receive가 유연해서 mailbox가 꽉 찬다면 아래와 같은 옵션이 있다.
  - 무한정 기다린다
  - 최대 n-ms 동안 기다린다.
  - 즉시 return 한다.
  - OS가 추가적인 공간을 mailbox를 위해 지원한다.

#### Examples of IPC Systems – Windows

message passing이 LPC(local procedure call)을 통해 이루어 진다. sending하는데 좀 더 복잡하다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-23 오후 5.38.33.png)

- network상에서 일어나지 않고 같은 시스템 상(local을 의미한다.)에서만 communication이 일어난다.
- Ports를 사용하여 communication channel을 유지한다.
- communication은 아래와 같이 일어난다.
  - client가 subsystem의 connection port object의 handle을 연다.
  - client가 connection 요청을 보낸다.
  - server가 두 개의 private한 communication ports를 만든다.
    - client-server message port
    - server-client message port
  - client가 message나 callback을 보내기 위하거나 replies를 듣기 위해 서버가 대응되는 port handle을 사용한다
  - 더 큰 messages는 서버가 생성한 section object를 통해 전달되어야 한다.

### Communication in Client-Server System

지금까지 IPC method in process를 봤고, 여기서는 IPC method를 Client-Server model을 사용하여 사용한 방법을 알아볼 것이다.

#### Sockets

Sockets의 정의는 아래와 같다. 

- 두 process간 communication의 **endpoint**
- **IP address와 port의 연결로 정의한다.** (161.25.19.8:1625 -> IP 주소, 콜론, port number와 같이 정의한다.)

따라서, Communication을 하기 위해서는 **socket이 두 개**가 필요하며, **각각의 socket은 서로의 socket정보**를 가지고 있어야 한다.

- socket for server side
- socket for client side   

소켓이 하나라면 communication은 일어나지 않는다. 

특정 IP address와 port number의 성질은 아래와 같다.

- application을 구현한다면 1024보다 낮은 port number을 할당하지 마라. -> 이미 OS를 위해 사용되는 port number이기 때문이다.
- 127.0.0.1(**loopback**) : process가 실행될 때 local system을 나타내는 IP address이다.
  - loopback을 사용하면 remote area에 있는 process는 접근할 수 없다.
  - 그 외에서 local server에 접근하기 위한 IP address가 있긴 하다. (192.168.0.1)

##### Socket Communication

소켓 사이의 연결을 나타낸 그림

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 5.21.41.png)

- host X (client side)
- web server (server side) : port number = 80은 OS에 의해 지정된 service port이다.
- client는 server side의 80번 포트로 연결이 된다.

##### Type of Sockets

- **TCP(Transmission Control Protocol) Socket** 또는 **Connection Oriented Socket** : Socket이 TCP 방법으로 만들어지면, Client와 server는 단단히 묶이며 여기 두 IP address에서 일어나는 모든 connection은 hand shaking(정상적인 통신이 시작되기 전에 두 개의 실체 간에 확립된 통신 채널의 변수를 동적으로 설정하는 자동화된 협상 과정)이 필요하다. -> **메세지가 없어지면 다시 보내기 때문에 믿을 수 있다.**
  - Socket class 사용
- **UDP(User Datagram Protocol) Socket** 또는 **Connectionless sockets** : 메세지를 보내고 packet이 없어져도 상관을 쓰지 않는다. 그래서 robustness한 데이터(이미지나 그림, 큰 데이터)가 여기서 전해진다.
  - Datagram Socket 사용
- Multicast Socket : UDP는 2개의 소켓이 필요한데, Multicast socket은 **1server - m client** 혹은 **m server - 1client** 연결하고, UDP처럼 packet이 없어져도 그냥 냅둔다.
  - Datagram Socket의 subclass인 MulticastSocket class 를 사용한다.

따라서 application의 속성에 따라 내가 선택해서 설계한다.

##### Socket in Java

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 5.24.14.png" style="zoom: 50%;" />

- ServerSocket(6013) : Port number가 6013, IP address는 localhost로 만들 것이므로 적지 않음. 따라서 여기서 server socket을 만든다. (얘가 서버이므로 알아서 해주겠지)
- Socek client = sock.accept(); : client에서 오는 socket을 기다린다.(blocking call)
- PrintWriter pout = new PrintWriter(client.getOutputStream(), true); : client가 server로 들어왔음을 의미한다. 또한 client의 outputstream의 handle(client가 사용할 메모리 주소를 다른 정수로 치환하여 server에 보낸 정수 값을 의미한다.)
- pout.println(new java.util.Date().toString()); : date를 작성해준다. 이로 인해 client는 Date 정보를 받을 수 있다.
- client를 닫음으로써 server-client의 communication을 닫는다.

#### Remote Procedure Calls

RPC(Remote Procedure Calls)는 Socket 방식과는 다르다. 

- Socket은 Communication의 방식을 알고 **유저가** 따로 **코딩을** 해야한다.
- RPC는 network procedure를 **OS**가 관리한다.

이것을 위해서 user program이 어떤 부분의 code가 remote process로 전송되어야 하는지 알아야 한다. 그래서 **stubs**을 만든다.

- stubs : **procedure을 실행시키기 위한 패키지** 이다.

그러면 이 stubs를 어떻게 사용하나?

- client side stub이 port를 server에 위치시키고 parameters들을 (marshals)수집한다.
- server side stub이 메세지를 받고, 모아진 데이터(marshalled된)를 까서 server에서 procedure를 수행한다.

하지만, 이런 stub code들이 다른 program에서 실행될 수 있으므로 보통 명시된 interface에서 컴파일 된다. 따라서 다른 machine에서 comfliction(big endian - little endian차이와 같은)을 피하기 위해 아래와 같은 방법이 있다.

- XDR(External Data Representation) : 기계와 독립적으로 표현된 데이타를 사용한다.

local 보다 remote communicatino이 실패 시나리오가 많으므로 아래와 같은 RPC가 아래와 같은  policy를 취한다.

- Policy 1 : 최대 하나의 message를 보낸다. -> time stamp 를 각 메세지에 만든다.
- Policy 2 : 메세지를 한 번만 보낸다. -> kernel 이 각 메세지를 받았다는 피드백을 보낸다.

이를 위해서 RPC는 client -server 연결이 rendezvous하다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 6.14.31.png" style="zoom:50%;" />

- caller가 stubs만들어 server에 전송한다. stub이 서버에서 처리되고 결과를 다시 server가 client로 보낸다. 

너가 server에서 calculation을 server에서 분산처리 하고싶다면

1. user가 kernel 을 호출해 RPC message를 procedure X로 보내라고 한다.
2. user가 **kernel** **mode**로 바뀐다. kernel이 message를 **server의 matchmaker**로 보내 port number을 찾게 한다. 이때 stub을 만들지 않는다.
3. port를 찾아서 server가 client에서 port number을 전송한다. 
4. client가 port number을 알고 있으므로 RPC를 stub과 같이 보낸다. 
5. server OS의 daemon이 Port P에서 message를 받았다는 것을 알고 stub을 unpacking 하고 prucedure을 수행한다. 그러고 나서 수행 결과를 client의 kernel로 보낸다. 
6. kernel이 결과를 user모드로 보내고, user가 결과를 알게 된다. 

이 과정에서 developer이 kernel procedure을 몰라도 되는 과정이었다. 

#### Pipes

Process간의 Direct communication. 제한이 많지만 직관적이고 빠르다. Process간 communication이 제일 빠른 방법이다. 종류는 두 가지가 있다.

- Ordinary Pipes : Parent 와 child process간 communication을 위해 사용이 된다.
- Named Pipes : 보통 이거를 많이 쓴다. 사용하기 쉬워서 그래도 ordinary도 한다. 

##### Ordinary Pipes

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 6.33.26.png)

- **Producer**가 pipe의 **write-end**에서 write한다. 
- **Consumer**가 pipe의 **read****-end**에서 read한다.
- 단방향으로 데이터 전송 
- 따라서 한 쪽으로만 데이터를 전송이 가능한 **Unidirectional**하다.
- pipe는 메모리에 있으며, UNIX에서는 read() write() system calls로 다룬다. 
- 윈도우는 anonymous pipes라고 부른다. 

아래는 parent process에서 child process로 Greetings라는 메세지를 보내는 방법이다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 6.38.09.png)

- fd[2] : pipe를 위한 file discriptor 2개를 만들어야 하며 
- pid를 만듬.
- child process를 만들기 전에 pipe를 먼저 만든다. 
- child를 만든다. 
- child가 안만들어지면 에러
- pid > 0 : parent process이므로 
  -  read end를 닫음
  - write를 한다. 
  - write end를 닫는다.
- pid < 0 : child process이므로
  - write end를 닫음
  - read  한다.
  - read end를 닫는다. 

#### Named Pipes

- ordinary pipe보다 더 강력하다. (named pipe는 kernel side에서 만들어진다. ordinary pipe는 user side에서 만들어지므로)
- bidirectional하다. 양방향 통신이 가능하다. 
- kernel이 관리하므로 parent-child도 필요 없다. 











