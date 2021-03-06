---
title: Deep Learning from Scratch 1
toc: true
categories:
     -   Deep Learning
---

## 퍼셉트론
다수의 입력 신호를 받아 하나의 신호를 출력하는 퍼셉트론은 앞으로 배우게 될 **신경망**의 기초가 되는 알고리즘이다. 퍼셉트론의 수식은 아래와 같으며 이를 응용하여 단순한 논리게이트를 만들어 낼 수 있다.  
![2.1](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 2.1.png)

-   x : 입력값
-   W : 가중치 -> 각 신호가 결과에 주는 영향력을 조정하는 요소로 작용하며 클 수록 해당 신호가 그만큼 더 중요하다는 것을 나타낸다.
-   θ : 임계값 -> 한계값에 해당하며, 이 값을 넘지 않으면 1을 출력하지 않는다.  

퍼셉트론의 기본 원리는 입력값에 가중치를 곱하여 그 값의 합들이 임계값을 넘는지 여부에 따라 신호를 출력하거나 하지 않음을 알 수 있다. 이러한 원리를 통해 기본적인 논리 게이트를 만들어 낼 수 있으나 다층 퍼셉트론을 사용하여 층을 더 깊게 한다면 **비선형 영역**도 표현이 가능해 복잡한 회로를 만들 수 있다.

## 신경망 
퍼셉트론 수식을 다음과 같이 변경해보자.  
![3.1](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 3.1.png)
-   b : 편향 -> 뉴런이 얼마나 쉽게 활성화되느냐를 제어하는 값이다. 퍼셉트론에서 임계값을 좌항으로 넘긴 값에 해당한다.  

![3.3](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 3.3.png)  

-   퍼셉트론 수식에서 임계값을 넘으면 신호를 출력할지 말지 결정하는 요소이다. 이를 신경망에서는 **활성화 함수**라고 부른다.  

신경망에서 사용하는 수식을 활성화 함수에 넣어 각각의 요소들을 모듈화 하여 앞으로 구현할 신경망에서 입력 신호들의 총합을 활성화 함수에 넣어 값을 가공한 다음 노드에 전달하는 역할을 한다. 

## 활성화 함수
입력값(x)을 가중치(W)와 곱한 뒤, 편향(b)도 더하여 활성화 함수에 넘기게 된다. 특히 퍼셉트론에서 사용한 활성화 함수는 **계단 함수**이다. 즉, 신경망과 퍼셉트론의 차이는 어떤 활성화 함수를 사용하는가에 대한 여부로 바뀌게 된다. 신경망에서 이러한 입력 신호를 처리하기 위한 활성화 함수들의 종류는 아래와 같다.
### 시그모이드 함수(Sigmoid Function)
![3.6](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 3.6.png)
-   신경망에서 자주 사용하며 단순히 말해 함수에 입력을 주면 출력을 돌려주는 변환기이다.  

하지만, 왜 퍼셉트론에서 사용하는 **계단함수**를 신경망에서 사용하지 않는 것일까?  
![3-8](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 3-8.png)
-   계단함수와 시그모이드 함수의 가장 큰 차이는 매끄러움이다. 이러한 매끄러움이 없다면(기울기의 변화가 연속적이지 않고 계단 함수와 같이 불연속 적이라면) 후에 **손실 함수**를 통한 학습(미분이 중요한 역할을 함)을 진행 할 수가 없으므로 사용할 수가 없다. 이러한 점이 퍼셉트론에서 신경망으로 나아가는 중요한 열쇠이다.  

### ReLu 함수
![3.7](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 3.7.png)
- 최근에는 ReLU 함수를 활성화 함수로 주로 이용한다. 위의 수식 그대로 0이 넘으면 그대로 출력하고, 0이하면 0을 출력하는 함수이다.  

위의 함수를 활성화 함수로 사용하여 결과값을 다음 층의 입력값으로 넘겨 계속 이어나간다면, 다차원 신경망을 구성할 수 있다. 하지만 마지막에 해당하는 층(출력층)에서는 어떤 문제를 해결하냐에 따라서 사용해야 하는 활성화 함수가 달라진다. 
- 회귀 -> 항등함수(Identity Function)
- 분류 -> 소프트맥스(Softmax Function)  

### 항등 함수(Identity Function)
말 그대로 입력을 그대로 출력하는 함수이다. 입력 신호가 그대로 출력하게 되므로 구현은 다음과 같다.
```python
def identity_function(x):
    return x
```

### 소프트맥스 함수(Softmax Function)
![3.10](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 3.10.png)  
- **모든 입력신호**의 지수함수의 합 중에서 **입력 신호**의 값을 나타낸 것이므로, **모든 입력신호**에서 **입력 신호**의 값이 얼마나 유의미 한가를 나타내는 값임을 알 수 있다.  

