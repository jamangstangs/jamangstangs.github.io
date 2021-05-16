---
 title: Computer Networking 2

toc: true

use_math: true

categories:

 - Computer Networking

---

## Network Application의 기본 원리

### 목표

application layer는 transport layer위에 존재한다. 우리가 어떤 application을 만들때 **application layer**는 **transport layer가 제공**하는 여러가지 **서비스를 사용한다.** 이때 우리가 주목할 것은

- Transport layer가 제공하는 service의 모델
- Application이 가지고 있는 기본적인 동작방법 
  - **client-server paradigm**
  - **peer-to-peer paradigm**
- Application Layer의 protocol을 알아보자.
  - HTTP
  - SMTP, IMAP
  - DNS
- Network Application 만드는 방법
  - socket API

### Network Application 개발하기

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 8.13.42.png" style="zoom:50%;" />

- end system에서 사용할 프로그램을 만드는 것이다. 
- 이러한 Application들이 서로 데이터를 주고받는 **통신을 한다**
  - Web server software <-> Web client software
    - 이러한 software들이 application이다.
- layer가 있기에, application 개발 단계에서는 다른 layer와 관련된 일을 신경 쓸 필요가 없다.
  - Application 개발 단계에서는 transport가 제공하는 서비스들을 사용해 개발한다.
  - 따라서 **Network core**와 관련된 프로그래밍은 **할 필요가 없다.**



#### Application 개발 방법 : Client-Server Paradigm

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 8.27.42.png" style="zoom:50%;" />

- Server
  - 항상 **켜져 있다**
  - IP 주소가 **고정**되어 있고 알려져 있다. 
  - scaling문제로 **데이터 센터에서 제공된다.**
- Client
  - **간헐적**으로 **연결**이 된다. 
  - IP주소가 **동적**이다.
  - Client끼리는 직접 톤신하지 않는다.

예시 : HTTP, IMAP(이메일을 위한), FTP



#### Application 개발 방법 : Peer-to-Peer paradigm

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 8.27.53.png" style="zoom:50%;" />

- **모든 peer들이 server, client 역할을 한다.** 
  - service를 **제공**
  - service를 **요구**
    - 따라서 peer끼리 서로 직접 통신한다. 
- Peer가 새로 생긴다.
  - service를 **제공** : service capacity가 증가한다. 
  - service를 **요구** : service demand가 증가한다. 
- 디자인 패러다임으로 인해서 아래와 같은 문제가 발생한다.
  - Service를 수요하기만 하는 Selfish Peer가 발생한다. 
    - 제공하는 peer에게 인센티브를 준다.
  - intermittently하게 연결이 되고 IP주소가 바뀐다.
    - 어떤 peer가 원하는 데이터를 가지고 있는지 특정하기 어렵다.

예시 : P2P file sharing



### Process communicating

- **Process** : Executable file을 실행시켜서 memory로 올리고, instruction으로 점프해서 실행이 되는 것.

그렇다면, Process 사이에 Communication이 필요할 텐데,

- Process들이 같은 Host 내에 존재함. 
  - <img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 8.50.40.png" style="zoom: 33%;" />
  - **Inter Process Communication (IPC)** 방법을 사용
  - Process2를 Server Process라고 가정하자.
    - Process2는 다른 Host로부터 Packet을 받고, 본인이 스스로 Process request를 제공하는 것이 아니라. Child Process를 만들어 이 **Child Process가 request를 서비스하도록 운영한다.**
    - Parent Process - Child Process간 data 교환이 필요한데, 이때 사용하는 것이 IPC이다.
  - ![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 8.57.24.png)
  - 1. Parent fork()해서 child process 만든다.
    2. Kernel에서 pipe를 만들고 Pipe에서 data를 교환한다.
- Process들이 다른 Host 내에 존재함.
  - **Messages** 를 network를 통해 process끼리 주고 받아야 한다. 

Clients, Servers는 아래와 같은 process를 가지고 있다.

- Client Process : Communication을 시작한 process
- Server Process : Contact를 기다리는 process

이를 참고하면, P2P와 같은 아키텍쳐에서는 모든 Application들이 Client, server Process를 동시에 가지고 있다.

#### Sockets 

위에서 Host안에서 IPC는 보았다. 그렇다면 도대체 다른 Host에 있는 Process들 끼리 data를 어떻게 주고 받을까?

=> **Socket** 이라고 하는 Interface를 통해 가능하다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 9.06.12.png)

Application Layer는 transport 위에 있는 Layer로 transport layer가 제공하는 서비스를 사용한다. 이것을 사용하는 통로가 **Socket**이다.

- Socket
  - 같은 Host 내의 Process가 IPC를 통해 data를 주고 받듯이
  - **Socket이라는 Interface를 통해서 다른 Host의 Process와 data를 주고 받는다.**

##### Addressing Proecsses

