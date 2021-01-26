---

title: MLP with MNIST

toc: true

use_math: true

categories:

 - Deep Learning

---

## 모듈 임포트하기

```python
import numpy as np
# 선형 대수에 관련된 함수를 쉽게 이용할 수 있는 모듈, np.array가 그 예시이다.
import matplolib.pyplot as plt
# 그래프 그리는 모듈
import torch
# 파이토치 기본 모듈
import torch.nn as nn
import torch.nn.functional as F
# 인공 신경망 모델링할 때 필요한 함수를 모아놓은 모듈
# 특히, 자주 이용되는 함수를 F로 지정
from torchvision import transforms, datasets
# 아직 뭔진 모르겠지만, 자주 이용하는 transforms, datasets 함수를 임포트 한다.
```

## 딥러닝 모델을 설계할 때 활용하는 장비를 확인하기

```python
if torch.cuda.is_available():
  DEVICE = torch.device('cuda')
else 
	DEVICE = torch.device('cpu')
  
print('Using PyTorch version:', torch.__version__,' Device: ', DEVICE)
#현재 디바이스를 확인해보자.

# 파이썬 코드에서 하이퍼파라미터를 지정할 때 대부분 대문자로 표기한다.
BATCH_SIZE = 32
# 학습할 때 필요한 데이터의 개수의 단위이다.
# 1 Mini_Batch = 32 Data, 1Mini_batch로 학습을 1화 진행. 
# 1 개의 미니배치로 학습하는 횟수 : Iteration
# 전체 데이터 : 100,000개의 데이터
# 1 Mini_batch = 10,000개의 데이터
# 1 EPOCH = 10 Iteration
EPOCH = 10
# 미니배치를 전부 이용하는 횟수를 의미한다.
```

## MNIST 데이터 다운로드(Train set, Test set 분리하기)

```python
train_dataest = dataset.MNIST(root = "../data/MNIST",
                             train = True,
                             download = True,
                             transform = transform.ToTensor())
# dataset : 데이터셋을 다운로드 한다.
# root : 데이터가 저장될 장소를 의미한다.
# train : 이게 학습용 데이터인지 아닌지 지정한다.
# download : 인터넷 상에서 다운로드 할지 정한다.
# transform : 이미지 데이터를 텐서 형태로 변경한다.또한 정규화 과정도 진행된다. 
test_dataset = dataset.MNIST(root = "../data/MNIST",
                            train = False,
                            transform = transform.ToTensor())
train_loader = torch.utils.data.DataLoader(dataset = train_dataset,
                                          batch_size = BATCH_SIZE,
                                          shuffle = True)
test_loader = torch.utils.data.DataLoader(dataset = test_dataset,
                                         batch_size = BATCH_SIZE,
                                         shuffle = False)
# DataLoader : 이 함수를 사용해 mini-batch를 구성하는 것이 가능하다. 
# shuffle : Label의 순서를 암기하여 학습하는 것을 방지하기 위해 데이터 순서를 섞는 과정을 한다.
```

## 데이터 확인하기

```python
for (X_train, y_train) in train_loader:
  print('X_train: ', X_train.size(), 'type: ',X_train.type())
  print('y_train: ', y_train.size(), 'type: ', y_train.type())
  break
# X_train:  torch.Size([32, 1, 28, 28]) X_train:  torch.FloatTensor
# y_train:  torch.Size([32]) y_train:  torch.LongTensor
  

pltsize = 1
plt.figure(figsize = (10 * pltsize, pltsize))
for i in range(10):
  plt.subplot(1, 10, i+1)
  plt.axis('off')
  plt.imgshow(X_trainp[i, :, :, :].numpy().reshape(28,28), cmap = "gray_r")
  plt.title('Class: ' +str(y_train[i].item()))
```

## MLP 모델 설계하기

```python
class Net(nn.Module):
# nn.Module 클래스(Pytorch에서 딥러닝 관련한 기본 함수를 가지고 있음)를 상속하는 Net클래스를정의하였다.
  def __init__(self):
    super(Net,self).__init__()
    # nn.Module에 있는 메서드를 상속받음. 
    self.fc1 = nn.Linear(28 * 28, 512)
    # 첫 번째 Fully Connected Layer 정의, 이미지를 Flatten해서 입력 받으므로 
    # 28 * 28 (28x28픽셀이므로), 또한 두 번쨰 fc의 노드 수가 512이므로 output노드의 수를 512로 설정
    self.fc2 = nn.Linear(512, 256)
    # 첫 번째 Fully Connected Layer와 이유는 비슷하다.
    self.fc3 = nn.Linear(256, 10)
    # 손글씨 class를 10개로 분류하므로 output 노드 수를 10개로 설정
  def forward(self,x):
  # Net 클래스에서 정의한 MLP모델의 순전파 과정을 정의함. 단순히 output까자의 계산 과정을 나열한 것이다.
    x = x.view(-1, 28*28)
    # 2차원의 데이터를 1차원으로 변환해주는 torch.view 함수.
    x = self.fc1(x)
    # fc1 통과시킴
    x = F.sigmoid(x)
    # fc1 함수의 activation function
    x = self.fc2(x)
    # fc2 통과시킴
    x = F.sigmoid(x)
    # fc2 함수의 activation function
    x = self.fc3(x)
    # fc3 함수 통과시킴
    x = F.log_softmax(x, dim = 1)
    # log_softmax를 사용하여 최종 output을 계산하며, 여기서 log_softmax를 사용한 이유는 
    # 역전파를 진행시킬때, gradient 값을 좀 더 원활하게 계산이 가능하기 때문이다.
    return x
```

