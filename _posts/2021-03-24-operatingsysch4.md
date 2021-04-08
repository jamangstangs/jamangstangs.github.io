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

### 이러한 모델을 사용하는 이유

user level thread 와 kernel level thread의 차이로 인해서 사용한다. Process scheduler에서는 kernel level thread를 schedule하지 user level thread를 schedule하지 않는다. 그래서 OS의 관점에서는 kernel level thread만 신경쓰는 것이다. 

OS가 kernel thread를 다음 실행 kernel로 선택하면, kernel level thread는 그에 대응하는 user level thread를 실행시키는 것이다. user level thread에 문제가 생기면 알 방법이 없다. 

그래서 우리가 user level thread와 kernel level thread를 엄밀하게 나누는 이유이다.

## Thread Libraries

Thread library는 OS가 프로그래머에게 **Thread를 생성하고 관리**할 수 있도록 하는 API이다. 우리가 지금까지 배운 커널의 종류는 user, kernel level이 있으며, **thread library를 구현하는 2가지 주요한 방법**이 있다.

- 모든 Library를 전적으로 user space에 제공하는 것이다.
  - 여기서 만들어지는 thread는 user level thread이다.
  - 이 경우에 OS는 thread library에 뭐가 있는지 알 수 없다.
  - 또한 kernel mode로 갈 수 없다.
  - Thread switching이 일어날 수 없다.
  - kernel level thread가 하나라서 user level thread가 하나 멈추면 나머지도 다 멈춘다.
- OS에 의해 직접 구현되는 kernel level library
  - User level thread보다 느리다. 

요즘 쓰이는 3개의 thread library는 아래와 같다.

- POSIX Pthreads : user level 혹은 kernel level library를 제공한다.
  - **구현되어 있는 것이 아닌 지시(Specification)만 해준 것이다.**
  - UNIX 운영체제에서 흔하다.(Solaris, Linux, Max OS X), pintOS에서 ㄷ쓴다. 
- Win32 threads : 
- Java threads : 

### Pthreads

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 8.31.51.png" style="zoom:50%;" />

- application : 1 에서  input number까지의 합을 구해준다.
- int sum : 전역변수로, 모든 thread가 접근이 가능하다.
  - <img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 8.35.48.png" style="zoom:50%;" />
  - 위의 그림은 multi-threaded 모델이며, 하나의 프로세스이며 main thread에 의해 돌아가는 프로그램이다. 여기서 한 프로세스 안에서 thread들을 만들려고 하는 것이다. 
  - 내가 만약 main thread에서 결과를 출력하고 싶고 다른 thread가 합연산을 실행하게 하고 싶다.  
  - 그렇다면 결과는 main thread로 와야한다. 그래서 전역변수(위의 그림에서 data 부분)를 사용해서 다른 thread가 전역변수에 답을 저장하고 main thread가 이를 참조한다.  
- void *runner(void *param) : thread function의 포인터이다. (자바 version thread와 다른 부분)
- int main(int argc, char *argv[]) 
  - [0] : application name -> tid에 들어감
  - [1] : input number -> attr에 들어감.
- if 구문 : error handler이다. 
- pthread attr init(&attr) : default attribute를 받는다. 
- pthread create(&tid,&attr,runner,argv[1]) : **thread를 만들고 지정한 function을 실행시킨다.**
- pthread join(tid,NULL) : thread가 종료될때까지 기다린다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 8.53.35.png)

다루고 싶은 thread가 여러개면, 추가로 코딩해준다. 

### Window Threads

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 8.54.38.png)

- 디테일은 Pthread와 다르지만, 기본적인 아이디어는 같다. 
- DWORD Sum : 전역변수로 선언이 됨. 기본적인 아이디어는 pthread 참고해라.
- Summation : thread Function이다. 
- Param : 파라미터. Summation에 전달이 된다. 각각의 구현은 주석을 자세히 보면 된다. 
- if ThreadHandle != NULL : create되면 무조건 닫고, sum을 print한다.

### Java Thread Example

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 9.05.17.png)

- Thread Function이라고 명시하기 위해 implement Runnable 

```java
public interface Runnable
{
	public abstract void run();
}
```

## Implicit Threading