하지만, 지수함수는 입력 값이 조금이라도 커져버리면 그 값이 컴퓨터가 표현하지 못하는 수가 되어버려 **오버플로**가 발생하므로 모든 입력신호의 지수합수 값 중에서 가장 큰 값을 빼 입력값들을 하향평준화 한 뒤에 함수의 값을 출력한다. 따라서 이를 반영한 구현은 다음과 같다.
```python
def softmax_function(a):
    c = np.max(a)
    exp_a = np.exp(a-c)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a

    retrun y
```
소프트맥스의 함수는 분류하려는 문제에 보통 쓰이며, 위의 소프트맥스 함수의 성질에서 모든 입력신호의 값을 더하는 성질을 통해 분류 문제에서 소프트맥스 함수가 쓰임을 알 수 있다. 왜냐하면 모든 입력신호의 합에서 유의미한 입력신호가 모든 입력신호들 사이에서 가장 큰 값을 차지한다(이는 분류 문제에서 현재 설정된 W,b의 값이 정답과 가장 근접함을 알 수 있다.)는 것을 통해 학습이 올바르게 진행되어가고 있는지 알 수 있기 때문이다. 따라서 분류문제에서는 출력층의 값을 **분류하려는 문제의 개수**로 설정하여야 한다.  

## 손글씨 숫자 인식 구현
이미 학습된 매개변수를 사용하여 **학습 과정은 생략**하고 추론과정만 구현 할 것이다. 이 추론 과정을 신경망의 **순전파**라고 한다. 따라서 구현에 있어서 유의해야 할 사항들을 내 나름대로 정리해보았다.
- 추론과정이므로 이미 설정된 **매개변수** 값을 **피클 모듈**을 사용하여 임포트 할 것이다.
- 분류해야 하는 숫자가 10종류 이므로 출력층의 뉴런은 10개이다.  

```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
import pickle
from dataset.mnist import load_mnist
from common.functions import sigmoid, softmax


def get_data():
    (x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, flatten=True, one_hot_label=False)
    return x_test, t_test


def init_network():
    with open("sample_weight.pkl", 'rb') as f:
        network = pickle.load(f)
    return network


def predict(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = softmax(a3)

    return y


x, t = get_data()
network = init_network()
accuracy_cnt = 0
for i in range(len(x)):
    y = predict(network, x[i])
    p= np.argmax(y)
    if p == t[i]:
        accuracy_cnt += 1

print("Accuracy:" + str(float(accuracy_cnt) / len(x)))
```


## 손실함수
신경망에 있어서 최적의 매개변수(W, b)를 탐색하는 방법은 손실함수이다. 즉, 이러한 손실함수의 값을 가장 좋게 만드는 **매개변수**를 탐색해 나가는 것이 신경망 학습에 있어서 사장 중요한 지표로 작용한다. 일반적으로 **평균 제곱 오차**와 **교차 엔트로피 오차**를 사용한다.  

### 평균 제곱 오차(Mean Squared Error)
![4.1](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 4.1.png)  
-   y : 신경망의 출력
-   t : 정답 레이블 
-   k : 데이터의 차원 수 -> 손글시 숫자 인식에 해당하는 데이터의 차원은 10이므로 k 값은 10이다.  

신경망의 출력과 정답 레이블의 차이(추정값과 참값의 차이)를 제곱한 후, 그 총합을 구하는 방식이다. 따라서 오차가 더 작으면 추정값이 정답 레이블에 근접해 있다는 것을 알 수 있기 때문에 평균 제곱 오차가 작을수록 현재 매개변수들이 정답에 해당하는 매개변수에 근접해 있다는 것을 알 수 있다.

### 교차 엔트로피 오차(Cross Entropy Error)
![4.2](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 4.2.png)  
-   y : 신경망의 출력
-   t : 정답 레이블
-   k : 데이터의 차원 수  

원 핫 인코딩에 의하면 정답에 해당하는 인덱스의 원소만 1이므로 출력 값에 해당하는 인덱스의 출력값이 오차의 크기를 좌우한다. 따라서 **정답일 때의 출력이 전체 값을 결정**한다. 하지만 이를 구현할 때 출력 값이 0이 된다면 마이너스 무한대로 발산하여 계산을 진행할 수 없으므로, 실제 구현할 때는 출력값에 아주 작은 값을 더하여 이를 방지한다.

## 미니배치 학습
지금까지 데이터 하나에 대한 손실함수를 계산하는 방법을 사용해 왔다. 하지만 우리가 구해야 하는 것은 훈련 데이터 모두에 대한 손실함수이다. 아래의 식은 훈련 데이터 모두에 대한 손실함수의 값을 구하는 수식이다.  

![4.3](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 4.3.png)  

-   N : 데이터의 개수
-   t_nk : n번째 데이터의 k번째 값  

이는 단순히 N개의 데이터로 확장했을 뿐, N으로 나누어 정규화하여 **평균 손실함수**를 구하는 것이다. 하지만, 모든 데이터를 대상으로 평균 손실 함수를 구하는 것은 매우 시간이 많이 걸리므로 모든 데이터에서 일부 데이터만을 무작위로 뽑아 전체의 근사치로 활용한다. 이렇게 뽑은 일부 데이터를 **미니 배치**라고 부르며 이러한 미니배치를 사용한 학습 방법을 **미니 배치 학습**이라고 한다. 아래 파이썬 코드로 미니 배치 데이터를 뽑아 내는 방법을 구현해 보겠다.   

