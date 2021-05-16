---
  title: Operating System Chapter 6

toc: true

use_math: true

categories:

 - Operating system


---

## Background

- Process는 Concurrently하게 실행된다.
  - 어떤 때든지 실행을 완료시키지 않고 interrupted될 수 있다.
- Concurrent하게 실행되는 process가 있다는 말은 Multiple process가 shared data에 동시에 접근할 수 있다는 말이다. 이로인해 **data inconsistency가 발생할 수 있다.**
- 데이터의 consustency를 유지하는 것은 서로 cooperating 하는 process간의 orderly execution을 보장하는 mechanism이 필요하다.

### Producer & Consumer

![](/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.25.50.png)

### Race Condition

![](/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.29.17.png)

![](/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.29.52.png)

- 메모리에서 레지스터1으로 데이터를 옮김.
- 레지스터1에서 1 증가시킴.
  - Time slice를 소비해서 block되었다고 하자. 그리고 consumer 실행
- 메모리에서 레지스터2로 데이터를 옮김
- 레지스터2에서 1 감소시킴.
  - consumer가 block되어서 
- producer가 다시 중단된 작업으로 돌아온다. 레지스터 1에 저장된 값을 메모리에 저장.
- consumer가 다시 중단된 작업으로 돌아온다. 레지스터 2에 저장된 값을 메모리에 저장.

원래 우리가 실행시키고자 하는 작업은 1증가 1감소 해서 원래 counter값인 5가 나오길 바랬는데, 순서가 block되어서 꼬여버렸다는 이유로 예상 밖의 결과값이 나온다. 

## The Critical-Section Problem

이전 파트에서는 2개의 process의 상황을 고려했었는데, 이제 n개의 process가 있다고 하자.

Single core, Single CPU 시스템이라고 가정하고 보는 것이다.

각 Process 는 Critical Section을 가진다.

- common : 공동의
- 공동의 variable, table, file에 대해 update하는 행위를 말한다. 
- 한 Process가 Critical section에 있을 때, 다른 process가 Critical section에 접근할 수 없다.

**Critical Section Problem** : 현재 process가 Critical section에 있을 때 다른 process가 접근하지 못하도록 설계하는 Protocol이다. 설계할 때는 아래와 같이 4파트로 나눈다.

1. Entry Section : Critical section에 접근 가능한지 불가능한지 물어본다.
2. exit Section : process가 Critical section을 해결하고 condition이나 variable을 리턴하는 섹션
3. remainder section : 별로 중요하지는 않고, 다른 Process의 critical section 작동에 영향을 주지 않는 섹션
4. Critical Section : 공유 자원을 사용하는 code 섹션

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 2.11.43.png)

- Critical section을 포함한 프로세스의 일반적인 형태이다.
- Critical section을 위와 같이 보호한다. 

거의 모든 디자인이 이렇게 설계되어있다.

### Algorithm for Process Pi & Pj

Process가 2개만 있다면, 이렇게 문제를 해결할 수 있다.

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 2.16.12.png)

- Pi의 코드이다.

1. Entry section 

   - turn : 다른 process간 교환하는 variable이다.
   - 현재 job이 j에 의해서 실행이 되고 있다면, i는 while문 안에 들어가서 기다린다. 
   - Pj가 작업을 끝내서, turn을 i로 리턴한다면, 이때 Pi가 while문을 나와서 critical section으로 들어갈 수 있다.
   - 또한, 이때는 turn이 i이므로, Pj의 코드에서는 turn 이 i이면 while문 안에 갇히므로 j가 기다리는 상황이 발생한다. 

   ----Pi의 Critical Section 실행-----

2. exit section 

   - critical section이 끝나서 turn을 j에게 돌려준다.

   -----Pi의 remainder section실행----

turn만 잘 정의하면 race condition이 발생할 이유가 없다.

=> 여기서 문제점을 찾아라.



### Solution to Critical-Section Problem (3가지 외우는게 중요)

Critical section problem을 해결하기 위해서는 그 Solution은 아래 3가지 요구사항을 만족해야 한다. 

1. **Mutual** **Exclusion** : 한 Process가 Critical Section을 실행시키고 있을 때, 다른 어떤 Process도 Critical Section에 접근할 수 없다.
2. **Progress** : Critical section이 비어있다면, 다른 하나의 Process가 Mutually Exclusion을 만족하면서 Critical section을 사용할 수 있게 해야한다.
3. **Bounded** **Waiting** : **한정된 대기시간**, 즉, 한 프로세스가 Critical section을 독점적으로 사용하여 다른 Process들이 **무한정 기다리는 일은 없도록 해야한다.**

