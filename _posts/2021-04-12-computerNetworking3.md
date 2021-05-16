---
title: Computer Networking 3

toc: true

use_math: true

categories:

 - Computer Networking

---

##     Transport Layer

### 목표

- Multiplexing, Demultiplexing 이해하기
- TCP에서 사용되는 reliable data transfer 이해하기
- flow control
- congestion control
- Transport Layer protocol에 대해서 배워본다.
  - UDP : connectionless transport
  - TCP : connection-oriented reliable transport
  - TCP congestion control



### Transport service와 protocol

Transport protocol : 다른 application proces간 **logical communication**을 제공한다.

- transport protocol은 **application layer와 Network layer사이**에 존재한다.
  - sender : Application layer가 보낸 **Message를 Segment**로 만들어서 Network Layer로 전송한다.
  - receiver : **segment를 다시 reassemble해서 message**로 만들어 application layer으로 전달한다.

대표적으로 TCP, UDP가 있다.



#### Transport vs. network layer services and protocols 비교

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.55.34.png) 

- host = house
  - Network Layer이 집까지 가져온다는 것으로 이해하자.
- processes = kids 
  - Transport Layer가 아이들에게 우편을 나누어주는 것으로 이해하자.
- 집에 우편물이 도착한다면, 누구에게 전달해주어야 하나?



Network Layer : Host 사이의 Logical communication

Transport Layer : process 사이의 Logical communication



#### Transport Layer Actions

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.59.01.png)

1. Application Layer로부터 메세지를 전달받는다.
2. Transport layer에서 message 앞에 Header를 추가해서 **Segment**를 만든다.
3. 이 Segment를 network layer로 전달한다. 
4. 그 이후로 Link, Physical을 통해서 신호를 전달한다.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.00.35.png)

1. Network Layer로부터 Segment를 전달 받는다.
2. Segment의 Header 정보로 **어떤 Process에게 message가 전달**되어야 하는지 결정한다.
3. **최종 목적지 Process까지 전달하는 과정을 Demultiplexing이라고 한다.**



#### TCP & UDP 정의

- **TCP:** Transmission Control Protocol
  - 패킷 손실이 없다 -> reliable 
  - 보낸 순서에 따라 받는 순서도 같다. -> in-order delivery
  - congestion control : 데이터를 많이 보내게 되면 congestion이 되는데, 그런 congestion을 회피하기 위한 메커니즘을 지원한다.
  - Flow control : sender와 receiver의 rate차이가 있으면 receiver의 버퍼에 데이터가 쌓일 수 있으므로, sender가 rate를 조절해야 한다.
  - Connection setup : Connection을 해야하므로 connection 연결도 지원한다. 
- **UDP:** User Datagram Protocol
  - 패킷 손실이 있다. -> unreliable
  - unordered delivery
  - **best-effort IP** : 최선을 다하기만 하고 아무것도 포장하지 않는다. 할수 있는 만큼 보낸다.

둘 다 delay guarantees, bandwidth guarantees는 가지고 있지 않다.



### Multiplexing and demultiplexing

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.24.05.png)

- 아파치 서버 
  1. application layer에서 transport layer로 **msg**를 보냄.
  2. tranport layer에서 network layer로 **msg에 port number를 붙여**서 **segment**로 보낸다.
  3. Network layer에서 **segment**에 **IP주소를 붙여** link, physical로 보낸다.
  4. 이 정보가 해당 client의 web browser까지 전달이 된다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.24.49.png)

- 아파치 서버
  1. Client들이 request를 보낸다.
  2. transport layer에 **segment**들이 있다.
  3. 이 segment들을 segment가 담고 있는 port 정보에 따라 목적지 process로 segment를 보낸다.
  4. 여러 segment들을 해당 process에게 각기 나눠주는 과정이 **Demultiplexing**이라고 한다.



#### **Multiplexing/demultiplexing**

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.28.49.png)

**Multiplexing은 sender에서 발생**

server가 sender인 경우를 생각해보자.

다양한 socket으로부터 온 msg에 transport header를 추가하고 보내는 과정을 Multiplexing이라고 한다. 

**Demultiplexing은 receiver에서 발생**

server가 receiver인 경우를 생각해보자.

Transport layer에 모인 segment들을 header 정보에 따라서 목적 process까지 전달하는 과정



#### demultiplexing이 일어나는 과정

<img src="/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.33.10.png" style="zoom:50%;" />

Tranport layer가 받은 IP datagram으로부터 어떻게 segment를 찾을 수 있을까?

- IP datagram : source IP adress + destination IP address를 포함한다.
- 각각의 datagram은 하나의 segment를 포함하고 있으며, segment안에는 목적 port number가 적혀있다.

Host는 IP주소와 port number를 사용하여 적절한 socket을 결정하여 segment를 보내는지 정한다.



##### UDP에서 demultiplexing 하는 방법

1. socket을 생성할 때 port number을 명시해야 한다.
2. datagram을 만들 때 매번 destination의 IP주소와 destination의 port number을 명시해야 한다. 
3. UDP segment를 host가 받으면
   1. segment의 destination port number을 확인한다.
   2. 그 port number을 가진 socket에게 segment를 전달한다. 
4. 목적 **port number만 같다면 같은 socket으로 segment를 받는다**.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.43.02.png)

- 하나의 UDP socket을 통해서 여러 host들과 통신을 한다.
- 누가 보낸건지는 source port number을 통해서 알아내고, 해당 port의 IP주소를 활용해 다시 보낸다.



##### TCP에서 demultiplexing하는 방법

TCP socket은 4개의 tuple로 정의된다.

- source IP
- source port #
- dest IP
- desg port #

이 4개의 tuple이 다르면, **다른 socket**이다.

따라서, TCP의 demultiplexing은 **tuple의 4개의 값을 이용해 demultiplexing**한다.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 8.47.32.png)

- 각각의 segment들은 다른 socket을 통해서 전송이 된다.
  - TCP같은 경우에는 4개의 정보를 통해서 socket을 구분하기 때문이다.
  - 따라서 UDP와 달리 port #만으로 socket을 구분하지 않고 4개의 정보를 가지고 socket을 구분한다. 



즉, 요약을 하면

UDP : destination port #만으로 demultiplexing

TCP : dest port #, IP, source port #, IP 4가지를 사용하여 demultiplexing한다.



### Connectionless transport: UDP



#### UDP : user datagram protocol

- 아무것도 제공하지않고 뼈대만 제공한다.
- best effort service : 최선을 다하지만 아무것도 안하는 서비스
- handshaking이 필요없다.
- 각자의 segment가 각자 처리된다. 
- 그러면 UDP를 왜 사용할까?
  - Connection을 만들 필요가 없다. 즉, **RTT 딜레이가 없다.**
  - 어떤 state도 receiver에 보관되지 않는다. 
  - header size도 작다.
  - congestion control을 지원하지 않기 때문에 원하는 만큼 데이터를 빠르게 보낼 수 있다. 
  - 또한, UDP와 TCP가 공존하는 환경에서 UDP에 몰린다면 TCP가 starvation을 겪을 수 있다. 



#### UDP 사용

- streaming multimedia apps : loss는 발생해도 되고, rate에 민감한 application에 적용이된다.
- DNS 
- SNMP
- HTTP/3
  - UDP를 통해서 data를 reliable하게 보내는 방법.



#### UDP segment 구현

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 7.18.35.png)

- source port # : 16 bits
- dest port # : 16 bits
- length : 16bits
- checksum : 16bits
  - 보내진 UDP의 segment의 오류를 확인하기 위한 checksum

header의 size가 굉장히 작다. 



#### UDP checksum

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/computer networking/스크린샷 2021-04-12 오후 7.21.14.png)

- Flipped bit가 발생했는지 확인한다.
  - 0을 보냈는데 1이 보내졌는지, 1을 보냈는데 0이 보내졌는지 확인하는 방법이다. 
