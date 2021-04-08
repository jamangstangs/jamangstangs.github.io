---
 title: Operating System Chapter 5

toc: true

use_math: true

categories:

 - Operating system

---

## Review

### Chapter 1&2 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 6.33.24.png)

폰노이만 아키텍쳐에서 컴퓨터 시스템이 어떻게 설정되는지 알아보았다.

- Single CPU가 main memory와 상호작용한다.
- main memory가 다른 다양한 devices와 bus를 통해 연결되어 있다.
- main memory에 OS를 booting하면 OS가 main memory에 처음 주소로  kernel의 형태로 올라간다.
- Process들이 scheduler에 의해서 서로 switch되면서 실행이 된다.

### Chapter 3

Process에 대해서 배움. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 6.42.11.png)

Storage에 있는 program이 main memory로 올라가면 **Process**이다. 

1. process를 의미하며, logical memory address로 올라간다. main memory에서 주소가 0이 아님을 의미한다.
   - text, data, heap, stack(function calls for current register data)
2. ready queue에 있는 process가 CPU scheduler에 의해서 running 되면 CPU에 있는 것이고, CPU에서 매우 다양한 이유로 waiting state로 보낸다. 
3. 이 scheduling에 의해서 process 실행이 바뀌게 된다.  

### Chapter 4

Thread에 대해서 배움.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 6.45.59.png)

- 최근의 OS, application => Multithreaded process를 사용한다. 
- 하나의 process가 user와 program의 상호작용을 위해서 multithread를 가지고 있다. 
- **OS는 오직 kernel thread만 신경쓴다**

## CPU Scheduling

Multiprogrammed OS의 기본이 되는 CPU scheduling을 배울 예정이고 CPU Scheduling algorithm을 설명하고 특정 시스템에서 CPU-scheduling을 선택하는 기준을 논해보고 특정 OS에서 sceduling algorithm을 실험해보겠다.

### Basic Concepts 

scheduling의 의미는 CPU 사용을 최대한으로 한다는 것이다. **프로세스는 CPU execution과 I/O wait의 cycle로 구성되어있다.**

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 8.37.03.png" style="zoom:50%;" />

- CPU burst는 I/O burst 이후에 따라오는 것이다.(데이터를 disk나 memory에서 받고 계산을 하는 것이기 때문이다.)
- 따라서, **CPU burst 분배가 주요 문제이다.**

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-03-31 오전 8.36.48.png" style="zoom:50%;" />

- CPU burst는 8ms가 넘지 않으므로 Scheduler가 취할 수 있는 최대의 전략은 8ms을 각각의 process나  thread에게 할당하는 것이다. 

### CPU Scheduler

Short-term Scheduler : ready queue에 있는 process를 선택해서 CPU에 그들 중 하나를 할당한다.

- ready queue는 다양한 방식으로 정렬될 수 있다.

CPU scheduling 결정은 process가 아래와 같은 상황일 때 발생할 수 있다.

1. running state에서 waiting state으로 switch가 발생 
   - -> **(OS가 강제적으로 CPU 반납하라고 강요)**, preemptive(선점)

2. running state에서 ready state으로  switch가 발생
   - -> **( 자발적으로 CPU반납, OS가 강요하지 않음)**, nonpreemptive(비선점)

3. waiting state에서 ready state로
   - ​	-> **(자발적으로 CPU반납, OS가 강요하지 않음)**, nonpreemptive

4. Terminates
   - -> **(OS가 강제적으로 CPU 반납하라고 강요)**, preemptive

preemptive : 1, 4번 경우

nonpreemptive : 2, 3번 경우

- 공유 데이터 접근에 신경쓴다.
- 결정적인 OS 활동 중 발생한 Interrupts를 신경쓴다.

### Dispatcher

Short-term scheduler에 의해 선택된 **process**에게 **CPU control권을 주는 Module**이다. 따라서 short-term scheduler이 실행된 이후 바로 다음에 실행이 된다. 

- Scheduler은 다음에 실행 될 process를 선택하기만 하고
- **Dispatcher은 다음 process로 바꿀 실제적인 과정을 하는 것.**

그래서, 아래와 같은 과정을 통해 process를 바꾸는 실제적인 과정을 한다. 

- Switching Context : current process's context -> next process's context
- Switching to user mode
  - short-term scheduler : kernel mode에서 실행된다. 
  - 이 다음에 실행되는 Dispatcher가 현재 process를 kernel mode에서 실행하고 있으므로 current process의 context를 다른 process(scheduler에 의해 선택된)의 context로 바꾸고 난 뒤에 user mode로 바꿔야 한다. 
- 그 다음에,  process의 PC가 바꾼 process의 program counter로 바뀐다. 