## Optimizer, Objective Function 설계하기

```python
model = Net().to(DEVICE)
# 지금까지 정의한 MLP모델을 기존에 선정한 DEVICE를 사용하기 위해 할당하는 코드
optimizer = torch.optim.SGD(model.parameters(), lr = 0.01, momentum = 0.5)
# 파라미터를 업데이트 할 때 사용하는 Optimizer를 선정한다. 이때 optimizer 내부에서 lr과 momentum 값은 내가 설정한다.
criterion = nn.CrossEntropyLoss()
# label 은 원 핫 벡터로 표현이 되어있다. 이때 Loss는 CrossEntropy를 이용한다.
print(model)
```

## 모델 성능 확인하는 함수를 정의

```python
def train(model, train_loader, optimizer, log_interval):
  model.train()
  # 기존에 정의한 MLP 모델을 학습 상태로 저장한다.
	for batch_idx,(image, label) in enurmerate(train_loader):
  # train_loader 에 mini_batch로 저장된 데이터를 순서대로 인용하자.  
    image = image.to(DEVICE)
    # 장비에 할당하기
    label = label.to(DEVICE)
		# 장비에 할당하기
    optimizer.zero_grad()
    # 기존에 정의한 장비에 이미지데이터와 레이블을 할당할 경우, 과거에 이용한 데이터를 바탕으로 loss의 gradient값이 할당되어 있으므로 초기화 시켜준다.
    output = model(image)
    # 모델을 사용하여 output 계산하기
    loss = criterion(output, label)
    # output과 Label을 바탕으로 loss를 구한다. (기존에 위에서 CrossEntropyLoss를 Criterion으로 설정햇엇다.)
    loss.backward()
    # 역전파로 gradient값을 각 파라미터에 할당한다.
    optimizer.step()
    # 각 파라미터에 할당된 gradient 값을 이용하여 파라미터 값을 업데이트 한다.
    
    if batch_idx % log_interval == 0:
      print("Train Epoch: {} [{}/{}({:.0f}%)]\tTrain Loss: {:.6f}".formate(Epoch,batch_idx*len(image), len(train_loader.dataset), 100. * batch_idx / len(train_lodaer), loss.item()) )
```

## 모델 성능을 확인하는 함수 정의

```python
def evaluate(model, test_loader):
  model.eval()
  # 학습이 완료, 혹은 진행중인 모델을 학습상태가 아닌 평가 상태로 전환한다.
  test_loss = 0
  # test_loader 내의 데이터를 이용해 Loss 값을 계산하기 위해 0으로 임시 설정한다.
  correct = 0
  # MLP 모델이 올바른 Class로 분류한 경우를 세기위해 0으로 임시설정한다.
  
  with torch.no_grad():
  # Gradient를 통해 매개변수 값이 업데이트 되는 경우를 방지하기 위해 with구문을 사용해 흘러 들어가는 것을 억제한다. (with 구문 참고)
    for image , label in test_loader:
    # 미니배치 이므로 반복문을 이용해 차례대로 접근한다.
      image = image.to(DEVICE)
      # 기존에 정의한 장비에 image를 할당한다.
      label = label.to(DEVICE)
      # 라벨링 데이터도 기존에 정의한 장비에 할당한다.
      output = model(image)
      # 기존에 정의한 모델에 이미지 데이터를 넣어 output을 낸다.
      test_loss += criterion(output,label).item()
      # 기존에 정의한 criterion(CrossEntropyError)을 사용하여 loss값을 저장한다.
      prediction = output.max(1, keepdim = True)[1]
      # 예측 값중 가장 큰 값의 위치에 대응하는 클래스로 분류했다고 말한다.
      correct += prediction.eq(label.view_as(prediction)).sum().item()
      # 모델의 분류가 최종 라벨의 값과 맞으면 올바르게 예측한 횟수를 더한다.
      
  test_loss /= len(test_loader.dataset)
  test_accuracy = 100. * correct / len(test_loader.dataset)
  return test_loss, test_accuracy
      
```

## MLP 학습을 진행하면서 LOSS 및 Accuracy 확인하기

```python
for Epoch in range(1, EPOCHS + 1):
  train(model, train_loader, optimizer, log_interval = 200)
  test_loss, test_accuracy = evaludate(model, test_loader)
  print("\n[EPOCH: {}], \tTest Loss: {:.4f}, \tTest Accuracy: {.2f} %\n".format(Epoch, test_loss, test_accuracy))
```