- 에러가 발견되어도 수정은 불가능하다.
  - sum만 가지고 다시 합을 계산해보고 보내진 데이터와 수신한 데이터를 확인하면서 에러가 발생했는지 확인하는 방식이다. 



sender : segment content의 합을 구해서 **UDP Chekcsum field에 넣는다**. 

receiver : segment에서 스스로 계산한 합과 checksum을 비교하여 오류 여부를 판별한다. 

- segment의 전체 데이터를 16비트 마다 하나의 수로 간주해서 계산한다.
  - 32bit payload -> 16bit interger가 두 개 있다고 생각하고 합을 구한다.
  - ![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 8.37.58.png)
  - 16비트 두 개를 더하고, 그 값의 one's compliment를 한다.
  - 그렇게 되면 checksum을 얻어낼 수 있다. 

**UDP의 기능이 적지만, 나중에 reliable한 transport를 하고 싶다면 Application layer 단계에서 하면 된다.** 



### Principles of reliable data transfer 

네트워크 채널이 reliable하지 않기 때문에 data가 손실이 될 수 있다. 이런 경우에 어떻게 대처하는지 알아보겠다.

- Packet을 다시 보내던가
- receiver가 잘 받았다고 말을 하던가

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.15.15.png)

- sender는 transport layer를 통해서 data를 **전송하고**
- receiver는 transport layer를 통해서 data를 **받는다**. 

하지만, 우리가 원하는 것은 **reliable한 channel**이 있어서 우리가 보내는 데이터가 손실 없이 receiver에 도달하길 바란다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.16.21.png)

실제로 reliable channel이 겪어야 하는 channel은 **unreliable한 channel**이다. 

따라서, application이 원하는 reliable한 데이터 전송은 **transport layer에서 구현을 해주어야 한다.**  

- 그렇다면 어떻게 unreliable한 channel위에서 reliable한 service를 구현할까?

그 전에, unreliable한 예시를 알아보자.

- unreliable한 channel은 어떤 channel을 말하는 것인가?
  - loss : packet이 buffer overflow같은 경우와 같이 없어질 수 있다.
  - Corrupt : 데이터가 변경이 되었다.
  - reorder data : packet의 순서가 바뀌었다. 
- 이러한 문제가 발생하면 어떻게 해결할지는 배워볼 것이다. 

<img src="/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.26.01.png" style="zoom:50%;" />

한 가지 고려할 점은 sender와 receiver은 데이터를 온전히 교류할 수 없다. 다시 말해, sender와 receiver는 서로의 state를 알 수 없다. 

- sender가 receiver에게 데이터를 전송했는데, receiver가 잘 받았음을 알 수 없다. 
- 그렇지만, sender와 unreliable한 channel이 있기 때문에 그것에 대한 정보를 공유하는 것 또한 어렵다. 
- 따라**서 protocol은 매 전송마다 그것들이 잘 갔는지 확인을 해야한다.** 



#### Reliable data transfer 구현해보기

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.26.51.png)

sending하는  process가 데이터를 보내게 되고, receiving하는 process가 데이터를 받는 그림이다. 

rdt : reliable data transfer

udt : unreliable data transfer

- **rdt_send()** 
  - sending process에서 rdt_send()를 호출함으로써 application에서 transport layer로 data를 보낸다. 
- **udt_send()** : 
  - **unreliable data transfer send**라는 함수를 호출해서 packet을 unreliable채널로 보내게 된다. 
- **rdt_rcv()**
  - 패킷이 도달한 즉시, reliable data transfer을 위한 알고리즘들을 거치고, 문제가 없으면 deliver_data()라는 함수로 구현이 된다. 
- **deliver_data()**
  - 이 함수를 통해서 data를 application layer으로 전송한다. 



#### **Reliable data transfer** : FSM(Finite State Machine)

FSM : 어떤 system에 대해서  state를 정의할 수 있다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.35.41.png)

- 한 시점에서 시스템을 바라보면 특정 state에 머물러 있을 것이다. 
- State 1 -> State 2 
   	1. 어떤 조건이 만족되게 되면 state의 transition이 발생한다. (**Event**)
       - 자판기에 동전을 넣기
   	2. 이때 취해야 하는 action이 무엇인지 기술할 수 있다.  (**Action**)
       - 자판기에 LED를 표시하기



##### rdt 1.0 : realiable transfer over a reliable channel

Reliable한 transfer을 reliable한 channel을 통해서 보내는 방식이다. 이것은 reliable channel을 통해서 전송이 되는 것이기 때문에 **error가 발생하지 않는다.** 

**이런 경우 FSM을 작성해보면 State가 하나밖에 없다.**

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.42.48.png)

Sender : application layer에서 call을 기다림, 그 후, **data를 기다리는  state로 돌아간다.** 

- event : rdt_send(data)
- action
  -  packet = make_pkt(data) : data로 packet을 만든다. 
  - udt_send(packet) : packet을 network layer으로 보낸다. 

Receiver : network layer에서 호출을 기다림.

- event : rdt_rcv(packet), 그 후, **Packet을 기다리는 state로 돌아간다.** 
- action
  - extract(packet, data) : packet은 문제가 없기 때문에 packet에서 data를 추출한다. 
  - deliver_data(data) : data를 application layer로 보낸다. 



##### rdt2.0: channel with bit errors

unreliable한 channel이기 때문에 bit error가 발생했음을 가정해보자. 그리고 bit error를 찾아내기 위해 checksum을 사용해서 **bit error가 있는지 없는지 확인해보자.** 

**에러가 발견되면 다시 packer 전송을 요청해야 할 것이다 .** 알려주는 방법이 다음과 같다. 

- *acknowledgements (**ACKs**)*: receiver가 sender에게 pkt 을 잘 받았다고 알려주는 것
  - **Sender가 이걸 받으면 다음 pakcer을 전송한다.** 
- *negative acknowledgements (**NAKs**):*  receiver가 sender에게 pkt에 에러가 있다고 알려주는 것
  - **Sender가 이걸받으면 packet을 다시 전송한다.**

**stop and wait** : 보낸 다음에 stop하고 wait하는것, stop하고 ACK나 NAK를 기다리는 것이다. 

- **보내고 기다린다는 말은 delay가 늘어나고 보낼 수 있는 속도가 제한된다는 것이다.** 
- **이것을 해결하는 것이 가장 중요한 내용이다 .**



##### **rdt2.0: FSM specifications**

Sender 입장

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 9.59.31.png)

**Wait for call from above** state

- rdt_send(data) : 데이터를 보낸다. 
- snkpkt = make_pkt(data, checksum) : pkt을 만든다. 

**Wait for ACK or NAK** state

- rdt_rcv(rcvpkt) && isNAK(rcvpkt) : 이 이벤트에 대해서는 **NAK를 받으면 wait state에서 다시 기다리는 것이다.** 
- rdt_rcv(rcvpkt) && isACK(rcvpkt) : 이 이벤트에 대해서는 ACK를 



Receiver 입장 : 에러가 발생하지 않음

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 11.18.10.png)

**Wait for call from below** state

- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt) : 에러가 발생하지 않음
- extract(rcvpkt,data) : packet으로 부터 data를 추출함
- deliver_data(data) : application layer으로 data를 보낸다.
- udt_send(ACK) : sender에게 ACK를 보낸다. 
  - sender가 ACK를 확인하고 다시 wait상태로 간다.



Receiver 입장 : 에러가 발생함.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오후 11.22.08.png)

- rdt_rcv(rcvpkt) && corrupt(rcvpkt) : 훼손된 packet을 받았음
- udt_send(NAK) : NAK 상태임을 sender에게 전달
  - receiver : 다시 기다리는  state
  - 다시 sender로 보내서 sender에서 packet을 보낼때까지 기다린다. 



##### rdt2.0 의 문제점

만약 ACK 나 NAK가 corrupted 되면 어떡할까?