Dispatch latency : 위와 같은 과정을 보면 한 프로세스에서 다른 프로세스로 가능 실제적인 기능을 담고 있기 때문에 **딜레이**가 발생한다. 

### Scheduling Criteria

Scheduling algorithm을 배울 것이다. 각 algorithm은 목표가 있으므로 잘 봐보자. 이것들은 각 scheduler의 목표에 의해 분류가 크게 두 개로 되는데. 각 Criteria는 독립적으로 작용한다. 

- Maximize for Optimization
  - CPU Utilization : CPU 사용을 거의 100프로로 하고 싶다.
  - Throughput : 시간 단위로 process를 완료한 갯수를 의미한다. 
- Minimize for Optimization
  - Turnaround time : 특정 Process를 실행시키는데 필요한 시간의 양을 의미한다. 
    - Process의 시작과 완료까지 걸리는 시간을 의미한다. 
  - Waiting time : ready queue에서 대기하는데 걸리는 시간을 의미한다. 
  - Response time : 시작과 first response가 생성될때 까지 걸리는 시간을 의미한다.
    - first response가 output을 의미하는 것이 아니다. 
    - display에 2d 이미지를 한다고 하자. response time은 2d이미지가 생성되는 것을 의미하자 display까지 bus를 타고 우리 인간의 눈으로 보일 때 까지 output이 아니다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.08.57.png)

#### Waiting Time Optimization

##### First come, First served(FCFS) Scheduling 

그냥 FIFO이라고 생각하자. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.18.10.png)

- 3개의 process가 있다고 생각하자. 이 process가 p1 p2 p3 순서대로 온다고 하자.
- Burst Time : CPU burst time
- 이 p1 p2 p3가 동시에 위와 같은 순서대로 온다면, 위와 같은 차트를 그릴 줄 알아야 한다.
  - Gantt Chart를 그리는 법을 알아둬야 한다. 
- P1 Waiting time : 0
- P2 Waiting time : 24
- P3 Waiting time : 27

평균 waiting time = (0+24+27) / 3 = 17

**기존 FCFS방식의 해결책 : 다음과 같이 순서를 바꾸면 어떻게 될까?**

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.21.56.png)

- P2 P3 P1
- P2 Waiting time : 0
- P3 Waiting time : 3
- P1 Waiting time : 6

평균 Waiting time : (0+3+6) / 3 = 3

이전 상황보다 훨신 나아진 대기시간을 볼 수 있다. 이것을 Convoy Effect라고 한다.

- Convoy Effect : Short process 뒤에 Long process를 배치하면 전체 시스템의 속도를 높여줄 수 있다. 



##### Shortest job first (SJF)

기존 FCFS방식의 단점을 보완해 앞으로 CPU burst time 이 작은 job을 앞으로 보낸 방법을 의미한다. Convoy effect를 고려하면 가장 짧은 작업을 앞에, 긴 작업을 뒤에 둬서 전체 waiting time을 줄였다. 

이것을 job으로 고려하면 가장 짧은 CPU burst를 가진 것을 앞으로 보내면 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.39.19.png)

- 평균 Waiting time : (0 + 3 + 9 + 16)/4 = 7

가장 작은 burst time을 가진 process를 앞으로 보내면 waitiing time이 줄어든다. 하지만, 우리는 **Process의 정확한 CPU burst time을 모른다.**

- 이 문제를 해결하기 위해 process에게 물어볼 수 있다. 
  - 각 Process에게  next CPU burst time을 저장하게 할 수 있다. 
  - 하지만, 모든 proecss가 그 CPU burst time을 보장할지는 모른다. 



###### 다음 CPU Burst의 길이를 결정하는 방법

- CPU burst의 예측으로 인해서 Short term scheduler에서 SJF를 완벽하게 구현할 수는 없다.
- 그래서 과거 데이터에 기초해서 CPU burst를 예측해야 한다. 
  - 따라서, 과거의 CPU burst time이랑 다음의 CPU burst time을 예측해서 각각의 process에서 CPU burst time history를 보고 예측을 해야한다. 
- 이전의  CPU burst length를 이용해서, Exponential Averaging을 사용하면 해결이 가능하다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.48.32.png)

- a : 보통 0.5로 세팅된다. 

**Preemptive SJF는 shortest remaining time first**

- Preemptive : 다른 Process가 현재 process를 멈추고 CPU를 점유하는 것을 의미한다. 
- Scheduling algorithm이 Preemptive하다면, 무슨 event triger가 발생하면 scheduler가 다른 우선순위가 높은 작업을 먼저 한다. 

###### 다음 CPU burst 길이를 예측하는 방법

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 7.56.45.png)

- 과거 예측값 * (1-a) + 실제 측정값 * a

###### Exponential Averaging의 예시

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 8.00.23.png)

- a = 0
  - 실제 history를 고려하지 않음

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 8.00.28.png)