```python
import numpy as np
from dataset.mnist import load_mnist

(x_train, t_train), (x_test, t_test) = load_mnist(normalize = True, one_hot_label = True)

train_size = x_train.shape[0]
batch_size = 10
batch_mask = np.random.choice(train_size, batch_size) 
x_batch = x_train(batch_mask)
t_batch = t_train(batch_mask)
```

## 기울기
우리가 왜 **손실 함수**를 설정하였는가에 대해 알아보면 **매개변수**의 미분을 계산하여 그 값을 단서로 값을 서서히 갱신하는 과정을 반복해야 한다. 만약 가중치 매개변수의 손실 함수의 미분은 값을 아주 조금만 변화 시켰을 때 손실 함수가 어떻게 변하는지에 대한 단서이다. 따라서 손실함수를 왜 구해야 하는지 알았으므로 기울기를 구하는 방법을 알아보겠다.  

추가로 기울기를 학습하기 전 진정한 미분은 진정한 접선이며, 수치 미분은 근사로 구한 접선임을 염두해두고 아래를 살펴보자.

### 미분
![4.4](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 4.4.png)  

-   한 함수에 대해 한순간의 변화량을 표시한 것이지만, x+h 와 x사이의 기울기에 해당하며 h의 차이를 무한히 좁히는 것이 불가능하므로 아래와 같은 중앙 차분(f(x+h)-f(x-h))을 사용하여 좀 더 정확하게 개선할 수 있다. 그 과정은 생략하겠다.  

### 기울기(Gradient)
모든 변수의 편미분을 벡터로 정리한 것을 기울기라고 한다. 구현은 아래와 같다.   

```python
def numerical_gradient(f,x):
    h = 1e-4        #보통 이 값이 최적의 값임을 알고 있자.
    grad = np.zeros_like(x) #x와 형상이 같은 배열을 설정한다.

    for idx in range(x.size):
        tmp_val = x[idx]

        x[idx] = tmp_val + h
        fxh1 = f(x)

        x[idx] = tmp_val - h
        fxh2 f(x)

        grad[idx] = (fxh1-fxh2) / (2*h)
        x[idx] = tmp_val

    return grad
```

## 경사법
최적의 매개변수를 찾는 방법 중 하나이며, 기울기를 이용해 최솟값을 찾으려는 것을 경사법이라고 한다. 수식은 아래와 같다.  

![4.7](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 4.7.png)  

-   η : 학습률을 나타내며, 한번의 학습이 진행되었다면 매개변수의 값을 얼마나 갱신해야 하는지를 정하는 것이 학습률이다.

## 학습 알고리즘 구현하기
미니배치 -> 기울기산출 -> 매개변수 갱신 -> 반복 : 이 과정을 통해 학습 알고리즘을 아래와 같이 구현해보았다.  

### 2층 신경망 클래스

```python
import sys, os
sys.path.append(os.pardir)
from data.common.gradient import *
from data.common.functions import *

class TwoLayerNet:
    def __init__(self, input_size, hidden_size, output_size, weight_init_std = 0.01):
        self.params = {}
        self.params['W1'] = weight_init_std*np.random.randn(input_size,hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std*np.random.randn(hidden_size,output_size)
        self.params['b2'] = np.zeros(output_size)

    def predict(self,x):
        W1, W2 = self.params['W1'], self.params['W2']
        b1, b2 = self.params['b1'], self.params['b2']

        a1 = np.dot(x,W1) + b1
        s1 = sigmoid(a1)
        a2 = np.dot(s1,W2) + b2
        y = softmax(a2)

        return y
    
    def loss(self,x,t):
        y = self.predict(x)

        return cross_entropy_error(y,t)

    def accuracy(self, x,t):
        y = self.predict(x)
        y = np.argmax(y, axis = 1)
        t = np.argmax(t, axis = 1)

        accuracy = np.sum(y==t) / float(x.shape[0])
        return accuracy

    def numerical_gradient(self, x, t):
        loss_W = lambda W:self.loss(x,t)

        grads = {}
        grads['W1'] = numerical_gradient(loss_W,self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W,self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W,self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W,self.params['b2'])

        return grads
```

### 시험 데이터로 평가하기
```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
from data.dataset.mnist import load_mnist
from two_layer_net import TwoLayerNet

(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label= True)

network = TwoLayerNet(input_size = 784, hidden_size = 50, output_size = 10)

iters_num = 10000
train_size = x_train.shape[0]
batch_size = 100
learning_rate = 0.1


train_loss_list = []
train_acc_list = []
test_acc_list = []

#1 에폭당 반복수 => batch를 train_size에서 다 소진해야 1에폭
iter_per_epoch = max(train_size/batch_size,1) 

for i in range(iters_num):
    batch_mask = np.random.choice(train_size,batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]
    grad = network.numerical_gradient(x_batch,t_batch)
    for key in ('W1','b1','W2','b2'):
        network.params[key] -= learning_rate * grad[key]
    loss = network.loss(x_batch,t_batch)
    train_loss_list.append(loss)

    if i%iter_per_epoch ==0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test,t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        print("train acc, test acc |" + str(train_acc)+","+str(test_acc))

```

