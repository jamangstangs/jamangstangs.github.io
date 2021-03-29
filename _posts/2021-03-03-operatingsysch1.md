---
title: Operating System Chapter 1

toc: true

use_math: true

categories:

 - Operating system

---

## Introduction

### What is operating system?

A software that acts as intermediary between a user of a computer and the computer hardware

운영체제는 컴퓨터 user와 컴퓨터 hardware 사이의 매개체 역할을 해주는 **Software**이다. 

### Computer System Structure

컴퓨터 시스템의 요소는 아래와 같이 4가지로 나눌 수 있다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 9.58.43.png" style="zoom:33%;" />

- Hardware : CPU, Memory, I/O devices -> Provides the basic computing resources for the system
- Operating System : Controls and coordinates the use of hardware among various application and users 
  - 위의 그림과 같이 설명하면 된다. 다양한 User와 Application들의 hardware 사용을 조절하고 컨트롤 하는 역할을 한다.
  - **즉, 다양한 User와 Application Program들이 컴퓨팅 자원을 효율적으로 사용하게 조절하는 역할을 한다.**
- Application Systems : Word processor, Compilers
- Users : 사람, 기계 혹은 다른 컴퓨터가 될 수 있다.

### Computer System Organization

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 10.12.26.png)

우선 이것을 이해하기 전, 사전 지식을 쌓자.

- task : 일의 단위이다. 프린트, 문서 저장, 노래 재생 등이 서로 다른 개별적인 작업이다.
- sub-task : 위의 task를 좀 더 작은 단위의 소작업으로 나눈 것이다. 기존 task를 sub-task로 나누고, 그냥 sub-task를 다시 붙이면 task가 된다.
- simultaneous : 정말로 동시에를 의미한다. concurrent와는 의미는 같지만, 컴퓨터분야에서는 전혀 다르다. 
- parallelism : task 들이 simultaneously하게 처리될 수 있음을 의미한다.(**여러 사람이 중첩적으로 일을 실행**) 같은 순간에 두 개 이상의 task가 동시에 수행됨을 의미한다. 
  - 이때, 두 개 이상의 task가 동시에(simultaneously)하게 처리될 수 있음을 의미하므로 **두 개 이상의 processing unit이 필요하다**
- concurrency : 서로 다른 작업들이 **중첩**되어 진행된다는 의미(**한 사람이 중첩적 일을 실행**) 비유를 들어서 설명하겠다. 빵을 만들때 반죽을 하고 구워야 한다. 반죽하는 과정을 A task, 굽는 과정을 B task라고 하자. 
  - sequential : 모든 빵의 반죽을 다 완료하고, 모든 반죽을 다 굽는다. (A를 다 끝내고 B를 끝낸다.)
  - concurrent : 몇 가지 빵의 반죽을 다 하고, 그 빵의 반죽을 굽고, (A의 일부를 하고 그 일부의 B를 끝낸다.), 

위의 지식을 이해했으면, 설명을 시작하겠다.

- One or more CPUs and other devices(like disk controller, usb controller, graphic adapter) are connected through a common bus that provides access to shared memory
  - 각각의 CPU(CPU 각각에 연결되어 있다는 것에 주목하자.)와 특정 기기에 나뉘어진 메모리 공간에 접근할 수 있는 common bus에 연결되어있다.
- **Concurrent execution of applications in CPUs** and **devices** competes for memory cycles
  - application을 concurrent하게 처리하는 CPUs
  - devices
  - 이 둘은 서로에 대해서 parallel하게 실행이되지만, memory cycles에 대해 경쟁을 하게 된다.

왜 메모리 사이클을 경쟁하게 되는 것인가?

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 10.39.27.png)

위의 사진을 보면 다른 device가 버스 하나를 점유해버리면 다른 메모리에 접근해야하는 devices나 CPU는 접근할 수 없기 때문이다.

### Computer System Abstract

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 11.10.04.png)

- 컴퓨터를 부팅하기 전 main 메모리의 상태는 위와 같다. 이제 컴퓨터를 부팅 시킨다면 최초로 실핼시켜야할 프로그램이 있다.
  - bootstrap program : 이것은 ROM(Read Only Memory) 또는 EEPROM(Electrically erasable programmable read only memory)에 저장되어 있다.
  - Bootstrap program이 CPU부터 **device까지 탐색하여 상태를 확인**하고 disk로 가서 **Operating System을 찾는다**.
  - 최종적으로 Operating System의 Kernel 을 아래와 같이 메모리에 올려야 한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 11.16.40.png)

