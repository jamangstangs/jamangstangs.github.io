---

title: Deep Learning from Scratch 2-2

toc: true

use_math: true

categories:

 - Deep Learning

---

## RNN 이란

Recurrent Neural Network의 줄임말인 **RNN** 은 Recurrent의 의미인 "순환한다"라는 점을 참고하면 순환하는 신경망임을 알 수 있다. 그렇다면 **순환한다**라는의미 자체에는 무슨 의미가 있을까? 

순환하는 것의 의미는 어느 한 지점에서 시작한 것이, 시간이 지나 다시 원래 장소로 돌아오는 것을 말한다. 그리고 이 과정을 반복하는 것이 순환이다. 마치 자동차 레이싱에서 일정한 원형 트랙을 도는거와 같다. 이때, 자동차 트랙은 **닫힌 경로** 이며 이로인해 같은 경로를 반복하여 왕래할 수 있는 이유가 된다. 아래의 그림을 참고하여 RNN의 그림을 구체적으로 살펴보자.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-6.png) 

- 특정 경로가 순환하는 것이 보인다. 이 경로를 따라 데이터를 순환시킨다.
- t : 시각을 의미하며, x 입력 데이터와 h 출력 데이터에 t를 표시하였는데, 이는 시계열 데이터를 의미하며, $(x_0, x_1,...,x_t,...)$ 이 RNN의 계층에 입력된 것을 표현한 것이다.
- 이때 각 시각에 입력되는 $x_t$는 **벡터**라고 가정한다. 문장을 다루는 경우를 예로 든다면 각 단어의 분산표현이 x_t이다. 

이제부터, 위의 그래프의 입력값을 지면에서 솟아 오르듯이 표현하여 각 시각에 따라 순환구조를 펼쳐본다면 다음과 같다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-8.png)

진짜 이렇게 펼친거보고 감탄을 할 수 밖에 없었다고 한다.

- RNN 순환구조를 펼침으로써 오른쪽으로 성장하는 긴 신경망으로 변신시켰다. (피드포워드 신경망과 같은 구조이다, 참고로 피드포워드는 데이터가 한 방향으로만 흐른다.)

- 각 시각의 RNN 계층의 입력은 다음과 같다.

  - t시간대의 RNN의 input : **t-1 시간대의 RNN의 output**, **t 시간대의 input** 이다. 수식으로 나타내면 다음과 같다.

  <center>
    $h_t = tanh(h_{t-1}W_h + x_tW_x + b)$
  </center>

  - $W_x$ : 입력 x를 출력 h로 변환하기 위한 가중치
  - $W_h$ : RNN 출력을 다음 시각의 출력으로 변환하기 위한 가중치
  - b : 편향
  - tanh : 행렬곱을 계산하고 그 합을 tanh함수를 이용해 변환한다.

  추가적으로, 위의 식을 보면 **현재의 출력** 은 **한 시각 이전의 출력**에 기초해 계산됨을 알 수 있다. 이를 다른 관점에서 보면 RNN은 h라는 상태를 가지고 있으며, 위와 같은 식의 형태로 상태가 갱신된다고 볼 수 있다. 따라서 RNN을 **상태를 가지는 계층**으로 볼 수 있다. 즉, **기억력이 있는 계층이라고 볼 수 있다.**

## BPTT 

위의 그림에서 RNN 계층을 가로로 넓게 펼친 사진을 봤을 것이다. 따라서 RNN의 학습도 피드포워드 방식의 신경망과 같은 방식으로 학습이 가능하다. 아래의 그림과 같이 역전파 과정을 구현할 수 있기 때문이다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-10.png)

- 위의 그림을 통해 **RNN에도 일반적인 역전파법이 적용됨을 알 수 있다.**
- RNN의 오차역전파법을 **BPTT(BackPropagation Through Time)**이라고 한다.

히지만, BPTT를 사용하여 RNN을 학습할 때 문제점이 두 가지 있다.

- 시계열 데이터의 **시간 크기가 커짐**에 비례하여 BPTT가 소비하는 **컴퓨팅 자원이 증가한다**.
- **시간의 크기가 커짐**에 따라 역전파시의 **기울기가 불안정해진다**.

### Truncated BPTT(잘린 BPTT)

