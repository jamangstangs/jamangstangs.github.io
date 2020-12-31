---
title: Pytorch Tutorial in 60m
categories: Pytorch
---
## Tensor
### Tensor 생성
-   초기화되지 않은 5x3 행렬을 생성해보자.
```python
x = torch.empty(5,3)
#그 시점에 할당된 메모리에 존재하던 값들이 초기값으로 나타난다.
```
-   무작위로 초기화된 행렬을 생성한다.
```python
x = torch.rand(5,3)
```
-   dtype이 long이고 0으로 채워진 행렬을 생성한다.
```python
x = torch.zeros(5,3,dtype = torch.long)
```
-   tensor를 데이터를 가지고 직접 생성한다.
```python
x = torch.tensor([5.5,3])
```
-   기존 tensor를 바탕으로 새로운 tensor를 만들어 본다. 직접 dtype을 명시하지 않으면 기존 tensor의 속성을 그대로 받는다.(예시에서는 직접 명시)
```python
x = x.new_ones(5,3,dtype = torch.double)
x = torch.randn_like(x,dtype = torch.float)
```
-   행렬의 크기를 구하기
```python
print(x.size())
```

### Tensor 연산
-   덧셈
```python
y = torch.rand(5,3)
print(x+y)
```
-   덧셈2
```python
print(torch.add(x,y))
```
-   덧셈: 결과 tensor를 인자로 제공
```python
result = torch.empty(5,3)
torch.add(x,y,result)
print(result)
```
-   덧셈: 바꿔치기
_는 in_place 방식임을 기억하자.
```python
y.add_(x)       #y+=x라고 생각하자.
print(y)            
```

-   크기 변경
```python
x = torch.randn(4,4)
y = x.view(16)
z = x.view(-1,8)        #-1은 다른 차원에서 유추한다. 16개의 원소에서 다른 원소가 8이므로 2차원인거를 계산해낸다.
```
### Numpy - Torch Tensor변환
-   Torch Tensor를 Numpy array로 변환하기
```python
a = torch.ones(5)
print(a)        #torch Tensor
b = a.numpy()
print(b)        #numpy array

a.add_(1)
print(a)
print(b)        #a에 연산을 했음에도 numpy변환값인 b에도 적용됨
```
-   Numpy array를 Torch Tensor로 변환하기
```python
import numpy as np
a = np. ones(5)
b = torch.from_numpy(a)
np.add(a,1,out = a)
print(a)            #
print(b)            #torch tensor에도 적용이 됨
```
**텐서 연산을 할 때, 꼬리 디멘션에서 시작할 때, Dimension은 같거나 1이거나 아예 없어야 한다.**

### Cuda tensors
.to 메소드로 tensor를 어떠한 장치로도 옮길 수 있다.
```python
if torch.cuda.is_available():
    device = torch.devide("cuda")
    y = torch.ones_like(x,device = device)
    x = x.to(device)
    z = x+y
    print(z)
    print(z.to("cpu",torch.double))
```

## AutoGrad
autograd 패키지는 Tensor의 모든 **연산**에 대해 **자동 미분**을 제공한다. define-by-run 프레임워크로 코드를 어떻게 작성하느냐에 따라서 역전파가 정의된다. -> 역전파는 학습 과정의 매 단계마다 달라진다.
### Tensor
**torch.Tensor 클래스**
-   .requires_grad = True : torch.tensor에서 속성을 이렇게 선언하면 이 tensor에서 이뤄진 모든 연산을 **추적**한다. 
-   .backward() : 이 메소드를 호출하면 모든 gradient를 자동으로 계산할 수 있다. 이 tensor의 gradient는 **.grad**속성에 누적된다.
-   .detach() : 추적을 중단한다.  

**Function 클래스**
-   Tensor - Function은 서로 연결되어 있어서, 모든 연산과정을 부호화 하여 acyclic graph를 생성한다. 
-   각 tensor는 **.grad_fn**속성을 가지며, Tensor를 생성한 Function을 **참조**한다.  

### Autograd 코드 구현
```python
import torch

x = torch.ones(2,2,requires_grad = True)    #연산을 기록한다.
print(x)

y = x + 2       #tensor에 연산을 수행한다.
print(y)        #.grad_fn에서 add 함수를 참조한 것을 알 수 있다. 
# tensor([[3., 3.],[3., 3.]], grad_fn=<AddBackward0>)

print(y.grad_fn)    # 연산의 결과로 생성된 y이므로 .grad_fn을 가지는 것을 알 수 있다.
# <AddBackward0 object at 0x7f843916f0f0>

z = y * y * 3       # y에 다른연산을 수행 : z의 .grad_fn에 저장
out  = z.mean()     # z에 다른연산을 수행 : out의 .grad_fn에 저장

print(z,out)
#tensor([[27., 27.],
#        [27., 27.]], grad_fn=<MulBackward0>) tensor(27., grad_fn=<MeanBackward0>)

a = torch.randn(2,2)
a = ((a*3)/(a-1))
print(a.requires_grad)  #False
a.requires_grad_(True)
print(a.requires_grad)  #True
b = (a*a).sum()
print(b.grad_fn)        #<SumBackward0 object at 0x7f843916f470>
```  