- Explicit Threading : Thread library를 이용하여 thread를 구현해봤는데, 이것은 **explicit threading**이다. 
- Implicit Threading : **하지만, thread가 간단해서 노력을 들이지 않고 간단하게 thread를 만들수 있는 방법이 Implicit Threading이다.**

multiple thread가 필요한 코드를 명시만 하고 선언만 하면 OS 또는 compiler가 multi thread에서 돌릴 수 있는 다른 코드를 만들어 실행시켜주고 main thread에 리턴해준다.

따라서 explicit threading과 다르게 pid이나 static을 신경쓸 필요가 없다.

아래와 같이 3가지 implicit threading 방식이 있다.

### Thread Pool

Implicit threading의 직관적인 아이디어이다. Pool이 가지는 의미는 무엇의 collection이다. 이와 같이 **Thread pool은 사전에 생성된 thread들을 의미한다.** 

Kernel thread나 User thread가 새로운 Thread를 만들려고 한다면 OS가 충분한 Resource가 있는지 확인하고 thread에게 resource를 할당한다. 만약 삭제된다면 OS는 모든 Thread 정보를 삭제해야하므로 시간이 오래 걸린다. 이것을 하는 것 보다는 thread를 생성할 때 **사전에 만들어 놓은 thread**를 가져와서 사용하면 더 빠르고 효율적일 것이다. 그리고 사용이 끝나면 Thread pool에 그대로 돌려주고. 장점은 아래와 같다.

1. 사전에 생성해놓아 생성하는데 기다리는 시간이 절약되어 시간도 절약하고 효율적이다.
2. thread pool에 존재할 수 있는 thread의 수를 제한을 걸어 동시에 사용되는 thread의 수를 제한할 수 있다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 10.28.29.png)

Window API같은 경우에는 main thread에 의해 관리 될 필요가 없다. 

### OpenMP

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 10.33.05.png" style="zoom:50%;" />

compiler directives의 set이다. 따라서 컴파일러 지시문을 사용한다.

공유 메모리 환경에서 parallel programming을 위해 서포트한다. 

parallel region을 지정하여 parallel하게 실행될 code블럭을 명시한다. 

- #pragma omp parallel : core의 수에 따라서 최대한 많은 수의 thread를 생성한다. 

  - 코어가 4개이면 4개의 thread가 생성된다. (main thread포함)

- #pragma omp parallel for 

  ​	for(i = 0; i<N; i++){

  ​		c[i] = a[i] + b[i];	

  }						: for loop안에 있는 작업을 쪼개서 각 thread에서 실행시킨다. 

이렇게 compiler directives를 사용하여 간단하게 threading을 할 수 있다. 

### Grand Central Dispatch (GCD)

Mac에서 쓰이는 시스템이다. 기본 개념은 thread pool과 비슷하다. 

parallel block에 **^**을 사용하여 식별할 수 있다.

```C
ˆ{ printf("I am a block"); }
```

여기서 GCD는 dispatch queue에 block들을 놓아 스케쥴링한다.  이때 Dispatch queue의 종류는 아래와 같이 두 개로 나뉜다. 

- serial dispatcher: Block을 FIFO형식으로 지워진다. 따라서 한 블럭이 끝날 때 까지 다른 블럭을 종료할 수 없으므로 이로인해 concurrency를 보장할 수 없다. 
- concurrent dispatcher : Block을 FIFO형식으로 지우지만, 어떤 블럭들을 동시에 지워진다. 따라서  concurrrent running을 보장해야 한다면 concurrent dispatcher를 사용한다. 

## Threading Issues

### Semantics of fork() and exec()

process 에서 **fork()**를 배울 때 완전히 **parent process를 복사하는 것**이라고 배웠다. 

그렇다면, thread 하나가 fork()를 하면, 새로운 process는 모든 thread를 복사할 까 아니면 새로운 process가 thread 하나만 복사해서 single threaded가 될까?

- exec() : fork()뒤에 새로운 process에서 실행시키면 forked process에 다른 process를 불러온다.(child process)
  - **fork()뒤에 바로 exec() : 모든  thread를 복사할 필요가 없다.** 새로운 process를 만드는 것이므로.
  - **fork()뒤에 바로 exec()하지 않음 : 모든  thread를 복사해야 한다.** 부모를 베끼기 위해서