- receiver가 ACK를 보냈는데 corrupt되서 sender가 NAK로 인식하면, Packet을 한 번 더 보내는 **중복이 일어난다. **
  - 이 문제를 해결하기 위해서 보낸 Packet마다 **Sequence number**를 붙인다. 
  - 이  **sequence** 가 중복, 비어있는지를 확인하고 결정한다.
    - 이를 rdt2.1에서 구현한다.



##### **rdt2.1: Sender, handling garbled ACK/NAKs**

이제 sequence number를 붙였기 때문에 **Sender의 구현이 state가 4**개가 되었다. 구현을 자세히 살펴보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 6.24.08.png)

- rdt_rcv(rcvpkt) && (corrupt(rcvpkt) || isNAK(rcvpkt) )
  - 0번 state에서 이와 같이 0번 데이터가 Corrupt되거나, NAK를 받았다면 0번 state에서 기다리고 **paket을 다시 보내는 action**을 취한다.
- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt) && isACK(rcvpkt)
  - 데이터가 손상되지 않았고, ACK되었다면, 1번 state에서 기다린다. 



##### **rdt2.1: receiver, handling garbled ACK/NAKs**

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 6.34.46.png)

State 0에서 

- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt)  && **has_seq0(rcvpkt)** 
  - 0번을 기다리고 있는 packet, 즉, sender에서 0에서 보낸 packet을 원한다.

State 1에서

- rdt_rcv(rcvpkt) &&  not corrupt(rcvpkt) &&  **has_seq0(rcvpkt)**
  - receiver의 state1번에서 1번이 아닌 0번의 데이터를 받은 것은 문제가 있다. 
  - 그 다음의 action으로 데이터는 잘 받았지만, 1번데이터를 다시 요청하는 action을 취한다. 



##### rdt2.1 : 논의

2.0 버전에 비해 추가된 것 

sender : sequence #가 붙어 NAK, ACK 신호가 corrupt되는 것을 처리할 수 있다. 

- **sequece 번호**는 동시에 보내는 **paket의 2배**로 설정되어야 한다. 

receiver : 받은 packet이 중복인지 확인한다. 



##### **rdt2.2: a NAK-free protocol**

packet을 아무 문제 없이 받았다 -> ACK

n번 packet을 아무 문제 없이 받았다. -> **n, ACK**



packet이 망가짐 -> NAK

n번 packet이 망가짐 -> n, NAK -> **n-1, ACK**

이로인해 우리는  NAK가 필요 없어졌다. 따라서 ACK만을 사용해서 구현이 가능하다. 



![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 6.50.03.png)

- rdt_rcv(rcvpkt) && ( corrupt(rcvpkt) || **isACK**(rcvpkt,1) )
  - NAK대신 이전 패킷가지만 전송을 잘 받았음을 의미하는 ACK와 이전  state 번호를 붙임
- rdt_rcv(rcvpkt) && notcorrupt(rcvpkt) && **isACK**(rcvpkt,0)
  - 제대로된 pkt이므로 다음 state로 넘어감

 

##### **rdt3.0: channels with errors** **and** **loss**

하지만, 지금까지 해온 작업들은 만약 **PACKET 자체가 없어진다면 의미가 없어진다**. 그러면 어떻게 해야하나? -> **Timer 사용**

- Sender가 packet을 받아야 하는데 ACK를 받아야 하는데 일정 시간까지 기다려보고 오지 않으면 다시 재전송을 하게된다. 
- 하지만, packet이 loss된것이 아니라 delay된건데 더 못참고 보냈으면 어떡하나. 이로인해 duplicate문제가 발생한다. 
  - 어차피 duplicate문제는 이전 버전에서 해결 했으므로 신경 안써도 된다. 

따라서, Sender에서 **Timer**을 사용해서 Packet이 문제가 발생해서 loss가 되어 일정 시간동안 ACK를 받지 못한다면 재전송을 하는 메커니즘으로 구현한다. 



![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 6.59.43.png)

- Wait for call 0 from above
  - start_timer : 보내고 나서 타이머를 시작한다.
- Wait for ACK0
  - timeout : ACK를 못받았으므로
  - Start_timer : 다시 timer을 작동시킨다.

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 7.31.10.png)

- loss 없음
- packet이 loss

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 7.31.28.png)

- ACK가 loss되는 경우
- loss가 안되었지만, ACK가 delay되어 timeout된 경우
  - timeout을 너무 짧게 잡는다 : duplicate되는 packet이 많다. 
  - timeout이 너무 길다 : loss를 찾는데 시간이 너무 오래 걸릴 수 있다. 



##### **Performance of rdt3.0** 

ACK를 기다리므로 stop and wait 방식임을 알 수 있다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 7.44.55.png)

- sender가 sending하는 동안 일하는 시간의 비율 (1초 동안 sender가 channel을 사용하고 있는 비율)
  - 1초를 기준으로 보았을 때, 일정 시간만 보내고 나머지 시간은 idle할 것이다.

예시를 한 번 보자

1Gbps link, 15 ms propagation delay, 8000bit packet

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 7.52.29.png)

- channel에서 packet을 보내는데 걸리는 시간
- D_trans = L / R = 8 * 10 ^ 3 / 10 ^ 9 = 8/ 10^6 = 8microsecs
- 첫 packet을 보내고 ACK 를 받을 때 까지 걸리는 시간은
  - **t = L/R + RTT**
  - U_sender = 0.008 / 30.008 = 0.00027
- 즉, **0.00027만큼의 utilization**만을 가지고 있음을 알 수 있다. 

따라서 Stop and wait방식은  utiilization에 있어서 큰 문제를 가지고 있음을 알 수 있다. 



##### **rdt3.0: pipelined protocols operation**

Stop and Wait가 가지고 있는 utilization 방식의 문제점은 pipelined protocol을 통해서 해결이 가능하다. 

- **pipeline** : packet을 여러개 동시에 보내는 방식, 아직 ACK를 못받아도 여러개를 동시에 보내는 방법이다.
  - 하지만, 구현에 있어서 추가사항이 발생한다.
    - 1. sequence number가 늘어날 것이다.
      2. receiver입장에서는 어떤 패킷은 받아지고 어떤 패킷은 받아지지 않을 수 있다.
  - 따라서, operation에서 receiver가 복잡해질 수 있다.

아직 도착하지 않아도 추가로 보내는 경우를 생각해보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 8.16.35.png)

- 전체 시간 : RTT + L/R
- 사용 시간 : 3L / R
- Utilization이 3배 증가한다.

3개의 packet을 받았을 때 1개가 안오던가 2개가 안오던지 3개가 loss될 수 있으므로 여러가지 알고리즘으로 이를 조정해야한다.  



###### Pipeline protocol :**Go-Back-N: sender**

**N** : ACK되지 않은 packet을 최대 몇 개를 보낼 수 있는지에 대한 변수

따라서, sender는 N크기의 **Window**를 가진다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 8.27.15.png)

- 녹색 : sender가 Packet을 보내고 ACK 받음
- 노란색 : Packet을 보냈지만 ACK 못받음
- 파란색 : packet을 보내려고 하는 packet

receiver가 ACK를 보내면 녹색에서 노랑색으로 바뀌고 window가 1칸 이동한다. 이를 통해서 sender가 **아직 ACK되지 않은 Packet의 개수를 조절**한다.



**Receiver** 입장

- ***cumulative ACK:* ACK(*n***) : 현재까지 문제없이 도달한 Packet에서 가장 큰 수의 Packet의 sequence를 #를 담아서 보낸다. 
  - ACK(10) : 0~10까지 packet을 잘 받았다는 의미



**Sender** 입장

- 이  ACK(n)을 받으면 그제서야  window를 n+1로 옮길 수 있다. 
- timeout(n) : n부터 timeout이 발생했으므로 n부터 window의 크기인 N까지 다시 보낸다.
  - timeout(n) : n번째 packet을 보냈는데 못받았으므로 n부터 시작.
  - n, n+1, ..., n+N-1 까지의 Packet, 즉 N개의 Packet을 다시 보내게 된다. 