여기에는 모든 프로세스가 같은 process time과 speed를 가지고 있어야 한다. 



### Critical-Section Handling in OS

- Preemptive kernel : 프로세스 실행 중간에 preemption을 허용한다. 
- Nonpreemptive kernel : 다른 Process의 동작이 끝나고 CPU를 자발적으로 반납해야 Process를 실행한다.
  - race condition으로부터 자유로움. kernel에 오직 하나의process만이 active되기 때문이다.

이러한 Critical Section 문제는 kernel이 preemption하게 작동되는 것을 지원하면 생긴다.



## Peterson’s Solution

2 Process간의 Solution이다.

이때, load and store 기계어 지시문은 atomic하다고 가정한다. (atomic : 중간에 interrupt될 일이 없다는 것을 의미한다.)

Peterson Solution에서는 아래 두 variables들을 공유한다.

- **int turn;**
  - Critical section 사용이 누구 차례인지 나타내는 변수
- **Booleand flag[2];** -> 이게 추가되었다. 
  - Flag 배열은 process가 critical section에 들어가기 전 준비가 되었는지 알려주는 용도이다. flag[i] = true 는 process i가 준비 되었다는 뜻이다. 

위의 variables들은 **entry section와 exit section **control을 위해 필요하다. 

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 2.55.13.png)

Pi의 경우를 나타낸 코드이다.

1. Entry Section
   - flag[i] = true : Pi가 준비가 되었다는 의미이다. 
   - turn = j : turn을 j로 설정하여 다른 process가 준비되었는지 확인한다.
     - 즉, turn을 j로 설정하여 while문을 확인한다면, 
   - while(flag[j] && turn == j) : j가 준비되었는지 물어보고, turn이 j라면 flag[j]를 확인하면서 Pj 가 exit section에 도달할 때 까지 while문 안에 Pi가 갇혀있는다.
     - Pj가 turn을 바꿔 확인하려 할 때 Pi가 준비되었다면 Critical section을 실행할 것이다.
     - 또는, Flag[j]가 exit section에 도달했다면, critical section을 실행시킨다. 
2. Exit Section
   - flag[i] = false; : flag를 바꿔 Pi가 critical section 작업을 끝냈다는 것을 명시한다. 

Remainder section을 끝냈다면 다시 위로 돌아가 entry에서 확인한다. 

이제 이 솔루션의 세가지 요구사항을 만족했는지 확인해보자.

1. mutually Exclusion : 
   - flag[**j**] == false or turn == i 이 조건을 만족할 때만 Critical section에 접근한다. 
   - j가 준비가 안되거나, turn이 i인 경우
2. Progress : 
   - Critical section이 비어있을 경우, 다른 Process가 해당 Critical section에 들어갈 수 있다. 
3. Bounded waiting : 
   - 작업이 끝나고 다른 Process가 Critical Section을 사용할 수 있도록 flag[i] = false;을 해줌.

## Synchronization Hardware

Peterson  solution은 load and store 지시문은의 조건은 atomic해야 한다는 것이다. 따라서 하드웨어가 Atomic operation을 몇몇 instruction set에 대해 지원해야한다.

- 이전 solution은 하드웨어 support가 뒷받침 되었다.
- 또한, 모든 Solution은 **locking idea**를 기반으로 하고 있다. 
  - 따라서 Lock을 통해서 Critical section을 보호한다. 
    - Lock이 적용되면 다른 Process가 Critical section에 접근 불가능
    - Lock이 해제되면 다른 Process가 Critical section에 접근 가능
- **Uniprocessors** : interrupt를 막을 수 있다. 
  - CLI에서 interrupt를 끄는 커맨드를 사용하여 preemptive하지 않게 실행시킬 수 있다. 
    - 즉, 일시적으로 Non-preemptive kernel로 만드는 것이다 .
  - **하지만, Multiprocessor system에서는 모든 Process가 Critical Section을 사용하는 것이 아님에도 불구하고 Preemptive하게 적용되니까 매우 비효율적이다.** 

현대의 기기들은 특별한 atomic instruction을 제공한다. (여러개의 코드가 있어도, 하나의 atomic으로 취급되어 낄 방법이 없다.) 대표적인 예시로

