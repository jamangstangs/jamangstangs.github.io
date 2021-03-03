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

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-03 오후 9.58.43.png)

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
  - Bootstrap program이 CPU부터 device까지 탐색하여 상태를 확인하고 disk로 가서 Operating System을 찾는다.
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

하지만, 모든 Operating System이 **공통적으로 포함하는** program은 있다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-04 오전 12.27.26.png)

- 모든 OS는 위와 같이 구성되어 있다.
- **Kernal** 은 공통적으로 포함되어 있다.
- 다른 모든 것은 System program, Application Program이다.(이것들 또한 Operating System에 담겨있다.)