- a = 1
  - 실제 history만 고려한다. 
- 이것을 공식으로 확장하면 다음과 같이 된다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 8.02.59.png)

##### Shortest-remaining time first

**Preemptive SJF는 shortest remaining time first** 기억해두고 아래와 같은 매커니즘을 이해하자. 

- Preemptive : 다른 Process가 현재 process를 멈추고 CPU를 점유하는 것을 의미한다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 8.06.08.png)

- p1 p2 p3 p4 : 도착 시간이 다 다르다. 그리고 다음 CPU burst time의 예측값이 있다. 

1. 아주 처음에는 p1 밖에 없으니까 p1 실행.
2. 1ms 뒤에는 p2가 도착하게 되는데,
   - P1의 남은 시간 > **P2의 남은시간**
   - 따라서 P2가 도착하자마자 P2를 실행시킨다.
3. P2를 다 끝냈을 때는 P2 시작부터 4ms가 지난 뒤, 따라서 남은 P3 P4도 도착한다.
   - P1 7ms, P3 9ms, P4 5ms
   - 가장 남은시간이 적은 P4를 실행시킨다.
4. P4를 다 끝냈을 때는
   - P1 7ms, P3 9ms
   - 가장 남은시간이 적은 P1을 실행시킨다.
5. 그 다음에는 P3 실행시킨다.

남은 Average Waiting Time 은 다음과 같다. 

- P1 : 중간에 실행되다가 끊겼으므로 (실행시점 - 끊긴시점)
- P2, P3, P4 : 도착하자마자 실행 or 도착하자마자 기다림 (실행시점 - 도착시점)
- P1 = 10 - 1, P2 = 1 - 1, P3 =17 -2. P4 = 5 - 3 
- 평균 Waiting time : ( 9 + 0 + 15 + 2 ) / 4 = 6.5



##### Priority Scheduling

- 각 process마다 Priority number (Integer)가 할당되어 있다. Priority가 높다 = Interger 값이 작음
- CPU는 이것에 따라서 Priority가 높은 Process를 할당하며, 아래와 같이 구현될 수 있다.
  - Preemptive : 강제적으로 OS가  CPU를 다른 Process에 할당
  - Nonpreemptive : 자발적으로 Process가 CPU를 다른  Process에 넘긴다. 
- SJF는 priority가 다음 예측된 CPU burst time을 거꾸로 돌린 것이다. 
- 문제 : 낮은 priority를 가진 process는 절대 실행되지 않는다.
- 해결 : 시간이 지남에 따라 priority를 높여준다.

###### Non preemptive Priotiry Scheduling

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오전 8.24.52.png)

- Non preemptive 이유로 중간에 Process가 끊어지지 않는 것을 볼 수 있다. 
- Priority가 Burst time을 기반으로 실행한 것이 아니라
  - 따라서 waiting time이 최적화 되었다고 보장할 수는 없다.
  - 아마 다른 기준을 가졌을 것이다. 

##### Round Robin

기존 알고리즘과 달리, Round Robin Algorithm은 다음과 같다.

- Ready queue에 있는 Proecss가 CPU time의 작은 단위를 받고 **주어진 시간동안** 실행되게 한다.(**Time quantum** or Time Slice q) 보통 10-100ms 로 받는다.
  - **time quantum 보다 빨리 끝내면 Process가 CPU를 다음 process에게 그냥 넘긴다.**
- 이 Time slice 혹은 time quantum이 지나면, process가 다른 process에 의해서 preempted 되고 ready queue마지막에 추가가 된다.(즉, 다른 process가 강제적으로 process를 실행시키는 것인가?)
  - 그래서 이것을 통해 모든 Process에게 실행할 때 같은 chance를 주는 것과 같다. 
- n process가 ready queue에 있고, Time quantum이 q이다.
  - **각 process**는 CPU time의 1/n을 한번에 **최대 q 크기의 time unit**을 받는다.
  - 어떤 프로세스도 (n-1)q time unit만큼 쉴 수는 없다. 
- **매 quantum마다 다음 process를 schedule하기 위해 TImer interrupts가 발생한다.** 
- Performance
  - q가 크면 -> FIFO처럼 작동한다. process에 주어진 time quantum이 크기 때문에 들어온 순서대로 실행되고 모든  process가  time quantum이내의 실행을 완료하기 때문이다. 
  - q가 작으면 -> RR algorithm은 Context switch만 하려고 할 것이고, process를 할 수가 없다. q가 context switching time보다 작기 때문이다. context switching만 할 것이다. 
    - 어떤 작업을 하기 어려울 것이다.
    - A -(context switching 1ms)-> B, time quantum = 1ms
      - 이런 상황이 된다면 context switching된다면 time quantum이 이미 만료되므로 다른 context switching으로 나아갈 것이다. 따라서 이런 문제가 있다. 

