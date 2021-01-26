---

title: Pytorch Tutorial

toc: true

use_math: true

categories:

 - Deep Learning

---

## 초기 세팅

### 파이썬 또는 아나콘다 설치하기

파이썬은 딥러닝, 데이터 분석에 활용하기 좋은 언어로, 앞으로 나아갈 진도에서 파이썬만을 사용하면 좋겠지만, 나같은 경우에는 소프트웨어 툴을 다루는데 미숙하여 파이썬을 이용할 때 필요한 부분만을 직접 설계하기에는 무리가 있다. 따라서 **아나콘다**와 같은 모듈을 사용할 것이다. 아나콘다는 데이터 모듈이 자동으로 설치되기 때문에 쉽게 이용이 가능하다. 

### 가상환경의 필요성과 설치방법

우리는 파이선을 이용할 때 **모듈**을 사용하는데, 이때 우리는 해야하는 **작업**에 따라서 각기 다른 버전의 같은 모듈을 불러와야 하는데, 이때마다 파이썬을 다시 세팅할 수는 없다. 따라서 두 버전의 모듈을 사용해야 하는 사용자의 입장에서는 매우 난처해질 수가 있다. 이러한 불편함을 해결하기 위해 **가상환경**의 개념이 도입되었다. 

- 가상환경 : 독립된 작업 공간을 의미하며, 초기 단계와 동일한 설정(기본적인 모듈만 깔려있는 가상환경)으로 독립된 작업 공간을 생성한다. 아래는 파이썬과 아나콘다 모듈에서 가상환경을 설정할 수 있는 방법을 제시할 것이다.

```python
# Python on Linux
pip install vertualenv		
#pip 을 사용해 가상환경 관리하는 virtualenv설치
virtualenv [name of virtualenv]
#[option1]virtualenv를 이용해 가상환경을 생성한다.
virtualenv [name of virtualenv] --python=3.6
#[option2]virtualenv를 이용하여 파이썬 버전을 다르게하여 설치할 수 이ㅛ가.
source [name of virtualenv]/bin/activate
#생성한 가상환경을 source명렬어를 이용해 실행한다.
deactivate
#실행중인 가상환경을 종료한다.
```

```python
#Anaconda on Linux
conda create [name of virtualenv]
conda create [name of virtualenv] pandas torch
#가상 환경을 생성할 때 필요한 패키지를 같이 생성한다.
conda create [name of virtualenv] python =3.6
activate [name of virtualenv]
deactivate
```

하지만, 가상환경 구축하는 정도로만 알고, 나는 맥북을 사용하므로 모든 과정을 구글 코랩에서 진행할 것이다. 코랩은 무료로 12시간짜리 GPU를 제공하며, jupyter기반의 노트북이다. 하지만 아래의 유의점을 잘 살펴보고 필요한 패키지가 있다면 따로 받아야 한다.

- 대부분의 python library는 install되어 있어서 import만 한다면 바로 사용이 가능하다.(하지만, 런타인의 삭제가 초기화되므로 매 시도마다 다시 import또는 install해야한다.)
- import했을떄 그 패키지가 없다면, install을 해주어서 설치한 뒤에 import 해주어야 한다.

## 반드시 알아야하는 파이토치 스킬

여기서 다루는 내용들은 앞으로 파이토치를 배워야 할 때 필요한 기초 지식이며, 예제를 실행할 때 자주 구현해야 할 것이다. 

### 텐서(Tensor)

텐서(Tensor)란 데이터를 표현하는 단위이다. 우리가 다루는 대상이 데이터이므로 데이터를 표현할 수 있는 구조에 대해 알아보고 어떻게 사용하는지 알아보자.

**Scalar** : 스칼라는 우리가 흔히 알고있는 상숫값이다. 하나의 값을 표현할 때 1개의 수치로 표현한 것이다. 아래와 같이 import해서 사용이 가능하다.

```python
import torch

scalar1, scalar2 = torch.tensor([1.]), torch.tensor([3.])
print(scalar1, scalar2)
# tensor([1.])

# 스칼라의 사칙연산, 기본적으로 + - / * 연산을 변수에 직접 연산하여 값을 낼 수 있는데, torch모듈에 내장된 메서드를 사용할 수 있다. 
torch.add(scalar1,scalar2)
torch.sub(scalar1,scalar2)
torch.div(scalar1,scalar2)
torch.mul(scalar1,scalar2)
```

**Vector** : 벡터는 하나의 값을 표현할 때 2개 이상의 수치로 표현한 것이다. 아래와 같이 사용이 가능하다.

```python
vector1, vector2 = torch.tensor([1., 2., 3.]), torch.tensor([4., 5., 6.])
# 벡터의 사칙연산도 메서드를 이용해 가능하다. 유의할 점은 요소별로 적용이 된다는 것이다.
torch.add(vector1, vector2)
torch.sub(vector1, vector2)
torch.div(vector1, vector2)
torch.mul(vector1, vector2)
torch.dot(vector1, vector2)	#이것만은 벡터의 dot product이다. 따라서 요소별로 적용 x
```

**Matrix** : 2개 이상의 벡터값으로 구성된 값이다. 아래와 같이 사용이 가능하다.

```python
matrix1, matrix2 = torch.tensor([[1., 2.],[3., 4.]]), torch.tensor([[5., 6.],[7., 8.]])
# 사칙연산은 위와 똑같이 사용하고, 아래에 기술할 것은 행렬 곱 연산이다. 
torch.matmul(matrix1, matrix2)
```

 **Tensor** : 2차원 이상의 배열표현이며, 아래와 같이 사용이 가능하다.