- test and set
- swap 

와 같은 operation들이 atomic하다.

### Solution to Critical-section Problem Using Locks

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 3.39.24.png)

- peterson solution과 같은 방법으로 Problem이 좀 더 간단하게 구현되어있다.
- 하지만, Lock으로 구현한다면 중간에 Interrupt가 발생할 여지가 있다. 

이와 다르게, 아래의 instruction은 atomically하게 구현된 test_and_set의 예시를 보여주겟다. 



### test_and_set Instruction

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 3.41.09.png)

- 이 함수 자체가 Atomically하게 실행된다. 
- 함수의 구현 자체는
  - **target value를 true로 갱신한다.** 
  - **이전의  target value를 리턴한다.**



### Solution using test_and_set()

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 3.44.11.png)

- lock : critical section을 다루기 위해 공유된 변수, FALSE로 초기화 되어있다. 
- test_and_set() : FALSE를 리턴하고, Lock은 True로 바뀐다.
  - 처음으로 CS에 들어가는 process가 CS을 실행시키고,
  - 나중에 들어가고자 하는 Process는  Lock이 TRUE니까 CS에 접근을 못한다. 
- CS에서 작업을 끝내고 나오면 Exit section에서 lock을 false로 바꾼다. 



CS requirement를 모두 만족했나 확인해보자.

1. Mutual Exclusion : 한 번에 하나의 process만이 CS에 들어갈 수 있다.
2. Progress : 비어있다면, 어떤 process도 들어갈 수 있다.
3. Bounded Waiting : 각 process의 waiting time을 결정하는 machanisom이 없다. 
   1. 이전 예제에서는 Pi와 Pj가 두개 였기 때문에 만족하던 것이었다.!!
   2. 이 예제에서는 Priority가 낮은 process가 test_and_set을 나중에 실행시키면 실행될 여지가 없음을 알 수 있다. 



### compare_and_swap Instruction

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 3.55.31.png)

하는 역할은 test_and_set과 같지만, 디테일은 조금씩 다르다. 

- Compare_and_swap(int * value, int expected, int new_value) : 
  - int * value : Lock을 보통 받는다.
  - expected : 예상한 것과 같으면, value를 new_value로 갱신한다. 
  - new_value : 새로운  value값을 넣는다. 

여기서 또한 Atomically하게 전체 함수가 구현되었다. 



### Solution using compare_and_swap

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 3.58.13.png)

- Lock의 주소를 넣고, 기대되는 값을 0을 넣고, 갱신할 값 1을 넣는다.
  - 이 안에서 lock이 0, 즉, lock을 가진 process가 아무도 없다면 lock을 가진 것으로 갱신이 되고, 이전 lock value를 return해서 이번에 lock을 획득한 process임을 리턴한다.
    - 0을 리턴 : lock을 가져감
    - 1을 리턴 : 다른 process가 lock을 해제할 때 까지 기다린다. 
- CS section이 끝나면 lock을 0으로 넣어준다. 

CS requirement를 모두 만족했나 확인해보자.

1. Mutual Exclusion : 한 번에 하나의 process만이 CS에 들어갈 수 있다.
2. Progress : 비어있다면, 어떤 process도 들어갈 수 있다.
3. Bounded Waiting : 각 process의 waiting time을 결정하는 machanisom이 없다. 
   1. 이전 peterson이나 turn in 예제에서는 Pi와 Pj가 두개 였기 때문에 만족하던 것이었다.!!
   2. 이 예제에서는 Priority가 낮은 process가 test_and_set을 나중에 실행시키면 실행될 여지가 없음을 알 수 있다. 
   3. **test_and_set 방법에서 달라진 것이 없다.** 



### Bounded-waiting Mutual Exclusion with test_and_set

이 구현에서는 Bounded waiting problem을 해결한 test_and_set방법을 소개한다. 

![](/assets/images/post/operating system/스크린샷 2021-04-12 오후 4.04.06.png)

- waiting[i] : current process를 의미하며, boolean으로 설정되어 잇다. 
- key = true
- waiting하고 있고, key가 true인점을 이용하여
  - lock이 가능해질때, key값을 false하여 while문을 나오고, waiting[i]를 바꾸고 CS를 수정한다.
  - 즉, 이때는 lock을 획득했음을 알 수 있다. 

CS처리가 끝나고, exit section을 보자.