몇몇 UNIX system은 두 가지의 fork()를 제공한다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 11.26.06.png" style="zoom:50%;" />

- 프로세스 전체를 복사한다.
- 프로세스 전채를 복사하지 않는다. 

### Signal Handling

- Signals :  UNIX system에서 process(inter process혹은 kernel-process)에서 특정한 이벤트가 발생했음을 알려주는데 사용이 된다.  
- Signal Handler : signal을 처리하기 위해 사용이 된다. 
  1. Signal이 특정 이벤트에 의해 발생함
  2. process로 전달이 된다. 
  3. signal이 두 가지의 signal handler에 의해 처리 된다. 
     - Default signal handler : 커널이 signal을 handling할 때 기본적으로 작동시키는 signal handler이다. 
     - User-defined signal handler : default를 override해서 처리한다.
- Single Threaded
  - single threaded program에 대해서는 signal은 process에 전달이 된다. 
- Multi Threaded : 4개의 옵션이 존재한다. 
  - signal이 적용될 thread에 전달이 된다. (signal이 전달될 target thread를 알아야 한다.)
  - 프로세스의 모든 thread에 signal을 전달한다.
  - 프로세스의 특정 **thread들**에게 전달한다. 
  - 프로세스에서 모든 signal을 받을 thread를 할당한다. 

In UNIX system.

```C
kill(pid t pid, int signal) // process에게 signal 전달
pthread kill(pthread t tid, int signal) // 특정 thread에게 전달한다. 
```

### Thread Cancellation

**아직 Thread가 완료되지 않았음에도 종료하라는 것이다. **Thread가 종료하라는 Signal을 받으면 thread는 취소되고 종료된다. 

종료될 Thread를 **Target Thread라고 한다.**

두 가지 접근 방법이 있는데

- Asynchronous cancellation : 다른 thread를 신경쓰지 않고 즉시 종료한다.
- Deferred cancellation : Target Thread가 주기적으로 종료해야 하는지 체크하게 허락한다. 그래서 계획적으로 처리된다. 종료 준비가 될때가지 실행시키다가 scheduler가 종료시킨다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-30 오후 11.52.23.png" style="zoom:50%;" />

- OFF mode : cancel될 수없다.
- Deferred  : 보안문제로 인해 이 모드가 default이다. 
  - cancellation은 thread가 cancellation point에 도달했을 때만 일어난다.
  - pthread_testcancel() -> **cleanup handler**가 호출된다. 
- Asynchronous : cancel 가능하다. 

cancellation이 불가능하면, cancellation은 thread cancellation이 가능해질 때 까지 보류한다.

**Linux 시스템에서 thread cancellation은 signal에의해 관리된다.** 

### Thread-Local Storage

한 프로세스 내에서 Global data는 모든 thread가 공유한다.  Application에 따라서 각각의 Thread가 특정 데이터의 복사본을 가지고 있어야 할 수도 있다. 이때 **Thread-local storage(TLS)**가 **data area**의 복사본을 각각의 **thread가 가질 수 있게 해준다**.

Thread creation 과정이 없다면 유용하다. -> 

Local Variables와는 다른점이 있는데

- **Local variables** : 하나의 function이 실행되고 있을 때 visible하다. (local function이 return하면 지역변수를 볼 수 없다.) -> **Function 내부의 지역변수**
- **TLS data** : function call을 뛰어넘어 visible하다. (TLS는 **Thread**내부의 function이 있는 어느 곳에서든지 접근이 가능하다. 따라서 Thread 내부에서만 공유하는 변수라고 생각하자.) -> **Thread의 지역변수**

### Scheduler Activations

OS는 user level thread는 모르고 kernel level thread만 신경써도 된다고 했다. 아래와 같은 상황을 생각해보자. 1개의  level thread가 block되었다고 가정하자.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 7.32.10.png" style="zoom:50%;" />

- 1:1 model : user thread와 kernel thread 사이의 추가적인 알림을 요구하지 않는다. 
  - kernel level thread - user level thread 이 한 쌍이 막혀도 다른 thread의 상황을 몰라도 된다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 7.32.15.png" style="zoom:50%;" />