Socket으로 다른 Host에 존재하는 Process에게 메세지를 보낼 수 있기에, 다른 Host에 존재하는 **Process를 지정**해야 통신이 가능하다. 이때 **Identifier**가 필요하다.

Identifier는 다음과 같이 구성되어 있다.

- **IP address** : Network layer에서 address 메커니즘으로 사용
  - **Host**가 32 bit의 **고유의 IP 주소**를 가진다.
- **port numbers** : transport layer에서 address 메커니즘으로 사용
  - Host내에 **여러개의 Process**를 구별하기 위해 **각기 다른 Port number**를 가진다.
  - HTTP server : 80, mail server : 25



#### Application layer protocol 정의

- Type of messages exchanged
  - request, response
- Message Syntax
  - 어떤 필드를 가지고 어떤 범위의 값을 가져야 하는지
- Message semantics
  - 필드 안의 정보의 의미
- Rules
  - 메세지를 언제 보내고 어떻게 반응해야 하는지
- open protocol : 기존에 존재하는 protocol
  - HTTP, SMTP
  - RFCs에 정의되어 있다. 누구나 protocol 정의를 사용할 수 있다. 



### Transport Layer가 제공하는 서비스

- Data intergrity(완전성)
  - 몇몇 application들은 완전한 data 전송을 요구한다. (No drop, loss)
- Timing
  - 몇몇 application은 real-time으로 전송해야 한다.
- Throughput 
  - Minimum으로  Throughput을 고정해야 하는 경우가 있다. 
  - Elastic application : throughput 보장이 필요 없다.
  - Multimedia : Throughput 보장해야 한다. 
- Security
  - Encryption

4가지 중 일부만 제공해서 transport layer가 무거워지니 최소한만 적용한다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 9.34.07.png)

보통 3가지 측면 살펴본다.

- Data loss : Packet loss허용하는지 안하는지
- throughput : 최저 속도제한이 필요한지 안필요한지
- Time sensitivity(Delay) : Time delay가 문제가 되는지 안되는지



#### Transport Protocol 

- **TCP Service**
  - reliable transport : Packet loss가 없다. 보내는 순서 보장
  - flow control : Sender의 성는이 좋아 Receiver가 따라가지 못할 때 전송하는 속도를 줄여달라고 요청이 가능. flow를 control함.
  - congestion control : Network가 overload 되지 않았는지 확인하고 data를 전송함.
  - **timing, minimum throughput, security 제공안함.**
  - **connection oriented** : sender와 receiver가 handshaking을 통해 누가 sender이고 receiver인지 명시한다. 
- **UDP Service**
  - unreliable transport : Packet loss 신경안씀
  - **reliability, flow control, timing, minimum throughput, security 제공안함.**
  - 그러면 왜 사용? 
    - **시간지연이 엄청 적다.**

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 10.53.48.png)



#### Securing TCP

Transport Layer는 다양한 서비스를 제공한다고 배웠지만, TCP와 UDP는 Security 기능을 제공하지 않는다. 

- 이를 위해서 Transport Layer Security (TLS)의 라이브러리 형태로 제공이 된다. 



## Application Layer의  Example

web, email, DNS와 같은 것들이 대표적인 예시이다. 



### Web and HTTP

Web page는 **Object**로 구성이 되어있다.

- Object : HTML, JPEG, Java, audio ...

이러한 Object들을 URL로 접근이 가능하다. 아래와 같이

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-10 오후 11.02.23.png)

- URL (Uniform Resource Locator) : Host name와 Path name으로 이루어짐.



### HTTP overview

HTTP : HyperText Transfer Protocol

HTTP는 Client-Server모델을 사용하는 모델임을 지난 주제에서 말을 했었다.

- Client - Server 모델
  - Client = Web Browser : server로 request하고 receive한 Web object를 display한다.	-> HTTP를 사용한다. 
  - Server = Web Server : client로부터 온 request에 반응하여 Web object를 Web server로 send한다. -> HTTP를 사용한다. 
  - 

#### HTTP의 Transport Layer 활용

HTTP는 transport layer로 TCP를 활용한다. 

- Client가 Server에게 **HTTP request를 Server에 보내기 전**에, Client는 Server에게 먼저 **TCP connection을 만들어야** 한다. 
  - Connection을 만들 때 port 번호는 80번을 쓰며, server가 port번호를 다른것을 쓰면 client가 맞춰줘야 한다.
- Connection이 만들어지면 **HTTP request, HTTP response**가 가능해진다. 



#### HTTP는 Stateless

server가 과거 client의 request정보를 저장하지 않으며, 따로 저장하려면 다른 방법을 사용해야 한다. 



#### HTTP connections : 두 가지 타입

##### **Non-Persistent HTTP **

**TCP connection이 매 HTTP request마다** 만들어진다. 하나의 Object를 보내면 TCP connection이 끊긴다. 

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 2.09.30.png)

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 2.09.34.png" style="zoom:50%;" />

