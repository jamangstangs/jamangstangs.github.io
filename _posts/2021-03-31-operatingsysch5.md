---
title: Operating System Chapter 5

toc: true

use_math: true

categories:

 - Operating system

---



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
   - -> **(Voluntary Release : 자발적으로 CPU반납, OS가 강요하지 않음)**, preemptive(선점)

2. running state에서 ready state으로  switch가 발생
   - -> **(OS가 강제적으로 CPU 반납하라고 강요)**, nonpreemptive(비선점)

3. waiting state에서 ready state로
   - ​	-> **(OS가 강제적으로 CPU 반납하라고 강요)**, nonpreemptive

4. Terminates
   - -> **(Voluntary Release : 자발적으로 CPU반납, OS가 강요하지 않음)**, preemptive

nonpreemptive : 1, 4번 경우

preemptive : 2, 3번 경우

- 공유 데이터 접근에 신경쓴다.
- 결정적인 OS 활동 중 발생한 Interrupts를 신경쓴다.