​	이제, Operating System을 Main memory에 올렸으므로 이제 application program을 실행시켜보자.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 11.44.16.png)

- c++로 hello world를 출력할때, 어떤 변화가 일어나는지 알아보자.
  - programming language로 짠 코드를 컴파일 시킨다.
  - 컴파일의 결과가 디스크에 hex code로 저장이 된다.
  - disk에서 hex code를 메인 메모리에 올린다. (위의 파란 부분에 loaded된다.)
  - 메모리와 CPU가 상호작용하여 연산한다.
  - 연산 결과가 메모리에서 모니터로 가 결과를 모니터에 띄워준다.

### Operating System Goals

컴퓨터 하드웨어 자원을 좀 더 효율적으로 사용하게 해주는 것이 Operating System의 목적이다.

### What Operating System Do

각자의 관점에 따라서 OS가 각각의 대상에게 어떤 작용을 하는지 알아보자.

- Users: OS는 유저에게 컴퓨터를 좀 더 쉽게 사용하게 해주고 resource utilization에 신경 안쓰게 해준다.(컴퓨팅 자원을 어떻게 사용할지 계산하는 것을 유저가 하지 않도록 해준다.)
- Shared Computer : 공유된 컴퓨팅 자원을 여러 사용자가 사용할 때, computing resourece가 효율적으로 사용되게 하므로 개개인의 자원 활용을 **최대한으로 해준다**.
- Handheld computer : Optimizing the battery life

### Operating System Definition

- Resource Allocator로 정의한다면
  - 모든 resource들을 관리한다.
  - decides between conflicting request from efficient and fair resource use : 어떤 user가 먼저 프린터를 사용할지 결정
- Control program로 정의한다면
  - Controls execution of programs to prevent errors. 
  - 하지만, resource에 관한 정의가 없다.

위의 정의들을 본다면 확실히 universal하게 받아들여지는 정의는 없다. 왜냐하면 operating system (MAC, window나 Linux)를 살때 그에 딸려오는 소프트웨어들이 다양하기 때문이다.

하지만, 모든 Operating System이 **공통적으로 포함하고 가장 기초적인 프로그램**인 **Kernel**은 있다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-04 오전 12.27.26.png)

- 모든 OS는 위와 같이 구성되어 있다.
- **Kernal** 은 공통적으로 포함되어 있다.
- 다른 모든 것은 System program, Application Program이다.(이것들 또한 Operating System에 담겨있다.)

### Interrupt Handling

아래 Input 혹은 Output으로 나오는 요청에 의해 프로그램을 돌리는 CPU를 정지하는 것이다. (마치 강의를 하고있는 선생님(cpu)께 학생(어떤 하드웨어 혹은 소프트웨어)들이 질문을 드려 수업의 흐름을 끊는 것과 같이.)

- User application
- Kernel application
- Hardware controller

이제 Interrupt handling의 과정을 알아보자.

1. 어떤 하드웨어 혹은 소프트웨어가 CPU에 Interrupt를 발생시킨다.

2. CPU는 이전에 무슨 작업(Task)을 해야했는지 기억을 해야하므로(Interrupt를 받기 전 돌리고 있었는 프로그램) 아래 두 가지를 저장한다.

   - Storing **Regisers**
   - Storing **Program counter**

3. OS가 이러한 Interrupt가 아래 어떤 interrupt인지 정한다.

   - Polling
   - Vectored Interrupt System

4. 각각의 Interrupt 타입에 따라서 OS가 행해야 할 행동을 취한다.

   ![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-06 오후 12.10.47.png)

   - Polling : 선생님이 학생에게 질문이 있냐고 물어보는거와 같이 OS가 직접 request를 이끌어낸다. 있으면 해결해주고 다음 학생(다음 프로그램에게 request를 요청한다.)
   - Vectored Interrupt System : 학생이 선생님에게 질문을 하듯이 OS가 request를 해결해주고 이전 process로 돌아감(강의를 계속 진행하는 거와 같다.)

### Interrupt Timeline

용어 설명

- context : Task를 번갈아 가면서 수행하는 과정에서 Task마다 실행 상태에 대한 정보를 구성하고 있는 것을 의미한다.
- program counter : 다음에 실행할 명령어의 주소를 기억하고 있는 CPU의 register 중 하나이다. 혹은 다음번에 실행할 명령어 주소를 말한다.
  - program counter -> OS의 주소를 가리킨다 : kernel mode
  - program counter -> 프로그램이 있는 메모리 주소를 가리킨다 : User mode