1. HTTP Client가 TCP Connection을 HTTP server에게 요청한다.
2. HTTP server가 TCP Connection을 수락한다.
3. HTTP client가 HTTP request Message를 TCP connection socket을 통해 보낸다.
4. HTTP server는 request message에 대해서 responst message를 보낸다.
5. **HTTP server가 TCP Connection을 종료한다.**
6. HTTP Client가 Object를 받는다.
7. 다시 1-7까지 반복한다.

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 2.14.01.png" style="zoom:50%;" />

- RTT (Round Trip Time) : Forward, Backware delay의 합이다. 즉, **왔다 갔다 하는 딜레이**

  - 1 RTT : TCP connection 만들기 위한 RTT
  - 1 RTT : HTTP request와 HTTP responst를 위한 RTT
  - object/file transmission time

  => 하나의 Request처리 = **2RTT + object transmission time**

  

##### Persistent HTTP 

**TCP connection을 계속 연결해 둔다**. 여러개의 Object를 하나의 TCP connection 을 통해서 보내진다. 

- TCP Connection을 만들고, 나중에 request가 종료되어도 TCP Connection을 유지한다.
- 따라서, **평균적으로 모든 object에 대해 1 RTT**가 걸린다.



#### HTTP Message

##### HTTP message의 기본 형식

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 3.48.47.png)

- Header
- blank line : Header와 Body를 나눔.
- Body (Optional)

모든 HTTP message의 형식은 위와 같다.

##### HTTP request message

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 3.54.45.png)

- Header

  - **Request Line** 

    - **HTTP verb, URL, HTTP version name**으로 구성됨.

      - ```http
        GET /home.html HTTP/1.1
        POST /index.html HTTP/1.1
        DELETE /query.html HTTP/1.1
        ```

    - Optional Request Headers 

      - Request의 특성을 설명하기 위해서 있다. 
        - name : value, name : value
      - **Response Headers와 형태가 똑같다.**

- blank line : Header 와 Body를 나눈다. 
- Body (Optional)
  
  - Additional Information

##### HTTP response message

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 3.48.47 복사본.png)

- Header

  - **Status Line** : Header의 첫줄이며, 아래와 같이 이루어짐.

    - **HTTP version**

    - **Status Code & Reason Phrase** 

      - Reasong Phrase는 Status code를 영어로 설명한 것.

      - ```c
        "200 OK"
        "404 Not Found"
        "403 Forbidden"
        ```

  - **Optional Response headers**

    - **Name : value** 쌍으로 적혀있다.
    - **Request Headers와 형태가 똑같다.**

- blank line : Header 와 Body를 나눈다. 

- Body (Optional)

  - Request message의 요청의 resource를 넣는다.



##### 비교

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 3.59.41.png" style="zoom: 25%;" />

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.00.00.png" style="zoom:25%;" />



##### Request Message에서 사용 가능한 verb

- POST method : 클라이언트에서 서버로 데이터를 보낼 때 사용

  - HTTP POST request message body안에 데이터를 넣어서 보낸다. 

- GET method : 서버로부터 데이터를 받아오는데 사용

  - 하지만, GET으로 서버에 데이터를 클라이언트로부터 보낼 수 있다.
  - ? 이거를 URL 부분에 추가해서 데이터를 server로 전송이 가능하다.

- HEAD method

  - HEAD정보만 받아와서 display한다. 

- PUT method

  - 서버에 파일을 업로드하거나 업데이트한다.
  - 추가적인 인증을 해야 데이터를 server에 저장할 수 있다. 

  

#### Cookies

HTTP : 서버는 클라이언트가 이전에 보낸던 **state를 가지고 있지 않다.**

​	-> 서버가 훨씬 효율적으로 운영되기 위해서 기본값이 이렇다.

하지만, 어떤 경우 장바구니. 사용자 아이디 유지와 같은 경우가 있기에 **state를 가지고 있어야 할 수도 있다.** 이때 사용되는 것이 **Cookie**이다. 

Cookies : Server 와 Client간의 정보를 관리 유지할 수 있도록 해주는 기술이다. 

##### 작동 방법

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.27.47.png)

1. client가 server에게 request를 한다. 
2. 1678이라는 ID를 amazon server에 만들어, HTTP Response message에 
   - set-cookies : 1678 이라고 response message에 적어서 client에게 보내준다. 
   - 그리고 1678이라는  user가 했던 state들을 database에 저장한다. 
3. Client가 다음에 server가 준 쿠키를 저장하고, 다음에 server에 request를 할 때, HTTP request message에
   - cookie : 1678 이라고 server로 보낸다. 
4. server입장에서는 1678이라는 유저가 다시 오면, 어떤 action들을 database로 부터 알게 된다. 



