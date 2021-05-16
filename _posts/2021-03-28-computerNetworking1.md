---
title: Computer Networking 1

toc: true

use_math: true

categories:

 - Computer Networking
---

## Introduction

### 인터넷의 구성

#### Host

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.16.56.png" style="zoom:33%;" />

인터넷에는 network의 기기들, 요소들이 많이 붙어있지만, 제일 마지막에 붙어있는 end system, end node들을 **host**라고 부른다.

Host에서 사용자들이 network application을  사용하여 

#### Packet Switches 

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.17.03.png" style="zoom:33%;" />

**host**들이 보낸 **packet**(일단 데이터의 묶음이라고 생각하자.)을 다른 node들로 **전달하는 역할**을 수행하며 종류는 다음과 같다.

- Routers
- Switches

#### Communication Links

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.17.21.png" style="zoom:33%;" />

host와 packet switches를 연결한 선을 의미하여 다양한 종류의 링크가 존재한다. 눈에 보이지 않는 링크가 있을 수 있으며 종류는 다음과 같다.

- fiber(광섬유), copper, radio, satellite
- transmission rate : 

### 인터넷

#### 네트워크

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.17.31.png" style="zoom: 33%;" />

다양한 종류의 기기들이 모여서 **네트워크**라고 부른다. 

- Mobile Network
- Home Network
- Enterprise Network
- Content Provider Network

#### ISP

**Internet Service Provider**의 약어이며, 네트워크들은 ISP에 의해 연결이 된다. ISP의 종류는 다음과 같다.

- local or regional ISP
- national or global ISP

#### 인터넷의 정의 

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.15.06.png" style="zoom: 50%;" />

다양한 network들을 서로 연결된 ISP를 통해 묶은 것을 의미한다. 

#### Protocol

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.32.47.png" style="zoom:50%;" />

Host끼리 data를 주고 받으려면 **약속**이 필요하다. 어떤 형식으로 주고받을지, 어떻게 주고 받을 것인지, 언제 주고 받을 것인지에 대한 약속을 **Protocol**이라고 한다.

- HTTP, Skype, TCP, IP, WiFi, 4G, Ethernet

#### 인터넷을 서비스의 관점에서 보자.

**Infrastructure** : 다양항 Application들이 data를 주고받을 수 있는 **서비스를 제공하는 시스템**으로 볼 수 있다.

**Programming Interface** 을 제공한다 : 데이터를 주고받기 위한 **라이브러리**를 사용하여 쉽게 함수를 호출하여 데이터를 주고받을 수 있다.

한 줄로 요약하면 **인터넷은 data를 서로 교환하는 서비스를 제공하는 인프라다.**

### Protocol

컴퓨터들이 데이터를 주고 받는 것에 대한 규칙을 의미한다.

프로토콜은 구체적으로 메세지의 다음을 정의한다.

- format : 메세지의 특정 바이트에서 특정 바이트는 무슨 내용을 담아야 하는지에 대한 규칙
- order : 그런 바이트의 순서에 대한 규칙
- Actions : 메세지 송수신 과정해서 취해야할 행동.

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 7.47.40.png" style="zoom:50%;" />

데이터를 교환하고 싶은 연결을 서버에 요청해서 서버가 연결을 응답하고, 컴퓨터가 데이터를 요청하면 서버가 그 데이터를 보내준다. 

프로토콜은 두개의 컴퓨터가 주고받는 메세지가 무엇인지 정의하고, 어떻게 반응해야 할 지 정의한 것이다.



## Internet structure

### Network Edge

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.04.09.png" style="zoom:50%;" />

- Host : clients 뿐만 아니라 server까지 의미한다. 

### Access network

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.04.01.png" style="zoom:50%;" />

이런 **host**들과 **network core**를 **연결**해주는 network를 **Access network**라고 한다.

Access network는 wired, wireless communication links를 통해 host와 연결이 되어있어 host가 데이터를 송수신 할 수 있는 서비스를 제공한다.

### Network core 

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.04.37.png" style="zoom:50%;" />

Router : 하나의 host가 data를 보내면 목적지 host까지 data를 전송해주는 역할을한다.

이러한 Router들의 묶음을 **Network Core**라고 한다.

### End system에서 Edge router까지 전송과정