길어질때 컴퓨팅 자원이 증가한다면, 단순히 커진 데이터를 잘라서 분산적으로 처리하면 된다. 따라서 **큰 시계열 데이터** 를 취급할때는 **신경망의 연결을 적당한 길이로 자른다**. 이때 잘라진 신경망에서 각각의 BPTT를 실행하는 것이 아이디어이다.

주의할 점은, 오직 **역전파 할때만 끊어야 한다는 점**이다. 순전파때의 연결은 그대로 유지해야한다. 이제 구체적인 예를 들어서 **컴퓨팅 자원 증가** 의 문제와 **기울기가 불안정** 해지는 문제도 논의할 것이다.

- 오차역전파법시 계층이 너무 길면(순환을 많이하면) **계산량과 메모리 사용**이 문제가 된다.
- 오차역전파법으로 기울기를 구하다 계층이 길어짐에 따라 기울기 값이 작아져 **기울기가 소멸**할 수 있다.

위와 같은 이유로 오차역전파를 할 때 아래의 그림과 같이 자른다. 

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-11.png)

- 특징 1: 순전파는 잘리지 않았다. (**데이터를 순서대로 입력해야 한다.**)
- 특징 2: 역전파는 10개 단위로 잘렸다. 이렇게 역전파의 연결을 잘라버리면 그보다 미래의 데이터에 대해서는 생각할 필요가 없어진다. 따라서 각각의 **블록단위**로 독립적으로 오차역전파를 완결시킬 수 있다.

이제 Truncated BPTT 방식으로 RNN을 학습시켜 보겠다. 절차에 따라서 어떤 학습상태가 일어나는지 그림에 따라서 설명하겠다.

### 첫 번째 블록

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-12.png)

- 1. 순전파를 먼저 수행한다.
  2. 다음 블록의 입력데이터($x_10 to x_19$)를 입력해 오차역전파법을 실행한다.

### 두 번째 블록

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-13.png)

- 1. 순전파를 계산한다. 이때는 앞 블록의 **마지막 은닉 상태인 $h_9$**가 필요하다는 것이다.
  2. 다음 입력 데이터($x_20 to x_29$)를 이용하여 오차역전파법을 수행한다.

위와 같은 방법을 지속하여 RNN 학습이 흐른다느 것을 알게 되었다. 즉, **각 블록내에서 순전파를 실행하고, 다음 입력데이터를 이용해 현재 블록의 오차 역전파법을 구하고 난 뒤, 결과로 나온 은닉 상태를 다음 블록에 넣는 넣이다.**

### Truncated BPTT의 미니배치 학습

지금까지는 **미니배치** 수가 1일때의 학습 방법을 이야기한 것이다. ( First Mini Batch : x_1 ~x_ 500, Second Mini Batch: x_501 ~ x_1000이다. ) 따라서 위의 그림에서는 하나의 미니배치 학습을 수행한 것임을 알 수 있다. 

위의 한 개의 미니배치를 본다면, **데이터를 순서대로 입력해주엇다는 것을 알 수 있다.** 그렇게 하면 데이터를 주는 시작 위치를 **각 미니배치의 시작 위치로 옮겨주어야 한다.** 이를 설명하기 위해서 예시를 하나 들어보겠다.

길이가 1000인 시계열 데이터를 10개로 잘라 Truncated BPTT로 학습하는 경우를 예시로 들어보겠다. 

- 미니 배치가 2개 : 각 미니배치는 500개의 데이터를 가짐, 각각 10개의 단위로 잘라 학습한다.
- 첫 번째 데이터를 0~9 까지 줬다고 하자. 그렇다면 두 번쨰 미니배치는 500~509까지 줘야할 것이다. 500의 상대적인 **위치는** 0의 위치보다 상대적으로 500만큼 떨어져 있고, 모든 **데이터마다 동일하게 500만큼 떨어져 있다.** 따라서 다음 데이터의 시작위치를 500만큼 **오프셋을 옮겨준다면 ** 아래 그림과 같이 학습이 진행된다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-15.png)

- 두 개의 미니배치가 병렬적으로 처리되는 것을 볼 수 있다. 
- 1 EPOCH 가 끝나면 다음 EPOCH에서 다시 처음부터 입력한다.

위와같이 원리는 단순하지만, 데이터 제공 방법에 있어서는 병렬로 처리하기 위해서 주의가 필요하다. 따라서 실제 코드를 보면서 이해를 하도록 하자.

## RNN 구현