## 오차역전파법(Backpropagation)
수치 미분을 통해서 손실함수의 기울기를 구하는 방법은 쉽지만, 계산 시간이 너무 오래 걸린다는 것이 단점이다. 하지만 **오차역전파법**을 사용한다면 가중치 매개변수의 기울기를 효율적으로 계산하여 시간단축이 가능하다.

## 연쇄법칙(Chain Rule)
그동안 해온 계산 그래프의 **순전파** 계산 결과를 왼쪽에서 오른쪽으로 전달했다. 하지만 역전파는 **국소적인 미분**을 오른쪽에서 왼쪽으로 전달하는 방식을 사용한다. 이 국소적 미분을 전달하는 원리는 연쇄 법칙에 따른것이며, 연쇄 법칙에 대해 간단히 설명하겠다.
-   연쇄법칙: 합성 함수의 미분에 대한 성질이며, **합성함수의 미분은 합성함수를 구성하는 각 함수의 미분의 곱으로 나타낼 수 있다**는 성질이다.  

## 역전파
역전파가 연쇄법칙에 의해 진행되는 모습은 생략하였으며, 연쇄법칙을 이용하여 차근차근 오른쪽에서 왼쪽으로 상류의 값을 미분값과 곱해 나간다면 역전파를 구할 수 있다. 아래는 각 계산에 따른 역전파의 형상을 간단하게 요약해보겠다.  

### 덧셈 계층
z = x + y와 같은 덧셈식에서는 x에 대한 편미분, y에 대한 편미분 값이 모두 1이므로 상류에서 흘러 들어온 미분값과 곱하면 마치 상류에 내려온 값을 그대로 흘려보내는 양상을 띄게 된다. 따라서 **덧셈 노드의 역전파는 입력 값을 그대로 흘려보낸다.** 구현은 아래와 같다.  

```python
class AddLayer:
    def __init__(self):
        pass
    
    def forward(self, x, y):
        return x+y

    def backward(self, dout):
        dx = dout*1
        dy = dout*1
        
        return dx, dy
```
### 곱셈 계층
z = x * y와 같은 곱셈식에서는 x에 대한 편미분 값이 y, y에 대한 편미분 값이 x이다. 즉, 상류에서 흘러 들어온 미분값에 입력 신호를 바꿔 곱하여 하류로 흘려보내는 양상을 띄게 된다. 따라서 **곱셈 노드의 역전파는 상류의 미분값에 입력 값을 서로 바꿔 곱하여 흘려보낸다.** 구현은 아래와 같다.  

```python 
class MulLayer:
    def __init__(self):
        self.x = None
        self.y = None
    
    def forward(self,x,y):
        self.x = x
        self.y = y
        out = x*y

        return out

    def backward(self,dout):
        dx = dout * self.y
        dy = dout * self.x

        return dx, dy
```
### ReLU 계층 
순전파때의 입력이 0보다 크면 미분값이 1이므로 상류의 값을 그대로 흘려보내며, 만약 입력이 0보다 같거나 작았다면 미분값이 0이 되므로 상류의 값을 막아버린다. 구현은 아래와 같다.
```python
class Relu:
    def __init__(self):
        self.mask = None
    
    def forward(self,x):
        self.mask = (x<=0) # 0이하면 true, 이상이면 false를 저장하게 됨
        out = x.copy()
        out[self.mask] = 0  #boolean array로 True에 해당하는 값만 0으로 바뀜

        return out
    
    def backward(self,dout):
        dout[self.mask] = 0
        dx = dout

        return dx
```
### Sigmoid 계층
연쇄법칙에 의해서 sigmoid의 미분값은 아래의 식과 같이 순전파의 출력만으로 계산이 가능하다.  

![5.12](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 5.12.png)  

위의 식에 따라서 Sigmoid 계층을 구현하면 아래와 같다.  

```python
class Sigmoid:
    def __init__(self):
        self.out = None
    
    def forward(self,x):
        out = 1 / (1+np.exp(-x))
        self.out = out

        return out

    def backward(self,dout):
        dx = dout * (1.0 - self.out) * selfout

        return dx
```

### Affine 계층
신경망의 순전파 때 수행하는 행렬의 곱을 기하학에서는 어파인 변환(Affine transformation)이라고 한다. 따라서 어파인 변환을 수행하는(행렬의 곱) 계층을 Affine 계층이라고 한 것이다. 역전파를 구한 값에 해당하는 식은 아래와 같다.
![5.13](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 5.13.png)  

-   T : 전치행렬이라는 의미이다.  

즉, Affine 계층에서 dot product에서 역전파는 상류값에서 흘러들어온 값에 다른 쪽 입력값의 전치행렬을 dot product 해준다면 역전파의 값이 나오게 된다. 이때 형상을 상류에서 흘러들어온 행렬의 형상에 맞춰 dot produt를 앞에서 해야할지 뒤에서 해야할지 결정한다면 올바른 수식을 유도할 수 있을 것이다. Affine 계층은 아래의 구현과 같다.  