- End systems : host들을 의미한다.
- Edge Router : Network core에서 Access network와 가장 근접한 router를 의미한다.

Host가 정보를 보내려고 하면 Access Network에서 데이터를 받아 edge router로 보내 network core가 목적지 host까지 데이터를 전송한다.



## Access networks

### Access networks: cable-based access, 티비선

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.25.01.png)

집집마다 케이블 티비가 있었을 때, 케이블의 채널을 조정해서 **특정 채널을 Data를 위한 채널**로 바꾼다.

- Splitter : 채널에 따라 나뉜 케이블의 정보를 두 개의 케이블로 나눠준다.
  - 하나는 기존 케이블 티비로 보내는 케이블
  - **다른 하나는 Data 사용을 위한 컴퓨터로 보내는 케이블**

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.28.22.png)

- 모든 가입자들이 공통된 신호를 받게 된다.

이와 같은 케이블 기반 Access network를 **HFC(Hybrid Fiber Coax)**라고 부른다. 또한 데이터의 전송이 Asymmetric한데, 

- downstream : 40Mbps - 1.2Gbps
- upstream : 30-100 Mbps 

와 같이 송수신이 비대칭을 이루므로 asymmetric하다고 한다.

- CMTS(cable modem termination system) : 각 집의 cable modem에서 보낸 데이터를 ISP로 보내는 형식의 access network이다. 

### Access networks: digital subscriber line (DSL), 전화선

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.35.34.png)

케이블 티비와 가장 큰 차이점은 DSLAM까지의 line이 dedicate되어있다.

### Access networks: home networks

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.37.53.png)

### Wireless access networks

 ![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.46.23.png)

### Access networks: enterprise networks

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.46.54.png)

회사나 대학 수준의 규모가 있는 네트워크 사이즈이다.

라우터는 경로를 탐색

스위치는 다양한 디바이스가 연결 되어있을 때 해당 디바이스 까지 어떤 디바이스로 데이터를 보내야할 지 알려주는 역할

### Access networks: data center networks

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.49.11.png)

데이터 교환량이 상상을 초월하기 때문에 특별화된 전용 네트워크를 사용한다.

high-bandwidth links로 연결이 됨.

## Host 가 data packet을 보낼 때

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 8.53.33.png)

호스트에는 어플리케이션 돌아가고, 호스트에 있는 어플리케이션들은 메세지를 만들어서 목적지에 있는 호스트와 메세지를 교환하고 싶다.

이때 메세지를 특정 길이 만큼 잘라서 보내는데, 잘린데이터를 하나로 묶는데, 이 묶음 하나를 packet이라고 한다. 패킷의 길이를 L bits라고 한다. 

R : **transmission rate** 이며, **link에서 전송속도**를 말한다.

L : 패킷의 크기 

**packet transmission delay** : L/R 

## Links

- bit : link에서 데이터를 주고받는 가장 기본적인 단위
- **Physical link** : transmitter/receiver pairs 사이에 있는 물리적인 채널
  - guided media : solid media를 타고 전파됨 -> fiber, copper, coax
  - unguided media : 전 영역으로 전파가 된다. -> radio
- Twisted pair (TP) : physical link 의 대표적인 방식이다. 절연된 copper wire를 꼬아서 데이터를 보내는 방식
  - Category 5: 100 Mbps, 1 Gbps Ethernet
  - Category 6: 10Gbps Ethernet
  - 절연 정도나, 꼬아진 정도에 따라 속도가 달라짐.
- Coaxial Cable : 동축케이블
  - 디바이스들이 공통된 케이블을 사용하기 때문에 하나가 무너지면 다른 모든 시스템도 다운이 된다.
- Fiber optic cable : 광케이블
  - low error rate : 전자기장 간섭에 면역이된다.
- Wireless radio
  - Broadcast : wire로 연결된 기기에게만 전파하는 것이 아니라 **모든 기기가 다 들을 수 있다**. 
  - Half-duplex : 데이터를 보내면서 받기가 불가능한 것. 
  - Full duplex : 도 개발되었다고 한다.
- Radio Link types
  - Wireless LAN : 10m 범위
  - Wide area : 10 km 범위
  - Bluetooth : 단거리
  - Satellite : 딜레이가 있다.



## Network core