**따라서, q는 context Switch 보다는 커야한다.** 

###### RR with Time Quantum = 4

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 1.27.14.png)

- 각 Process마다 주어진 Time Quantum은 **4ms**이다. 
- P1은 처음에 4ms 실행되고, time quantum이 소진되서 다음 process로 넘긴다. 
- P2는 3ms 실행되고, Time quantum 이내에 실행이 끝나서 다음 process P3로 CPU를 넘긴다. P3도 빨리 끝나서 P1에게 CPU를 넘긴다. 
- Time quantum에 따라서 P1이 4ms마다 CPU Control을 Scheduler에게 넘긴다. 
  - 비록, 같은 작업을 함에도 불구하고 time slice에 따라서 넘긴다. 

**Turnaround Time에서 효율적이지는 않지만, Response Time은 더 작다.**

Context Time < 10usec , q 는 보통 10ms 에서 100ms사이.

###### Time quantum and Context Switch Time

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 1.36.12.png)

- Process time이 10이고, 아래 quantum이 다음과 같은 수라고 하자. 그러면 위의 그림에서 쉽게 유추가 가능하다. 
- 12 : 0 -> context switch가 필요 없다.
- 6 : 1 -> context switch가 1번 발생한다.
- 1 : 9 -> context switch가 9번 발생한다. 

이제, performance를 판단하는 기준 중 하나인 Turnaround Time 을 분석해보자.

###### Turnaround Time Varies with the Time Quantum

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 1.44.22.png)

- 왼쪽 그림 : Time quantum의 크기에 따른 평균 turnaround time을 나타낸 그림이다. 
  - Time quantum이 너무 작으면 : 평균 turnaround time 좀 높다.
  - Time quantum이 어느정도 증가 : 평균 turnaround time 낮아진다.
    - 적당히 맞추면 평균 turnaround time이 낮아짐을 알자. 
- 오른쪽 그림 : turnaround time을 계산하는 방법
  - 완료시간의 합을 구하면 (15 + 9 + 3 + 17)/4 = 11
  - 평균 11ms이다.
- Turnaround time을 줄이려면, Time quantum의 크기를 CPU burst time보다 크게 키워야 한다. 
  - 보통 Time quantum의 크기를 키우면 average turnaround time이 줄어들지만, **항상 보장된건 아니다.** 

**Time quantum을 CPU burst time의 80%로 설정하는 것이 이상적이다.** 

그래서 일반적으로, 만약 대부분의 process들이 single time quantum안에 process를 끝내면 average turnaround time이 나아질 수 있다. 보장된건 아니다. 

##### Scheduling algorithms 정리

- First come First Served(FCFS)
  - scheduling criteria 관점에서 이득이 전혀 없다.
- Shortest Job First (SJF)
  - 이상적인 방법이라 구현이 불가능하다.
  - **최적화된 average waiting time**
- Shortest Remaining job First(SRJF)
  - SJF의 근사
- Priority Scheduling 
  - Priority의 정의에 따라 최적의 criteria가 달라진다.
- Round Robin
  -  평균 response time이 최적화된다.



#### Multilevel Queue

Scheduling algorithm을 정리하여 보았는데, 효율에 관해서는 의견이 나뉘므로 보통 system의 퍼포먼스를 최적화하기 위해 알고리즘을 **섞어서 쓴다.** 

섞어서 쓰는 방법 중 하나로 ready queue를 나누는 것이다. 예를 들어

- **foreground** : interactive, faster responsiveness가 요구되는 process들이 **interactive queue**에 위치한다. 
- **background** : 그렇게 user의 input에 급하게 처리해야 할 것이 아니면 **batch queue**에 위치한다. 

한 process가 어떤 queue에 할당이 되면, 그 process는 다른 queue에 할당하지 않는다. 

- foreground : better response를 위해 RR을 사용한다. 
- background : faster response가 필요하지 않다. 
  - 이 경우에는 background process가 작동하는 지 알 필요도 없고 batch queue에 집중할 필요도 없다. 따라서 이 경우에는 Scheduler가 CPU를 사용할 이유도 없다.

Multilevel queue는 다음과 같은 특징이 있다.

- **Fixed priority scheduling** : background service를 돌릴 때, 그 전에 foreground에 있는 것 부터 먼저 돌린다. 
  - foreground queue에 있는 multiple process실행하면, background process는 실행되지 않는다.
  - 따라서 starvation할 가능성이 있다. 
- **Time slice** 
  -  starvation을 해결하기 위해 
  - **RR**는 좋은 response를 위해 쓰기도 하며,
  - starvation을 해결하기 위해 **각 queue에 time slice를 준다.** 
    - 80% foreground 
    - 20% background

##### Multilevel Queue Scheduling Example

 아까 위의 예시보다 좀 더 multilevel queue를 보여줬다. 

