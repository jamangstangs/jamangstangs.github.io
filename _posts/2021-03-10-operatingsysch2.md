---
title: Operating System Chapter 2

toc: true

use_math: true

categories:

 - Operating system


---

## Operating system structures

### 용어 

Interface : 서로 다른 두 개의 시스템 혹은 장치 사이에서의 정보나 신호를 주고 받는 경계

- 상호작용하는 곳이다.

API (Application Programming Interface): 프로그램과 또 다른 프로그램을 연결해주는 일종의 다리(Interface의 정의를 생각해보자.)

- 어떠한 Application(응용 프로그램)에서 데이터를 주고받기 위한 방법

### Objectives

- OS : User, Processes, other systems 에게 어떤 서비스를 제공해주나
- Operating system을 structing 하는 다양한 방법
- OS가 설치, 부팅, 커스텀 되는 방법을 설명하기.

### Operating System Services

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 1.44.51.png)

OS에 있는 User interface

- User Interface : 사용자와 컴퓨터 시스템이 만나는 지점, 키보드 타이핑이나 마우스 클릭으로 컴퓨터 조작이 가능하다.
  - Command Line interpreter (CLI) : 사용자가 **텍스트 명령**을 통해 명령을 내리는 인터페이스
  - Batch interface : 명령을 **파일에 넣어두고(collection of command)** 파일을 실행시키면 CLI에 기반한 명령이 입력됨.
  - Graphical User Interface (GUI) : **마우스, 키보드, 스크린 터치와 같은 방식**으로 화면에 띄워진 **그래픽**을 조작하여 명령을 내리는 인터페이스 

OS는 유저를 도와주는 service를 제공하며, 아래는 그 종류이다.

- Program Execution : **명령어 집합**으로 프로그램을 메모리에 load하여 이를 실행하고 종료한다. (normally or abnormally여부에 상관없이 실행, 종료가 가능해야 한다.)
- I/O operations : 외부 입출력 장치(External I/O device, 키보드나 프린터)를 어떻게 사용하는지에 대한 Interface
- File systems : 파일생성, 제거, 탐색, 접근 관리
- Communication : 프로세스 간 정보를 교환이 필요할 때가 있다. 이때를 위해서 OS가 프로세스간 통신하는 방법을 사용한다.
  - Shared memory : 메모리 공간을 프로세스가 공유한다.
  - Message Passing : 프로세스 간에 정보 패킷을 주고받는다. (이 방법이 더 느리다.)
- Error Detection : CPU, Memory, I/O device, user application 같은 곳에서의 에러를 탐지한다.
  - 탐지하고 OS가 문제를 바로 잡는다.

service 중에서는 자원 관리를 효율적으로 해준다.

- Resource Allocation : 여러 작업들이 동시에 진행된다면, 아래와 같은 컴퓨팅 자원을 분배해준다.
  - CPU cycles, main memory, file storage, I/O device
  - 자주 충돌이 일어나는데, 이로 인해 **데드락(Deadlock)**이 발생할 수 있다.
- Accounting : 어떤 유저가 어떤 종류의 자원을 사용하고 있는지 추적한다.
- Protection and Security : 어떤 유저가 데이터에 접근할 수 있는지 확인하고, 해당된 유저가 아니면 접근을 막는다.

이 파트는 대부분 어떤 서비스를 제공하는지 알아보자, 그중에서 CLI와 GUI를 자세히 알아보자.

### CLI 와 GUI

#### CLI 

유저가 입력한 text 명령을 입력 받으면, Machine code로 변환해서 작동시킨다. 명령어의 종류는 아래 두가지가 있다.

- Built-in command: 이미 짜여진 코드의 형식을 입력하는 것으로, 아래와 같이 입력한다.

```python
echo "hello world"
```

- Program name command: 그 뒤에 어떻게 실행시킬지 옵션을 붙인다. 

```python
userApplication -all -withoutWindow
```

#### GUI

마우스, 키보드나 터치스크린을 사용하여 조작을 한다. 

