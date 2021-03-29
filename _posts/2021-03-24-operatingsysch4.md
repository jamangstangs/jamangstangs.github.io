---

title: Operating System Chapter 4

toc: true

use_math: true

categories:

 - Operating system
---

## Thread 

아래 2개가 Thread의 정의이다. 두 개 다 꼭 외워야 한다. 

- **Thread는 CPU utilization의 기본 단위이다. **
- **Thread는 Program counter, stack, set of registers, 그리고 thread ID로 구성되어 있다.**

Traditional Processes는 single thread를 가진다. 아래 그림을 보자.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 7.07.00.png" style="zoom:50%;" />

- 구불구불한 thread는 PC를 나타낸다. 
- 하나의 instruction이 하나의 CPU에서 작동이 되므로 주어진 시간동안 하나의 instruction이 single core cpu에서 처리된다. 

Multithreaded applications은 한 process에 multiple threads가 있다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-24 오후 7.13.34.png" style="zoom:50%;" />

- 각 thread는 각자의 Program counter, stack, set of register들을 가지고 있다. 
- 하지만 code, data(global variable을 가지고 있다.), open files는 공유한다. 

왜 global variables 사용을 자제해야 하는지 알고 있나?

- program을 돌릴때 바뀌는 global variable을 사용한다면, application이 multithreaded일 때 각 thread가 다른 global variable을 만난다.
  - 그래서 global variable이 fixed하다면 문제가 없지만,
  - variable하다면(바뀐다면) 프로그램을 돌릴때 마다 바뀌고 이게 의도된 것이 아니라면 실행 값이 달라지기 때문에 문제가 발생한다. 

### Motivation

- 현대의 대부분 application들은 multithreade이다.
  - word processor 
    - background thread가 철자나 문법 체크
    - foreground thread에서 user input(키보드)를 다루고
    - third thread가 하드 드라이브에서 image꺼내오고
    - fourth thread는 작업중인 file을 백업한다.
  - web server 
    - multiple thread가 multiple request들을 만족하기 위해 sequentailly 혹은 fork해서 process를 분리할 필요 없이 simultaneous하게 처리한다.

single threaded program을 사용할 때 발생하는 문제점

- MS DOS : MS DOS에서 진행하는 게임을 예시로 들어보겠다.

  <img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 1.50.03.png" style="zoom:50%;" />

  1. 게임에서 오브젝트와 상호작용 하면서 걸어가고 있다고 하자.
  2. user가 어떤 input을 입력하기 위한 창이 아래 떠서 커맨드를 입력하라고 한다.
  3. 모든 애니메이션이 멈추고, key board에서 system call을 기다린다. 

  여기서는 user program이 system call 을 들어야 한다면 abort()한다. 그리고 system call이 끝날때 까지 기다려야 한다. 

  

- 커널은 일반적으로 multithreaded

### Multithreaded Server Architecture

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 1.53.58.png)

- client가 server로 부터 연결을 위한 request를 한다. 
- request를 service하기 위해 server가 새로운 thread를 만든다. 
- server는 client의 추가적인 request를 받기 위해 **Listening 상태로 돌아온다. **

소켓을 기본으로 한다. 

### Multithreaded 장점

- Responsiveness : system call이나 다른 trigger에 의해 process의 일부가 block되더라도 process가 계속 작동된다.
- Resource sharing : thread는 code와 data를 공유한다. 같은 program의 multiple instances를 작동시킨다고 할 때, thread만 추가하면 단일 program에 대한 multiple processes 을 돌릴 수 있다. 그래서 메모리에서 single process를 multiple processes로 돌리면서 multiple tasks가 동시에 가능하게 한다. 
- Economy : Process 생성보다 싸며, thread switching이 context switching보다 overhead가 적다.
  - concurrent한 작동에서 process는 context(**PC, process state**)를 switch해야 한다. thread를 바꾸는 것 보다 overhead가 많이 발생한다. 
- Scalability : Process가 multiprocessor(멀티 코어나 멀티 프로세서)구조에서 더 많은 이점을 챙길 수 있다.
  - single thread process는 하나의 CPU에서만 작동한다. multiple core을 사용해서 가속될 수가 없다.  -> 따라서 dual core나 dual processor 구조가 나왔을 때 속도가 2배로 만들 수 있었는데, CPU 하나만 사용해서 처리하니까 그럴 수가 없었다. 
  - 반면, Multi-threaded application은 가능한 processor로 찢어질 수 있기 때문에 효율이 좋았다. 