###### Pipeline protocol : **Go-Back-N: receiver**

sender에 비해서 simple하다.

지금까지 받은 **1부터 연속된 sequence를 가진 packet중**에서 가장 높은 **in-order** sequence #를 보낸다. inorder를 주의하자 



따라서**rcv_base**라는 변수 하나만을 기억하고 있으면 된다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 8.37.06.png)

- 위와 같은 상황에서, 다시 보내야 하는 상황이 발생했음을 알 수 있다. 
- 그렇다면 핑크색은 버려야 하는가?
- Go-Back-N : 어차피 sender가 **다시 보내므로 핑크색을 버리든지 말던지 상관 없다.** 
  - 버리게 구현할 수도 있고 안버리게 구현할 수도 있다.
- 어쨌든, out of order packet은 다시 전송을 받는다. 



###### Pipeline protocol : **Go-Back-N in action

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오전 8.50.39.png)

- Window size N = 4, Packet의 개수 = 9개

1. 연속적으로 받은 packet 중에서 pkt2가 loss되었다. 
   - receiver는 pkt0, pkt1까지 잘 받았는데 pkt3이 도착했으므로 중간에 빠진 것을 알아챔
2. in-order sequence #에서 가장 큰 번호를 가지고 있다가, (rcv_base를 기억하고)
   - 다음으로 들어오는 pkt3,4,5를 버리고 있다가, sender가 timeout을 눈치채면
3. 그때서야 pkt2부터 다시 보낸다. 
   - **out of order packet을 다시 받는다.** 

우리가 계속 마음에 안들었던 것이 받았던 것을 다시 받는 것이다. 따라서 다음 구현에서 받앗던 것은 다시 받지않고 선택해서 받는 알고리즘이 다음에 소개될 것이다 .



###### **Selective repeat**

재전송을 하는데, **selective**, 즉, 선택적으로 재전송을 한다는 의미이다. 

- Receiver : **올바르게 도착한**  **packet**에 대해서 **각각 ACK**하고 있어야 한다. 
  - Packet을 Buffer에 저장했다가 중간에 비어있는 packet이 있으면 기다리고 있다가, Application layer에 최종적으로 순서대로 전달한다. 
- Sender : 모든 NAK packet에 대해 timeout을 설정하고 재전송해야한다. 
  - timeout 을 각각의  NAK packet에 대해서 유지해야한다. 
- Sender window : N개의 사이즈를 가지고 있다. 
  - NAK packet의 전체 개수를 제한할 수 있다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오후 10.39.36.png)

- Sender
  - Go back과 다른점은 노란색 중간에 ACK된 packet정보가 끼어있다. 
  - 앞의 두 개의 노란색까지 ACK신호를 받으면, window는 세 번째  노란색으로 옮긴다. 
    - 즉, gap이 채워진만큼 윈도우 사이를 움직인다. 
- Receiver
  - **이전과 다르게 Receiver도 window를 가지고 있다.** 
    - Window안에 out of order packet(이미  ACK를 보낸)을 buffer에 기록
    - Window밖에  out of order packet(이미  ACK를 보낸)이면 Drop한다.
  - Sender와 마찬가지로 gap이 채워지면 window를 옮긴다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-13 오후 11.29.30.png)

Sender 

- 상위  layer에서 데이터 받음
  - sequence #가 window안에 있으면 packet을 전송한다. 
- timeout(n) : packet n에 대해서 timeout이 발생
  - packet n을 다시 전송하고 timer를 다시 실행한다.
- ACK(n)이 [sendbase, sendbase+N}-> window안에 있다.
  - 받은 packet n을 마킹한다.
  - 위에서 받음 n이 NAK된 packet중에서 가장 작은 것이라면, window base를 NAK seq #로 이동한다. 

Receiver 

- packet n이 [rcvbase,rcvbase+N-1]안에 있다.
  - 잘 받았다는 ACK(n)을 보낸다.
  - out of order packet이면 buffer에 넣는다. 
  - in order packet이면 window를 아직 받지 않은  packet으로 이동시킨다. 
  - 또한, in order이면 **deliver**한다. transport layer에서 application layer로 이동
- packet n이 [rcvbase-N, rcvbase-1] 안에 있다.
  - sender가 ACK(n)을 윈도우를 옮기기 전에 제대로 못받았으므로 다시 ACK(n)을 전송해준다. 
- 다른 경우는 무시한다. 
  - 윈도우 밖에 있는  packet은 버퍼링 하지 않는다. 



![](/assets/images/post/computer networking/스크린샷 2021-04-13 오후 11.38.24.png)

- 끝나고 나면 window를 6으로 옮긴다. 



<img src="/assets/images/post/computer networking/스크린샷 2021-04-13 오후 11.41.35.png" style="zoom:50%;" />

- receiver -> sender로 가는 것이 전송이 안됨.
- sender에서는 timeout이 발생하마.
- 하지만, sender은 pkt0을 보내긴 하지만, 다른  order의 sequence0 packet을 보내는 것이므로 혼란이 생긴다. 
- **이는 window가 sequence의 bound를 넘어가기 때문에 문제가 생기는 것이다 .**
  - 따라서, window size에 맞춰서 sequence #는 window size의 2배가 되어야 한다.



### TCP : Connection Oriented Transport

위에서 배운 Reliable data transfer이 어떻게 TCP에 구현이 되어있는지 살펴볼 것이다.

- **point to point** : 하나의 sender와 하나의 receiver
- **reliable** and **in-order byte** **stream** : msg 손실이 없고, msg가 나뉘어 있는 것이 아니라 연속적으로 하나의 stream으로 되어있다. 
- **full duplex data**
  - sender와 receiver가 데이터를 같은 connection 안에서 서로 주고받는다. 이중통신
  - 한꺼번에 주고받는 Data의 최대 크기는 MSS (Maximum Segment Size)
- **Cumulative ACKs**
  - 앞으로 받아야할 packet의 sequence를 ACK(n)으로 전달한다.
- **Pipeline** 
  - TCP congestion
  - flow control 
  - 위 두개를 통해서 **window size**를 결정한다. 
- **Connection oriented**
  - Handshaking을 통해서 sender와 receiver의 state를 결정한다.
- **Flow controlled**
  - Receiver가 처리할 수 있을 만큼의 data만큼 sender가 보낸다. 



#### **TCP segment structure**

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오전 6.54.38.png)

- Source port#, Dest port # : 각각 16bits씩 저장한다.
- Sequence # : Byte Stream에서 몇 번째 byte인지 알려주는 정보
- Acknowledgement # : 다음 sequence #를 적어둔다.
  - A : 이게 1로 세팅되어있으면 Acknowledgement # 세팅
- head len : header의 길이를 나타냄
- C, E : congestion control을 위해서 사용
  - flag가 올라가면 Congestion이 발생했으니  window size를 줄여라
- R : reset / S : Synch / F : Fin
  - Handshaking, connection이 close될 때 사용되는 flag
- Receive Window : Receiver가 받을 수 있는 data 양을 알려준다. 
  - **flow control을 위한 곳**
  - sender는 receiver window를 넘어서는 data를 보내지 않는다.
- Checksum : Error가 발생했는지 확인을 위함
- Options : 옵션을 위함
- Application data : Application data payload를 담고있다.



#### **TCP** : Sequence numbers, ACK가 가지는 의미

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오전 7.08.52.png" style="zoom:50%;" />

- **Sequence number**
  - **지금 보내고있는 segment data**의 첫 번째 byte가 **전체  byte stream**의 몇 번째에 위치하는지 알려준다. 
- **Acknowledgement**
  - **내가 받아야 하는 segment data의 첫 번재 Byte**가 무엇인지 알려준다. 
    - 초록색은 받았으니 이제 노란색 파트의 시작점을 보내라고 알려줌.
  - Cumulative ACK

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오전 7.28.38.png)

Host A : C를 입력하면 C의 data를 보낸다. 