- Icons : file이나 program, actions 등을 나타내며 화면에 나타난 이것들을 마우스나 키보드, 터치 스크린을 사용하여 조작한다.
- 마우스를 더블클릭, 마우스의 특정 버튼을 클릭하여 정해진 action을 취한다.

#### GUI의 한계

CLI는 built-in command의 조합으로 **무한한 action**을 취할 수 있다. 하지만 GUI는 디자이너가 정의한 action에 **대해서만** 접근을 해야하기 때문에 **한계성**이 있다. 이로인해서 OS와 GUI 와 CLI를 같이 제공한다.

또한 이러한 무한한 action을 취할 수 있는 CLI 덕분에 컴퓨터를 좀 더 detail 하게 조작이 가능하다.

### System calls

위에서 주구장창 설명한 **OS가 제공하는 Service**의 **Programming Interface**를 의미한다. 즉, 이를 사용하여 OS가 제공하는 service를 사용할 수 있다.

- **kernel와 user program**을 이어주는 인터페이스 역할을 한다.
- 비록 특정 작업은 low-level task작업으로 처리해야 하지만, 보통 **C나 C++**의 프로그래밍 언어로 쓰여있다.

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 4.13.00.png)

- Process : user program 혹은  system program으로 볼 수 있다.
  - Process가 직접적으로 System call을 호출 가능하다.
    - ex) read(), create file
  - 보통은 OS가 제공하는 API를 사용한다.
- API : OS가 제공하는 API를 통해서 system call을 호출할 수 있다.
  - win32 API, POSIX API(유닉스, 리눅스, 맥 os), Java API 가 있다.
  - API가 application programmer 역할을 하여 실제 system calls를 호출한다.

위의 방식은 매우 기초적이니 알아두자.

#### Example of System calls

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 4.34.03.png)

- 한 파일을 다른 파일에 복사하는 예시
- 왼쪽으로 치우친 문장 : copy라는 작업의 high level execution
- 오른쪽으로 치우친 문장 : execution의 디테일한 명령어. 

**API에 있는 system calls의 예시이다.** 위에서 본 것은 system call의 set이다. (엄밀하게 말하면, 오른쪽으로 치우친 문장은 API이며, API가 system call을 호출한다. 따라서 아래에서는 API가 어떻게 생겼는지 알아보는 과정을 설명한 것이다.)

#### Example of Standard API

위의 예시에서 Read와 관련된 system call을 일아보자.

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 4.49.36.png)

- 위와 같이 function을 정의하여 system call을 호출한다.

### System call Implementation

System call interface : 아래의 숫자에 따라서 각각의 system call에 **숫자를 할당**한다. 이 숫자에 따라서 system call interface는 table(**System call table or Interrupt vector,** )에 정리해둔다.

- ex) readfile(0x06), writefile(0x08), openfile(0x33)
- API에서 **fopen()**함수 호출을 한다면 파일을 여는 함수를 찾기 위해 system call table을 참조한다. 이 테이블은 메모리 주소의 모음인데, 해당 메모리 주소는 ISR을 가리키고 있다. 

결론 : system call을 직접 다루는 것을 위험하므로 개발자가 직접 다루지는 않는다.(stdio.h가 대표적인 예) 따라서 개발자는 system call이 어떻게 구성되었는지는 잘 모른다.

#### API - System call - OS 사이의 관계

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 5.29.23.png)

- user application : system call을 실행시킬 것
- system call interface : user application이 실행시킨 open()을 받아 system call table을 참조하여 open()과 관련된 숫자를 찾아 그 숫자를 사용하여 해당하는 주소로 찾아가 open() system call이 구현된 곳에서 실행시키고 return 값을 system call interface에 넘기고, system call interface는 user application으로 넘긴다.

### System Call에서 Parameter Passing 

 종종 system call만을 호출하는 것보다는 필요한 정보가 더 있을 수 있다. (parameter passing이 필요한 함수도 있기에 특정 system call도 paramter passing이 필요할 것이다. open() 경우에는 타겟 파일의 정보, 원본 파일의 정보, 파일의 길이 정보가 필요하다.) 

<img src="/assets/images/post/operating system/스크린샷 2021-03-14 오후 5.44.14.png" style="zoom:50%;" />