```python
class Affine:
    def __init__(self,W,b):
        self.W = W
        self.b = b
        self.x = None
        self.dw = None
        self.db = None

    def forward(self,x):
        self.x = x
        out = np.dot(x,self.W) +self.b

        return out

    def backward(self, dout):
        dx = np.dot(dout,self.W.T)
        self.dW = np.dot(self.x.T,dout)
        self.db = np.sum(dout,axis=0)

        return dx
```

### Softmax-with-Loss 계층 
Softamx-with-Loss의 계층에서 역전파의 결과가 y-t라는 말끔한 값이 나오지만, 그의 유도는 꽤나 복잡하므로 생략하겠다. 이를 구현한 코드는 아래와 같다.  

```python
class SoftmaxWithLoss:
    def __init__(self):
        self.loss = None
        self.y = None
        self.t = None

    def forward(self,x,t):
        self.t = t
        self.y = softmax(x)
        self.loss = cross_entropy_error(self.y,self.t)
        return self.loss

    def backward(self, dout = 1):
        batch_size = self.t.shape[0]
        dx = (self.y-self.t) / batch_size

        return dx
```

## 오차역전파법을 이용한 신경망 구현하기
미니배치 -> 기울기산출(오차역전파법 구현) -> 매개변수 갱신 -> 반복 : 이 네개의 과정을 순서대로 구현한다면 아래와 같다.  

```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
from data.common.functions import *
from data.common.gradient import numerical_gradient
from collections import OrderedDict

class TwoLayerNet:

    def __init__(self, input_size, hidden_size, output_size, weight_init_std = 0.01):
        self.params = {}
        self.params['W1'] = weight_init_std*np.random.randn(input_size,hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size,output_size)
        self.params['b2'] = np.zeros(output_size)

        #계층 생성
        self.layers = OrderedDict()         #들어온 계층을 딕셔너리의 형태로 저장함.
        self.layers['Affine1'] = Affine(self.params['W1'],self.params['b1'])
        self.layers['Relu1'] = Relu()
        self.layers['Affine2'] = Affine(self.params['W2'],self.params['b2'])
        
        self.lastlayer = softmaxWithLoss()

    def predict(self,x):
        for layer in self.layers.values():
            x = layer.forward(x)
        return x
    
    def loss(self,x,t):
        y = self.predict(x)
        return self.lastlayer.forward(y,t)

    def accuracy(self,x,t):
        y = self.predict(x)
        y = np.argmax(y, axis=1)
        if t.ndim !=1 :
            t = np.argmax(t, axis =1)
        
        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

    def numerical_gradient(self,x,t):
        loss_W = lambda W: self.loss(x,t)

        grads = {}
        grads['W1'] = numerical_gradient(loss_W,self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W,self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W,self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W,self.params['b2'])
        return grads

    def gradient(self,x,t):
        self.loss(x,t)

        dout = 1
        dout = self.lastlayer.backward(dout)

        layers = list(self.layers.values)
        layers.reverse()
        for layer in layers:
            dout = layer.backward(dout)

        grads = {}
        grads['W1'] = self.layers['Affine1'].dW
        grads['b1'] = self.layers['Affine1'].db
        grads['W2'] = self.layers['Affine2'].dW
        grads['b2'] = self.layers['Affine2'].db

        return grads
```
## 오차역전파법을 이용한 학습 구현하기
```python
import sys, os
sys.path.append(os.pardir)
import numpy as np
from data.dataset.mnist import load_mnist
from re_two_layer import TwoLayerNet

(x_train, t_train), (x_test, t_test) = load_mnist(normalize= True, one_hot_label= True)
network = TwoLayerNet(input_size=784, hidden_size = 50 , output_size = 10)

iters_num = 10000
train_size = x_train.shape[0]
batch_size = 100
learning_rate = 0.1

train_loss_list = []
train_acc_list = []
test_acc_list = []

iter_per_epoch = max(train_size / batch_size, 1)

for i in range(iters_num):
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    grad = network.gradient(x_batch, t_batch)

    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[ket] -= learning_rate*grad[key]

    loss = network.loss(x_batch,t_batch)
    train_loss_list.append(loss)

    if i%iter_per_epoch == 0:
        train_acc = network.accuracy(x_train,t_train)
        test_acc = network.accuracy(x_test,t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        print(train_acc, test_acc)
```

## 학습 관련 기술들
지금까지 매개변수의 최적값을 찾는 문제에서 기울기를 사용하여 기울어진 방향으로 매개변수 값을 갱신하는 방식으로 값을 찾아 나갔다. 지금까지 위에서 구현했던 갱신의 방식에서는 Learning rate와 미분값을 곱하여 기울어진 방향으로 일정한 거리만 가겠다는 단순한 방식을 사용해 왔다. 이것을 SGD라고 한다.  

### SGD(확률적 경사 하강법)
![6.1](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 6.1.png)  

-   W : 갱신할 가중치 매개변수
-   η : 학습률 -> 앞에서 구현한 매개변수 갱신에서 학습률이며, 0.1과 같이 미리 정해서 사용했음을 알 수 있다.
-   <- : 좌변의 값을 우변의 값으로 갱신한다는 의미  

따라서 SGD는 기울어진 방향으로 **일정 거리**만 가겠다는 단순한 방법이다. 구현은 아래와 같다.  

