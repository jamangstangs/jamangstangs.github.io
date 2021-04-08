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

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.25.50.png)

### Race Condition

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.29.17.png)

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/operating system/스크린샷 2021-04-07 오후 8.29.52.png)

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

## Peterson’s Solution

## Synchronization Hardware
## Mutex Locks
## Semaphores

## Classic Problems of Synchronization Monitors

## Synchronization Examples

## Alternative Approaches

