---
title: Operating System Chapter 7

toc: true

use_math: true

categories:

 - Operating system



---

## Deadlocks



 ### System Model

Deadlock을 이해하기 전에 System model이 무엇인지 알아보고자 한다. 

- System은 resource들로 이루어져있다. 아래와 같이 2가지 타입으로 나눌 수 있다. 
  - Resource : R1 R2,,, Rm
    - CPU cycle, memory space, I/O devices
  - Instances : 각각의 Resource들은 하나 이상의 instances들을 가진다. 

예시를 들어보자. 

- 1개 모니터 -> 1개의 instance
  - monitor가 resource type이지만, 1개의 instance
- 2개 모니터 -> 2개의 instance
  - monitor가 resource type이지만, 2개의 instance
  - Ri with (W1, W2)

또한, 각 process는 resource를 아래와 같은 동작으로 utilize할 수 있다. 

- **request** : 저 resource를 쓰고 싶다. 
- **use** : Process가 resource를 사용한다. 
- **release** : resource를 OS로 반납한다. 



### Deadlock의 특징

그룹의 멤버가 다음 progress를 위해 다른 멤버를 기다리는데, 어떤 progress가 만들어질 수 없는 state를 의미한다. -> **모든 멤버가 waiting하고 있기 때문이다. **

Deadlock은 아래 4가지 조건을 **모두 만족해야 발생한다.**

1. Mutual Exclusion : 한 번에 하나의 process만 resource 사용 가능
2. Hold and wait : 최소 하나의 resource를 잡고 있는 process가 다른 processes들에 의해 hold된 resource를 waiting하고 있다. 
3. No Preemption : Process가 오직 task를 완료한 뒤 **자발적으로 resource를 release가능하다. **
4. Circular wait : P0 -> P1 -> P2 -> .. ->Pn -> P0 이렇게 기다리는 상황을 의미한다. 

**주의할 점** : 이런 4가지 상황이 발생해도 deadlock 발생 가능성이 있다는 거지 반드시 발생하는 것은 아니다. 



### Resource-Allocation Graph

Circular Wait를 확인하기 위해 Resource Allocation Graph를 사용한다. 

Vertex의 종류

- P = {P1, P2, ..., Pn} 	: Processes
- R = {R1, R2, ..., Rm}   : Resources
  - 추가로 각각의 resource에는 여러개의 instance가 있다.

Edge의 종류

- request edge : Pi -> Rj			Process가 Resource를 요청함.
- assignment edge : Rj -> Pi     Resource가 Process에 할당됨.
  - 화살표 방향이 현재 resource의 state를 나타낸다. 

Process P

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 11.37.00.png" style="zoom:50%;" />

Resource Type R, 4개의 instance

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 11.37.02.png" style="zoom:50%;" />

- 큰 상자 : R type의  resource
- 작은 상자들 : resource의 instance

Pi -> Rj : request edge

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 11.37.11.png" style="zoom:50%;" />

- 화살표가 resource로 향한다. 

Rj -> Pi : assignment edge

<img src="/assets/images/post/operating system/스크린샷 2021-05-07 오후 11.37.12.png" style="zoom:50%;" />

- instance로 부터 process로 화살표가 향한다. 