- j = (i+1) %n 
  - 값을 다음 process로 전달하고, n으로 나눈 것은 process를 순회하기 위함이다. 
- while(((j!=i) && !waiting[j]))
  - **j != i : 여기는 순회하면서 현재 i 프로세스로 돌아왔으면, waiting process가 없다는 의미이다. 따라서  while문 탈출해준다.**
  - 다음 process가 준비되었는지 확인한다. (waiting상태가 아니라면 계속 순회해준다.)
    - **j가 waiting 상태였다면, TRUE라면 while문 탈출한다.** 
- if( j == i ) 
  - 여기는 순회해서 i 프로세스로 돌아왔으므로 기다리고 있는 process가 없다는 의미이다. 따라서 lock을 해제해준다. 
- 만약 아니라면 waiting j의 상태를 false로 해주어서 다음에 key를 j 프로세스에게 준다. 그리고 나서 j가 while문을 탈출이 가능하다. 
  - lock을 따로 바꿔줄 필요가 없다.  lock상태 자체는 유지가 되고 있으므로 



CS requirement를 모두 만족했나 확인해보자.

1. Mutual Exclusion : 한 번에 하나의 process만이 CS에 들어갈 수 있다.
2. Progress : 비어있다면, 어떤 process도 들어갈 수 있다.
3. Bounded Waiting 
   - 순회하면서 다음에 실행시킬 process를 확인하므로 만족한다.
   - 즉, 모든 process가 무한정 기다리기만 하는 조건이 없어진다. 



## Mutex Locks

지금까지 다양한 Solution들을 봐왔다. application level이 아니라 kernel level에서 구현한 것이다. 

Software level에서 CS problem을 해결하는 방법을 제공하는데, 이게 **Mutex lock**이다. 

- acquire() : lock을 확득하고
- release() : lock을 해제하고 

얘네는 atomic하다. 

user나 process가 CS로 들어가고 싶으면 acquire과 release가 필요하다.

- 하지만, 이를 사용하여 구현하려면 busy waiting방식이 필요하다. 그래서 while문 안을 계속 돌고 있으니까 **spinlock**이라고 불린다. 



<img src="/assets/images/post/operating system/스크린샷 2021-04-12 오후 4.27.46.png" style="zoom:50%;" />

- available : 가능성을 의미함. 가능하지 않으면 wait한다. 모든 process가 공유한다. 
- 가능하면 while문 탈출해서 available을  false로 바꿔준다.
  - 이로인해 모든 process가 기다려야 한다. 
- release : available을 true로 바꿔준다.



## Semaphores

거의 모든 OS에서 Mutex Lock을 안쓰고 Semaphore로 대체하였다. 

Semaphore는 2개 또는 그 이상의 process들 사이에서 Synchronization문제를 해결하기 위해 좀 더 복잡한 방법으로 구현되었다. 

만약 Multiple resource가 있고, 그중 하나가 접근할 수 없는  Process에게 점유 당했다고 생각해보자. 그렇다면 multiple resource를 사용할 수 있는 multiple Process가 있다고하자. 그렇다면 Mutex lock을 각각 할당해야 하지만, Semaphore는 Boolean을 Integer값으로 바꿔서 사용하기 때문에 각각 할당할 필요가 없다.

- Semaphore S가 있다고 하자. 얘는 Interger variable이다. 
  - wait(), signal() 이 두 개의  atomic operation만으로 접근할 수 있다.
  - OS가 이 operation들을  atomic으로 보장한다. 



- wait()

<img src="/assets/images/post/operating system/스크린샷 2021-04-15 오후 7.59.36.png" style="zoom:50%;" />

- S가 양수가 되어야 S--할 수 있다.
- S가 0 이하라면 기다려야한다.



- signal()

<img src="/assets/images/post/operating system/스크린샷 2021-04-15 오후 7.59.41.png" style="zoom:50%;" />

- S++한다.



### Semaphore Usage

- Counting semaphore : S를 제한없이 설정할 수 있다. 
- Binary semaphore : S를 0 1로만 구성한다.
  - Mutex lock과 같다. 



앞 상황과 비슷한 상황을 Semaphore으로 한번 만들어보겠다.

![](/assets/images/post/operating system/스크린샷 2021-04-15 오후 8.05.53.png)

- P1 : Statement S1을 가진 Process
- P2 : Statement S2를 가진 process
- S2는  S1이 끝나고 난 뒤에 실행될 수 있다고 하자. 이때 P1와P2가  0으로 초기화된 synch를 공유하면서 구현될 수 있다.