많은 router들의 그물망으로 이루어져 있으며, host가 생성한 packet들 목적지 host까지 전달하는 역할을 하는 것이 Network core의 역할이다.

### Network Core의 두 가지 기능

#### Routing

packet의 목적지에 따라 어느 곳으로 가야할지 **결정하는 algorithm이다.**

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 9.39.20.png" style="zoom:50%;" />

- Packet Header에 있는 destination address에 따라 어떤 output link로 보내야할지 결정하는 알고리즘.
- Algorithm의 결과를 **forwarding table에 작성한다.**

#### Forwarding

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 9.39.20.png" style="zoom:50%;" />

- Routing algorithm 결과에 의해 작성된 forwarding table을 참조하여 **물리적으로 packet을 Input port에서 output port로 보내는 역할을 한다.**

### Packet Switching

Network core에서 일어나는 일은 packet switching이다. (위에서 routing과 forwarding으로 packet을 이동시키는 방법인데, 이제 실제적으로 전달하는 과정이 어떻게 되는지 알아볼 것이다.)

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 9.48.53.png)

- 1 hop : 노드에서 다음 노드로 이동하는 단위로 생각하자.
- topology : 컴퓨터 요소들을 물리적으로 연결해 놓은 것을 말한다.
  - 2 hop topology : 3개의 노드들을 물리적으로 연결한 것이므로, 그냥 packet switching을 3개의 노드를 베이스고 보자.

packet switching에서는 기본적으로 **Store and Forward**방식을 따른다.  아래서 부터 packet switching에서 일어나는 현상들을 설명해 보겠다.

#### packet transmission delay 

기본적으로 컴퓨터에서 생성한 packet을 router에게 전송하려면 delay가 생긴다. 이 딜레이를 **packet transmission delay** 라고 부르며, 딜레이를 구하는 방법은 다음과 같다.

- L : packet 하나의 사이즈, bit단위로 나타냄.
- R : link에서 전송 속 (bit/s)
- **Packet transmission delay : L/R**

이때 라우터는 pakcet이 전부 다 도착할때까지 기다리므로 1 hop당 L/R만큼의 packet transmission delay가 발생한다.

#### Store and Forward 

Packet의 첫번재 bit - packet의 마지막 bit -> 이것이 다 받아질때**(Store)** 까지 router는 기다렸다가 그 다음 hop으로 **forwarding**하므로 store and forward 방식을 취한다고 한다.

패킷 하나가 다 수신되어야 그 다음 hop으로 전송하는 packet switching의 특성으로 인해, **Source에서 Destination까지의 hop이 늘어날 때 마다 Delay가 추가된다.** 

- L/R : 1 hop당 딜레이
- N : hop의 개수
- N * L/R : end to end delay

이것을 **end to end delay**라고 한다. 이러한 딜레이는 시간지연에 민감한 데이터를 보낼 때 문제가 될 수 있다. 따라서 Cut Through 방식을 사용하여 해결이 가능하다.

#### Cut Through

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 10.26.47.png)

- 패킷을 Header(destination address를 포함)을 다 받으면, 다 받기 전에 다음 hop으로 forwarding하는 기술이다.
- cut through 방식에서 앞의 시간이 살짝 빈 것은 **Routing algorithm**에 필요한 시간임을 알 수 있다.
- 전체적으로 보면 시간이 많이 줄어든 것을 알 수 있다.

따라서, 시간지연에 민감한 데이터를 주고 받을 때 이 방식을 사용하면 이득을 볼 수 있다.

#### Queueing

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 10.31.31.png)

Topology 분석 : A,B host, router

- A, B - Router : 매우 빠른 Transmission rate가진 link로 연결이 됨.
- Router - Router : host - router 사이의 link의 transmission rate와 비교해서 현저하게 느리다.

이러한 Topology를 **Bottle Neck Topology** 혹은 **Dumbel Topology**라고 한다.

이렇게 불균형한 속도를 이루면, 앞서 들어온 packet들이 router에 쌓이게 된다.

- 들어오는 속도 > 나가는 속도 => Router의 **Buffer**에서 **queueing**이 발생한다.

##### Packet queueing and loss

Bottle neck Topology에서 arrival rate이 엄청 높아져 queue에 즉, buffer에 쌓이게 된다. Buffer는 메모리이고, 메모리는 한계가 있음을 알 수 있다. 