#### Web caches (Proxy servers)

proxy는 대신이라는 의미를 가지고 있다. 

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.35.30.png)

Client가 original server에게 request를 보냈을 때 중간의 Proxy server가 Original server를 대신해서 미리 저장해놓은 정보를 Client들에게 보내준다.

- original server에서 가져오는 것 보다 더 빠르게 가져올 수 있는 장점이 있다. 
- Traffic을 줄일 수 있다. 
- ISP에 의해서 설치된다. 

따라서 web cache는 두 가지 역할을 동시에 한다. 

- Client에게는 **Server의 역할**
- original server에게는 **Client의 역할**

##### Caching Example

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.42.57.png)

- Acces Link rate : 1.54Mbps
- RTT : 2sec
- web object size : 100K bits
- Average request rate form browsers to origin servers : 15/sec (초당 15회)
  - average data rate to browsers : 1.50Mbps (100Kbits * 15/sec)

LAN Utilization : 0.0015 -> 1.50Mbps / 1Gbps

access link utilization : 0.97 -> 1.50Mbps / 1.54Mbps

utilization이 97%이면 딜레이가 많이 생긴다. 따라서 end to end delay는 다음과 같다.

= internet delay + Access Link delay + LAN delay



###### 해결방법 1

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.48.44.png)

- bandwidth를 더 산다.



###### 해결방법 2

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.49.03.png)

- Local web cache를 설치한다. 

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.51.35.png)



##### Web Cache는 Client에서도 제공이 가능하다. 

우리가 한 번 access한 이미지나 file들을 local에 저장해서 client가 이미 방문한 web site를 다시 방문하게 되면 local로 부터 데이터를 가져와서 다시 display한다. 

이럴때, client가 server에게 GET을 보낼 때 **Conditional GET**을 사용할 수 있다. 

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 4.55.32.png" style="zoom:50%;" />

1. 이 시간 이후로 server에서 변경된 것이 있는지 물어본다.
   - 없다면 변경되지 않았다는 message만 보낸다.
   - 없으니까 Client가 web cache로부터 (Local 저장소)에서 불러온다.
2. 이 시간 이후로 server에서 변경된 것이 있는지 물어본다.
   - 있다면, 변경사항이 있다는 메세지와 함께 data를 server에서 보내준다. 



#### HTTP version 2 (HTTP/2)

Multi object HTTP request의 딜레이를 줄이고자 하는 목적이 있다. 



##### HTTP1.1

FCFS의 schedule을 가지고 GET request가 실행된다. -> 용량이 큰 data를 보내느라 용량이 작은 데이터가 전송이 안될수도 있다. 

- ex : 작은 image먼저 보내고 큰 image를 보내느라 못 보낸다. 
- 이 문제를 **HOL** **blocking Problem**이라고 한다. (**head of line blocking problem**)
  - 앞에 있는 line에서 오래걸리니까 뒤에 있는 애들이 기다려야 하는 상황을 뜻함.

실제로 HOL Blocking problem은 **web 뿐만 아니라 다양한 switching문제에서도 발생한다.** 

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 5.11.54.png)



##### HTTP/2

server가 전송하는 순서에 대한 **flexibility**를 가지고 있다. 

- Client가 제공하는 Object priority에 대해서 requested object의 전송 순서를 결정할 수 있다.
- object를 frame으로 나눠서 전송할 수 있다. 

HTTP/2가 사용하고 있는 HOL blocking을 줄이는 방법은 아래와 같다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 5.16.47.png)

- Frame으로 나눠서 interleaving된다.



##### HTTP/3

QUIC이라는 프로토콜을 통해서 진행이되고 있다.

QUIC(quick UDP Internet Connections)

- UDP는 조건이 제한적이지만, delay가 적다. 우리가 원하는 전송 rate를 확보가 가능하다.
- 그 외에 필요한 기능은 Layer을 새로 만들어서 제공한다는 개념이다. 

QUIC : 초기에 접속하는 속도가 빠르다. 



### E-mail, SMTP, IMAP



#### E-mail

이메일에는 크게 세가지 요소가 있다.

- **user agents** : 이메일 사용자가 사용하는 **Client**

  - 편지를 작성, 읽기
  - Outlook, gmail

- **mail servers** : server이며, 아래와 같이 **두 가지**로 구성되어 있다. 

  - mail box : 사용자에 대해서 **수신된** email을 보관하는 장소
  - message queue : 사용자가 **보내려고** 하는 email을 보관하는 장소

- simple mail transfer protocol (**SMTP**) : mail server간에서 사용되는  protocol

  <img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 6.27.36.png" style="zoom:50%;" />

  - user agent -> mail server로 email을 전송한다.
  - mail server는 email을 message queue에 보관하고 있다가 다른 **email server**로 메세지를 전송한다.
  - 전송받은 email을 mail box안에 보관하고 있다가 user agent들이 mail server에서 메세지를 받아간다.

  1. 이때 Email server들 간에 사용하는 protocol이 **SMTP**이다.
  2. 유저가 자신의 email server에게 보내는 것도 SMTP이다. 
  3. client : 보내는 email server
  4. server : 받는 email server