- idle : 쉬고있는
- system call : kernal 영역의 기능을 사용자 모드가 가능하게 한다.
- PCB(Process code block) : 커널의 데이터 영역에 존재하며 각각의 프로세스마다 고유의 PCB가 있다.
  - Interrupt 발생시 프로세스 어느 부분이 수행중이었는지 저장한다.

Interrupt Handling에 관하여 다시 말하자면, 한 Task의 request를 처리하기 위해 여러 Task를 오가며 작업을 처리하는데, 이때 각 Task마다 context를 저장해야 기존에 처리하던 작업을 다른 작업을 하고 오더라도 계속 진행할 수 있다. 

이제부터 **서버와  Computer 사이의 context 전송을 알아보겠다.**

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-06 오후 3.22.24.png)

1. user process executing : 유튜브 실행중
2. trasnferring 발생 : external network adapter로 부터 데이터를 전송받고, 그것을 버퍼(ethernet adapter을 구성한다.)에 저장하고 전송이 완료되었으면 ethernet adapter가 cpu에 신호를 트리거한다.
3. CPU가 하던 일을 멈추고 실행중이던 register와 PC(현재 유튜브의 process에 관한 PC)들을 PCB에 저장한다.
4. PC를 ISR에 보낸다. (다음에 실행할 명령어를 ISR로 옮겨 )
5. ISR의 코드를 kernel mode(초록색)에서 실행한다.
6. PCB에 저장된 기존에 실행중이던 State를 복원한다.

### I/O의 종류를 알아보자

현대 컴퓨터들은 Asynchronous가 더 효율적이기 때문에 Asynchronous를 사용한다.

- Synchronous I/O : device가 cpu와 연결을 시작하면, I/O이 완료됨에 따라서만 control이 user program에 리턴이 되는 I/O를 말한다.
  - C드라이브에서 D드라이브로 파일을 옮길 때, 아무것도 하지 못하는 것을 말한다.
  - 시스템이 user의 명령에 따르지 않는다.
  - 동시에 어떤 I/O도 같이 진행될 수 없다.
- Asynchronous I/O : device가 cpu와 연결을 시작하면, I/O의 완료를 기다리지 않고 control이 user program에 리턴이 되는 I/O이다.
  - Device status table : 모든 I/O device가 가리키는 type, address, state(끝났는지, 기다리고 있는지)의 entry를 담고있다.
  - OS가 device status를 정하기 위한, 혹은 interrupt status를 추가하기 위해 table entry를 수정하기 위한 I/O table을 관리한다.
  - System call : 4장에서 다루자.

이러한 I/O를 다루기 위해서 는 아래가 필요하다.

- Device Driver : I/O를 관리하기 위해 각각의 device에 있다. -> AMD나 NVIDIA를 써도 일정한 API를 사용한다.

### Storage Definitions

bit : 0 또는 1을 저장함. 

Byte : 8 bits -> Kilobyte : 1024 bytes -> Megabyte : 1024^2 bytes -> Gigabyte : 1024^3  bytes -> Terabyte : 1024^4 bytes -> Petabyte : 1024^5 bytes

### Storage Structure

가장 빠른 storage는 CPU안에 있는 register이다. 하지만 비싸기 때문에 대부분 사용하기 그렇고, 가장 효율적인 Storage는 Main Memory이다.

- Main memory : CPU가 직접 접근할 수 있는 가장 큰 메모리
  - RAM(Random Access Memory) :  RAM의 임의의 주소에 접근하는데 있어서 걸리는 시간이 모두 일정하다. -> magnetic disks 같은 경우에는 주소에 따라서 접근하는데 걸리는 시간이 다르다. 
  - Volatile : 전원이 꺼지면 데이터가 다 날라간다.
- Secondary Storage : 크고 Nonvolatile한 저장 공간을 가지는 main memory의 확장판이다.
  - Magnetic Disks : 자성의 기록 물질로 구성되어있다. 
    - tracks으로 나뉘어 있으며, 각각의 track은 sector로 다시 나뉜다.
    - disk controller : 컴퓨터 -(logical interaction)- device -> 여기에서 logical interaction을 결정한다.
  - Solid state disks : magnetic disk보다 빠르며, Nonvolatile
    - 더 인기가 있게 되었다.

### Storage Hierarchy

저장장치의 속도가 빠르면 가격이 오르고, 이것 때문에 Cache memory가 등장하게 된다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 5.35.41.png)