### 변화도(gradient)
이제 역전파를 해보겠다. 그 전에 autograd코드에서 구현했던 x,y,z연산을 정리해보겠다.
-   x, y = x+2, z =y^2+3 = (x+2)^2+3, out = 0.25*sum(z)
-   out은 하나의 스칼라 값만 가지므로 out.backward()는 out.backward(torch.tensor(1.))과 동일하다.
-   d(out)/dx를 구하는 방법은 아래와 같다.
```python
out.backward()
print(x.grad)
#tensor([[4.5000, 4.5000],
#        [4.5000, 4.5000]])
```  

torch.autograd는 벡터-야코비안 곱을 구하는 엔진이다. 아래에서는 벡터-야코비안 곱의 예제를 다뤄보겠다.
```python
x = torch.randn(3, requires_grad = True)

y = x*2
while y.data.norm() < 1000:     # norm은 벡터의 길이 혹은 크기를 측정하는 함수, 원점에서 벡터 좌표까지의 거리다.
    y = y*2
print(y) #위의 out예제와 달리 y는 스칼라 값이 아니다. 따라서 backward할 때 argument로 넘겨야 하는 값이 다음과 같다.
v = torch.tensor([0.1,1.0,0.0001],dtype = torch.float)
y.backward(v)   #여기서 벡터-야코비안곱을 얻어낸다.

print(x.grad)

#이제 다 했으니까 추적을 멈추는 방법을 알아보자.
print(x.requires_grad)  #True
print((x**2).requires_grad) #True
with torch.no_grad():
    print((x**2).requires_grad) #False
# 내용물은 같지만 require_grad가 다른 새로운 텐서를 떼어서 가져와보자
print(x.requires_grad)
y = x.detach()
print(y.requires_grad)
print(x.eq(y).all())    #객체 비교 연산
```  

## 신경망
위에서 autograd를 통해서 기본 연산을 Pytorch를 이용해 하는 방법을 알아보았다.
신경망은 **torch.nn**패키지를 통해서 생성이 가능하다. nn은 모델을 **정의**하고 **미분**하는데 **autograd**를 사용한다. 이때 nn.Module은 계층과 output을 반환하는 **forward(input)**메서드를 포함하고 있다. 신경망의 학습 방법은 아래와 같다.
-   학습 가능한 매개변수를 갖는 신경망을 정의한다.
-   데이터셋 입력을 반복한다.
-   입력을 신경망에서 전파한다.
-   손실을 계산한다.
-   Gradient를 신경망의 매개변수들에 역으로 전파한다.
-   신경망의 가중치를 갱신한다.  

Pytorch를 이용해 신경망을 정의해보겠다.
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):       #nn.module상속
    def __init__(self):
        super(Net, self).__init__() # Net은 자식 클래스를 명시한 것이며. nn.module(부모 클래스)의 생성자를 호출해준것이다. 즉, 현재클래스가 어떤 클래스인지 보기 좋게 명시한 것이다.
        
        self.conv1 = nn.Conv2d(1,6,3)   # 입력 채널 수, 출력 채널 수, 필터 크기
        #Input : 32x32 입력 데이터 1개
        #C1 : feature maps : 6@28x28 이므로 conv에서 출력 채널 수가 6인거를 알 수 있다.
        self.conv2 = nn.Conv2d(6,16,3)  # 입력 채널 수, 출력 채널 수, 필터 크기
        #S2 : feature maps : 6@14x14 이므로 입력 데이터가 6개 인거를 알 수 있다.
        #C3 : feature maps : 16@10x10 이므로 conv에서 출력 채널 수가 16인거를 알 수 있다. 
        # subsampling 과정은 풀링 계층 (단순히 원소를 줄이기만 하는 계층, 10x10에서 5x5 크기로 원소가 줄어들엇음을 알 수 있다.)
        self.fc1 = nn.Linear(16*6*6,120)
        self.fc2 = nn.Linear(120,84)
        self.fc3 = nn.Linear(84,10) 
        #마지막에 해당하는 아핀연산임을 알 수 있다.
    
    def forward(self,x):
        x = F.max_pool2d(F.relu(self.conv1(x)),(2,2))
        # (2,2)크기의 윈도우에 대해서 max pooling
        x = F.max_pool2d(F.relu(self.conv2(x)),2)
        # 크기가 제곱수라면 하나의 숫자만을 특정
        x = x.view(-1, self.num_flat_features(x))
        x = F.relu(self.fc1(x))
        x = F.relu(self.fx2(x))
        x = self.fc3(x)
        return x
    
    def num_flat_features(self,x):
        size = x.size()[1:]     #배치 차원을 제외한 모든 차원 
        num_features = 1
        for s in size:
            num_features *=s
        return num_features