- Queue가 다 차버림 -> **이때 전송되는 Packet은 Drop이 된다.** => 이것이 **Packet Loss**

### Cricuit Switching

Packet Loss가 발생하는 Packet switching에 비교할 방법인 Circuit Switching을 설명하겠다.

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 10.43.07.png" style="zoom:50%;" />

Host간 Communication을 위해 회로를 연결하는 것 과 같이 사전에 **resource를 미리 할당**하는 것이다.

- 장점 : 다른 Host들과 sharing하는 circuit이 없기 때문에 performance가 보장이 된다.
- 단점 : 한 host가 데이터를 보내지 않는다면 리소스를 낭비하는 것이다.

이제 Circuit Switching에서 사용되는 기술들에 대해서 알아보자.

####  FDM and TDM

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.17.19.png" style="zoom:50%;" />

- FDM : Frequency Division Multiplexing
  - frequency band : frequency별로 나누어서 유저에게 할당
  - **frequency를 1/4로 나눠서 사용**
- TDM : Time Division Multiplexing
  - slot : 시간에 따라 slot을 나누고, slot을 각 유저에게 할당한다.
  - **time를 1/4로 나눠서 사용**

이와 같이 한 링크에 user를 **allocate하므로 circuit switching의 특성을 알 수 있다.**

### Packet Switching vs Circuit Switching

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.25.39.png)

- Circuit Switching : 각각의 유저가 100Mb/s를 사용할 수 있어야 하니까 

  - 1GB/s / 100Mb/s = 10 users가 사용할 수 있다.

- Packet Switching : 동시에 10명을 초과하는 사용자가 있으면 사용이 불가능하다. 그렇다면 어떤 시점에 10명의 사람이 초과할 확률이 얼마나 될지 구해보자. (각각의 사람이 10% 시간만 Resource를 사용하기 때문이다.)

  - 35명이 사용할때, 10명 이상의 동시 접속자가 발생할 확률은 다음과 같다.

  ![](/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.32.12.png)

#### Packet Switching이 어떨때 좋을까?

짧은 시간동안만 많은 데이터가 오는 특성을 가질 때 좋다.

- 그 이외의 시간에는 많은 유저가 사용할 수 있기 때문이다.

하지만, bursty하게 data가 오는 상황에서는 congestion이 올 수 있다.

따라서 Circuit switching과 Packet Switching을 섞어 사용하면 성능이 뛰어나진다. 다음에 설명하겠다.

### Interent Structure

기초적인 인터넷 설명 파트에서 봤듯이, Host들은 **Access ISPs**에 의해 즉, Host들이 Internet Core와 연결이 되어야 다른 Host사이에서 통신이 가능해진다. 

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.45.11.png" style="zoom:50%;" />

- **Access ISPs**들은 서로 연결이 되어야 하는데,모든 ISP들을 서로 Mutually Interconnected하게 구현한다면 O(n^2)만큼의 복잡도가 필요하다. (불가능한 scale이다.)

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.45.46.png" style="zoom:50%;" />

- 위와 같이 Global ISP로 쪼개고

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.46.07.png" style="zoom:50%;" />

- IXP(Interner Exchange Point) : Global ISP는 IXP에 의해 연결이 되어있고
- Regional ISP로 나눠 Global ISP로 나눈다.

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.46.10.png" style="zoom:50%;" />

- 구글이나 Microsoft, Akamai : 그들만의 network를 만들어 user에게 서비스를 제공한다.
- 자신만의 content end user와 가까이 제공할 수 있는 network

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오전 11.52.42.png" style="zoom:50%;" />

- 이와 같은 시스템이 인터넷의 모습이다.

### 문제풀이

http://gaia.cs.umass.edu/kurose_ross/interactive/circuit_switching.php

1. 다 더하면 됨.
2. connection이 다 차있어도, 미리 host끼리의 연결을 allocate하는 특성 때문에 추가적인 연결 요청은 받지 않는다.
3. 2개의 hop 사이의 circuit을 할당하고, 여기서 남은 circuit을 다음 2개의 hop을 연결할 때 사용하여 시계방향으로 하나씩 더해나가면 끝
4. 3번의 결과를 이용해 2 hop간 연결할 수 있는 최대의 connection수와 문제에서 제기한 connections의 수를 세어서 비교하면 끝!