이렇게 중간에 S1이 끝나고 signal을 넣고, S2앞에 wait를 넣는다면 순서대로 실행이 가능하다.

만약 P2가 먼저 실행되어서 S2를 먼저 실행시키려고 한다고 보자. 

- synch는 처음부터 0으로 초기화 되어서 당연히 wait해야한다. 
- Context Switch가 실행되어서  P1이 실행되고, S1을 하고나서 synch를 1로 올렸다.
- 그리고 나서 Context switch가 실행되어 P2가 실행이 되면, synch가 1이므로 wait은 busy waiting을 탈출하고 synch를 1을 감소시키고 S2를 실행할 수 있다. 



### Semaphore Implementation

semaphore를 구현할 때, 어떤 두 개 의 process들도 **wait과 signal을** 같은 semaphore에 정확히 **동시에 사용할 수 없다.** 

따라서, Critical section 에 wati와 signal을 구현해놓으면 Critical Section problem이 발생할 수 있다.

- 지금까지 본 구현은 **busy waiting** 
- busy waiting을 **다른 개념으로 바꿔서** Critical section문제를 해결해 보겠다.
  - => semaphore안에 waiting queue를 구현하여 사용하겠다. 



### Semaphore Implementation : with no Busy waiting

그리고 그거는 waiting queue를 semaphore안에 사용하는 것이다. 이거는 scheduling이라고 비슷하지만 scheduling으로 말하지 않는다. 즉, Process를 다시 실행시키는 것은 아니다.

Critical section에서 실행될  Process를 선택하는 것이다. 개념은 아래와 같다.

![](/assets/images/post/operating system/스크린샷 2021-04-15 오후 8.52.35.png)

- 각 semaphore은 waiting queue를 가지고 있다.
  - value 하나와
  - struct process *list : 이 semaphore의 waiting queue를 handling할 것이다. 
- 여기에 2가지 method가 wait와 signal에 추가된다. 

![](/assets/images/post/operating system/스크린샷 2021-04-15 오후 9.02.00.png)

- wait 구현의 변화
  - s->value를 1 감소시킨다.
    - waiting process의 수를 알리기 위해 1 감소시킨다. 
      - value = -3 : 3개의 process가 wait를 실행시킴, 심지어 현재 value가 0이어도 기다리는것으로 카운트한다. 
  - x->value < 0 
    - 이 **process를 S->list**에 추가한다. 
    - 그리고 **block**()한다.
      - block()호출자가 waiting queue에 들어간다. 
- signal 구현의 변화
  - S->value를 1 증가시킨다.
    - 나는 끝났다고 하고 waiting queue에서 나감을 알려줌
  - S->value <=0 이다 (semaphore을 기다리는 process가 있거나 없다를 의미)
    - S->list에서 process를 제거한다.
    - wakeup(P) 해주면, ready state로 바꿔준다. 



### Deadlock and Starvation

Deadlock : state를 나타내는 용어로, 2개 이상의 Process가 waiting process에 의해 발생하는  event에 대해 무한정 기다리는 것을 의미한다.

예시로 보면서 정의를 이해해보자.

S와 Q의 semaphore가 있다고 하고 둘 다 1로 초기화되었다고 해보자.

![](/assets/images/post/operating system/스크린샷 2021-04-15 오후 9.22.44.png)

- P0 wait(S) : S가 1에서 0으로 바뀜
- P1으로 C.S 일어남
- P1 wait(Q) : Q가 1에서 0으로 바뀜
- P1 wait(S) : S가 0에서 -1로 바뀜 즉, **block이 된다. -> waiting queue로 간다.** 
- P0으로 CS 일어남
- P0 wait(Q) : Q가 0에서 -1로 바뀜, **즉,block이 된다. -> waiting queue로 간다.** 

정상적으로 P0 -> P1으로 실행했다면 block되었을일은 없다.

이제 이 두 개의 Process는 서로를 기다리며 waiting queue에 존재한다. 이 경우 

- **S와 Q를  deadlock이라고 한다.** 



### Starvation : indefinite blocking

- Schedular 에서는 process가 Context Switching이 불가능한 상황을 말함.
- 이거도 다른 타입의  scheduling이니까 starvation을 가질 수 있다.
  - 하지만 거의 일어나지 않는다. 
- Process가 semaphore queue에서 절대 제거되지 않는 경우를 말한다. 