#### SMTP

SMTP라고 하는 protocol은 RFC (5321)에 정의되어 있다. Email을 전송하기 위해서는

- TCP가 필요하다.
-  **Port number은 25번.**

 <img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 6.34.22.png" style="zoom:50%;" />

- Sending server가 receiving server에 데이터를 보낸다.
  1. Hangshaking : 받는 서버가 살아있는지
  2. message 전송
  3. closure



#### Email 시나리오

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 6.37.46.png)

1. Client가 email server로 email을 전송한다.
2. **SMTP**로 보낸다.
3. alice의 message가 alice의 mail server의 **Message queue**에 저장된다.
4. **SMTP**로 보낸다.
   - bob123**@gist.ac.kr** 이거로 이메일 서버를 파악한다.
5. Alice가 message가 bob의 email server의 **mail box**에 있다.
6. **IMAP, HTTP 와 같은 형태로 자기 mail box에 있는 message를 받아온다.



#### HTTP vs SMTP

**차이점**

- HTTP : server로부터 데이터를 가져온다.
- SMTP : client가 server에게 message를 보낸다.



- HTTP : 각 Object가 response message안에 각자 포함
- SMTP : Multiple Object가 하나의 message안에 들어간다.



- SMTP : connection이 연결되면 여러개의 email을 전송이 가능하다.
- SMTP. : body안에 ASCII만 가지고 있어야 한다. 그렇지 않는 경우에는 ASCII code로 변환해야한다.

**공통점**

HTTP나 SMTP는 둘 다 ASCII code를 사용한다.



#### Mail Message format

SMTP는 **RFC 5321**에 정의되어 있다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 6.50.28.png)

- Header
  - To, From, Subejct(제목)
- Body : 
  - 여기에는  message 내용이 담기게 된다. 



#### Mail Access Protocol

SMTP : 메일을 전송하는데 사용되는 프로토콜

IMAP & POP : 메일을 받아오는데 사용하는 프로토콜

- Message가 서버에 저장되어 있고, **IMAP은 그 서버와 동기화 하는 방식으로 운영**이 된다. 



### DNS (Domain Name System)

인터넷에서 중요한 프로토콜 중 하나로 Host가 가지고 있는 **IP address**와 쉽게 기억할 수 있는  **name**을 mapping하는 서비스이다. 

- **IP address - name**
  - 이 IP 주소를 기억하는 것만으로는 어렵다.
  - 따라서 이름을 이 주소에 mapping시켜준다.
- **192.112.144 - "www.gist.ac.kr"** 이런식으로

또한, DNS는 아래와 같은 **특징이** 있다.

- **Distributed Database** : 하나의 server가 모든 정보를 저장할 수 없으므로 hierachy를 가지고 있는 **name servers**들로 구성이 된다. 
- **Application Layer Protocol** : Application 단계의 Protocol이므로 Transport Layer로  UDP를 사용한다.



#### DNS : 서비스와 구조

DNS가 제공하는 서비스

- **hostname을 IP address로 변환한다.**
- host aliasing을 지원한다.
  - host가 하나의 진짜 이름을 가지고 있고, 그것이 별명을 가진다는 것을 의미한다. 
  - 하나의 서버에 web service, email service를 제공할 수 있다.
  - 이 service들에게 **각기 다른 이름**을 줄 수 있다. 
- mail server aliasing
  - gist.ac.kr 이라는 메일 주소는 실제 서버명과 다르기 때문에 name에 맞는  server로 보내줘야하기 때문에 mail server에서도 aliasing을 해준다.
- Load Distribution
  - 공식적인 서버 1개, 물리적인 서버 2개가 있을때, 하나의 서버에 overload되면 service quality가 낮아지므로 이것을 분산할 수 있다. 

DNS의 구조

-	Distributed Database
  -	**Not centralize** : centralize된 server가 망가지면 동작하지 않기 때문에 분산이 되어있다.
  -	Traffic이 많이 생기므로 분산됨
  -	많은 request가 생기므로 분산되어야 한다.
    -	DNS server가 600billion의 DNS queries를 하루에 처리한다. 



#### Window nslookup