​	<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 5.59.59.png" style="zoom:50%;" />

- process를 2개보다 많이 분류했다. 
- system processes : 우선순위가 높은 process이다. 
- interactive : GUI, 키보드 마우스 그런 I/O에 반응한다. 
- interactive editing processes : word processor -> user의 typing을 받는다.
- batch processes : user의 input이 필요 없다.
- student processes : 나도 잘 모르겠다...

#### Multilevel Feedback Queue

multilevel queue와 비교해서 multilevel feedback queue는 다음과 같은 특징을 가지고 있다.

- process가 queue사이로 이동할 수 있다.
  - Multilevel queue : process가 queue사이로 이동할 수 없다.
    - **process에서 user response가 필요없어질 수도 있으므로 background queue로 이동할 수 있으면 좋겠다.** -> multilevel feedback queue가 생김
  - Multilevel Feedback queue : 각 process가 aging한다. 이 말이 무엇이냐면 이것을 오래 실행시키면 priority를 낮춘다. ->  이렇게 priority를 낮춘다.

Multilevel feedback queue scheduler는 아래와 같은 매개변수로 정의된다.

- queue의 개수
- 각 queue의 scheduling algorithm
- **upgrade할 process를 정의할 방법**
- **demote(강등)할 process를 정의할 방법**
- process가 서비스가 필요할 때 **process가 들어갈 queue를 정하는 방법**

기본적으로, **lower priority queue에 있는 process**는 **high priority queue에 있는 process를 돌리는 동안에 실행을 못한다.** 

##### Example of Multilevel Feedback Queue

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 6.18.30.png)

- Q0 : RR로 구현되고, time quantum이 8ms인 queue	High priority
- Q1 : RR로 구현되고, time quantum이 16ms인 queue
- Q2 : FCFS              Less Priority

새로운 job이 Q0로 들어갔다고 하자. 

- CPU 사용권을 얻으면,  8ms을 받는다. 
  - 8ms안에 못 끝내면 Q1에 넣는다.
  - 8ms안에 끝내면 finish해준다.
- Q1에서 꺼내서 Cpu 사용권을 얻으면, 16ms를 받는다.
  - 16ms안에 못 끝내면 Q2에 넣는다.
  - 16ms안에 끝내면 finish 해준다. 

### Thread Scheduling 

kernel level thread : OS에 의해 Schedule 된다.

user level thread : Thread library에 의해서 schedule된다. 그들 중 하나가 실행되기로 결정되면

- user level thread와 kernel level thread가 mapping되거나
- user level thread와 kernel level thread가 LWP로 간접적으로 mapping된다. 

one-one model : LWP가 필요 없다. 

#### Process-contention scope(PCS) 

- many-to-one model, many-to-many model에서 쓰이는 thread scheduler

LWP를 쓰면서 User-level thread가 schedule 된다. -> 같은 process thread가 서로 compete한다. 

보통 programmer가 priority를 설정한다. 

#### System-contention scope(SCS)

- One-to-One model에서 쓰이는 thread scheduler

Kernel thread가 physical CPU에서 OS에 의해서 schedule된다. 

system의 모든 thread(user and system)와 compete해야한다. 

#### Pthread Scheduling

API가 thread creation에서 PCS인지 SCS인지 아래와 같은 flag를 통해 구별이 가능하게 해준다.

- PTHREAD_SCOPE_PROCESS : PSC 사용
- PTHERA_SCOPE_SYSTEM : SCS 사용

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 6.47.21.png)

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 6.47.27.png)



### Multiple Processor Scheduling

Multiple processor의 scheduling이다. 여기서 multiple processor scheduling의 상세한 구현은 설명 안하겠다. 

지금까지, Single CPU를 고려한 아키텍쳐를 봐왔다. 그래서 process들이 다른 process들과 compete해서 CPU를 점유해왔다. 하지만 Multiple processor (CPU)이라면, Multiple process들을 어떻게 분배할 것인가?

Multiprocessor 안에 **Homogeneous processors** (서로 같은 스펙의 processor)이 있다고 가정하자. 

- Asymmetric multiprocessing 
  -  Master CPU가 **system data structure에 접근**하고, 데이터 공유의 필요성을 완화시키며, 다른 CPU에서 work를 분배한다. 
- Symmetric mulitprocessing (**SMP**)(이것이 가장 일반적인 방법이다. )
  - **각 processor가 각자의 scheduler을 가지고 있어서 processes들이 동일한 ready queue에 있거나** 
    - ​			**or**
  - **processor들이 자기만의 개인적인 ready processes들의 queue가 있다.** 