- M:1 model : User thread와 kernel thread 사이의 추가적인 알림을 요구하지 않는다. 
  - kernel level thread - user level thread 하나가 block되면 entire process가 block되기 때문이다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 7.39.41.png" style="zoom:50%;" />

- M:M model and Two-level model : 하나의 kernel thread가 block되면, 그 kernel thread를 사용하고 있던 user level thread를 다른 kernel에 할당을 해야한다. 그것을 지원하려면 user level thread가 어떤 kernel level thread가 실행이 가능한지 알아야 한다. 

  - Schedule activation은 user level thread에게  upcall signal을 보낸다.
  - 이것이 가능하게 하기 위해 **Thread Library와 kernel therad사이에** intermediate data structure인 **Lightweight process(LWP)를 둔다.** 
  - User-thread-library입장에선 LWP가 user thread를 돌릴 수 있는 장소처럼 보이고, OS scheduler가 LWP에 processor를 할당한다.  (core를 할당해준다.)
    - User-thread-library -> LWP에 user level thread할당
    - OS scheduler -> LWP에 processor할당.
  - 각각의 LWP는 kernel thread에 붙어있는다. 
  - LWP는 CPU 코어의 개수만큼 생성된다. 

  ![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 7.50.25.png)

  - Scheduler activation scheme은 upcall procedure이 가능하게 해준다. 
    - upcall : application이 block되려고 할 때 발생한다.
    - upcall : kernel과 User thread library에 있는 upcal handler 사이의 통신을 위해서 사용된다.

  1. blocking system call이 발생하면 thread library로 가서 kernel로 간 다음에 
  2. Kernel이 upcall을 하여 thread가 block될 것을 Thread library에 알려준다. 
  3. **block된 LWP와 user process를 Thread library밖으로 보낸다.** 
  4. 새로운  LWP가 생성되어 Thread library와 연결이 된다.
     - Blocking이 user level thread에서 발생하면 **LWP와 kernel thread와 user thread**는 같이 지정되어 thread library 밖으로 나가게 되고 다른 user thread와 LWP를 연결하여 kernel thread를 할당한다. 

## Operating System Examples

### Window Thread

Window에서는 one to one mapping 구현한다. (**지금까지 해온 Scheduling이 redundant하다고 느낌. 퍼포먼스 때문에 그렇다. 그 당시에는 computer가 빠르지 않아서 공학자들이 시스템을 최대한 많이 쓰려고 그렇게 scheduling이 필요했고, 기술이 발전하면서 core가 많아지니까 요즘은 그냥 one-one model을 쓴다.**) 각각의 thread는 다음을 포함한다. -> 간단한 mechanism때문에  one-one model을 쓴다고 알고 있자.

- Thread id
- **Register set** : processor의 state를 나타내는.
- serperate user and kernel **stacks** : thread가 user mode or kernel mode에서 실행될 때를 나누기 위해서.
- **Private data storage area** : run time libraries와 dynamic link libraries를 위해 사용 됨.

#### CONTEXT = PROGRAM COUNTER

**Context : register set, stacks, private storage area 이 셋이 thread의 context이다.**

**Process counter = program running의 context**

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 8.16.54.png" style="zoom:50%;" />

- ETHREAD :   **Thread가 속한 Process의 포인터**와 **KTHREAD의 포인터**를 포함한다.
- KTHREAD : **scheduling and synchronization info**, **kernel-mode stack**, **TEB의 포인터**를 포함한다
- TEB : **thread id**, **user-mode stack**, **thread-local storage**을 포함한다.

### Linux Threads

리눅스 시스템은 process나 thread보다는 **task**라는 용어를 사용한다.

Thread 생성은  Clone()을 **통해** 생성된다. clone()을 할 때 다음과 같이 parent와 child tasks 사이의 얼마나 많은 정보를 공유할지 정하는 flags를 전달한다.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 8.24.17.png" style="zoom:50%;" />

- fork()가 호출되면 새로운 task가 생성된다. 





-Reference-

Abraham Silberschatz, Peter B. Galvin, Greg Gagne의 『Operating System Concept 9th』