```c
> nslookup www.gist.ac.kr
// 여기는 기본 DNS 서버
서버 : 	UnKnown
Address : 192.168.3.1
// 여기는 www.gist.ac.kr의 IP 주소
이름 :  www.gist.ac.kr
Address : 203.237.32.150
  
> nslookup ns.gist.ac.kr
// 여기는 DNS 서버
서버 : 	UnKnown
Address : 192.168.3.1
// 여기는 학교 DNS 서버의 IP 주소
이름 :  ns.gist.ac.kr
Address : 203.217.32.100
  
> nslookup some.gist.ac.kr 203.217.32.100
// 여기는 DNS 서버 (학교의 DNS서버가 나오게 된다.)
서버 : 		ns.gist.ac.kr
Address : 203.217.32.100
// 여기는 학교서버에서 파생된 서버의 IP 주소 
이름 :  some.gist.ac.kr
Address : 210.107.184.131
```

- 분산된 곳이라 여러가지 이름을



#### DNS : distributed, hierarchical database

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 8.17.13.png)

위의 그림을 보면 분산되고 계층적인 database임을 알 수 있다.

- Root DNS servers
- Top level domain
- Authoritative : 각각의 domain별로 권한을 가지고 있는 domain sever가 있다.

Client가 www.amazon.com 에서 IP 주소를 받아온다고 해보자.

1. Client가 **Root server**에게 **.com DNS server**를 물어본다.
   -	**.com DNS server의**  list를 얻어온다. 
2. Client가 **.com DNS server**에게 **amazon.com DNS server**를 물어본다.
   - **amazon.com DNS server** list를 얻어온다.
3. Client가 **amazon.com DNS server**에게 **www.amazon.com의 IP 주소**를 물어본다.



#### DNS : Root name servers

아무도 IP주소를 얻을 수 없을때 최종적으로 정보를 관리할 수 있는 시스템

**ICANN** (Internet Corporation for Assigned Names and Numbers) : Root name server를 관리하는 기관



#### DNS : Top level Domain (TLD)

각  domain에 대해서 최종 책임을 지고있는 서버

- .com, .org, .net, .edu, .aero, .jobs, .museums와 같은  domain에 대해서 책임

#### DNS : Authoritative servers

각 기관에 authoritative한  DNS server

- naver.com 과 관련된 server



#### Local DNS name servers

ISP나 공유기가 DNS 서버로서 역할을 한다. 자주 접속하는 Host들에 대한 IP address가 DNS server가 가지고 있기 때문에 IP주소를 빠르게 확보가 가능하다.



#### DNS name resolution : **iterated query**

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 8.30.29.png)



#### DNS name resolution: recursive query

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 8.33.04.png)

- Root DNS server에게 많은 부담을 주기 때문에 잘 사용되지 않는 방법이다. 



#### Caching DNS information

DNS정보들은  보통  caching되어서 cache안에 존재하는 IP-Domain mapping은 즉각적으로 이루어져서 Host에게 즉각적으로 응답이 가능하다.

- 하지만,  cache된 정보는 out-of-date될 수도 있으므로 (너무 오래전에 확보된 데이터)
  - 이런 데이터는 리셋된다.
- DNS system에서 전체 시스템이 동기화되는데 **수 일**이 걸린다. 
  - 바꾼  IP주소가 전세계적으로 가능하려면 **수 일**이 걸린다. 



#### DNS records

RR (Resource Records) : DNS는 일종의 distributed database이다. database는 이 정보는 **record**라고 하는 structure에 저장한다. 

- RR 형식 : (name, value, type, ttl)
  - name - value는 쌍으로 됨.
  - 각각이 무엇을 의미하는데 Type에 정의되어 있다.
    - type = A
      - name : hostname, value : IP address
    - type = CNAME
      - name : alias name(별명)
      - value : canonical name(정식이름)
    - type = NS
      - name : domain
      - value : domain에 대한 hostname
    - type = MX
      - name 
      - value : name와 관련된 mailserver



#### DNS 보안상 문제

- DDos : root server에게 많은 traffic을 준다.
  - zombie PC를 사용하여 필요하지 않은 request를 요청한다.
  - 이로인해 다른 사용자가 요청한  query에 답변을 못한다.
- Redirect attack 
  - attacker가 DNS server가 reply하기 전에 먼저 응답한다. 
  - 잘못된 IP address를 보내도록 하는 attack

다양한 보안상의 취약점을 가지고 있다.



### P2P applications

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 8.53.50.png" style="zoom:50%;" />

network에 server가 없는 방식으로 임의로 end system과 직접적으로 연결이 된다. 따라서  Peer가 server와 client의 역할을 동시에 한다. 

**특징을 살펴보면**

- self scalability : 새로운 peers가 생기면
  - service capacity가 증가한다. (server관점)
  - service demand가 증가한다. (client관점)
- Peer들이  intermittently하게 연결되어 있다.
  - 연결, 연결되지 않을 때 둘 다 존재한다. 

예시로는  Skype, bitTorrent가 있다.



#### File Distribution : client-server vs P2P

client-server 모델과 P2P모델의 performance를 비교해보겠다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.12.53.png)

- server : file size F를 가지고 있다.
  - 이 file을 모든 network의 모든 node로 보내고 싶다. 
  - server가 service를 제공하므로 upload capacity가 존재한다.
    - **u_s : server upload capacity**