- Processor affinity
  - 현재 실행중인 processor에 좀 더 가깝거나 선호도를 보이는 process
  - 즉, process나 thread를 지정된 CPU에서만 실행하게 설정하는 것
    - Soft affinity : 특정 process가 특정 CPU와 가까운 관계가 있을 때를 말하며, Scheduler가 process를 그  CPU에 할당하려고 하는 것을 의미한다. 
      - **만약, process를 할당이 불가능하면(processes가 꽉차서), 다른 processor로 할당하려고 할 것이다.** 
    - Hard affinity : memory가 local computer의 CPU와 가까이 있지 remote computer의 CPU와 가까이 있진 않다. 따라서 hard affinity이다. 
      - current time stamp가 안맞아도 가까운 CPU에 할당하려는 것이다. 
    - Variations including processor sets :  나중 슬라이드에서 알아볼 것이다. 

#### NUMA and CPU Scheduling

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 8.36.33.png)

Non uniform multiprocessor architecture을 가지고 있다고 가정하자. 

- Hard Affinity : memory가 local computer의 CPU와 가까이 있지 remote computer의 CPU와 가까이 있진 않다. 따라서 hard affinity이다. 

#### Multiple-Processor Scheduling : Load Balancing

SMP모델로 실행시킨다면, 모든 CPU들이 효율을 위해서 load해야 한다. 

- Load Balancing : 다른 Core들 사이에서 CPU load 를 가능한 같도록 하는 것이다.  OS가 하는 행동이 2개가 있다. 
  - Push migration : 주기적으로 OS가 하나의 CPU가 overloaded가 되었는지 확인하고 Overloaded되었다면, 그 CPU에서 몇몇 task를 거기서 다른 CPU로 할당한다. 
    - SMP이기 때문에 가능하다. 
  - Pull migration : 하나의 Processor가 idle상태라면 다른 processor들에게 현재 하고있는 job을 idle 상태의 process에 넣어달라고 요청을 한다. 

### Multicore Processors 

**Multicore Processors**은 Multiple processors보다 흔하면서 **좀 더 빠르고 전력 소비량이 적다.** 

- Multicore이 redundant한 부분을 줄이고 cache memory를 공유하면서 계산을 하려고 한다. -> 이것 때문에 전력 소비량이 적고, shared memory로 동시에 접근하면서 job을  concurrently하게 처리한다. 

#### Multithreaded Multicore System

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 9.04.10.png)

- Single Process가 CPU burst job과 I/O burst job을 실행한다고 하자.
- 같은 방식으로
- CPU burst job이어도 2가지의 cycle로 구성된다.
  - computer cycle : 내부 floating point number 사용, interger 계산
  - memory stall cycle : memory안의 data요청, current registered data를 target memory에 저장하도록 요청

 ### Virtualization and Scheduling

Window VM에서 리눅스를 깐다.

- Ubuntu : scheduler가진다.
- window : scheduler가진다.
  - 여기서 window scheduler가  Linux scheduler의 결과를 다룰 것이다. 

1. Window에서 Multiple virtual machine을 사용하여 Multiple OS을 돌린다고 해보자.  (4개의 OS를 올렸다고 가정해보자.)
2. 4개의 다른 OS의 Process가 Window OS에 의해 schedule된다고 하면 문제가 생길 것이다. 
3. 하지만, CPU관점으로 PC에 위치한 instruction을 실행할 뿐이다. 

Virtualization software은 CPU에서 multiple guest를 schedule한다. 

각각의 guest는 자신만의 scheduling을 가지고 있지만.

- CPU를 가진지는 모른다. -> **kernel thread를 실행시키고 있는지 알지만, 실제로는 는  user mode thread를 실행시키는 것이다.** 
  - 이것 때문에 response time이 매우 안좋다. 
    - VM OS에서 RR 설계, 기존 machine에서 FCFS 설계
      - VM OS는 RR로 돌아가는지 알지만, 사실은  FCFS로 scheduling되는 것이다. -> 의미가 없다. 
  - guests에게 time delay가 있을 수 있다. 
- 따라서 guest가 좋은 scheduling algorithm을 하는 것을 취소할 수 있다. 
  - 이것을 극복하기 위해,  VMM(Virtual Machine Manager)에는 VMM 시스템 관리자가 게스트에 설치하는 각 운영 체제 유형에 사용할 수있는 응용 프로그램이 있습니다. 따라서 이 VMM이 다른 Virtualized machin에 CPU를 분배한다. 



### CPU Scheduling for Real-Time Systems

지금까지  Interactive processes를 다루기 위한 알고리즘들을 배워왔다. 우리는 real-time system에서 constraint를 더 가져가야 한다.

- **Soft real-time systems** : window, linux
  - 중요한 real-time process가 언제 schedule될지 보장을 못한다.
  - process 중 하나가 5ms안에 response해야한다고 하자. soft real time system이 요구사항을 필요로 할 것이다. 
  - **Deadline이 필수적인 목표가 아니다.**