## Multicore Programming

- Multicore : core(ALU, set of register)들이 독립적으로 bus와 연결된 것.
- Multiprocessor : CPU들이 bus와 연결된 것.

이러한 architecture가 나왔을 때 이것들이 programmers들이 아래와 같은 목표로 도전하게 한다. 

- Dividing activities
- Balance : **하나의 processor** 혹은 **하나의 core**가 대부분의 code를 실행시키게 하지 않음
- Data splitting : 큰 사이즈의 data를 다루기 위해서는 쪼개야 했다. 
- Data Dependency : 작업에서 접근하는 데이터는 둘 이상의 작업 간의 종속성을 검사해야 한다. 
  - 데이터를 나누면서 계산과정에서 데이터의 의존성을 확인해야 한다. 
- Testing and Debugging : single threaded applicaion을 디버깅 하는것보다 당연히 어렵다. 

### Types of Parallelism for multiple cores

- Data parallelism : **같은 data의 부분을 core에 분산**시킴으로써 같은 타입의 operation을 각 subset마다 수행한다. (data가 dependency하다)
  - **single core :** core에서 running하는 thread가 [0,n]까지의 합을 구함
  - **dual core :** **core 0**에서 **running하는 thread 0**이 **[0,n/2]**까지의 합을 구함, **core 1**에서 **running하는 thread 1**이 **[n/2,n]**까지의 합을 구함
  - 즉, 같은 타입의 operation을 한다. 따라서 data dependency가 있으면 이 방법으로 사용할 수 없다. 
- Task parallelism : **tasks들을 core에 분산**시킴으로써 각 thread가 unique한 operation을 수행한다. (data가 dependency하지 않음)
  - thread 각각이 같은 데이터 혹은 다른 데이터를 가지고 연산을 할 것이다.
  - 위의 예에서는 각각의 element에 대해 두 thread가  unique하게 처리하는 것이다. 

- Oracle T4 (a server) supports eight threads per core and there are 8 cores
- Intel Core-i7 (8th gen): 6 cores with hyper-threading (SMT, Simultaneous Multi-Threading) = total 12 threads
  - **=> 코어마다 thread가 하나만 있는 것은 아니다.**

### Concurrency vs Parallelism

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 3.10.07.png)

single core system에서 concurrency를 모방한 것이다. (process의 context switch로 concurrency하게 처리한거 생각해라.)

- T : Thread를 나타낸다. 
- single core에서 multithread를 구현한다면 시간에 따라 thread를 바꾼다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 3.10.14.png)

multiple core system에서 thread를 다른 core에 분배하면 parallelism이다. 

그렇다면 thread를  다른 core에 효율적으로 분배하기 위한 전략은 무엇일까? 

### Hyper Threading

multiple threading in single core 의 핵심기술이다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 3.22.07.png)

- FP : floating point의 연산을 맡는 unit
- LD : data를 main memory에서 register로 load
- ST : data를 register에서 memory로 저장
- LA : loading address
- BR : branch unit 다른 PC로 가서 PC를 바꾼다. 

여기서 빈 unit이 많다. 따라서 다른 thread가 현재 thread와 독립적으로 작동할 수 있다면 여기에서 작동시킬 수 있다. -> **추가적인 Thread를 빈 unit에 할당하여 작동시키는 메커니즘**

이러한 접근이 performance를 2배 상승시킬 것 같지만, 아니다. 같은 cycle에 두 thread가 같은 unit을 사용하려 한다면 한 쪽이 기다려야 하기 때문이다. 

## User Threads and Kernel Threads

- **User Thread** : **kernel 위에서(above) 지원되므로(user memory에 있다.)** kernel 지원없이 관리된다. 
  - 간단한 계산이나 데이터 관리는 user thread 안에서 실행된다. 
  - application programmers들은 여기에 자신들의 program을 넣는다.
- **Kernel Thread** : OS의 **kernel안에서 지원**되므로 모든 것을 다 할 수 있다. 
  - 모든 현대 OS는 kernel level thread를 유저에게 제공한다. 	
  - kernel은 multiple simultaneous tasks를 수행할 수 있다. 
    - kernel thread라고 불리지만 mutiple kernel thread이다. 
  - 따라서 커널은 multiple kernel system calls를 simultaneously하게 지원한다. 
    - 하나의 커널 thread -> storage handling
    - 다른 하나의 커널 thread -> display handling