user process의 diagram이다.

- user area 에 있는 것 : code, data, stack
- kernel area에 있는 것 : files
- cpu에 있는 것 : register 

OS로 정보를 넘기는 3가지 일반적인 방법이 있다. 

1. 가장 간단한 방법으로, paramters를 cpu의 registers에 넘긴다. system call을 하고나면 OS가 필요한 parameter를 찾으려고 했을 때 이미 register에 있는 것이다.
   - register의 수가 제한적이다. 만약 넘겨야 한다면 parameter가 크다면, 안된다.
2. user area에 있는 data, stack을 사용하여 parameter을 저장하고, 해당하는 parameter의 주소값을 register에 넘긴다. 이때 OS가 register에 있는 parameter의 주소를 참조하여 가져온다.
3. stack에 직접 parameter을 저장하고, OS가 직접 stack에서 해당 parameter을 pop한다.

2, 3 방법은 paramter 크기에 제한이 없다는 것이다.

### Types of System Calls

System call의 종류는 아래와 같이 6개로 분류가 가능하다.

#### Process control

- end abort load execute

#### File management

- create delete open close read write

#### Device management

- read write request release

#### Information maintenance

- get / set time or date

#### communication 

- Shared memory : 메모리 공간을 프로세스가 공유한다.
  - Message Passing : 프로세스 간에 정보 패킷을 주고받는다. (이 방법이 더 느리다.) -> 4장에서 다시 배울겨

#### Protection

### MS-DOS : Single - tasking

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 6.24.34.png)

- (a) : System startup 상태
- (b) : program을 작동하고 있는 상태

process가 free memory에 올라가고 **command line interpreter**의 크기가 작아진다. process를 실행시킬때는 CLI을 사용하지 않으니까 그만큼 공간이 줄어드는 것이다.

여기서 power point를 실행시키면 다른 프로그램은 실행이 불가능하다. (오직 하나의 프로그램만 사용이 가능하다. )

### FreeBSD : Multitasking

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 6.31.54.png)

- User가 login하면 shell을 선택할 수 있다.
- user 가 CLI에서 프로그램을 실행하면 shell이 **fork() system call**을 작동시켜서 process를 생성한다.

- 생성된 모든 **process는 shell의 child**로 생성이 되며, 이를 사용하여 OS가 현재 돌고있는 모든 process를 체크한다. shell이 모든 process의 parent이다.



###  System Programs

System Programs와 System Calls의 차이를 알아보자.

- System Calls : OS가 제공해야 하는 기초적인 function 
  - 대부분의 OS가 System call을 공유하지만(read write와 같이), System program은 다를 수 있다.

- System Programs : program development와 excution을 위한 편리한 환경을 제공해준다. 몇몇 OS는 System call의 단순한 한  user interface이지만, 몇몇은 복잡하게 구현되어 있다. ()아래와 같이 나뉜다.
  - File management :  파일과 디렉토리들을 Create delete copy rename print dump list manipulate
  - Status information : time, space, performance
  - File modification : 파일을 생성하고 수정한다. 
  - Programming Language Support : 컴파일러, 디버거, interpreters가 있다.
  - Program Loading and Execution
  - Communications : processes, user, computer systems  사이의 connection 메커니즘을 제공한다.
  - Background Services : OS의 뒤에서 항상 돌아가고 있으며
  - Application Programs : 배틀필드나 그런 프로그램으로 OS에 딸려있지 않는 프로그램들.



### Operating System Design and Implementation

Internal Structure은 OS마다 다양하기 때문에, OS를 디자인 할 때는 아래와 같은 **Design Goals**를 가지고 디자인해야 한다.

- User goals : OS는 사용하기 편리해야 하고, 배우기 쉽고, 안정적이고 안전하고 빨라야 한다. -> 사용자의 입장에서 
  - window home, Mac OS가 있다. (Mac OS는 다뤄야 하는 하드웨어의 후보가 상대적으로 적기 때문에 좀 더 OS에 최적화가 되어있다.)