- peer : 각각의 peer들이 다음과 같은  capacity가 있다고 하자.
  - **d_i : peer i의 download capacity**
  - **u_i : peer i의  upload capacity**

이제 모든 **user에게 file을 distribute하는데 걸리는 시간**을 알아볼 것이다. 

##### File Distribution : client-server

<img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.22.16.png" style="zoom:50%;" />

server가 N개의 Peer들에게 file을 보내려면 반드기 Sequential하게 보내야하므로,  **N 개의 file copies를 보내야** 한다.

- 1개의 file을 보내는데 걸리는 시간 : **F/u_s**
- N개의 file을 보내는데 걸리는 시간 : **NF/u_s**
- client(peer)중에서 다운로드 속도가 가장 느린 것 : **d_min**
- 속도가 가장 느린  client가 다운로드 받는 시간 : **F/d_min**
- F를 N client에게 보내는데 걸리는 시간 : **D_c-s**

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.32.18.png)



##### **File distribution time: P2P**

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.34.17.png)

server 역할의 peer가 한 번에 하나의 파일만을 보내야 한다.

- 하나의 file을 보내는데 걸리는 시간 : F/u_s
- 제일 느린 client가 download하는데 걸리는 시간 : F/d_min
- 총 데이터의 크기는 다음과 같다 : NF
- 데이터의 업로드 하는 총 속도는 : u_s + SUM(u_i)

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.34.30.png)



![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.42.55.png)

- 더 많은 peer를 가지면 Client-server은 linear하게 증가하지만, 
- P2P는 시간이 줄어든다. 



#### P2P file distribution : BitTorrent

- file을 chunks로 나눠 256kb의 chunks로 나눈다. 
- torrent안에 있는 peer들이 file chunks를 송수신한다.

![](/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 9.45.17.png)

- 누군가는 chunks의 list를 저장해야 한다. : **Tracker**
- file의 chunk를 교환하는 peer의 그룹 : **torrent**



1. 처음에는 peer가 chunk가 없다.
2. 시간이 지날수록 chunks들을 교환하면서 chunks들을 얻을 것이다. 
3. Tracker에 등록이 되고, peers의 일부 부분에 연결이 된다. "neighbors"



- 다운로드 할 때, peer가 다른 peer에게  chunks를 upload할 수 있다.
- Chunk교환을 위해 다른  peer들과 연결을 할 수 있다.
- file download가 끝나면 남아있던지(altruistically)
  - 이 peer들에게는 incentive를 준다. 
- 떠날 수 있다. (selfish)



##### Protocol of BitTorrent

- Requesting Chunks 

  - 주어진 시간동안 다른  peer들이 원하지 않는  chunk들을 가지고 있을 수 있다.
  - 따라서, 가장 rarest한 Chunk를 먼저 요청한다.

- Sending Chunks : tit for tat

  - 상위 4명을 10초마다 다시 평가해서 재지정한다.
  - 30초마다  peer을 랜덤으로 4명 뽑아 낙관적으로 끊임없이 전송한다.

- <img src="/Users/jamang/Desktop/컴퓨터 네트워킹/스크린샷 2021-04-11 오후 10.00.54.png" style="zoom:50%;" />

  - Alice가 Bob에게 낙관적으로 끊김없는 전송을 한다.

  - Alice가 Bob의 4등안에 들어가는  provider가 된다.

  - Boc도  Alice의 4등안에 들어가는 provider가 된다.

    

### Video Streaming and Content distribution networks

비디오 스트림 트래픽 = 인터넷 bandwidth의 주요 소비자이다. 

- 1Billion 사용자에게 어떻게 닿을까?
- **heterogeneity** : 이질성으로, 각자 다른 환경, 예를들어 모니터, 컴퓨터 스펙, 모바일,과 같은 다른 사용자가 다른 capabilities를 가지고 있다.



#### Video

보통 초당 24개의 이미지, 고해상도는 2배 이상의 프레임을 가짐. 각각의 픽셀의 수에 따라서 고해상도 저해상도로 나눈다. 

압축하는 방법에는 크게 두 가지로 나뉜다. 

- **Spatial** (within image): 한 이미지 안에서 반복되는 요소를 반복해서 저장한다.
- **Temporal** (시간을 단위로) : 연속되는 사진에서 공통되는 요소를 저장한다.



#### video streaming 방법

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.19.28.png)

- 비디오가 저장된 서버에서 인터넷을 통해 클라이언트에게 전송
- Server - to - Client 사이의 bandwidth가 네트워크 혼잡 정도에 따라 달라지므로 이를 해결해야 한다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.20.30.png)

1. 비디오가 저장되어 있다.
2. 비디오가 보내지는데, **네트워크 딜레이에 따라서  간격이 결정된다.**
3. 첫 2 프레임을 받고난 이후로 비디올르 재생한다. 