우리가 구현할 RNN의 모습은 지금까지 봐왔던 가로방향으로 성장한 RNN의 모습이고, Truncated BPTT의 방식의 학습을 따른다면 가로 크기가 일정한 일련의 신경망을 구현하면 된다. 아래의 RNN이 우리가 구현할 모형이다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-16.png)

- 길이가 T인 시계열 데이터를 받는다.
- 각 시간의 은닉 상태를 T개 출력한다. 이때 옆으로 성장한 신경망을 **하나의 모듈** 로 만들어 구현한다면 그림이 다음과 같게된다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-17.png)

- hs : T개의 출력을 하나로 묶어놓았다.
- xs : T개의 입력을 하나로 묶어놓았다. 
- RNN 계층 : Time RNN 계층 내의 **한 단계의 작업을 수행하는 계층을 말한다.**
- Time RNN 계층 : **T개 단계분의 작업을 한꺼번에 처리하는 계층**을 말한다.

즉, 1개의 RNN을 처리하는 클래스를 구현하고, 이 클래스를 이용해 T 단계의 처리를 한꺼번에 수행하는 계층을 TimeRNN이라는 클래스로 완성시킬 것이다. 위에서 작성하였던 RNN의 순전파 식은 다음과 같다.

<center>
  $h_1 = tanh(h_{t-1}W_h + x_tW_x + b)$
</center>

위와 같이 신경망을 계산할때는 행렬의 형상 확인이 매우 중요하다. 아래에서 행렬의 형상을 확인하는 그림을 보고 은닉 벡터의 형상을 확인해보겠다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-18.png)

- N : 미니배치의 크기를 나타낸다.
- D : 입력 벡터의 차원수를 나타낸다.
- H : 은닉 상태 벡터의 차원수를 나타낸다. 
- 위에서 입력값, 이전 시각의 출력값에 곱할 가중치 행렬을 따로따로 정의하였다. 

이제부터 RNN의 순전파 메서드를 구현해보겠다.

```python 
class RNN: 
  def __init__(self, Wx, wh, b):
  # 여기서 RNN의 매개변수들을 정의한다.
  self.params = [Wx, Wh, b]
  self.grads = [np.zeros_like(Wx), np.zeros_like(Wh), np.zeros_like(b)]
  self.cache = None
  # 역전파 계산시 사용하는 중간 데이터를 초기화 한다.
  
	def forward(self, x, h_prev):
    Wx, Wh, b = self.params
    t = np.matmul(h_prev, Wh) + np.matmul(x, Wx) + b
    # 순전파시 행렬의 곱을 구현하였다.
    h_next = np.tanh(t)
    # 식을 코드 그대로 구현한다.
```

- RNN의 매개변수들을 RNN에 저장 : Wh, Wx, b
- 기본적으로 RNN 계층 하나에 grads, cache 값을 저장하므로 여기서 초기화 시킨다.
- 순전파 과정에서는 순전파 식을 그대로 코드로 구현했다.

역전파를 구현하기 전, 기존의 피드 포워드 방식에서 구현했던 역전파에서 계산 그래프를 사용하여 기울기를 직접 구한 방식을 떠올리며 RNN의 계산그래프에서 직접 역전파를 연산하여 코드로 구현해보겠다.

```python
def backward(self, dh_next):
  Wx, Wh, b = self.paras
  x, h_prev, h_next = self.cache
  
  dt = dh_next * (1 - h_next**2)
  # dtanh/dx = 1-tanh(x)^2
  db = np.sum(dt, axis = 0)
  # 흘러 들어온거 그대로 다 합해서 뒤로 뺀다.
  dWh = np.matmul(h_prev.T, dt)
  # HxH = HxN * NxH
  dh_prev = np.matmul(dt,Wh.T)
  # NxH = NxH * HxH
  dWx = np.matmul(x.T, dt)
  # DxH = DxN * NxH
  dx = np.matmul(dt, Wx.T)
  # NxD = NxH * HxD
  
  self.grads[0][...] = dWx
  self.grads[1][...] = dWh
  self.grads[2][...] = db
  
  return dx, dh_prev
```

### Time RNN 계층 구현

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-21.png)

- Time RNN = RNN계층을 T개 연결한 신경망을 의미한다.
- 은닉상태 h를 인스턴스 변수로 유지한다.

아래는 Time RNN 계층의 코드이다.