### Priority Inversion

낮은 priority process가 더 높은 priority process의 lock을 쥐고 있을 경우를 말한다. Semaphore scheduler 자체의 문자가 아니라, OS와 semaphore scheduler가 섞어있기 때문에 발생하는 문제이다. 

L M H 가 실행되고, 

L이 lock을 쥐고 공유자원을 실행시킬 동안, H가 lock에 대해서 기다린다. 그때 M이 등장해서  L보다 priority에 의해 먼저 실행되고, M은 실제로 H보다 priority가 높아도, Lock에 대해 기다리고 있으므로  L에 의해 Priority가 역전이 되었다. 

- 이를 해결하기 위해 priority inheritance protocol을 하여 L에게 자기의 Priority를 줘서 L이 lock을 쥐고있을 동안 priority를 쥐어진다. 그러고 나서 L이 높은 priority를 가져 다른 Process에게 preemptive 당하지 않고 실행이 가능하다.



## Synchronization 의 Classical problems

### Bounded Buffer problem 

Buffer가 제한적인 size를 가지고 있다는 의미이다. 

- n Buffer -> 각 Buffer는 하나의 item만 담을 수 있다.
- Semaphore mutex : binary semaphore라는 의미, **1**로 초기화된다. 
- Semaphore full : Buffer가 item으로 다 찼드는 의미, **0**으로 초기화된다. 
- Semaphore empty : Buffer가 비었다는 의미이며, **n**으로 초기화된다. 비어있는  buffer의 개수로 초기화된다.

Procuder : **empty** 를 잡고-> Empty buffer를 잡아야 생산이 가능

Consumer : **Full**을 잡고 -> filled buffer를 잡아야 소비가 가능



Producer process의 구조를 보자.

![](/assets/images/post/operating system/스크린샷 2021-04-16 오전 6.58.48.png)

- next produced buffer을 생산한다.
- wait(empty) : n -> n-1
- wait(mutex) : 1 -> 0 : Consumer가 접근하고 있지 않다면 1에서 0으로 간다.
- next produced를 buffer에 집어 넣는다.
- signal(mutex) : 0 -> 1 : CS에서 작업이 끝났음을 알려준다.
- signal(full) : 0 -> 1 : 소비할 item이 buffer에 하나 있다는 의미



Consumer Process의 구조를 보자.

![](/assets/images/post/operating system/스크린샷 2021-04-16 오전 7.03.57.png)

생성된 product가 buffer에 있다고 하자.

- wait(full)
  - producer 이전에 실행 되었으면 0 -> -1이므로 wait한다.
  - 이후에 실행 (item이 있다는 소리): 1 -> 0으로 되고 다음 statement로 넘어간다.
- wait(mutex)
  - CS에 접근하기 위한 Semaphore를 얻는다.
- next_consumed에서 item을 제거한다.
- signal(mutex)
  - Cs에서 접근이 끝났음을 알려줌 : 0 -> 1
- signal(empty) 
  - buffer를 하나 소비했으므로 n-1 -> n





### Readers-Writers Problem

더 실용적인 방법이다. 이 방법을 web site에 사용한다. 게시판에 뭐 적으려고 할 때 게시판의 posting을 적으려고 하는데, 여기서 발생할 수 잇는 문제를 readers writers problem으로 해결하나.

- Readers : 데이터를 읽기만한다. 업데이트는 안함 -> race condition 발생 안함.
- writers : 데이터를 읽고 쓰기 가능 -> race condition 발생 한다.
  - 동시에 update를 한다면 race condition이 발생한다. 

문제점은 다음과 같다,

- 모든  readers들이 동시에 읽기가 가능하게 하자.
- 한 번에 하나의 writer가 동시에 shared data에 접근할 수 있게 하자.



Shared data

- Data set : shared data를 나타냄.
- semaphore rw_mutex : 1로 초기화, reader writer mutex
- semaphore mutex : 1로 초기화, CS문제 해결
- Integer read_count : 0으로 초기화, reader의 user수를 나타냄.



Writer process를 보자.

![](/assets/images/post/operating system/스크린샷 2021-04-16 오전 7.15.06.png)

- rw_mutex

  - 이걸 1->0으로 감소 시키고 writing한다.

- signal(rw_mutex) 

  - 끝났음을 알리고 0->1로 signal해준다.

  

Reader process를 보자.