- **Hard real-time systems**
  - **Deadline을 꼭 지켜야 한다.** 

이제 퍼포먼스에 영향을 주는 **2가지 Latency**를 알아보자.

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 10.22.00.png" style="zoom:50%;" />

- Interrupt Latency 
  - Interrupt의 도착 ~ Interrupt Service Routine의 시작 까지의 시간

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-05 오후 10.26.10.png)

- **Dispatch Latency** 
  - 현재 Process를 CPU를 떼고 다른 process로 switch하는데 걸리는 시간.
  - 이것을 줄이기 위해서는  preemptive kernel을 제공하는 것이다. 
    - **Dispatch**는 줄일 수 없다. -> 실제 바꾸는 시간이므로
    - @@@@@@@@@@22잘 이해가 안된다.########@@@@@@@
    - **Conflict**를 줄이는 것이 Dispatch Latency를 줄이는 것이다. 
      - kernel mode에서 실행되어도 OS의 kernel이 running process를 preempted 할 것이다.
      - High priority process가 필요한 low-priority processs의 resource를 풀어준다. 

### Priority based Scheduling

Hard Real-time Scheduling은 반드시 Preemptive, priority based scheduling을 지원한다. (Kernel mode running process를 중단시킬 수 있고, priority에 따라서 deadline을 설정할 수 있다.) -> 따라서 soft real time만 보장한다. 

Hard real time에선, OS는 반드시 deadline을 만족하는 능력을 제공해야 한다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-06 오전 6.15.42.png)

주기적인 Process는 일정 간격마다 CPU가 필요하다.

- Processing time : t, deadline : d, period : p
- 0 <= t <= d <= p
- Periodic task의 Rate : 1/p



#### Rate Monotonic Scheduling

이름은 이래도 사실상 Priority based scheduling이다. Priority는 period의 역수로 할당되어 있다.

- Short period : 높은 priority
- Long period : 낮은 priority

이를 가지고 다음 예시를 보자

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-06 오전 6.23.01.png)

- P1 : period =50, process time = 20
- P2 : period =100, process time = 35
- **이 경우는  deadline과 period가 같은 상황.**
- CPU utilization = (20/50) + (35/100) = 0.75 

1. CPU사용을 비교하면, 다룰 수 있다는 것을 알 수 있다. 
2. 도식을 그려서 봐도 만족한다.

#### Missed Deadlines with Rate-Monotonic Scheduling

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-06 오전 6.27.18.png)

- P1 : period =50, process time = 25
- P2 : period =80, process time = 35
- CPU Utilization = (25/50) + (35/80) = 0.94

1. CPU 사용률을 보면 만족한다.
2. **하지만, system이 충분한  CPU 사용이 가능해도 도식에서 P2가 Deadline을 만족 못한다.** 

해결방법 : Earliest deadline First Scheduling



#### 해결방법 : Earliest Deadline First Scheduling (EDF)

**Priority가 deadline에 따라 할당된다.** -> 즉, Dynamic Priority

- Deadline이 빠를수록 : Priority를 높인다. 
- Deadline이 늦을수록 : Priority를 낮춘다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 4.26.44.png)

- 이전 예시와 같은 조건인데, Priority를 바꿈
- 첫번째 : P1이 Deadline이 더 빠르다. -> P1 실행
- 25ms 뒤 : P2만이 ready queue에 남아서 P1이 올때까지 실행시킨다.
- 50ms 뒤 : P1이 왔을 때, P2의  deadline이 더 이르므로 P2를 실행시킨다. 
  - P1의 deadline : 50ms -> 막 들어왔으므로
  - P2의 deadline : 30ms ->현재 시간에서 period까지 30ms 남았으므로
- 80ms 뒤 : P2가 왔을 때 P1의 deadline이 더 이르므로 P1 실행.
  - P1의 deadline : 현재시간 80ms, 주기까지 20ms 남았으므로 20ms
  - P2의 deadline : 현재시간 80, 다음 주기까지 80ms 남음
- P1 끝나고 P2 실행.
- 100ms 뒤 : P1의 주가기 돌아옴
  - P1의  deadline : 현재시간 100ms, 다음 주기까지 50ms 남음
  - P2의 deadline : 현재시간 100ms, 다음 주기까지 60ms 남음
  - 따라서 P1 실행시킴
- P1이 끝나고 P2 실행.

### Proportional Share Scheduling

**T shares를 모든 application에 할당함으로서 작동한다.** application이  N shares의 시간을 받으면 총 processor time의 N/T를 받게 되는 것이다.

1. Application 은 N<T인 N shares를 받게 된다.
2. total processor time의 N/T만큼 받게 될 것을 보장한다. 

Real time operating system scheduling의 방법 중 하나이다. priority에 기반하지 않는다.