```python
class SGD: 
    def __init__(self, lr = 0.01):
        self.lr = lr

    def update(self, params, grads):
        for key in params.keys():
            params[key] -= self.lr*grad[key]
```

-   위의 구현처럼 모듈화하여 optimizer = SGD()와 같이 기능을 모듈화 하기가 좋다.  

### 모멘텀
물리와 관계있는 모델이며 수식은 아래와 같다.
![6.2](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 6.2.png)  
![6.3](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 6.3.png)  

-   W : 갱신할 가중치 매개변수
-   v : 물리에서 말하는 속도에 해당한다.  

구현은 아래와 같다.
```python
class Momentum:
    def __init__(self, lr = 0.01, momentum = 0.9):
        self.lr = lr
        self.momentum = momentum
        self.v = None

    def update(self, params, grads):
        if self.v is None:
            self.v = {}
            for key, val in params.items()
                self.v[key] = np.zeros_like(val)
        
        for key in params.keys():
            self.v[key] = self.momentum * self.v[key] - self.lr*grads[key]
            params[key] += self.v[key]
```

### AdaGrad
처음에는 크게 학습을 하다가 나중에 들어서는 조금씩 학습한다는 방법이다. 수식은 아래와 같다.  

![6.5](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 6.5.png)  
![6.6](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 6.6.png)  

-   개별 매개변수에 적응적으로 학습률을 조정하면서 학습을 진행한다.   

## 가중치의 초깃값
신경망의 학습에서 가중치의 초깃값을 무엇으로 설정하느냐에 따라서 앞으로의 학습의 성패가 결정되는 일이 자주 있다고 한다. 이번 파트에서는 **권장 초깃값**에 대해 설명하고 실험을 통해 실제로 신경망 학습이 신속하게 이루어지는 모습을 확인하겠다.  

### 초깃값이 0일때
-   가중치 감소 : 오버피팅(학습 데이터에만 적응하여 실전 데이터에서는 성능을 발휘하지 못하는 현상)을 억제해 범용성능을 높이는 기술. 기술의 원리는 가중치 매개변수의 값이 작아지도록 학습하는 방법이지만, 초깃값을 0으로 설정한다면 오차역전파법에서 모든 가중치의 값이 똑같이 갱신되기 때문이다. 

### 은닉층의 활성화값 분포
![6-10](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 6-10.png)    

-   가우시안 표준정규분포에서는 평균이 0이고 표준편차가 1이다. 이때 무작위 생성된 가중치 매개변수들을 집어 넣고 은닉층의 활성화값(Activation Function의 출력값)을 본다면 대부분의 출력이 0과 1에 분포하게 된다. 이런 양상은 후에 시그모이드 함수의 형상을 생각하면 0과 1에서 기울기가 0에 가까워지게 된다. 그렇게 되면 역전파의 기울기 값이 점점 작아지다 사라지게(0에 근접한다)는 사실을 알 수 있다. 이러한 현상을 **기울기 소실**이라고 한다.

![6-11](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 6-11.png)  

-   random.randn(가우시안 표준정규분포) -> 여기에 0.01을 곱한다면 표준편차를 0.01로 만들 수 있다(생성된 표본의 표준편차가 1이므로). 하지만 활성화값의 분포를 본다면 0.5에 치우쳐있는데, 이렇게 된다면 여러게의 뉴런을 둔 의미가 없어지게 된다. **즉, 표현력을 제한한다는 의미가 된다.**

![6-13](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 6-13.png)  

-   Xavier 초깃값 : 앞 계층의 노드의 개수 -> **n**일 때, 표준편차가 1/√n인 분포를 사용하는 방식. 이러한 방식을 사용한다면 층이 깊어질수록 형상이 일그러지지만, 각 층에 흐르는 데이터는 넓게 퍼져있다.  

![6-14](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 6-14.png)  


-   He 초깃값 : 앞 계층의 노드의 개수 -> **n**일 때, 표준편차가 √2/√n인 분포를 사용하는 방식이며 **ReLU에 특화된 초깃값**. 위의 그림을 보면 활성화 함수로 ReLu를 사용했을때 각각의 초깃값을 사용할 때의 활성화값 분포 양상이다. He초깃값을 사용하면 층이 깊어져도 균등하게 분포한다는 것을 볼 수 있다.  

위의 결과에 따라 정리하면 다음과 같다.  

|활성화 함수|초깃값|
|----------|------|
|ReLU|He|
|Sigmoid|Xavier|
|tanh|Xavier|

## 합성곱 신경망 (CNN)
이미지 인식과 음성 인식 등 다양한 곳에서 사용되며, 특히 **이미지 분야**에서 딥러닝을 활용한 기법은 대부분 CNN을 기초로 한다고 한다. 아래에서 CNN의 메커니즘을 자세히 설명하고 이를 파이썬으로 구현해보겠다.

## 지금까지 구현한 신경망 vs CNN
![7-1](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-1.png)  

-   위의 그림은 현재까지 구현했던 신경망의 구조이며 이를 **완전연결(Fully Connected)**라고 하며 완전히 연결된 층을 Affine계층이라는 이름으로 구현하였다. 
-   Affine계층 뒤에 활성화 함수인 ReLU계층이 이어진다. 마지막 층에서는 활성화 함수가 Softmax로 구현됨.
![7-2](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-2.png)  