```python
tensor1, tensor2 = torch.tensor([[[1., 2.], [3., 4.]], [5., 6.],[7., 8.]]), torch.tensor([[[1., 2.], [3., 4.]], [5., 6.],[7., 8.]])
# 텐서간 값 내적 연산 역시 matmul을 사용하여 가능하다.
torch.matmul(tensor1, tensor2)
```

### Autograd

파이토치를 사용하여 Back Propagation(역전파법)을 이용한다면. 파라미터를 쉽게 업데이트 하는 방법이 있는데 그것이 바로 **Autograd** 방식이다. 이번 예제에서는 딥러닝 모델을 설계하고 파라미터를 업데이트를 Autograd로 하는 방법을 알아보겠다.

```python
import torch
if torch.cuda.is_available():
  DEVICE = torch.device('cuda')print()
  #torch.cuda.is_available() : 현재 파이선 실행 환경에서 GPU이용이 가능한지 판단하는 메서드, 코랩에서 실행시켜본 결과 사용이 가능한 것으로 나타남.
else:
  DEVICE = torch.device('cpu')
  
BATCH_SIZE = 64	
# Input으로 이용되는 데이터의 개수이다. 배치 수 만큼 데이터를 이용해 OUTPUT을 계산하고 오차값을 평균해 오차역전파법을 적용하고 파라미터를 업데이트 한다.
INPUT_SIZE = 1000
# 입력층의 노드 수를 의미한다. (INPUT과 헷갈리면 안된다.), 즉, 입력 데이터의 크기가 1000이라는 소리
# 배치 데이터의 개수 : 64개, 데이터의 크기 : 1000 => (64,1000)
HIDDEN_SIZE = 100
# 입력층에서 은닉층으로 전달됐을 때 은닉층의 노드 수를 의미한다. 
OUTPUT_SIZE = 10
# 최종으로 출력되는 값의 벡터의 크기를 의미한다. 

x = torch.randn(BATCH_SIZE, INPUT_SIZE, device = DEVICE, dtype = torch.float, requires_grad = False)
# randn : 평균 0, 표준편차 1인 정규분포에서 샘플링 한 값을 의미한다. 앞의 BATCH_SIZE와 INPUT_SIZE는 생성되는 데이터의 크기를 나타내며 64x1000의 데이터를 생성한다. device, dtype 설명은 생략하고 requires_grad 같은 인자는 여기서는 INPUT으로만 이용되기 때문에 사용될 이유가 없어 False로 설정하였다. 또한 파라미터 값을 업데이트 하기 위해 Gradient를 계산하므로 추적을 할 이유가 전혀 없다.
y = torch.randn(BATCH_SIZE, OUTPUT_SIZE, device = DEVICE, dtype = torch.float, requires_grad = False)
# BATCH 수 만큼 결과가 필요하며, OUTPUT과의 오차를 계산하기 위해 OUTPUT과 같은 사이즈의 크기로 설정하였다.
W1 = torch.randn(INPUT_SIZE< HIDDEN_SIZE, device = DEVICE, dtype = torch.float, requires_grad = True)
# requires_grad를 이용해 Gradient를 계산할 수 있도록 설정한다.
W2 = torch.randn(HIDDEN_SIZE, OUTPUT_SIZE< device = DEVICE, dtype = torch.float, requires_grad = True)

learning_rate = 1e-6
# 파라미터를 업데이트할 때, Gradient를 계산한 값에 Learning_rate를 곱하여 업데이트를 한다. 학습 정도를 나타내는 값이며, 이를 설정하는 방법은 여러가지가 있다. 하이퍼파라미터이다.
for t in range(1,501):
  y_pred = x.mm(W1).clamp(min = 0).mm(W2)
  # mm은 torch모듈에서 행렬 곱을 할 때 사용한느 메서드로, x(INPUT DATA)와 W1(PARAMETER)를 행렬 곱하여 나온 결과값을 계산하고, 이후 clamp(min=0으로 설정하여 ReLU처럼 기능하게 설정, 쉽게 말해 ReLU) 메서드를 이용하여 비선형 함수를 activation function으로 설정한다. 후에 clamp에서 나온 결과값으로 W2와 한 번 더 행렬의 곱을 진행한다. 
  #최종적으로 결과는 OUTPUT을 의미하며, 이는 예측값으로 불리기 때문에 y_pred이라고 명명했다.
  
  loss = (y_pred - y).pow(2).sum()
  # 예측 값과 실제 값을 비교한 오차값을 loss라고 한다. 여기서는 제곱차의 합을 이용해 계산하였다.
  if t%100 == 0:
  	print("Iteration: ", t, "\t", "Loss: ", loss.item())
  loss.backward()
  # 각 파라미터 값에 Gradient를 계산하고 이를 통해 역전파를 진행한다는 의미이다. 
  
  with torch.no_grad():
    #이 구간에서는 Gradient를 고정한다는 의미이다. 
    W1 -= learning_rate * W1.grad
    W2 -= learning_rate * W2.grad
    # Gradient 값을 고정한 상태에서 학습률을 곱해 기존 W에서 빼주는데, 이는 Loss 값이 최소로 계산될 수 있는 파라미터 값을 찾기위해 음수를 사용한다는 것을 알고 있으면 된다.
    W1.grad.zero_()
    W2.grad.zero_()
    # 다음 역전파 단계때 새로운 gradient값을 계산하기 때문이다. 
```

