- T = 100 shares : 모든  application에 할당한 shares
- A = 50 shares, B = 15shares, C = 20 shared : 각 process에 할당한 shares
  - A는 total processor time의 50/100을 받음.

### POSIX Real Time Scheduling

POSIX 방식에서는 2가지 Scheduling class만 정의한다. 

- SCHED_FIFO : FIFO queue를 이용해서 FCFS Scheduling 방식으로 thread가 scheduling된다.   따라서 같은  priority의 thread 사이에서 time sllicing이 없다.
- SCHED_RR : 

Real time system으로 사용하려면 system scope에서 thread를 생성해야 한다. (pthread_scope_system) Process schedulering class가 real time class로부터 온다. 

<img src="/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 4.58.38.png" style="zoom:50%;" />

- 추가된 것에서 schedule policy만 받아오는 것이 다른 점이다. 
- print해서 답을 줄 것이다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 5.01.26.png)



### Algorithm Evaluation

지금까지 scheduling algorithm을 보아왔는데, 특정 시스템에 CPU scheduling algorithm을 어떻게 선택할까? 문제는 algorithm을 선택할 때 쓰이는 criteria를 정하는 것이다. 그 기준에는 아래와 같은 것들이 있다.

- CPU utilization, response time, throughput

위와 같은 요소들을 정하고, algorithm을 평가한다.

미리 정해진 작업량을 받고 각 algorithm의 performance를 그 작업량에 대해 정의한다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 5.43.32.png)

이런 정보를 받고, 위의 criteria를 평가하는 것이다. 

#### Deterministic modeling

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 5.45.51.png)

기존에 해왔던 것처럼 process의 CPU burst 정보를 받고 average waiting time을 계산하는 것이다.  

- FCFS
- non-preemptive SJF
- RR

그래서, 이미 정해진 작업량과 algorithm을 알고 있으면 gantt chart를 그리고 criteria를 평가하고 어떤 algorithm을 쓸 것인지 결정하면 된다.

- average waiting time이 가장 작은 non-preemptive SJF 쓰면 된다. 

#### Queueing Models

위의 방식은 미리 정해진 작업량을 알고 있을때만 가능한 것이다. 그래서 일반성도 떨어진다. 그래서 workload(작업량)을 일반화 하는 모델 중 하나는 Queueing Model이다. 

- **Process의 도착**과  **CPU와 I/IO burst의 비율**을 통계적으로 설명하고 각 알고리즘의 performance를 계산한다. 
  - 분석 : 보통의 분포는 exponatial하며, 측정값을 통해 설명된다. 
  - 계산 : average throughput, utilization, waiting time을 계산한다. 

이것을 컴퓨터 시스템에서 **네트워크에 대입시켜서 해보면 아래와 같이 된다.**

- arrival rate와 service rate를 아는 것이다.
- utilization, average queue length, average wait time을 계산한다. 

##### Little's Fomula

컴퓨터 분야에서만 한정되지 않고 이와 같은 관계를 공식화하기 위해 Little's Formula를 사용한다.

(슈퍼마켓의 대기 줄, ..)

n = average queue length

W = average waiting time in queue

λ = average arrival rate into queue

Little's Law는 steady state가 아니면 공식화되지 않는다. 즉, 나가는 queue의 갯수와 들어오는  queue의 개수가 들어와야 steady state이다. 

n = λ x W 

- For example, if on average 7 processes arrive per second, and normally 14 processes in queue, then average waiting time per process = 2 seconds\

평균 queue의 길이 = 14, 평균 도착 rate = 7 => 평균 대기시간 = 2

#### Simulations

Queueing model은 매우 제한적이다. 성능은 좋지만 예외의 상황이 발생하면 성능이 떨어진다. 

그래서, Simulate 해본다.  

- Computer system을 모델링한다.
- 다양한 clock
- algorithm performance를 가리키는 통계를 모은다. 
- 아래와 같은 시뮬레이션을 위해 수집된 데이터
  - 확률에 의해 생성된 random number
  - 수학적 분호
  - trace tape라는 real system의 log 데이터를 사용한다. 요새는 우리 **log file**을 본다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 6.14.50.png)

- 따라서, 위와 같이 실제 system의 log data를 가지고 실제 simulation에 적용해서 각 algorithm의 performance를 분석할 수 있다. 

#### Implementation

하지만, 이런 simulation이 몇몇 경우에 제한될 수 있으므로 algorithm을 테스트 하는 것은 실제 system에서 구현해서 확인하는 것이다. 

- 비용이 많이 들고, system을 망가뜨릴 수 있다.
- 하지만 실제 구현으로 하기 때문에 예상하지 못한 case를 확인할 수 있기 때문이다. 



-Reference-

Abraham Silberschatz, Peter B. Galvin, Greg Gagne의 『Operating System Concept 9th』