```python
class TimeRNN:
  def __init__(self, Wx, Wh, b, stateful =False):
    self.params = [Wx, Wh, b]
    self.grads = [np.zeros_like(Wx), np.zeros_like(Wh), np.zeros_like(b)]
    self.layers = None;
    
    self.h, self.dh = None, None
    self.stateful = stateful
   
  def set_state(self,h):
    self.h = h
    
  def reset_state(self):
    self.h = None
```

- 초기화 변수: 가중치, 편향, stateful -> 은닉상태를 인계받을지에 대한 여부
- layer : RNN 계층을 리스트로 저장하기 위함이다.
- h , dh : forward 혹은 backward시에 저장
- stateful : true이면 상태를 유지, false이면 상태를 유지하지 않음.
  - true : 순전파를 끊지 않고 저장한다. 인스턴스 변수를 유지
  - false : 순전파를 끊고 전파한다. 은닉상태가 영행렬로 초기화됨

순전파의 구현

```python
def forward(self,xs):
  # xs 는 T개의 시계열 데이터를 하나로 묶은 것
  Wx, Wh, b = self.params
  N, T, D = xs.shape
  D, H = Wx.shape
  
  self.layers = []
  hs = np.empty((N, T, H), dtype = 'f')
  # 출력값을 담을 그릇을 준비한다. NxTxD matmul DxH 이므로 N T H형상이 나온다.
  
  if not self.stateful or self.h is None:
    # 처음 호출시, statful이 false이면 항상 영행렬로 초기화
    self.h = np.zeros((N, H), dtype = 'f')
    
  for t in range(T):
    layer = RNN(*self.params)
    # 리스트의 원소들을 추출하여 메서드의 인수로 전달한다. self.params안에 Wx, Wh, b가 RNN클래스로 전달됨.
    self.h = layer.forward(xs[:, t,:], self.h)
    hs[:, t,:] = self.h
    # N T N 형상이므로 T를 기준으로 저장한다.
    self.layers.append(layer)
    # 순전파할때 layer를 붙인다.
  
  return hs
```

역전파의 구현

```python
def backward(self, dhs):
  Wx, Ws, b = self.params
  N, T, H = dhs.shape
  D, H = Wx.shape
  
  dxs = np.empty((N, T, D), dtype='f')
  # dxs를 담을 그릇을 준비한다.
  dh = 0
  grads = [0,0,0]
  
  for t in reversed(range(T)):
    layer = self.layer[t]
    dx, dh = layer.backward(dhs[:, t, :]+dh)
    dxs[:,t, :] = dx
    
    for i, grad in enumerate(layer.grads):
      grads[i] += grad
      
  for i, grad in enumerate(grads):
    self.grads[i][...] = grad
  self.dh = dh
  
  return dxs
```

## 시계열 데이터 처리 계층 구현

RNN을 사용하여 언어모델을 구현하는 것이 최종목표이다. 이번 절에서는 RNNLM (RNN Language Model)을 만들어 볼 것이다. 구현해야 할 RNNLM의 전체적인 그림은 아래와 같다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-25.png)

- 단어 ID를 단어의 **분산표현** 으로 변환한다. 그 표현이 RNN계층으로 입력이 된다.
- Affine 계층을 거쳐 softmax 계층으로 전해진다.

우리가 주목해야할 그림은 아래에 있다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-26.png)

- ID = 0 인 you 가 입력 -> say가 가장 높게나옴. 
- ID = 1 인 say 가 입력 -> goodbye와 hello가 높게 나옴. 여기서 RNN계층은 you say라는 맥락을 기억하고 있다느 것을 알 수 있다. 이것으로 인해 입력된 단어를 기억하여 과거에서 현재로 데이터를 계속 흘려보내줌으로서 과거의 정보를 저장할 수 있다.

이제 위의 펼쳐진 계층에서 Affine과 Embedding 계층을 Time의 형태로 묶어주면 아래와 같다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-27.png)

- time Affine, time Embedding : 설명은 쉬우므로 생략한다.
- Time Softmax : 아래와 같이 구현된다.

![](/assets/images/post/2021-01-18-DeepLearningfromScratch2_2/fig 5-29.png)

- x : 아래층에서부터 전해지는 점수,
- t : 정답 레이블 

위의 모델에서 계산하는 수식은 다음과 같다.

<center>
  $L = frac{1}{T}(L_0 + L_1 + ... + L_{T-1})$
</center>