-	seq=42 : C가 전체 byte stream에서 차지하는 위치가 42번째이다 
-	ACK = 79 : Host B가 Host A에게 받아야하는 data의 sequence #는 79여야한다.

이제  Host B가 데이터를 보내려면

- Seq=79 : Host B가 Host A에게 보내는 data의 sequence가 79
- ACK = 43 : Host B가 Host A에게 받아야하는 는  data의 sequence #가 43이라고 말해준다.

그 다음 Host A는  seq43의 데이터를 보내고, 그 다음에 요청할 데이터로 79+1인 80을 ACK한다.



#### TCP : RTT, timeout

Sender가 데이터를 보냈는데 그 데이터가 손실되었다고 보자. 그러면 Sender는 얼마만큼 기다려야 하나?

- 기다려야 하는 시간은 RTT에 따라서 달라져야 한다. 
  - RTT가 길다 : timer도 길어져야 한다.
  - RTT가 짧다 : timer도 짧아져야 한다.
-  만약 반대상황이라면
  - RTT 긴데 timer가 짧다 =>  불필요한 데이터 재전송 발생
  - RTT 짧데, timer가 길다 => loss를 발견하는데 오래걸린다.

그렇다면  RTT를 어떻게 예측하고 timer을 설정해야 하나? 일단  RTT를 측정하는 방법을 알아보자.

- sample RTT : data를 보내고 data를 다시 받을 때 까지 시간을 측정한다. 
  - 실제로 측정해보면  noise가 많이 끼어있다.
  - 이 noise를 제거하는 방법으로 **Weighted Moving Average**를 사용한다. 



**Weighted Moving Average**

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오전 8.08.01.png)

- 상수 **a**를 곱해서  측정하며, 이때 보통 a를 0.125를 사용한다. 
  - 새로 측정한 값이 a
  - 이전 측정값에 (1-a)를 둔다. 



Timeout은 앞에서 Estimated RTT를 가지고 계산할 수 있다. 

실제 RTT는 Estimated RTT보다 50%확률로 더 클 수 있고 50%확률로 더 작을 수 있다. 

- 이렇게 되면 재전송이 자주 발생하므로, Estimated margin에 "**Safety Margin"**을 추가해서 이를 좀 낮춘다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오전 8.18.39.png)

- Estimated RTT (mean값)
- DevRTT (Deviation)
- 이렇게 더한다. Deviation을 구하는 방법은 다음과 같다 .

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오전 8.19.59.png)

- 실제값과 예측값으로 deviation을 구해서 다시 moving average를 취해준다.
- 구하고자 하는거에 1-a 꼴을 취한다. 



#### TCP sender : rdt를 구현하는 방법, 기존의 방법과 살짝 다름

- Application layer로부터 data를 받으면 sequence #를 가지고 segment를 만든다. 
  - sequence # : 현재 segment의 첫 번째 byte가 전체 bytestream에서 몇 번째인지 알려준다.
  - timer가 없으면 timer를 돌린다. 
- timeout이 발생
  - timeout이 발생한  segment만 재전송한다. 
  - 다시  timer를 작동한다.
- 이전에 NAK된 segment이후로 ACK받음
  - 다시 timer를 작동한다. 



#### TCP receiver : rdt를 구현하는 방법, 기존의 방법과 살짝 다름

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.18.00.png)

- 처음으로 in order segment가 도착 -> ACK를 지연
- 그 다음  in order segment가 도착 -> 그때 cumulative ACK보낸다.
  - **TCP는 2개마다 1개씩  ACK를 보낸다.**
- out of order segment가 도착 -> 다음에 받아야할 ACK를 다시 보낸다. (Duplicate ACK)
- segment를 받았는데, 이번에 받은 packet이 gap을 채워주면  **ACK를 즉시 보낸다.** 

-> 아무 문제 없는 경우 : 2개마다 ACK

-> out of oder segment를 받아 gap이 생김 : receiver가 다음에 expected되는 sequence를 가진  ACK를 다시 보냄. fast retransmit 참고

-> gap이 채워짐 : 즉시 ACK를 보낸다. 



#### TCP : retransmission scenatios

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.27.27.png" style="zoom:50%;" />

- ACK가 loss됨, 그래서 Host A가 retransmission

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.27.31.png" style="zoom:50%;" />

- RTT > timeout
- ACK 120은 받았으니까 다시 ACK 120을 보내라는 의미

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.27.02.png" style="zoom:50%;" />

- ACK 100 과 ACK 120이 보내지고 Host A가 ACK 120만 전송 받았다면, 어차피 cumulative ACK니까 100의 신호는 skip하고 sequence 120의 data를 요청한다. 



#### TCP fast transmit

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.32.17.png" style="zoom:50%;" />

- data를 보냈는데, 같은 ACK를 계속 보낸다면 문제가 있는 것이다. 
- Duplicate **ACK가 3개**가 도착하면, **즉, 같은게 4개 도착하면 timeout에 상관없이 data를 retransmit한다.** 

=> 좀더 Host가 loss에 대해 빠르게 response하는 방법이다.



### TCP : Connection Oriented Transport



#### TCP flow control : recevier buffer의 관리 메커니즘

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.38.08.png" style="zoom:50%;" />

- Application layer : Receiver buffer의 소비자 역할
  - Application layer에서  buffer에 있는 data를 가져다 쓴다.
- Network Layer : Receiver buffer의 생산자 역할

이때 발생할 수 있는 문제점은 다음과 같다.

- **application layer의 소비속도 <<<<<< Network Layer의 공급 속도**
  - **=> receiver buffer가 넘치게 된다.**  == Buffer의  overflow



이러한 문제점이 발생하면 어떻게 할까?

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.42.55.png)

Receiver가 TCP segment header에 있는  receive window에 현재 받을 수 있는 데이터 양을 표시한다. -> 이것을 TCP sender에게 알려준다. 

- 즉, Receiver가 sender에게 buffer가 빠르게 차고 있으니 너무 빠르게 보내지 말라고 sender에게 알려주는 것이다
- 결국은, receive window 공간에 receiver buffer의 남은 양을 알려주면서 overflow가 발생하지 않도록 하는 것이다. 



Receive Window를 참고한다면 TCP flow control의 기본 매커니즘은 아래와 같다. 

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 4.45.35.png" style="zoom:50%;" />

-	TCP Receiver가 TCP Sender에게 rwnd field를 통해서 남은 buffer size가 얼마인지 알려주는 메커니즘이다. 
-	위의 그림이 TCP receiver가 가지고 있는 buffer의 사진이다. 
-	rcvBuffer의 크기는 아래와 같이 설정한다.
  -	Socket option을 통해서 설정한다.
  -	많은 OS가 rcvBuffer을 알아서 조절한다. 

따라서, Receiver로부터 얻은  rwnd, 즉, buffer의 남은 공간을 전달받아. Sender는 아직 **unACKed된 data를 rwnd보다 작게 해서 Receiver에게 보낸다.** 



#### TCP : Connection Management

TCP는  Connection oriented라는 말은  TCP sender와 TCP receiver가 handshaking해야 한다는 의미인데, Handshaking이라는 의미를 

- **handshaking : receiver와 sender가 데이터를 주고 받기 전에 일정한 정보를 교환함으로써 Connection을 만드는 것을 의미한다.** 



그렇다면 Handshake 과정에서는 어떤 일이 일어나는지 알아보자.

- 서로간의 주고받을 parameter들을 교환한다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 5.50.24.png)

1. 보낼 data의 sequence #
2. 받을 data의 sequence #
3. rcvBuffer size
   - 앞으로 받을 수 있는 최대 데이터의 양이 rcvBuffer에 의해서 제한되기 때문이다. 



##### TCP :  2 way handshake - Connection을 만드는 메커니즘 (문제점 있음 )

Connection을 만드는 메커니즘 중에서 가장 간단한 2 way handshaking 메커니즘을 알아보자.

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 5.57.39.png" style="zoom:50%;" />