- System goals : 설계하기 쉽고, 구현하기 쉽고, 유지하기 쉽고, 유연하고 안정적이고 효율적이어야 한다.
  - window servers, some Linux 가 있다.

또한 OS를 디자인 하면서 가장 중요한 원리 2가지가 있다.

- Policy : what will be done 	무엇을 해야하는가?
  - how long OS should wait for a particular user (OS가 유저를 얼마나 기다려 줘야 하는가?)
- Mechanism : How to do it?  결과물을 얻기위한 기술
  - Timer : CPU 보호를 위한 Mechanism (OS정책이 바뀌더라도 기본 메커니즘은 바뀌지 않게 된다.)

이러한 분리를 하지 않고, **Policy와 Machanism과 연동되게 OS를 구현한다면** 나중에 Policy가 바뀌게 된다면 Mechanism도 바꿔야 하는 불상사가 생길 것이다.

### Implementation

초기 OS : **assembly language**로 구현

최근 OS : 다양한 언어가 섞여 있다.

- **the lowest levels of kernel**은 **assembly language**로 쓰여져 있을 것이다.
- main body 는  C
- system programs : C 나 C++, Scripting language는 PERL이나 Python이 있다.

High level language는 다른 하드웨어로 **port하기 쉽지만**, **느리다**.

emulation : OS가 다른 hardware에서도 작동하게 프로그래밍 하는 기법을 의미한다.

### Operating System Structure

- 일반적인 OS는 매우 크다 ->  module 단위로 작업을 작은 구성요소로 나누는 것이 나중에 수정하기가 쉽다.
- Monolithic System : 하나의 module만 가지고 있는 것
  - MS - DOS

#### Simple Structure : MS-DOS

MS : microsoft

DOS : Disk Operating System  

![](/assets/images/post/operating system/스크린샷 2021-03-14 오후 6.24.34.png)

- Application program : process
- Resident system program : interpreter 
- MS - DOS device drivers : kernel part
- 오직 한 가지의 process만 실행시킬 수 있다.
- **최소의 공간에 최대의 기능**을 제공하기 위해 모듈로 분할되지 않음.

#### Non Simple Structure : UNIX 

![](/assets/images/post/operating system/스크린샷 2021-03-15 오후 5.16.50.png)

UNIX OS는 하드웨어 기능에 제한을 받아 아래와 같이 두 부분으로 나뉘어 구성이 되었다.

- System Programs 
- The Kernel
  - System call interface 와 kernel interface 사이에 있는 부분
  - file system, CPU scheduling, memory management, 

하지만, fully Layered이 아니다. 엄밀하게 나뉘지 않았다.

#### Layered Approach 

![](/assets/images/post/operating system/스크린샷 2021-03-15 오후 5.43.05.png)

운영체제를 더 세분화해 계층을 분리함.

- bottom layer : hardware
- top layer : user interface

자기보다 아래층에 있는 것만 사용이 가능하다.

### Microkernel System Structure

![](/assets/images/post/operating system/스크린샷 2021-03-15 오후 5.49.09.png)

커널의 많은 부분을 user space로 넘겨 커널 사이즈를 최대한 줄이려고 한다. 따라서 위의 그림과 같이 

- Application Program
- File System
- Device Driver 

이 세가지를 user mode로 넘겼다.

User modules간의 communication은 kernel에 있는 message passing 으로 이루어 진다.

장점

- OS를 확장하기 쉽다 -> 새로은 services를 kernel이 아닌 user space 에 넣으면 되니까
- 새로운 architecture로 OS가 port되기 쉽다 -> 고쳐야할 kernel파트가 적으므로.
- 보안성이 있다 -> 대부분의 service가 user space에서 실행이 되므로

#### Modules

현대의 많은 OS들이 **Loadable Kernel Modules**을 구현한다. 객체 지향 접근법에서 말하는 모듈화와 같은 개념이다. 

#### Hybrid Systems

하이브리드 시스템은 커널의 핵심만 남기고 나머지는 따로 구현한 시스템이다. 

Mac OS X :  BSD가 핵심이지만 나머지는 모두 애플이 자체 구현했다. 안드로이드는 리눅스 커널위에 자체 구현한 라이브러리를 올린 시스템이다.