-   CNN 계층이며, **합성곱 계층**과 **풀링 계층**이 추가되었다. 앞의 계층에서는 Conv-ReLU-Pooling 계층으로 구성되며, 출력에 가까운 층에서는 현재까지 구현해온 Affine-ReLU계층으로 구성을 사용할 수 있다. 마지막 출력은 Affine-Softmax계층을 그대로 사용한다. 
-   위의 구현이 일반적인 CNN의 구조이다.
-   현재까지의 구현과는 달리 **입체적인 데이터**가 흐른다. 

## Affine 계층 vs Convolutional 계층
-   완전연결 계층의 문제점 : mnist데이터 셋을 사용할 때 형상이 1차원인 배열을 사용했다(load_mnist에서 flatten의 초기 설정값이 True이므로 별도의 설정을 하지 않아도 1차원 배열로 파일을 불러왔었다.) -> 하지만, 이미지는 3차원 배열(가로, 세로, 색상)으로 구성된 데이터이며, 각 픽셀을 1차원으로 변환한다면 인접했던 픽셀들 사이의 정보가 훼손되며 3차원 속에서 갖는 패턴들이 무시되었다. 따라서 완전연결 계층에서는 **형상을 무시하여 형상에 담긴 정보를 살릴 수 없었다.**
-   합성곱 계층의 이점 : 이미지를 3차원으로 받으므로 다음 계층으로 데이터를 전달할 때 3차원 데이터가 가질 수 있는 내재된 데이터를 그대로 전달할 수 있다. 
    -   특징 맵(Feature map) : Convolutional 계층의 입출력 데이터를 지칭하는 말 => 입출력 데이터와 특징 맵을 같은 의미로 사용한다.
    -   Imput Feature map : 입력 데이터
    -   output Feature map : 출력 데이터 

## 합성곱 연산
![7-3](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-3.png)    

-   입력데이터에 필터(커널)를 적용하며 합성곱 연산에서 계산은 필터의 윈도우를 일정 간격 이동해가면 입력 데이터에 적용해간다. 이때 필터에 대응하는 원소들의 곱의 합을 구하여 출력에 해당장소에 저장한다. 이 과정을 반복한다면 합성곱 연산의 출력이 완성된다.
-   **필터의 매개변수** = 그동안의 **가중치**
-   편향은 필터를 적용한 결과값에 고정값을 모든 원소에 더하는 방식으로 적용한다.

## 패딩
![7-6](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-6.png)  

-   위의 합성곱 연산을 계속 이어나간다면 심층 신경망에서는 출력 데이터의 크기가 작아지게된다. 이를 방지하기위해 입력 데이터 주위에 **특정값**을 채워 합성곱 이후에도 입력 데이터의 크기가 유지됨을 알 수 있다.

## 스트라이드
![7-7](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-7.png)  

`   위의 그림처럼 필터를 적용하는 위치의 간격을 스트라이드라고 한다. 윈도우가 이동하는 간격을 말하는 것이다.  

## 패딩, 스트라이드, 출력의 크기를 계산하는 방법
![7-12](/assets/images/post/2020-12-25-DeepLearningFromScratch/e 7.1.png)
-    출력의 크기가 정수가 아니라면 오류를 출력하도록 설정. 일부 딥러닝 프레임워크에서는 가장 가까운 정수로 반올림하여 에러를 딱히 내지않는 경우도 있다.

## 3차원 데이터의 합성곱 연산
3차원 데이터 합성곱 연산에서는 2차원에서 다루는 합성곱과 크게 다르지는 않지만, 입체성을 결정하는 **채널 방향**이 존재함을 염두해야 한다. 하지만 **입력 데이터의 채널수**와 **필터의 채널 수**는 항상 같아야 한다. 그렇다면 출력값의 채널이 입력값의 채널보다 훨씬 작을텐데 이를 어떻게 해결할까? => 필터의 개수를 늘려 출력 채널수를 증가시킨다. 필터의 가중치 데이터는 **(출력 채널 수, 입력 채널 수, 높이, 너비)**순으로 작성되며 대략적인 그림은 아래와 같다. 
![7-12](/assets/images/post/2020-12-25-DeepLearningFromScratch/fig 7-12.png)  

## 풀링 계층
세로 - 가로 방향의 공간을 줄이는 연산으로 아래 그림과 같이 일정 크기의 공간을 하나의 원소로 밀집시켜 공간의 크기를 줄인다. 이때 하나의 원소로 밀집시키는 기준은 일정 크기 공간 안에서 가장 큰 원소를 선택하는 것이다.  
![7-13](/assets/images/post/2020-13-25-DeepLearningFromScratch/fig 7-13.png)  

-   스트라이드 2로 처리하는 과정이며 보통 풀링의 윈도우 크기과 스트라이드는 같은 값으로 설정한다. 
-   세로 - 가로 공간만 줄이므로 채널의 수가 변하지 않는다.

## im2col(image to column)
입력 데이터를 필터링하기 좋게 펼치는 함수이다. 정확히는 4차원 데이터를 2차원으로 변환하는 역할을 한다. 대력적인 im2col을 사용한 합성곱 연산의 필터 처리 과정은 다음과 같다.
![7-19](/assets/images/post/2020-13-25-DeepLearningFromScratch/fig 7-19.png)  

## 합성곱 계층 구현하기
im2col은 필터 크기, 스트라이드, 패딩을 고려하여 입력 데이터를 2차원 배열로 전개한다. 구현은 아래와 같다.  

```python
class Convolution:
    def __init__(self, W, b, stride = 1, pad = 0):
        self.W = W
        self.b = b
        self.stride = stride
        self.pad = pad
    def forward(self,x):
        FN, C, FH, FW = self.W.shape        #convolution class의 지역변수 필터의 가중치의 형상을 입력받음
        N, C, H, W = x.shape                #입력값의 형상을 받음
        out_h = int(1+(H+2*self.pad-FH)/self.stride)
        out_w = int(1+(W+2*self.pad - FW)/ self.stride)

        col = im2col(x,FH,FW,self.stride, self.pad)
        col_W = self.W.reshape(FN, -1).T
        out = np.dot(col, col_W) + self.b   

        out = out.reshpae(N, out_h, out_W, -1).transpose(0, 3, 1, 2)

        return out