- sequence # x를 선택하고
- x에 대해서  request하고
- 서버가 ESTAB(establish)로 state를 바꾼다.
- accept를 받았다고 하고
- client가 ESTAB한다.

**이렇게  2 way handshaking을 사용하지만, 문제점이 발생한다.** 

- 서로의 상태를 모르니까 **3 way handshaking을 사용한다.** 
- 네트워크 딜레이가 발생할 수 잇다. 

이를 알아보기 전에 2 way handshaking의 문제점이 어떻게 생기는지 알아보자.



<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 6.02.40.png" style="zoom:50%;" />

1. sequence #를  x로 선택하고
2. x에 대해서  connection을 request하고
3. server가  state를 ESTAB를 하고
4. x에 대한  connection을 accept한다.
5. client가  staet를  ESTAB한다.
6. data x+1을 보내고
7. data x+1을 받고
8. ACK(x+1)을 보내고
9. 종료를 하면 아무 문제가 없다. 

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 6.05.37.png" style="zoom:50%;" />

- 네트워크 딜레이로 인해서 timeout이 발생하여 한 번 더 retransmit re_conn(x)를 하게 되는데, 만약 **retransmit된 request가 connection이 종료된 이후로 서버에 도달한다면** 
  - **맨 아래와 같이 connection 종료 이후에 server state가 ESTAB될 수 있다.** 

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 6.12.12.png" style="zoom:50%;" />

위와 같이 더 심한 상황이 발생할 수 있다. 

- request에 대해서만이 아니라  data에 대해서도 retransmission이 발생할 수 있다.

- connection request와 같이 connection이 종료가 된 이후로 **data를 accept하는 경우**가 잇다. 

  - 위의 상황을 정리하면

    1. **connection request의 timeout으로 connection 종료된 이후로 서버의 state가 ESTAB된다.**

    2. **data(x+1)의 timeout으로 connection이 종료된 이후로 서버가  data를 accept한다.**

       => 따라서  server가 2번 서비스를 제공할 수 있다.

 

따라서 2 way handshaking은

- retransmission에 의한 문제 발생
- packet loss, delay에 대해서 대응할 수 없다.

이와 같은 문제가 발생하기 때문에  TCP에서는 3 way handshaking을 한다.



##### TCP : 3 way handshake

중요한 점은, delay가 길어지기 때문에

- **2 way에 의한 데이터 전송 이후로  확인하는 데이터를 보낼 때에는 보내고자 하는 데이터를 동시에 보내는 기능을 한다.** 

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 6.21.14.png)

- 첫 request에 바로 server가 state를  ESTAB하지 않고 confirm이후(청록색 원의 과정) state를  ESTAB로 바꾼다.
  - 이 과정에서 **payload에 client-to-sender의 데이터를 포함할 수 있다.** 

Client : clientSocket을 생성한다.

Server : serverSocket을 생성한다. -> 이때 listen mode로 설정하는데, server는 client로부터 데이터를 받을 때 까지 기다리는 모드로 들어간다는 의미이다. 

Client : connection함수를 call해서 connection을 만드려고하는 요청을 보낸다. 

-	이때 request msg는 SYNbit = 1, Seq=x 를 포함한다.

Server : (Synbit = 1, ACKbit =1) 설정하고 자신의 **sequence #인 seq=y**와 **server 자기가 기다리고 있는 다음 sequence #를  ACKnum = x+1로 보낸다. **

Client : ACKbit=1을 받았으니  ESTAB state로 바꾸고, client가 기다리고 있는 ACKnum=y+1로 보낸다. 

	-	이때 Payload에 Client to sender data를 포함할 수 있다.



#### TCP : Closing connection

client, server 둘 중 아무나 **FIN bit = 1**을 보내서 connection을 종료할 수 잇다. 동시에 보내도 처리 가능



### TCP : Congestion Control



#### Congestion Control의 원리

Congestion : **너무 많은 source가** **너무 많은 데이터**를  (network가 소모할 수 없을 정도로) **너무 빨리  보내는 것**을 의미한다. 

- N source, D data, S speed,
- 이 3 가지 각각이 너무 큰 상태.

이러한  Congestion 상태에서는 다음과 같은 문제가 발생한다. 

- delay가 길어진다. (Router buffer에서 **Queueing하는 dalay가 커진다. )**
- **packet loss가 발생한다.** (router에서  overflow가 발생한다.)



Flow control vs Congestion Control

Flow control : 하나의 sender가 하나의 receiver에게 너무 빨리 보냄.

- receiver가 rwnd를 통해 **sender에게 보내는 양을 줄여달라고 요청한다.** 

Congestion control : 많은  sender가 많은양을 너무 빠르게 receiver에게 보낸다.ㅏ

- **모든 sender들이(or sender의 일부가) 보내는 속도를 줄인다.** 



####   Congestion의 시나리오 1 : Cause/Cost를 알아보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 6.48.08.png?lastModify=1618394976)

- Router의 **Buffer size : INFINITE**
  - overflow가 일어나서 loss가 되는 경우는 발생하지 않는다. 
- Input, output link : R
- Flow는 2개가 있다.
  - 파랑
  - 빨강
- 여기서는 retransmission하지 않는다.

여기서 빨강 flow를 보자.

- 람다in : Host가 보내는 data rate, 즉, Application layer에서 데이터를 만들어내는 속도
- 람다out : 받는  data rate
  - 람다in이 R/2보다 커질 수는 잇지만, 람다  out은  R/2보다 커질 수 없다.
  - 두 개의 flow가 R을 나눠서 쓰기 때문이다.
- Queueing Delay : buffer가 Infinite하기 때문에 람다in이 R/2에 가까워 질수록 무제한으로 늘어난다. 



#### Congestion의 시나리오 2 : Cause/Cost를 알아보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 7.11.41.png)

- **Router Buffer에 제한이 있다.**
  - 즉, Packet의 Loss가 발생한다. 
- R이 클수록 paket loss가 많이 발생한다.

Application layer 의 input = Application Layer의 output 

- **람다in = 람다out** 이어야 한다.

packet loss가 발생하면 transport layer에서 packet을 다시 재 전송 해야한다. 이를 람다'in이라고 하는데, 보통 람다in보다 큰 값을 가진다.

- 람다'in >= 람다in	(람다'in은 람다in + retransmissions data)



##### perfect knowledge case

만약, 남은 buffer의 공간을  sender가 완벽하게 알고 있다고 가정해보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 7.19.05.png)

- Buffer의 overflow가 발생하지 않도록 조절해보겠다.
  - 발생하지 않는다면 **람다in = 
  - 즉, **람다in=람다out**과 같아진다. 
- 따라서 오른쪽 그래프와 같이 된다. 



##### some perfect knowledge

하지만, 실제 경우는 sender는 모든 router들의 free buffer을 알 수는 없다. 

-> Packet loss를 피할 수 없다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 7.23.23.png)

- 람다'in이 R/2에 가까워질수록 Packet loss가 발생하므로 
  - Application level에서 goodput은 R/2보다 작아지게 된다 .
  - 저만큼의 손실은 retransmission때문에 발생한다.

Congestion이 발생하면 packet loss가 발생하고, 그만큼의 재전송이 필요해서 resource가 낭비된다. 



##### *un-needed* *duplicates* case

packet loss를 알아보는데에는 timerout 매커니즘을 통해서 알 수 있다.

하지만, timer가 만약 작게 설정되어있다면 duplicate한 데이터를 가지게 된다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 7.27.56.png)

- 이 timeout의 설정 값에 따라서 불필요한 값을 retransmission할 가능성이 있기 때문에 
  - packet loss만이 아니라 retransmission으로 발생하는 resource낭비도 생각하여야 하기 때문에 오른쪽과 같은 그래프가 나오게 된다.

이를 통해서 Congestion의 Cost는 아래 두가지로 정리할 수 잇다.



##### Cost of Congestion

- Packet을 retransmission해야한다. (Packet Loss에 대해)
- Unneeded retransmission을 해야한다.