- registers : cpu의 ALU 옆에 있는 저장장치.
- cache : main memory와 bus를 통해 연결되어있다.
- main memory : SSD와 bus를 통해 연결되어있다. register보다 200배 느리다.
- non-volatile memory (SSD가 대표적인 예)): 비휘발성 메모리로, 여기 계급도에서는 SSD가 있다.
- magnetic disk : 하드디스크가 있다. register에 비해 접근 시간이 20000배 느리다.
- 나머지는 씨디나 테이프, 현재 사용하지 않는 제 3의 저장장치이다. 우리가 **배울 주요한 장치는 상위 5**개이다.

위의 계급도에서 cache가 필요한 이유

- register가 필요한 데이터를 magnetic disk에서 꺼내오는 것 보다, main-memory에서 꺼내오는 것이 더 빠르기 때문에 필요하다.
- cache는 위의 예시로 register가 더 빠르게 데이터를 꺼내오기 위해서 느린 storage에서 미리 꺼내와 빠르게 전달해준다.
- 사용중인 정보를 느린 저장장치에서 더 빠른 저장장치로 일시적으로 저장한다.

### Direct Memory Access Structure

CPU의 개입 없이 Devices와 memory 사이의 데이터를 전송하는 방식을 의미한다.

- buffer : 한 곳에서 다른 곳으로 데이터를 전송할 때 일시적으로 데이터를 보관하는 **메모리의 영역**, 메모리와 같은 접근시간을 가진다.
- bus가 하나 있으면 DMA system도 하나 있다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 6.27.24.png)

- device 가 cpu개입없이 메모리에 접근해서 데이터 교환 가능

### Computer System Architecture

Asymmetric Multiprocessing : 각각의 프로세서가 specific한 작업을 처리한다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 6.35.30.png)

- Processor 1 : 일반적인 task를 수행하기 위한 processor
  - Multi core
- Processor 2 : 특별한 task를 수행하기 위한 processor -> private I/O를 가짐. 
  - GPU

Symmetric Multiprocessing(최근 사용하는 구조) : multi core와 multi chip이 있다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 6.41.06.png)

- Multi chip : 각각의 process가 cpu에 올라가면, 이것들을 관리하기 위해서 메모리와 multiple cpu 사이의 교차점(메인보드)에 control unit이 있는데, multi core 같은 경우에는 cpu안에 있다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 6.41.16.png)

- Multi core : 최근에는 multi core을 performance가 더 좋으니까 사용한다.

### Clustered Systems

위의 Multi core와 Multi chip 시스템을 설명했으므로, 이 loosely coupled systems를 이해할 수 있을 것이다.

- Asymmetric clustering : 한 컴퓨터가 hot stanby mode이다. 이게 꺼지면 모든 cluster가 꺼진다.
- Symmetric clustering : 위의 asymmetric에서의 문제때문에 이게 더 reliable한데, 

### Operating System Structure

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 6.56.07.png)

Multiprogramming -> 메인 메모리에서 스케쥴러에 의해 작업을 순서대로 한다.(효율적으로 설계되어서 cpu가 쉴 시간이 없다.)

- 유저가 CPU와 I/O 장치를 효율적으로 사용이 불가능 -> Multiprogramming이 CPU가 해야할 일들을 정리함으로 써 
- Multiprogramming이 없으면 : 작업이 끝나고, 그 다음 작업을 메모리에 올려놓는다.
- Multiprogramming이 있으면 : memory에 cpu가 해야할 일들을 미리 올려놓는다.
  - 작업이 끝나기 전에 어떤 작업을 처리해야 할 때, (job1 도중 job2를 처리해야한다면, job2를 처리하고 다시 job1으로 돌아오는 것이 가능하다.)

Timesharing -> OS가 다른 작업으로 switch 할 때,(이 작업은 1ms로 매우 빠르다.) 

### Operating-System Operations

Interrupt는 하드웨어에 의해 유발되고, 예측 불가능 하기 때문에 asynchoronously하게 발생한다.

몇몇은 소프트웨어에 의해 발생한다.

- Exception : 소프트웨어가 하지 말아야 할 작동, 0으로 나눴을 때 발생하는 것이 대표적인 예시
- trap : 몇몇 이벤트에 대비해 미리 대기하는 에러발생.

Dual mode operation : I/O 장치를 보호하기 위해

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 11.44.16.png)

- User mode 
- Kernel mode 
- mode bit : 현재 어떤 모드로 실행하는지 구별하기 위해 컴퓨터 하드웨어에 추가 됨.

### Process Management

process : 실행중인 프로그램을 말하며, **program이 main memory에 올라가면 process**

- program : passive entity
- process : active entity

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-08 오후 7.59.40.png)

- Single Threaded process : 다음에 실행할 Program counter가 한 개가 있다. (thread 하나에 pc하나)
- Multi Threaded process : thread 하나에 pc 하나