http://gaia.cs.umass.edu/kurose_ross/interactive/ps_versus_cs.php

1. Circuit switching user 각각이 bandwidth를 link의 capacity와 나눈다.
2. Packet switching의 유저를 circuit switching 방식으로 할당하려면 총 합의 link capacity가 충분해야한다.
3. Packet switching할 때, **특정 한 명의 유저**가 보내고, 다른 유저는 쉬고 있을때 구하는 식은 다음과 같다.
   - ![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 12.15.09.png)
4. 여기서는 **임의의 한 명의 유저** 따라서 식은 다음과 같다.
   - ![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 12.14.52.png)

5. 하나의 user가 capacity의 얼마를 점유하는지 소수로 나타내기
6. a : 총 사람의 수, b : 선택된 사람의 수, 조합 이용해서 binomial distridution 사용하기
   - (a,b)p^b(1-p)^(a-b)
7. m명 중 n명 이상 보낼 확률
   -  Σ i=n,m choose(m, i) * pi(1-p)^(m- i)

## Performance

###    Packet Switching 방식에서 발생하는 문제

**Packet delay**나 **Packet loss**가 발생할 수 있다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 12.50.00.png)

Packet 이 router의 버퍼에 쌓이고, transmission까지 대기하기 때문이다. 또한 **Packet rate > output link capacity** => Queue의 길이가 증가한다.

- Transmission Delay : 패킷이 다음 라우터로 전송되는데 걸리는 시간 **L/R**
- Queueing Delay : queue에 패킷이 쌓이면, 해당 라우터의 queue에서 패킷이 기다려야 하는 시간
- Loss : router의 buffer는 메모리고 한계가 있으므로 queue에 쌓여있는 packet의 개수가 계속 들어나면 메모리 용량을 초과하고, 초과한 **Packet은 Drop되므로 Loss가 발생한다.**

#### Router나 Switch의 Buffer Size

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.11.14.png)

- 시간에 대해서 queue의 length를 나타낸 그래프
- buffer size : Switch나 router가 가지고 있는 buffer의 최대 용량

1. Arrival packet > output link capacity(Rate) : queue length가 증가한다.
2. **그 이후에 도달하는 패킷들은 모두 Drop된다.**
3. Arrival packet < output link capacity : queue length가 감소한다.
4. **보낼 Packet이 없기 때문에 idle 상태가 된다.**

- Large Buffer size 
  - 그만큼 비싸다
  - Packet loss 비율이 줄어든다.
  - **High Utilization** (buffer사이즈가 커 queue가 자주 빌 일이 없다.)
  - **queueing delay가 길 수 있다.**
- Smal Buffer size 
  - Packet loss 비율이 높다.
  - **queue 딜레이가 적다.**
  - **Low utilization** (buffer사이즈가 작아 queue가 자주 빈다)

### Packet Delay

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.15.33.png)

- d_nodal : Packet을 받게될 때 부터 packet 을 전송할 때 까지 delay
  - d_proc : processing delay
    - 스위치가 패킷을 받았을 때 해야하는 알고리즘에 의해 걸리는 시간.
    - **bit error 체크하는 시간 + output link(routing algorithm) 정하기**
    - 보통 microsecs 시간이 걸림.
  - d_queue : queueing delay
    - router가 가지고 있는 버퍼, 버퍼에 packet이 쌓임, **여기서 packet이 다음 packet이 보내질 때 까지 기다려야하는 delay가 발생한다.**
    - Congestion level : 도착하고 있는 packet의 정도.
      - 이게 높아지면 queueing delay가 늘어난다.
  - **d_trans : transmission delay (라우터 내의 딜레이)**
    - L : packet length
    - R : Link transmission rate
    - **d_trans = L/R** 
  - **d_prop : propagation delay (링크에서 딜레이)**
    - 두개의 라우터 사이의 물리적인 링크 사이에서 걸리는 시간.
    - d : lenght of Physical link
    - s : propagation speed 
    - **d_prop = d/s**

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.25.57.png)

- VF * C : propagation speed를 의미한다. 

#### Host A만 전송

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.27.39.png)