이로인해 Throughput이 낮아지게 된다.



#### **congestion**의 시나리오 3 : Cause/Cost를 알아보자

multi-hop 시나리오이다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.02.31.png)

- 이때 람다in, 람다'in이 커지게 된다면 람다out의 크기는 어떻게 될까?
  - 빨파 router
    - 파 : R을 넘을 수 없다.
    - 빨 : 람다'in이 0
      - => 빨파 router의 input arrival rate은 R보다 작다.
  - 빨파 router
    - 빨 : 무한
      - 빨간색 flow만 살아남는다.
    - **파랑은 도달 못함**
  - 빨파 router의 out에서는 빨간색 flow가 R의 rate를 갖는다.
  - 빨초 router
    - 빨 : 이전 결과에 의해 R의 rate를 가짐. input에서
    - 초 : 무한
      - 빨이 모두 drop되고 초만 살아남는다.
    - **빨강은 도달 못함**
  - **비슷하게 반복한다면, 어떤 host도 목적지로 도달이 불가능하다.**

그 결과를 아래와 같은 그래프로 표현이 가능하다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.13.34.png)





##### Cost of Congestion

- Multi-hop에서 어떤 hop에서 Packet이 drop된다면, 목적지에 도달하기 전 까지의 resource 사용이 물거품이 되어버린다.



#### Congestion Cause/Cost 정리

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.16.13.png)

- Throughput은 capacity를 넘길 수 없다.
  - 여러명의 유저가 있고, user들이 공평하게 resource를 사용한다면, 개인이 사용하는 resource는 1/n을 초과할 수 없다.
- delay가 증가한다.
- loss/retransmission으로 인해 throughput이 감소한다.
- un-needed Duplicated로 인해 throughput이 더 감소한다.
- multi-hop에서 transmission에서 현재 hop의 drop은 이전 hop의 transmission을 모두 물거품으로 만든다.



#### 해결방법

##### End-end congestion control

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.19.33.png)

- Sender와 Receiver가 협력해서 Congestion을 줄인다.
- 둘이 명시적으로 정보교환을 해서 협력은 하진 않지만, 
  - Sender가 Loss, delay가 발생하고 있음을 인지하고 **추론을 하여 해결한다.**
    - 추론이 항상 정확하지 않기 때문에 정확한 control을 할 수 없을 수가 있다.

구조상 간단한 장점으로 TCP 방식에서 사용한다.



#### Network-assisted congestion control

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.21.07.png)

- Router가  Congestion에 대한 정보를 알고 있기에 전달해줄수 있다.
  - ECE flag : Explicit하게 router가 피드백을 해줌
    - router가 queue가 거의 찼다는 신호를 보내줌
      - 이 신호를 sender와 Receiver에게 전달해준다.
- 이와 같은 방법들이 TCP ECN, ATM, DECbit protocols



### TCP : Congestion Control



#### **TCP congestion control: AIMD**

TCP의 가장 기본적인 메커니즘을 이르는말은 AIMD이다.

- **Additive Increase**
- **Multiplicative Decrease**

앞글자를 따서 AIMD라고 한다. 특히 이 이름으로부터 메커니즘을 알 수 있는 아주 쉬운 방법인데,

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.35.44.png)

1. **Packet loss가 발생하기 전**
   - **Sending rate을 조금씩** 증가시킨다. (Additive Increase)
2. **Packet loss가 발생한다.**
   - Sending rate를 절반으로 감소시킨다. (Multiplicative Decrease)



Additive Increase : 매 **RTT**마다 Sending rate를 **1 증가시킨다.**

Multiplicative Decrease : **Loss가 발생**하면 Sending rate를 **1/2 해준다.**



##### Multiplicative Decrease의 디테일

- **TCP Reno** : 3개의 Duplicate ACK를 받게되면 **sending rate을 1/2로 만든다.**
- **TCP Tahoe** : **timeout을 통해 packet loss**가 발견되면  **sending rate을 1로 만든다.**



AIMD는 왜 쓰나? -> TCP sender들이 정보를 교환하지 않고 다른 동기화 정보 없이 사용이 가능하다.



#### TCP congestion Control : details

동시에 보낼 수 있는 Packet의 양을 조절함으로써 network에서 congestion이 발생하는 것을 조절할 수 있다.

이때 중요한 것이 cwnd로 congestion window이다. -> cwnd를 늘리거나 줄임으로써 TCP Sender가 동시에 보낼 수 있는 data의 양을 조절한다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 8.53.47.png)

- 초록 : 보냈고 ACK
- 노랑 : 보냈지만, 아직 notACK
- 파랑 : 보낼 수 있지만 아직 보내지 않은 Packet
- 회색 : window 밖에 있는 packet
  - window size 밖에 있기 때문에 전송할 수 없다.

LastByteSend - LastByteAcked <= cwnd

즉, 노란색의 영역이 cwnd를 넘어갈 수 없고 ACK가 와서 cwnd가 옮겨 가야만 전송이 가능하다.

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 9.55.33.png)

- TCP rate은 
  - cwnd에 비례 : window size가 커질수록 보낼 수 있는 양이 증가함.
  - RTT에 반비례 : ACK을 받는 시간이 오래 걸리면 TCP rate이 감소함.



#### TCP : Slow start

cnws, 즉, transmission rate를 Exponentially하게 증가시키는 것이며, 아래 그림과 같이 진행된다.

<img src="/assets/images/post/computer networking/스크린샷 2021-04-14 오후 10.12.03.png" style="zoom:50%;" />

- 초기 cwnd : 1MSS
  - 매 RTT마다 cwnd를 2배 해준다. (모든 ACk가 받아질 때 마다 2배로 증가시킨다.)

이것이 Slow start인 이유 :  처음 1 부터 시작하기 때문에



#### TCP : Slow start에서 Congestion을 피하는 방법

마냥 cwnd를 2배로 했다가는 Exponential 특성으로 인해서 급격한 증가로 congestion이 발생할 것이다. 그렇다면 Slow start에서 congestion을 해결하기 위한 방법으로 무엇이 있을까?

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 10.23.31.png)

- 어느 순간 부터는 Exponential 하게 증가하는 것에서 Linear하게 증가하는 방법을 사용한다.
  - **어느 순간부터 Linear하게 증가하는 이유 : 최적화된 cwnd에 가까워졌기 때문이다.** 

이 방법을 Congestion Avoidance Phase라고 한다.

- Linear만 사용해서 최적 cwnd값에 도달하기에는 너무 시간이 오래 걸린다.
- 따라서 Exponential하게 증가하다가  linear하게 증가하는 방법을 사용하여 optimal한 cwnd의 값을 찾아낸다. 

**그렇다면, 이 ssthresh(slow start threashold)를 어떻게 잡아야하나**

- **이전 경우에서 loss가 발생했을 경우의 1/2 cwnd를 잡는다.**
- 1/2배 



![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 10.30.54.png)

공통 : 이전 packet loss가 발생했던 cwnd의 절반을 ssthresh로 잡는다.

3 duplicated ACK가 발생

- TCP Reno가 하는 것처럼 한다.: loss가 발생하면 절반에서 linear하게 시작
  - 3 duplicated ACK가 발생하면 바로 congestion avoidance로 실행

timeout에 의한  loss 발생

- TCP Tahoe가 하는 것처럼 한다.: loss가 발생하면 1에서 부터 exponential하게 증가하다가 ssthreash에서부터는 는  linear하게 증가시킨다. (ssthreash부터는 congestion avoidance 실행 )



#### TCP : Congestion control 요약

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 10.37.27.png)

1. Slow start 
   - timeout
     -  ssthresh = cwnd/2로 설정
     - cnwd = 1로 설정
     - dupACK = 0으로 설정
   - ACK 도착
     - cwnd = cwnd + MSS : 도착할 때 마다 하나를 더 보내니까, exponential하게 증가한다.
   - Duplicated ACK 3개 도착
     - ssthresh = cwnd/2
     - **cwnd = ssthresh + 3** : 왜 3개일까..