net = Net()
print(net)
# forward 함수만 정의하고 나면 backward 함수는 autograd를 사용하여 자동으로 정의한다. 

params = list(net.parameters())
print(len(params))
#10
print(params[0].size())     #conv1의 .weight
#torch.Size([6,1,3,3])

input = torch.randn(1,1,32,32)
out = net(input)
print(out)

net.zero_grad()             #매개변수의 gradient버퍼를 0으로 초기화
out.backward(torch.randn(1,10)) #무작위 값으로 역전파 시작
```
### 요약
-   nn.Moule : 신경망 모듈, 매개변수를 **캡슐화**하는 간편한 방법으로 GPU이동, 내보내기, 불러오기 들의 작업을 위한 헬퍼를 제공한다.
-   nn.Parameter : Tensor의 한 종류로, Module에 속성으로 할당될 때 자동으로 매개변수로 등록됩니다.
-   autograd.Function : autograd 연산의 전방향과 역방향의 정의를 구현한다.   

### 배운 내용
-   신경망을 정의하기
-   입력을 처리하고 backward를 호출하는 것  

### 더 배울 내용
-   손실을 계산하기
-   신경망의 가중치를 계산하기  

## 손실함수(Loss Function)
-   출력이 입력으로부터 얼마나 멀리 떨어져 있는지 추정하는 값을 계산한다. Mean-Squared-error를 계산하는 nn.MESloss를 써보자.
```python
output = ner(input)
target = torch.randn(10)
target = target.view(1,-1)  #출력과 같은 shape로 만들었다.
criterion = nn.MSEloss()

loss = criterion(output,target)
print(loss)
```

## 지금까지 연산 그래프
```python
input -> conv2d -> relu -> maxpool2d -> conv2d -> relu -> maxpool2d
      -> view -> linear -> relu -> linear -> relu -> linear
      -> MSELoss
      -> loss
```

## 역전파
loss.backward()만 해주면 오차를 역전파하기가 가능하다. 추가로 기존 변화도를 없애야 한다. **그렇지 않으면 기존의 변화도에 누적이 되기 때문이다.**
```python
net.zero_grad()

print('conv1.bias.grad before backward')
print(net.conv1.bias.grad)

loss.backward()

print('conv1.bias.grad after backward)
```

## 가중치 갱신
SGD를 사용하여 갱신해보겠다.
```python
learning_rate = 0.01
for f in net.parameters():
    f.data.sub_(f.grad.data * learning_rate)
```
SGD이외의 갱신 방법은 torch.optim 라는 패키지 안에 모두 구현되어있다. 방법은 아래와 같이 사용하면 된다.
```python
import torch.optim as optim

optimizer = optim.SGD(net.parameters(), lr=0.01))

optimizer.zero_grad()
output = net(input)
loss = criterion(output.target)
loss.backward()
optimizer.step()
```  

## 분류기 학습하기
### 데이터는 어디서 가져오나?
표준 Python 패키지를 이용하여 Numpy배열로 불러온다. 그 후에 배열은 torch.*Tensor로 변환하는 것이 일반적인 방법이다.
-   Image : Pillow, OpenCV
-   Audio : Scipy, LibROSA
-   Text : Python, Cython, NLTK, SpaCy
-   video : torchvision을 쓰며,
    -   data loader : torchvision.datasets  데이터셋을 위한 데이터로더
    -   data transformer : torch.utils.data.DataLoader  이미지용 데이터 변환기

## 이미지 분류기 학습하기
학습 절차는 다음과 같다. 
-   torchvision을 사용하여 CIFAR10(이미지셋)의 train,test 데이터셋을 불러오고 정규화한다.
-   Convolutional Neural Network를 사용한다.
-   손실 함수를 정의한다.
-   학습용 데이터를 사용하여 신경망을 학습시킨다.
-   시험용 데이터를 사용하여 신경망을 검사한다.  

### CIFAR10를 불러오고 정규화하기
```python
import torch
import torchvision
import torchvision.transforms as transforms

## torchvision 데이터셋의 출력은 [0,1]의 범위를 가진다. 이를 [-1,1]범위로 정규화 된 Tensor로 변환한다.
# 정규화를 하지 않는다면 최적값을 도출하기 위해 학습을 여러번 더 해야할 수도 있기에 정규화를 해야한다.
transform = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5,0.5,0.5),(0.5,0.5,0.5))])

trainset = torchvision.datasets.CIFAR10(root='./data', train = True,download = True, transform = transform)
trainloader = torch.utils.data.DataLoader(trainset,batch_size=4,shffle=True,num_workers = 2)

testset = torchvision.datasets.CIFAR10(root='./data',train = False, download=True,transform=transform)
testloader = torch.utils.data.DataLoader(testset,batch_size=4,shuffle=False,num_workers =2)

classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')
```