- Host A 
  - 전체 Packet을 전송하는데 걸리는 시간
    - **L/R**
  - S1에 첫 번째 bit가 도착하는데 걸리는 시간
    - d/s	(distance / propagation speed)
    - s = VF*C : 광속에 Velocity factor을 곱하면 physical link의 propagation speed가 나오게 된다.
    - **d/VF*C**
  - Propagation delay + Transmission delay

#### Host A, Host B가 시간차를 두고 전송 

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.31.40.png)

- Host A, B packet수신에 있어서 overlap이 발생하지 않는다.
  - 받은 packet은 바로 보내고싶다.
- Host B의 packet이 수신이 다 되었을 때는 Host A의 Packet의 transmission이 끝났기 때문에 queueing delay가 발생하지 않는다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.34.10.png)

- Host A, B packet수신에 있어서 overlap이 발생한다.
  - Host B의 packet수신이 끝나서 다음 router로 전송하고 싶지만, 아직 Packet A가 transmission중이기 때문에 queueing delay가 발생한다.

#### 주의할 점

모든 패킷이 도착해야 그 다음 router로 전송이 가능하다. 회색으로 뒤집는 것은 모든 패킷이 도착했음을 알 수 있는 의미이다.

### Caravan Analogy

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.40.30.png)

- car : bit
- caravan : packet (즉, 차가 caravan으로 연결이 된다.) => 톨게이트에서는 10개의 모든 차량이 와야 돈을 징수할 수 있다.
- toll booth : linktansmission, 12초 걸림
- propagation speed : 100km/hr

이라고 볼 수 있다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.44.52.png)

@ 2번째 톨게이트에 차가 도착할 때 까지 걸리는 시간.

- 따라서 10개의 차의 transmission delay = 120s
- 10개의 caravan 중 앞 차가 2번재 toll에 도착할 때 까지 걸리는 시간 : 1 hr

@ 차의 속도가 매우 빨라지고 toll booth에서 speed가 느려진다고 생각해보자. 모든 차가 첫번째 부스에서 처리되기 전에 두 번째 toll booth에 차가 도착할 수 있을까?

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 1.53.09.png)

- propagation speed : 1000km/hr이라고 하자.
  - 가는데 6분이 걸림
- Toll Booth : 차 하나에 1분이 걸린다.
- 따라서 첫번째 차는 7분이 걸려 다음 toll에 도착한다.
- 즉, 모든 packet이 도착하기 전에 2번째 toll에 첫 번재 차가 도착한다.

### Packet Queueing Delay

- a : 패킷이 큐에 도착하는 평균 속도
- L : packet 길이
- R : link bandwidth(Maximum capacity)

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 2.13.26.png)

- Traffic Intensity : traffic이 얼마나 들어오는지에 대한 척도
- a : 패킷이 큐에 도착하는 평균 속도
- **R/L** : L/R이 하나의 패킷이 도착하는데 걸리는 시간 -> 역수는 1초에 패킷이 얼마나 도착하는지 나타낸다.
- a/(L/R) -> 트래픽의 강도

queueing delay : I(L/R)(1 - I) for I < 1.

*La/R* = 0 : queueing delay가 작다

*La/R* -> 1 : queueing delay가 크다

*La/R* = 1 : queueing delay가 무한대로 커진다.

#### Packet delay와 route 측정

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 2.27.25.png)

3 개의 probe를 보내서 delay와 경로를 얻어온다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 2.28.13.png)

-	확률적으로 queueing delay가 없을 때 측정할 수 있으므로 delay가 줄어들 수 있다.
-	probe가 lost되거나 router가 응답하지 않도록 설정했을 때 그럴수 있다.

### Throughput

비트를 sender에서 receiver까지 보내는 속도를 의미한다. 따라서 bit/sec로 측정이 가능하다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 2.54.47.png)

- Throughput : rate(bit/time unit)
  - Instananeous : 특정 point에서 rate
  - Average : 긴 시간동안 특정한 rate
- 두 개의  link에서는 **작은 값의 Throughput**을 따른다.
  - 즉, 위의 Throughput : 더 작은 쪽의 Throughput이다.
  - 작은 값에 의해서 **end to end throughput**이 결정이 된다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 2.59.19.png)