그 뒤로 user thread와 kernel thread를 매핑하기 위해 아래와 같은 전략을 쓴다. 

- Many to One Model
- One to One Model
- Many to Many Model 

아까 위에서 kernel thread는 kernel area에서 지원된다고 말했지? 하지만 kernel thread에 관한 문서를 읽으면 **두 가지 타입의 kernel thread는 함축하고 있다.**

- kernel thread가 **single kernel thread와 directly하게 mapping된 user thread**일 수도 있다고 말할 수도 있다. 
  - 이 경우에 kernel thread는 user가 user thread를 다룰 수 있지만 user thread가 kernel thread와 엄격히 구분됨을 의미한다 
- 보통 kernel thread라고 말하면 kernel 안에 있는 thread라고 한다. 

### Many-to-One Model

많은 user thread가 single kernel thread에  mapping된 것을 의미한다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 4.23.31.png" style="zoom:50%;" />

- user thread들이 single process에 있다는 것을 명심해라. 

  - **single process**가 **multiple user thread를 가질 수 있으**며,
  - **single process**가 **kernel thread와 연결될** 수 있다. 

- Thread는 user space에 있는 **thread library**에 의해 관리되며 매우 효율적이다. 

  - **빨간 박스**에 위치하며 user thread를 switch한다. (process switch보다 효율적이다.)
  - 다른 process간 switch한다고 한다면 **user thread가 kernel area로 들어가서 다시 나온다음에 다른 process로 간다. ** 이로인해 overhead 발생.

- **Blocking system call** 발생 

  <img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 4.28.54.png" style="zoom:50%;" />

  - 여기서 한 thread가 read data한다고 하자. 그러면 kernel thread가 storage에서 데이터를 읽어올텐데, 그동안 process 내의 thread는 동작을 해도 process는 block된다. 
  - kernel thread는 CPU 사용이라고 보자. 
    - **kernel thread가 CPU 사용을 부여한다고 보자.** 그렇다면 kernel이 cpu unit을 capture하고 user thread에가 가져다 줘야 작동이 되는데, kernel이 다른 system call을 하고있다면 user thread가 CPU 사용권을 kernel thread로부터 얻을 수 없다. 

- **따라서 Blocking system call에 의해 Many to one model은 multicore system에서 유용하지가 않다.** 

### One-to-One Model

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 4.37.16.png)

- 각각의 user thread가 kernel thread에 맵핑되어 있다.
- 따라서 한 kernel thread가 system call을 불러도 process는 계속 실행된다.
  - many to one model과 다르게 한 kernel thread가 system call을 해도 process 내의 다른 user thread들이 kernel thread를 통해 cpu에 접근할 수 있기 때문에 **process는 계속 동작한다. **
- 하지만, kernel thread가 user thread의 개수대로 존재하므로 overhead가 발생한다. 이로인해 system의 속도가 느려진다. 
  - kernel thread들이 kernel scheduler에 존재해야 하므로 time slice에 따라 존재해야하는데 너무 많이 존재하게 된다.
- 이러한 이유로 개발자들이 user thread에 의해 생성되는 kernel thread의 개수를 제한하게 됨. 

### Many-to-Many Model

위의 One to One model에서의 overhead를 줄이기 위해 many to many 모델이 도입이 되었다. 

multiplex : 하나의 회선을 쪼갬

**많은 user threads**에 **같거나 작은 수의 kernel thread**를 **multiplex**한 모델이다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 4.53.29.png" style="zoom:50%;" />

- user가 thread 생성에 제한을 받지 않는다. 
- 한 thread가 process를 block할 수 있는 system call을 부른다. blocking된 thread는 process 밖으로 나가게 되고 프로세스 내의 다른 thread들은 다른 kernel을 사용할 수 있다. 
- 여기서 **single process with multiple thread**는 kernel thread가 많이 배정되어 있기 때문에 **multiple CPU로 분할**될 수 있다. 

### Two-level Model

- **many to many model** 과 **one to one model**이 합쳐진 모델, 현재 많이 쓰이는 모델이다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-25 오후 4.58.26.png" style="zoom: 50%;" />

- CPU bound thread라면 many to many model 사용
- I/O bound thread라면 one-to-one model 사용