![](/assets/images/post/operating system/스크린샷 2021-04-16 오전 7.15.10.png)

- wait(mutex) : mutex를 기다린다.
  - Process간 공유되는  data를 기다린다.
  - read count ++ : 얘는 shared data이므로 앞의 wait(mutex)을 실행시켜줌
- if (read_count == 1)
  - wait(rw_mutex);
- signal(mutex)
- reading 한다.
- wait(mutex) : read count를 위한 wait
  - read count-- : 줄여준다.
- if (read_count == 0) : 아무도 기다리지 않는다.
  - signal(rw_mutex) : rw_mutex
- signal(mutex)
  - 다시 돌려준다.

하지만, 모든 reader가 다 읽을 때 까지  writer가 기다려야한다. 

1. writer : CS에 접근
2. n reader 기다리고 있는데
   - 1개는 rw_mutex, n-1 readers는 mutex에서 queue하고 있다.
3. writer가 signam(rw_mutex)
   - 이때, 기다리고 있는 reader 또는 writer에게 줘야하는데, 이거는  scheduler에 의해서 선택된다.



이 문제를 해결하기 위해

1. 어떤 reader도 writer가 CS를 사용하는 동안 기다리지 않는다.
2. writer가 기다리고 있으면, 제일 빠르게 실행시켜준다.
   - writer가 object에 접근하려고 기다릴때, 어떤 reader도 reading을 시작할 수 없다.

어떤 구현도 starvation을 유발한다. 

Multiple processes가 reader-writer lock을 제공하는데, Multiple process가 reader_writer lock을 동시에 얻는게 가능하지만, 하나의 process가  writing lock을 얻으면, 다른 writer는 writing을 할 수 없다. 다른  CS에서 작업함에도 불구하고.



### Dining-Philosophers Problem



#### 기본 개념

- 하나의 프로세스를 실행시키기 위해 2개의 shared data나 shared resources가 필요하다.
  - Philosophers가 아래 두 가지 행동을 번갈아가며 실행시킨다. 
    1. **Thinking** : CPU burst code, **Critical section에 접근하지 않는 것**.
    2. **Eating** : Philosopher가 **Critical section에 접근하려고 하는 것.**
  - Philosophers들은 서로 교류하지 않으며, **젓가락 2개를 집으려고 하지만, Philosopher들이 동시에 집지는 않는다. **
  - Eating이 끝나고 난 뒤에는 **젓가락 2개를 release한다. **



#### 작동 과정

위의 과정을 설명하기 위해 5개의 Philosopher가 있는 환경을 알아보겠다. 

![](/assets/images/post/operating system/스크린샷 2021-05-07 오후 7.48.02.png)

- Shared data의 종류
  - Bowl of rice : 데이터 셋
  - Semaphore : chopstick[5], 1로 초기화 되어있다. 

![](/assets/images/post/operating system/스크린샷 2021-05-07 오후 7.49.45.png)

1. 왼쪽 젓가락 집고, 오른쪽 젓가락 집으면 eating하여 Critical section에 접근하는 Eating 실행한다.
2. 왼족 젓가락 release하고 오른쪽 젓가락 release하여 Critical section에 접근하지 않는 나머지 Thinking을 실행한다. 



#### Deadlock이 발생하는 경우

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 7.52.44.png" style="zoom:50%;" />

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 7.53.00.png" style="zoom:50%;" />

- 1번 까지 실행하고 Context switch를 하면 Deadlock이 발생한다. 
- 모든 Philosopher들이 왼쪽 젓가락을 집고 Context switch를 하면, 어느 누구도 오른쪽 젓가락을 집을 수 없다. 



#### Deadlock이 발생하지 않게 하는 방법

![](/assets/images/post/operating system/스크린샷 2021-05-07 오후 7.56.59.png)

1. **Eating하려고 하는 Philosopher들의 수를 제한한다.**
   - 5명 중 4명만 eating가능하게 설정. 이렇게 하면 하나의 philosopher가 한 번에 2개의 젓가락을 집고 process를 끝낼 수 있다. 
2. 동시에 2개의 젓가락을 집게 하게 설정한다. (**젓가락 2개 집는 것을 Atomic하게 설정한다**. Deadlock이 발생하는 경우의 코드에서 1번에서 Context switch가 일어나는 것을 막는다. )
3. 현재 Philosopher 순서가 짝수or홀수에 따라서 규칙을 정해준다.
   - 짝수 Philosopher : 왼쪽 젓가락 집고 오른쪽 젓가락
   - 홀수 Philosopher : 오른쪽 젓가락 집고 왼쪽 젓가락