- Rs < Rc : 방향에 따라서 후에 보낼 수 있는 rate가 크므로 충분히 이전 throughput을 수용이 가능하다. 따라서 end-end throughput은 Rs이다.
- Rs > Rc : 하지만, 이 상황에서는 처음에 보내는 throughput을 Rs의 rate로 전송하고, 그 다음 Rc의 rate로 전송하게 된다면 **Rs-Rc만큼의 packet들이 drop된다.**
  - 하지만, Rs라고 하는 만큼의 resource가 사용이 되었는데 Rs-Rc만큼의 resource가 낭비된 것을 알 수 있다.
- 따라서 end-end throughput에 대한 정보가 있어서 후에 resource의 낭비를 막을 수 있다.

위와 같이 end-end throughput에 **제한을 거는 link**를 **Bottelneck link**라고 한다.

#### Utilization의 의미

Bottleneck link에 의해 transmission rate가 제한이 된 상황에서 기존의 R에서 bottleneck의 R이 얼마나 활성화 되었느냐

- **N's utilization = R_bottleneck / R_N** 

#### Network scenario

<img src="/assets/images/post/computer networking/스크린샷 2021-03-28 오후 3.04.27.png" style="zoom:50%;" />

10개의 연결이 bottleneck link R과 공평하게 공유한다고 생각하자.

- Rs : server 10개
- Rc : client 10개 
- R/10 : 공평하게 나눠서 쓰고 있으므로 R/10으로 나타낼 수 있다.

아까 위에서 end-end throughput은 최소의 throughput이 될 것이므로

- min(Rs, Rc, R/10)
- 보통은 Rc, Rs가 bottleneck이 된다.

### Bandwidth, Throughput and Goodput

- Bandwidth : 링크에서 데이터를 전송할 수 있는 최대 용량 **(이론값)**
- Throughput : **실제 링크**에서 전송되는 패킷의 용량을 특정한 값 **(실제값)**
- Goodput : Application level에서 Throughput
  - 의미있는 데이터를 전송할때를 의미한다.
    - Protocol, 다시 보내지는 data packet을 제외한 Throughput을 의미한다.

Ex) For 1s, a packet with 1Mbits information + 0.2 Mbits header is transmitted over a 10 Mb/s link, but fails to be delivered. The same packet is retransmitted two times more, and finally it is delivered.

- **Goodput** : 1Mbits/s
  - Application level에서는 1Mbits만 의미있는 정보 
- **Throughput** : 3.6Mbits/s -> 3번이나 재전송 되었으므로
- **Bandwidth** : 10Mbits/s

### Bandwidth-delay product

**시간 지연동안 링크안에 담길 수 있는 Bit의 총 용량을 의미한다.**

**Long Fat Network(LFN)** : Bandwidth-delay product가 큰 network를 의미한다.

- 이것의 양에 따라 network를 어떻게 설계할 지 좌우된다.

#### 문제풀이

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 3.21.44.png)

- Propagation delay : **20000km** / **2.5 * 10^8 m/s** = 0.08 s = 80ms
  1. R * d_(prop) =  2Mb/s * 80ms = 2000Kb/s * 0.08ms = 160Kbits
  2. 80ms 동안 2Mbps로 전송이 되면 160Kbits만큼 Link에 담길 수 있다.
  3. 이것이 Bandwidth-delay product가 된다.



### 문제풀이

http://gaia.cs.umass.edu/kurose_ross/interactive/caravan.php

1. 하나의 차가 나가는데 걸리는 시간
2. 전체 차가 나가는데 걸리는 시간
3. 하나의 차가 다음 톨부스로 가는데 걸리는 시간
4. 마지막 차가 다음 톨부스로 가는데 걸리는 시간
5. 첫 번재 차가 톨부스를 지나고, 다음 톨부스에서 서비스를 받기 위해 걸리는 시간
   - 출발하고 남은 차의 transmission delay + propagation delay
6. 다음 톨에서 **서비스 받기 위해서**는 마지막 차 까지 도착을 해야한다. -> 문제 안보고 푸는거임
7. 두 번째 톨에 도착하기 전에 첫번째 톨에도 차가 없을수가 있나? -> 문제 안보고 푸는거임.
   - propagation speed가 엄청 길면 link에 차들이 있으니까 둘 다 비어있을 수 있다.

http://gaia.cs.umass.edu/kurose_ross/interactive/one-hop-delay.php

1. Transmission Delay : L/R -> 단위 주의하자.
   - 1 Mbps : 1 * 10^6 bps