```

## 풀링 계층 구현하기
```python
class Pooling:
    def __init__(self,pool_h, poop_w,stride=1, pad = 0):
        self.pool_h = pool_h
        self.pool_w = poop_w
        self.stride = stride
        self.pad = pad
    
    def forward(self,x):
        N, C, H, W = x.shape
        out_h = int(1+(H-self.pool_h)/self.stride)
        out_w = int(1+(W-self.pool_w)/self.stride)

        col = im2col(x,self.pool_h,self.pool_w,self.stride,self.pad)
        col = col.reshape(-1,self.pool_h*self.pool_w)

        out = np.max(col,axis=1)

        out = out.reshape(N, out_h, out_w, C).transpose(0,3,1,2)

        return out
```
## CNN 구현하기
```python
class SimpleConvnet:
    def __init__(self, input_dim = (1, 28,28), 
    conv_param = {'filter_num' : 30, 'filter_size' : 5, 'pad' : 0, 'stride' : 1}, 
    hidden_size =100, output_size = 10, weight_init_std  0.01):

    # 딕셔너리에 합성곱 계층의 하이퍼파라미터 값을 딕셔너리에 저장하여 나중에 쓰기 쉽도록 조정
    # 합성곱 계층의 출력을 미리 계산해둠
    filter_num = conv_param['filter_num']
    filter_size = conv_param['filter_size']
    filter_pad = conv_param['pad']
    filter_stride = conv_param['stride']
    input_size = input_dim[1]
    conv_output_size = (input_size - filter_size +2*filter_pad)/filter_stride+1
    pool_output_size = int(filter_num*(conv_output_size/2)*(conv_output_size/2))

    # 가중치 매개변수를 초기화 하는 부분
    self.params = {}
    # 합성 곱 계층의 가중치와 편향
    self.params['W1'] = weight_init_std*np.random.randn(filter_num,input_dim[0],filter_size,filter_size)
    self.params['b1'] = np.zeros(filter_num)
    #Affine 계층의 가중치와 편향
    self.params['W2'] = weight_init_std*np.random.randn(pool_output_size,hidden_size)
    self.params['b2'] = np.zeros(hidden_size)
    #Affine 계층의 가중치와 편향
    self.params['W3'] = weight_init_std*np.random.randn(hidden_size,output_size)
    self.params['b3'] = np.zeros(output_size)

    #CNN을 구성하는 계층을 생성
    self.layers = OrderedDict()
    self.layers['Conv1'] = Convolution(self.params['W1'],self.params['b1'],conv_param['stride'],conv_param['pad'])
    self.layers['ReLU'] =ReLU()
    self.layers['Pool1'] = Pooling(pool_h=2,pool_w=2,stride =2)
    self.layers['Affine1'] = Affine(self.params['W2'],self.params['b2'])
    self.layers['ReLU2'] = ReLU()
    self.layers['Affine2'] = Affine(self.params['W3'],self.params['b3'])
    self.last_layer = SoftmaxWithLoss()

#Predict 매서드와 loss 매서드 구축
    def predict(self,x):
         for layer in self.layers.values():
             x=layer.forward(x)
        return x

    def loss(self,x,t):
        y = self.predict(x)
        return self.last_layer.forward(y,t)

    def gradient(self,x,t):
        self.loss(x,t)  #순전파

        #역전파
        dout = 1
        dout = self.last_layer.backward(dout)

        layers = list(self.layers.values())
        layers.revers()
        for layer in layers:
            dout = layer.backward(dout)

        #결과를 저장
        grads = {}
        grads['W1'] = self.layers['Conv1'].dW
        grads['b1'] = self.layers['Conv1'].db
        grads['W2'] = self.layers['Affine1'].dW
        grads['b2'] = self.layers['Affine1'].db
        grads['W3'] = self.layers['Affine2'].dW
        grads['b3'] = self.layers['Affine2'].db

        return grads
```