#### Max OS X Structure

- Hybrid Structures이며 layered system이다.

![](/assets/images/post/operating system/스크린샷 2021-03-17 오후 4.30.31.png)

- Aqua 가 top layer
- kernel environment : Mach microkernel, BSD Unix parts로 구성됨. 
  - 추가로 I/O kit와 kernel extensions라 불리는 dynamically loadable modules

#### IOS 

맥보다 좀 더 간단하게 구성되어 있다. 현재는 ios와 mac os가 하드웨어 유사성으로 통합된다는 것을 들었다. 위의 mac os와는 다르게 구성되어 잇다.

![](/assets/images/post/operating system/스크린샷 2021-03-17 오후 4.50.21.png)

- cocoa touch : C API 
- media services : 비디오, 오디오, graphic을 위한 layer
- core services : 클라우드 컴퓨팅, 데이터 베이스를 제공
- **core os : mac os kernel에 기초함.**

#### Android 

Open Source이다. IOS와 유사하지만 조금 다르다. 

Linux 커널에 기초하지만, 수정되었다. 

- process, memory, device driver management를 제공한다. (이 점이 다르다)
- power management가 추가되엇다. -> (기본적인os에서는 별로 중요하지 않다.)

![](/assets/images/post/operating system/스크린샷 2021-03-17 오후 4.57.04.png)

#### Operating System Debugging

내가 OS를 구현하다 보면 에러가 무조건 발생하게 된다. 이때 어떤 버그들은 OS를 돌아가게 하려면 디버깅을 해야하는데, 런타임에서는 디버깅하기가 매우 어렵다. 

- 나만의 application에서는 외부에서 디버그 가능하지만
- OS는 그게 어렵다. 따라서 내가 OS돌리면서 어떤 부분이 에러인지 증명하기 어렵다.

이로 인해 OS 개발자들은 log files(System programs나 core kernel functions를 돌릴때 만들어지는 processes, traces가 있는 파일) 

- 장애 분석

  - 프로세스 실패 : OS가 Process가 사용하던 메모리를 캡쳐 -> core dump file을 생성
  - 커널 장애(crash라고 불림) : 오류 정보가 log file에 저장됨. crash dump에 메모리의 상태를 저장.

  - crash 이후, system performance 최적화를 진행함. 로그파일을 보면서, trace listings를 추적하면서, 언제 시스템이 kernel mode로 가는지, 유저모드로 돌아오는지, 언제 crash가 발생하는지, 언제 에러가 발생하는지 디버그 하는 것.

- 성능 조정(Performance Tuning)

  -  bottlenecks 지점을 제거함으로써 성능을 향상시키려고 하는 것도 디버깅이다.

#### DTrace

- DTrace라고 불리는 디버그 툴, Solaris, FreeBSD, Max OS X 에서 사용 가능.
- OS 디버그는 Log file을 찾아보는 것.
  - Consumer가 provides에게 probes를 만들라고 요청하면, 

#### OS Generation 

OS가 내가 컴파일한 파일에서 어떻게 나오는지 살펴보자. OS는 어떤 종류의 machine에도 돌아가게  설계되었고, **시스템은 특정 computer site를 위해 각각 구성되어야 한다.**

- SYSGEN(system generation) : 하드웨어의 구성을 고려한 정보를 가진 프로그램이며, 이를 가지고 OS가 
- 내가 OS 설치할 때, OS설치자가 나의 computer system 구성에 맞춘 OS를 설치한다.  (configure : 환경을 설정하다) -> system tune

#### System Boot

전원이 들어오면, 고정된memory location에서 실행이 시작되어야 한다. 

- ROM 이 bootstrap code를 저장하고 있다.

OS는 hardware에서 사용 가능하도록 만들어져야한다. 그래야 hardware가 시작할 수 있다.

- ROM 또는 EEPROM에 저장된 bootstrap loader가 kernel을 찾아내고, memory에 올린다. 그리고 시작시킨다.



-Reference-

Abraham Silberschatz, Peter B. Galvin, Greg Gagne의 『Operating System Concept 9th』