2. R/L : 초당 보낼 수 있는 패킷의 개수를 의미한다.

http://gaia.cs.umass.edu/kurose_ross/interactive/qdelay.php

1. 실제로 queueing delay가 많냐?
2. queueing delay를 구해라
   - I(L/R)(1-I)
   - I = La/R
3. 2번 문제랑 동일하다
4. queueing delay = 하나의 패킷이 이동하는데 걸리는 시간.
   - queue에서 N개의  Packets이 남아져 있다. 그렇다면 1초 뒤에 몇 개의 packet이 남아있냐?
   - N-floor(1second / queueing delay) : 
5. 드랍되는 packet의 수를 구해라.

http://gaia.cs.umass.edu/kurose_ross/interactive/end-end-delay.php

1. transmission delay : L/R
2. propagation delay : d / s (link의 길이를 propagation speed로 나누면 시간이 나옴)
3. L/R + d/s 해라
4. 1과 동일
5. 2와 동일
6. 3과 동일
7. 1과 동일
8. 2와 동일
9. 3과 동일
10. Link 1 2 3 의 total delay 다 합해라.

http://gaia.cs.umass.edu/kurose_ross/interactive/end-end-throughput-simple.php

1. min(Rc, Rs, R/N)
2. Bottleneck link는 가장 작은 transmission rate를 가진 Rate이다.
3. N's utilization = R_bottleneck / R_N
4. N's utilization = R_bottleneck / R_N
5. N's utilization = R_bottleneck / R_N 
   - N이 shared R이자나

### 주의할 점 

bps, kbps, Mbps, Gbps, Tbps : 1000단위이다.

KB, MB, GB 는 1024단위이다.

## Network Security

### Packet interception

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 4.48.17.png)

- Packet “sniffing” : Packet을 가로채는 방법
- Broadcast media를 통해 가로챈다.

### Fake Identity

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 9.54.17.png)

- IP "Spoofing" : IP주소를 속인다.
  - source 정보를 바꾼다.

### Denial of Service 

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 9.56.36.png)

### Lines of Defense

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 9.57.12.png)

## Protocol Layers, Service Models

프로토콜 레이어가 필요한 이유는 네트워크는 여러가지 조각으로 이루어져있어 매우 복잡하다.

host, routers, ... applications protocols

너가 software developer이라면, 너가 software을 teleconferencing을 위해 써야한다고 하자.. 그리고 나서 내가 하고싶은 것만 초점을 맞출 수 있다.

networking 광섬유,, 이런거는 신경 쓸 필요 없지.

기본적으로 복잡한 시스템에서는  devide and conquer방식을 사용하여 작은 조각으로 나누고 그 조각에서 하고싶은 것을 focus한다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 10.11.15.png)

- 여행을 간다고 가정하면 위와 같은 루틴이 있다.
- 데이터 네트워크도 똑같은 스텝을 밟는다.
- data packet travel, human travel은 유사한 점이 많다.

![](/assets/images/post/computer networking/스크린샷 2021-03-28 오후 10.12.59.png)

- 각 레이어에서 서비스를 구현한다. 각 레이어에서 고유의 동작을 한다.
- 각 레이어는 이웃하는  layer가 아닌이상 상호작용하지 않는다.

### 왜 Layering 하는 것이냐 ? 

- Network가 복잡하기 때문이다.
  - 전체적인 시스템의 뷰를 보는것이 너무 어렵고 subcomponent의 detail을 보는것이 어렵기 때문이다. 
  - Subcomponent의 detail을 아는 것은 거의 불가능하다.
- layering Structure 을 사용한다면 우리는 관심있는 Layer 에 초점을 둘 수 있기 때문이다.
- Layering 은 Modularization의 일종이며 유지보수, 업데이트가 쉬워진다.
- layer의 퍼포먼스를 올리고 싶다면 언제든지 할 수 있다. 다른 주변 layer에 영향을 끼치지 않으면서
- 하지만, 어떤 경우에는 악영향을 끼치기도 한다.
  - 어떤 Layer을 최적화 한다고 해도 전체적인 시스템의 performance를 증가시킨다는 보장은 없다.



-Reference-

James F. Kurose, University of Massachusetts, Amherst, Keith Ross의 『Computer Networking, 8th Edition』