### Semaphore의 문제점

![](/assets/images/post/operating system/스크린샷 2021-05-07 오후 8.05.38.png)

- case 1 : 순서를 바꾸게 되면 어떤 의미도 없어지게 된다.  이미 semaphore를 하나 올렸기 때문에 wait해도 어떤 의미가 없다. 
- case 2 : wait만 한다. 무한정 기다리게 된다. 
- case 3 : wait나 signal을 둘중 하나 빠뜨리거나 둘 다 빠뜨린다. 

이러한 것 때문에 Deadlock이나 Strarvation이 발생할 수 있다. 이것을 다루기 위해 좀 더 높은 수준으로 Critical section problem을 해결하기 위해 **Monitor**을 사용한다. 



## Monitors



### 특징

- 유저에게 **Lock에 직접 접근할 수 있는 권한을 주지 않는다**.
- **Mutual** **Exclusion**을 보장한 **Function**으로만 접근할 수 있는 권한을 준다. 

**즉, 각 Process나 Thread는 Shared data에 오직 Method로만 접근이 가능하다.** 

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 8.26.25.png" style="zoom:50%;" />

- 전체 그림이 하나의 Class이다. Class 구성은
  - Shared Data 
  - Operations
    - 각각 Atomic하다 -> 두 개의 Thread가 동시에 operation을 실행 불가능
  - Initialization code

1. 어떤 Process가 어떤 Operation을 실행시킨다면 
2. 나머지 Process들은 Entry Queue에서 대기한다. 
3. Monitor 안에서 Operation을 실행시키는 Process가 없다면 Entry queue에 있는 Process가 Operation 중 하나를 실행시킨다. 
   - 이렇게 하면서 Shared Data에 직접 접근하는 것이 아니라, Monitor안에 있는 Operation에 의해서 접근한다는 것을 알 수 있다. 



### Condition Variables 적용 

condition x, y : 이렇게 두 개로 선언이 된다. 각 condition variable에는 아래와 같은 operation이 정의됨

- **x.wait()** : **x.signal()**을 받을 때 까지 **process가 중단된다.** 
- **x.signal()** : **x.wait()**를 호출한 Process들 중 하나를 **다시 재개한다.** 

예시를 들어보자.

1. Process P 가 x.signal()호출
2. Process Q 가 x.wait()호출해서 entry queue에서 대기한다. 

이렇다면, 둘 중 하나를 선택해야 한다. 

- P 가 중단되고 Q가 재개된다.
- P 가 자기 Process를 끝내고 Q가 그 다음에 실행된다. 

이것을 해결할 방법은 아래와 같다.

- **Signal and Wait** : Q가 monitor을 나가던가 다른  condition을 기다릴때까지 **P**가 Waiting queue에 들어가서 **기다린다**. 
- **Signal and Continue** :  P가 monitor을 나가던가 다른 COndition을 기다릴때까지 **Q**가  waiting queue에 들어가서 **기다린다**. 

어떤 방법으로 구현할지는 

![](/assets/images/post/operating system/스크린샷 2021-05-07 오후 9.42.37.png)

- State : 5개의 Philosopher들이 3개의 상태를 가짐. Thinking, Hungry, Eating
- Condition variables : 5개를 가짐.
- Pickup
  - 현재 있는 것을 집으려고 함.
  - test 해보고
  - 만약  test후 eating 상태가 아니라면 wait 해준다. 
- test
  - 왼쪽  Philosopher 확인 && 현재  Philosopher 확인 && 오른쪽 Philosopher 확인
    - 현재 i state가 eating 시작하고 condition variable signal해준다.
- putdown
  - 현재  Philosopher가 작업을 끝내고 젓가락을 내려놓으려 한다. 
  - 왼쪽과 오른쪽을 test해주면서 signal을 퍼지게 한다. 



### Deadlock & Starvation

이러한 구현이면  Deadlock이 발생하지 않는다.

- 한 번에 하나의 operation만 가능하기 때문이다. 

하지만  Starvation은 발생할 수 있다. 



### Resuming Processes within a Monitor

Monitor 안에 있는 waiting queue를 생각한다면 FCFS는 적당하지 않다. 

따라서 x.wait(c) 에서 c를  priority number으로 사용하여 priority scheduling을 해준다. 