받으면서 재생하므로 문제가 발생할 수 있다.



#### continuous playout constraint

끊김없이 동영상을 재생하려면, 초당 30프레임의 데이터를 끊임없이 전송해야 한다. 

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.25.01.png)

**Jitter** : 네트워크 delay에 변화가 있는 것을 의미한다. 

- 네트워크 delay가 변하기 때문에 위의 그림보다 딜레이가 더 발생한다면, buffering이 생길 수 있다. 

해결 방법

- 한참 뒤에 플레이어를 실행한다. 하지만 클릭과 동시에 동영상을 보기 힘들다.Jitter
- 저해상도와 고해상도 이미지를 섞어서 끊김없이 보내는 방법도 쓴다.



#### Streaming Multimedia : DASH

저장된 **비디오를** 네트워크를 어떤 **protocol**상에서 구현되는지 알아보자.

DASH : *D*ynamic, *A*daptive *S*treaming over *H*TTP

- server 
  - 큰 비디오 파일을 여러개의  chunks로 나눈다.
  - **각 chunk들은 각기 다른 rate으로 인코딩 되어있다.**
    - rate에 따라서 
  - ***manifest file*** : Chunk들을 어디서 받아올 수 있는지에 대한 정보를 제공한다.
- client
  - server to client 사이의 bandwidth측정하여 가장 적절한  rate의 chunk들을 다운받는다.
  - 가장 적절한  chunk를 요청하여 display한다.

**bandwidth : 컨베이어 벨트 넓이**

**rate : 컨베이어 벨트에 올리는 속도**



Intelligence at client : 어떤 chunk를 가져올지 결정하는 것을 client에게 있다.

-	언제 Chunk를 요청해야 하는지
-	현재  bandwidth에 맞는 Encoding rate는 얼마나 설정해야 하는지
-	어디서 request chunk를 해야하는지



#### Content Distribution Networks (CDNs)

content를 어떻게 수억명의 사람들에게  streaming할 것인가?

- Option 1 : 엄청나게 큰  Server을 설치힌다.

  - Network 혼잡이 발생한다
  - 멀리 있는  Client들에게는 속도가 느리다.
  - 고장나면 모든 user들이 사용이 불가능하다.

- **Option 2 : server들을 전세계 들에 distribute한다.**

  - 같은 정보는 가진 server들을 지리적으로 널리 분산시킨다.

  ![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.44.00.png)

  - 넷플릭스 같은 경우, 우리나라에서 자주보는 컨텐츠는 우리나라 서버에 있다.
  - 각 지역마다 나라에 해당하는 동영상들을 배치해둔다

그 이후로 해결해야할 over the top 문제는 (OTT)다음과 같다.

- 어떤 DNS에서 content를 가져와야 하나
- Congestion에 따른 user의 행동
- 어떤 CDN node에 content를 두어야 하나.



### socket programming with UDP and TCP

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.51.13.png)

-  Application program은  socket이라는 라이브러리를 통해 물리적으로  communication이 가능하다.



- **UDP**: unreliable datagram
  - 패킷이 없어질 수 있다.
  - 패킷을 보낸 순서에 관계없이 순서가 뒤바뀔 수 있다.
- **TCP**: reliable, byte stream-oriented
  - 패킷 손실이 없다.
  - 패킷을 보낸 순서대로 전송이 된다. 



#### UDP

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 6.59.14.png)

- client와 server사이의 connection이 없다
  - **데이터를 보내기 전, handshaking을 하지 않는다.**
  - sender : 각 packet에 **목적지** **IP주소와  port 넘버**를 붙여줘야 한다.
  - receiver : 받은  packet에서  IP주소와 port넘버를 추출해서 누가 보냈는지 알아낸다.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.12.43.png)

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.10.59.png)

#### TCP

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.09.09.png)

- Client가 server contact하며, handshaking을 통해서 미리 **Connection**을 만들어둔다. 
  - 1. TCP socket을 생성할 때 server IP주소와 server process의 port numver를 만든다.
    2. 이렇게 생성된 TCP socket은 **해당  process와의 communication만**을 위해서 사용이 된다.
    3. 매번 packet을 만들 때 지정을 안해줘도 된다.
- Server가 한  client에 대해서 service할 때 다른 client의 contact에 대해서는 응답을 못할 수 있다.
  - 따라서, child process를 만들어서 contact해준다.
  - 혹은  thread를 새로 만들어서  contact해준다.
  - thread pool을 만들어서 request가 올때마다 thread를 contact해준다.

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.12.20.png)

![](/assets/images/post/computer networking/스크린샷 2021-04-12 오전 7.11.44.png)



-Reference-

James F. Kurose, University of Massachusetts, Amherst, Keith Ross의 『Computer Networking, 8th Edition』