2. Congestion avoidance
   - ACK도착
     - cwnd = cwnd + (MSS/cwnd) : Linear하게 증가한다. 
   - Duplicated ACK 3개 도착
     - ssthresh = cwnd/2
     - **cwnd = ssthresh + 3**
3. Fast recovery
   - ACK 도착
     - cwnd = ssthresh 설정하고 Congestion avoidance상태로 돌아간다.



#### TCP : CUBIC, Congestion control 방법

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 11.04.26.png)

- Wmax : congestion loss가 발견 되었을 때 sending rate를 기억하고 있는다.
- 이때, Congestion 상태는 쉽게 바뀌지 않는 것이라고 생각하면
  - 이전에 Linear보다 빨리 증가하는 **파랑색 메커니즘**을 사용한다.
    - **Wmax까지는 빠르게 올라가다가 가까워지면 조금씩 증가한다.**



큐빅이라고 불리는 이유도 Wmax를 지나면 3차함수로 바뀌기 때문이다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-14 오후 11.08.42.png)

- Wmax를 통과하면 매우 빠르게 증가하는 모습을 볼 수 있다. 
  - Wmax를 통과 : Congestion level이 바뀌었다고 생각하고 probing을 적극적으로 해서 새로운 point를 찾으려고 한다.



#### TCP : Bottleneck Link

네트워크에서 Congestion상황을 설명할 때 많이 쓰는 용어로 Bottleneck link라고 표현한다. 

- 병목현상 : 좁은 도로를 많은 차들이 통과할 때 발생하는 현상

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 5.59.57.png)

- 특정 Router에서 Traffic이 몰려 delay가 발생할 수 있다.
  - 이렇게 Congestion이 발생하면 Delay와 Loss가 발생한다. 

이런일이 일어날 때, Bottle neck Link에서 어떤 일이 일어나는지 알아보게 된다.

- End-End Throughput은 증가하게 되어도, Router에서 Bottleneck 현상이 일어나면 증가하지 않게된다.
  - **Router의 Buffer가 거의 차지 않을 만큼으로 보내는 것이 이상적인 sending rate가 될 것이다 .**



#### TCP : Delay based Congestion control

기존 Congestion control의 문제점

- loss, 3개의 duplicate ACK가 발생해야 **Congestion control Action**을 취한다.
- 하지만, Congestion Control을 하기까지 시간이 오래 걸리므로 그동안 Loss가 계속 발생한다.
  - 결국 문제가 생기고 난 뒤에 해결하는 방법이므로 시간이 오래걸린다.

=> 그렇다면 **Congestion Window**를 조절하는 과정에서 다른 방법을 알아보고 싶다. 



그 방법이 **Delay**이다. -> **Delay를 보고 Congestion Window를 Control하자.**

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 6.11.19.png)

- Throughput = cwnd(한 RTT동안보낸 Byte크기) / RTTmeasured
- RTTmin : 두 Host간의  Router가 거의 차지 않았을 때, Queueing delay가 없다.

**uncongested Throughput : cwnd/RTTmin**

- Congested되지 않았을 때 Throughput임을 알 수 있다.
  - 측정 Throughput -> uncongested Throughput과 근접 : Congest된 Path가 아니므로 **cwnd를 Increase해준다.**
  - 측정  Throughput -> Uncongested Throughput보다 한참 떨어짐 : Congest된 path이므로 **cwnd를 Decrease해준다.**



즉, **Loss가 발생하기 전**에, **RTT의 변화**를 보고 **Congestion Control**을 하겠다는 의미이다. 



#### TCP : Explicit Congestion Notification

지금까지 배운 Congestion Control은 implicit 했다. Router에서 Loss 발생 여부를 **Sender가 임의로 추정하는 방식이었다.**

- Packet loss, Delay와 같은  event를 통해서 Congestion이 되었구나 하고 추정을 한다.



![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 6.48.40.png)

이번에는 **Explicit한 방법을 알아볼 것이다.** Congestion이 발생한 Switch나 Router가  Sender에게 Congestion이 발생했음을 알려준다. (Router가 협력해서 하는 방식이다.)

- **Network Layer, Transport Layer** -> 서로 협력을 한다.
  - IP datagram을 보면 **ECN**비트가 있다.
    - 지금 보내는 data는 이런 COngestino Notification에 대해서 반응할 수 있다는 정보를 Router들에게 알려준다.

1. IP datagram의 **ECN=10** 이 네트워크를 통과해가다가 Buffer가 **Overflow가 났거나** **Overflow가 나려고** 하는 Router들이 **ECN = 11**로 변경해준다.
2. 이 Receiver가 **ECN=11**로 변경된것을 보고 data가 오는 경로에 overflow가 발생했구나를 알고 ACK를 보낼때 **ECE = 1**로 변경해서 보내면 TCP sender는 ACK를 받고 Router에서 Buffer overflow가 발생했음을 사전에 알 수 있다.
3. Sender는  sending rate을 조절한다.



#### TCP : Fairness

유저들이 여러개 있을텐데, 유저들간의 throughput이 공평하게 나누어져 있는지에 대한 내용.

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.04.59.png)

K의 TCP session이 있을 때 각자가 R/K만큼의 bandwidth를 차지하고 있는지.



예시로

AIMD 메커니즘이 TCP fair를 가져갈 수 있는지에 대해 논의해보자.

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.08.04.png)

- Flow 1의 Throughput
  - Flow 1이 R에 가깝게 보내고 있다면 Flow 2는 Throughput이 작아진다.
  - 이를 참고하여 Flow 1이 조금씩 줄여서 보낸다면 뺀 만큼 Flow 2가 가져갈 수 있다.
- Flow 2의  Throughput

**파란 선 : Throughput1과 2의 합이  R이되는 지점을 연결한 것이다.**

- 파란선 위에서 Flow1과 Flow2가 보내는 Sending rate의 합이 R이다.
- 파란선 아래보다 있다고 가정해보자.
  - flow1과 Flow2의  Sending rate의 합이 R보다 작다 = Under Utilize되어 있다는 것이다.
- 파란선 위에 있다고 가정해보자.
  - flow1과 Flow2의  Sending rate의 합이 R보다 크다. = 라우터가 처리할 수 있는 양보다 더 많이 보내고 있으므로 Loss가 발생한다.

**점선 : Fairness와 관련된 라인이다.**

- 이 라인에 있으면 flow1과 flow2가 같은 양의 데이터를 보내고 있다.



우리가 궁극적으로 가고자 하는 목표 : **점선과 파란선의 교점**



![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.16.57.png)

그래프를 보고 AIMD메커니즘을 적용하면 빨간선처럼 움직인다.

- 처음에는  Linear하게 증가함.
- 파란선을 넘으면 Loss이므로 Throughput을 절반으로 감소시킨다.
- 다시  Linear하게 증가함
- 절반으로 감소..

**이러한 AIMD의 메커니즘이 반복될수록 Fairness line에 다가가고 있음을 알 수 있다.**

=> 어떠한 점에서 시작하더라도 Fairness line에 도달할 수 잇다.



#### TCP : 변화와 진화

- moving transport–layer functions to application layer, on top of UDP
  - HTTP/3: QUIC

TCP는 원하는 만큼 데이터를 보낼 수 없으니까 UDP를 application 단계에서 Reliable transfer을 구현하여 이를 대체하려고 한다.



#####  QUIC : Quink UDP Internet Connections

UDP위에 있는 Applicatoin layer protocol 

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.44.33.png)

QUIC은 Application layer protocol이지만, 이전에 우리가 배운 

Connection Establish, error control, Congestion Control을 포함하고 잇다.

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.47.21.png)

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.49.02.png)

**QUIC : 1 handshake** 

![](/assets/images/post/computer networking/스크린샷 2021-04-15 오전 7.49.56.png)



-Reference-

James F. Kurose, University of Massachusetts, Amherst, Keith Ross의 『Computer Networking, 8th Edition』

