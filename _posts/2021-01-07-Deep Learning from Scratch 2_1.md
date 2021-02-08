---

title: Deep Learning from Scratch 2-1

toc: true

use_math: true

categories:

 - Deep Learning

---

## 자연어와 단어의 분산표현

자연어 처리가 다루는 분야는 다양하지만, 그 본질은 **컴퓨터가 우리의 말을 이해하게 하는 것이다.** 이번 챕터에서 이해해야 할 목표는 아래와 같다.

- 컴퓨터가 말을 이해한다는 말이 무엇인가? (딥러닝 등장 이전 기법도 살펴볼 것이다.)
- 파이썬으로 텍스트를 다루는 방법

### 자연어 처리란

자연어 처리는 Natural Language Processing(LNP)라고 한다. 자연어 처리에서 추구하는 목표는 사람의 말을 컴퓨터가 이해하도록 만들어서, 컴퓨터가 우리에게 도움이 되는 일을 수행하게 만드는 것이다. 하지만, 컴퓨터는 사람의 말을 곧이 곧대로 이해하는 것이 아닌 마크업, 혹은 프로그래밍 언어로 이해한다고 생각할 것이다. 컴퓨터는 일관되고 한 글자라도 틀리면 이해를 하지 못하는 프로그래밍 언어를 이해하는데, 다양한 표현과 어느정도 문법이 어긋나도 이해가 가능한 부드러운 언어(인간의 언어)를 어떻게 이해시킬까? 이 어려움을 해결해 나가는 것이 우리의 목적이라고 생각하면 된다. 

### 단어의 의미

인간의 말은 **문자**로 구성되어 있으며 말의 의미는 **단어**로 구성이 된다. 단어는 다시 말해서 **의미의 최소 단위**라고 말할 수 있다. 따라서 자연어를 컴퓨터에게 이해시키는데는 무엇보다 **단어의 의미**를 이해시키는 것이 중요하다. 

이번 주제에서는 컴퓨터에게 **단어의 의미를 이해시키는 것**이다. 단어의 의미를 잘 파악하는 표현 방법에 대해서는 아래 세 가지 방법에서 추론할 수 있다.

- 시소러스를 활용 : 시소러스(유의어 사전)을 이용한다.
- 통계 기반 기법 : 통계 정보로부터 단어를 표현하는 기법
- 추론 기반 기법 : word2vec을 다루는 기법

## 시소러스 기법

시소러스는 기본적으로 유의어 사전으로 뜻이 같은 단어(동의어)나 뜻이 비슷한 던어(유의어)가 한 그룹으로 분류되어 있다. 또한 자연어 처리에 사용되는 시소러스에서는 단어 사이의 **상위 또는 하위** 관계까지 세세하게 정의해둔 경우가 있다. **유의어, 동의어, 상위 또는 하위 관계** 를 알고있다면, 즉 **단어 네트워크** 를 컴퓨터가 이해한다면 단어의 의미를 이해시켰다고 어쩌면 주장이 가능할 수도 있다. 따라서 이러한 지식들을 이용하여 우리에게 유용한 일들(번역, 챗봇)과 같은 유용한 일들을 컴퓨터에게 시킬 수 있다. 

**WordNet** : 자연어 처리분야에서 가장 유명한 시소러스이며, 많은 연구와 다양한 자연어 처리 애플리케이션에서 활용되고 있다. 이것을 사용하면 유의어를 얻거나 **단어 네트워크** 를 사용해 단어 사이의 **유사도** 를 구할 수 있다. 

**WordNet의 문제점** : 시대에 따라 단어의 의미가 변할 수 있다. 신조어 같은 단어들이 생겨나고, 기존의 단어들의 의미가 미래에는 어쩌면 또 다른 의미로 쓰일 수 있기 때문에 사람이 수작업 하는 방식의 시소러스는 끊임없이 업데이트를 해야한다. 하지만 사람들 사용하여 업데이트 하는데에는 비용이 너무 크다. 또한 유이어 단어의 미묘한 차이를 무시하고 같은 클래스로 묶어내므로 미묘한 표현을 할 수가 없다.

=> 이러한 문제를 피하기 위해 **통계 기반 기법** 과 **추론 기반 기법** 이 존재하는데, 이 둘의 기법에서는 **단어의 의미를 자동으로 추출한다.** 따라서 수작업으로 수집되는 시소러스와는 달리 엄청난 효율을 자랑한다.

## 통계 기반 기법

통계 기반 기법에서는 **말뭉치(corpus)** 를 사용할 것이다. 말뭉치는 단순히 말해 대량의 텍스트 데이터이다. 다만 자연어 처리를 염두해두고 수집된 텍스트 데이터를 의미한다. 결국 말뭉치에는 사람의 지식이 충분히 담겨있다고 생각하며 자동으로 핵심을 추출해내는 기법이다. 추가로 말뭉치에 추가 정보가 포함되는 경우도 있다. 이제 통계 기반 기법을 사용하기 위한 스텝을 밟아 볼 것이다.

### 파이썬으로 말뭉치 전처리하기

여기서 말하는 전처리는 텍스트 데이터를 단어로 분할하고, 분할된 단어들을 ID로 변환하는 작업을 말한는 것이다. 그렇다면 하나식 확인해가면서 단계별로 진행해보자. 

- 텍스트 분할하기

```python
>>> text = 'You said goodbye and say hello.'
# 위와 같이 텍스트를 만들어 보자. 실전에서는 위의 텍스트보다 엄청 긴 텍스트일 것이다.
>>> text = text.lower()
# 모든 글자를 소문자로 변환
>>> text = text.replace('.',' .')
# 뒤의 공백을 기준으로 텍스트를 분할하므로 '.'을 공백을 포함한 ' .'으로 바꾼다.
>>> words = text.split(' ')
# 공백을 기준으로 나눈다. 이때 words는 리스트이다.
>>> words
['You', 'said', 'goodbye', 'and', 'I', 'say', 'Hello.']
```

위의 과정에 따라서 문장에서 단어를 분할하여 목록의 형태로 만들었지만, 단어를 텍스트 그대로 조작하기는 매우 어렵다. 따라서 단어에 ID를 부여하고 ID의 리스트로 이용할 수 있도록 다시 손질을 한다.

- 단어ID to 단어 & 단어 to 단어ID

```python
>>> word2id = {}
>>> id2word = {}
>>>
>>> for word in words:
  			if word not in word2id:
      		newid = len(word2id)
        	word2id[word] = newid
          id2word[newid] = word
>>> id2word
{0: 'You', 1: 'say', 2: 'goodbye', 3: 'and', 4: 'I', 5: 'say', 6: 'Hello.'}
>>> word2id
{'You': 0, 'say': 1, 'goodbye': 2, 'and': 3, 'I': 4, 'say': 5, 'Hello.': 6}
>>>corpus = np.array([word2id[w] for w in words])
>>> corpus 
array([0,1,2,3,4,1,5,6])
```

- id2word : 단어ID에서 단어로의 변환을 담당하며, 단어ID가 key, 단어가 value이다.
- word2id : 단어에서 단어ID로의 변환을 담당하며, 단어가 key, 단어ID가 value이다.
- newdi : 추가 시점에서 현재 딕셔너리의 길이가 ID의 값이 된다.
- corpus : 단어 ID 목록이며, text에 그대로 대응하는 ID값이다.

### 단어의 분산표현

색을 "비색"과 같이 표현하는 것 보다 RGB = (255,0,0)과 같이 표현한다면 빨강 계열의 색임을 알 수 있다. 색을 이와같이 벡터로 표현한다면 좀 더 쉽게 판단할 수 있고 정량화 하기도 쉽다. 그렇다면 단어도 벡터로 표현하면 어떻까? 좀 더 자세히 말하면 벡터라는 표현을 **단어에도 구축할 수 있을까?** 이제부터 알아볼 것은 **단어의 의미** 를 정확하게 파악할 수 있는 **벡터표현** 이다. 

- 색의 벡터표현을 **RGB표현**이라고 하듯이, 단어의 벡터표현을 **분산 표현(Distributional Represntation)**이라고 한다.

### 분포가설 

자연어 처리의 역사에서 오랜 연구가 이뤄져 왔지만, 가장 기본적인 아이디어 하나를 근간으로 한다. 그 아이디어는 **단어의 의미는 주변 단어에 의해 형성이 된다**는 것이다. 이를 **분포가설**이라고 하며 최근의 연구도 이를 기반으로 한다. 

- 분포 가설 : 단어 자체에는 의미가 없고 그 단어가 사용된 맥락이 의미를 형성한다는 것이다. 후에 **맥락**이라는 말을 많이 사용하는데, 맥락이라 함은 주목하는 단어 주위에 놓인 단어를 가리킨다고 하자.
- you say **goodbye** and i say hello.  -> 여기서 goodbye를 주목한다고 하면 그 주변의 단어 say, and와 같은 것들이 맥락이며, 맥락의 크기를 **윈도우 크기(Window Size)**라고 한다.

### 동시발생 행렬

분포가설을 생각해보자. 주목하는 단어 주위의 어떤 단어가 맥락에 포함되는지 알아보고 싶다면, 우리는 주변 단어를 '세어보는'방법을 생각해낼 것이다. 즉, 어떤 단어를 주목했을 때, 그 주변에 어떤 단어가 몇 번이나 등장하는지를 세어 집계하는 방법이다. 이를 앞서 우리 중간 제목의 주제인 **통계 기반 기법(Statistical Method)**이라고 한다. 일단 전처리를 하는 작업을 거치고 난 뒤에 주목하는 단어의 맥락을 벡터의 형태로 표현해보는 절차를 밟아보겠다.

```python
import sys
sys.path.append('..')
import numpy as np
from common.util import preprocess

text = 'You say hello and i say hello.'
corpus, word2id, id2word = preprocess(text)

print(corpus)
# [0,1,2,3,4,1,5,6]

print(id2word)
{0: 'You', 1: 'say', 2: 'goodbye', 3: 'and', 4: 'I', 5: 'say', 6: 'Hello.'}
```

- 여기서는 단어의 수가 총 7개임을 알 수 있고, 각 단어마다 맥락에 포함되는 단어를 표의 형태로 나타내보겠다. (윈도우 크기는 1이다.)

|         | you  | say  | goodbye | and  | i    | hello | .    |
| ------- | ---- | ---- | ------- | ---- | ---- | ----- | ---- |
| you     | 0    | 1    | 0       | 0    | 0    | 0     | 0    |
| say     | 1    | 0    | 1       | 0    | 1    | 1     | 0    |
| goodbye | 0    | 1    | 0       | 1    | 0    | 0     | 0    |
| and     | 0    | 0    | 1       | 0    | 1    | 0     | 0    |
| i       | 0    | 1    | 0       | 1    | 0    | 0     | 0    |
| hello   | 0    | 1    | 0       | 0    | 0    | 0     | 1    |
| .       | 0    | 0    | 0       | 0    | 0    | 1     | 0    |

이 표가 행렬의 형태를 띤다는 뜻에서 **동시발생 행렬(Co-occurence matrix)**라고 한다. 이와 같은 행렬을 C라는 이름의 배열에 저장했다고 하면, and를 나타내는 배열을 C[3] 벡터로 나타낼 수 있다. 아래에서는 동시발생 행렬을 만들어주는 함수를 구현해보겠다.

```python
def create_co_matrix(corpus, vocab_size, windwo_size = 1):
  corpus_size = len(corpus)	# 단어 id의 리스트
  co_matrix = np.zeros((vocab_size,vocab_size),dtype = np.int32)
  
  for idx, word_id in enumerate(corpus):
    for i in range(1, window_size +1):
      left_idx = idx-i
      rigth_idx = idx+i
      
      if left_idx >=0:
        left_word_id = corpus[left_idx]
        co_matrix[word_id, left_word_id] +=1
       
      if right_idx <=corpus_size :
        right_word_id = corpus[right_idx]
        co_matrix[word_id, right_word_id] +=1
        
  return co_matrix
```

- 위와 같이 차근차근 구현하면 말뭉치를 동시발생 행렬로 만들어주는 함수를 구현할 수 있다. 또한 구현할 시 윈도우의 크기가 말뭉치의 크기를 벗어나지 않도록 조건을 달아주자.

### 벡터 간 유사도 

위에서는 동시발생 행렬을 활용하여 단어를 벡터로 표현하는 방법을 알아보았다. 그렇다면 여기서 **벡터 사이의 유사도**를 측정하는 방법을 살펴보자. 보통 단어벡터의 유사도를 나타낼때는 **코사인 유사도**를 자주 이용한다. 코사인 유사도는 다음과 같이 정의된다.

​		<center>      $  similarity(\mathbf{x},\mathbf{y}) = \frac{\mathbf{x} \cdot \mathbf{y}} {\Vert \mathbf{x} \Vert \Vert \mathbf{y} \Vert}  = \frac{x_1y_1 + \cdot \cdot \cdot + x_n y_n}{\sqrt{x_1^2 + \cdot \cdot \cdot + x_n^2} \sqrt{y_1^2 + \cdot \cdot \cdot + y_n^2}}$ </center>

-  분자에는 벡터의 내적이, 분모에는 각 벡터의 Norm이 등장한다. 노름(norm)은 벡터의 크기를 나타낸 것으로, 각 원소를 제곱해서 더한 후 다시 제곱근을 구해 계산하는 것이다. 이 식을 직관적으로 이해하면 두 벡터가 가리키는 방향이 얼마나 비슷한가이며, 완전히 같다면 1, 완전히 다르다면 -1의 값을 지니게 된다. 위의 식을 파이썬으로 구현하면 다음과 같다.

```python
def cos_similarity(x,y,eps = 1e-8):
  nx = x/np.sqrt(np.sum(x**2)+eps)
  ny = y/np.sqrt(np.su,(y**2)+eps)
  return np.dot(nx,ny)
```

- 여기서 이 함수는 벡터를 먼저 정규화 하고 dot product를 하였다. 여기서 벡터의 정규화는 단위 벡터를 만든다는 의미이며, 방향 정보만이 남게된다. 여기서 dot product를 한다면 방향정보간의 계산이 되므로 방향이 같다면 1, 완전히 다르다면 -1이라는 값이 나오게 된다. 이와 같은 성질 때문에 cos_similarity라는 이름이 붙게 되었다. 
- eps : epsilon의 약자이며, 분모가 0이되면 오류가 발생하므로 분모에 작은 값을 더해준다.

이제 코사인 유사도를 사용하여 위의 "i" 와 "you"의 유사도를 구해보겠다.

```python
import sys
sys.path.append('..')
from common.util import preprocess, create_co_matrix, cos_similarity

text = "you say goodbye and i say hello."
corpus, word2id, id2word = preprocess(text)
vocab_size = len(word_to_id)
C = create_co_matrix(corpus,vocab_size)

c0 = C[word2id['you']]
c1 = C[word2id['i']]
pruint(cos_similarity(c0,c1))
```

- 결과값은 0.70..정도로 나왔으므로 유사성이 비교적 높다라는 것을 알 수 있다.

### 유사 단어의 랭킹 표시

위의 유사도 출력을 기본으로, 우리는 어떤 단어를 검색하면 그 단어와 유사성이 높은 단어를 유사도 순으로 출력하는 함수를 만들어내고 싶다. 그 구현은 아래와 같다고 하자.

```python
def most_similar(query, word2id, id2word, word_matrix, top=5):
  if query not in word2id:
    print('%s를 찾을 수 없습니다.' %  query)
    return
 
	print('\n[query]' + query)
	query_id = word2id[query]
	query_vec = word_matrix[query_id]

	vocab_size = len(id2word)
	similarity = np.zeros(vocab_size)
	for i in range(vocab_size):
	  similarity[i] = cos_similarity(word_matrix[i], query_vec)
  
	count = 0
	for i in (-1*similarity).argsort():
 	 if id2word[i] == query:
    continue
 	 print('%d %d' % (id2word[i], similarity[i]))
  
 	 count +=1
  
 	 if count>=top:
    return
```

- 검색단어와 다른 모든 단어 벡터와의 코사인 유사도를 구하고, 이를 기준으로 가장 높은 값부터 정렬한다.

## 통계 기반 기법 개선하기

동시 발생 행렬의 원소는 두 단어가 동시에 발생한 횟수를 나타낸다. 하지만 이것만으로 말뭉치에서 정보를 추출하기에는 역부족이다. 예를들어 고빈도 단어를 보자. "the"와 "car"의 동시발생은 "car"와 "drive"의 빈도보다 높을 것이다.(자연어의 관점에서는 전자가 발생 빈도가 높음을 직관적으로 알 수 있다.) 하지만 의미에 있어서 관련성은 "car"와 "drive"사이의 관계가 더 의미있음을 우리 인간은 알고 있다. 이를 해결하기 위해 **점별 상호정보량(Pointwise Mutual Information, PMI)**이라는 척도를 사용한다. PMI는 아래와 같이 정의된다.

<center> $ PMI(x,y) = log_2 \frac{P(x,y)}{P(x)P(y)}$ </center>

- P(x), P(y) : x와 y가 각각 일어날 확률을 의미한다.
- P(x,y) : x 와 y가 동시에 일어날 확률을 의미한다

위의 식을 **동시 발생 행렬** 을 사용하여 식을 아래와 같이 정의할 수 있다.

<center>$PMI(x,y) = log_2 \frac{P(x,y)}{P(x)P(y)} = log_2 \frac{\frac{C(x,y)}{N}}{\frac{C(x)}{N}\frac{C(y)}{N}} = log_2 \frac{C(x,y) \cdot N}{C(x)C(y)}$</center>

- C : 동시발생 행렬으로, 각 원소는 동시발생한 단어의 횟수를 나타낸다. 
- N : 말뭉치에 포함된 단어 수를 의미한다.

위의 식을 사용하여 "the"와 "car"의 관계와 "car"와 "drive"의 관련성을 비교하면, 후자의 관련성이 더 크게 나온다. 왜냐하면 위의 식은 분모 값에 단독으로 출현할 확률 또한 고려하므로, 오직 상호간의 발생 빈도만을 고려한 것이 아닌 말뭉치 자체로 보았을 때 단어가 연관된 단어보다 단독으로 출현한 횟수가 상대적으로 많으면, "car"와 "drive"같이 단독으로 출현한 횟수도 비슷하고, 서로 동시에 출현한 횟수도 비슷하니까 전자보다 관련성이 깊다는 것을 알 수 있다.

하지만 위의 식에서는 P(x,y)가 0이 된다면 $log_2 0$의 값이  $- \infty$이므로, 실제로 구현할 때는 아래와 같이 **양의 상호정보량(Positive PMI)**를 사용한다.

<center>PPMI(x,y) = max(0,PMI(x,y))</center>

위의 PPMI 행렬 역시 큰 문제가 있는데, 아래에 하나 씩 기술해 보겠다. 

- 다루는 행렬의 크기가 너무 크다 : 말뭉치의 어휘 수가 증가함에 따라 각 단어의 차원수도 증가한다. 예를들어 우리가 다루게 될 말뭉치의 어휘 수가 10만개 라면, 그 벡터의 차원수도 10만이 된다. 따라서 10만 차원의 벡터를 다루는 것은 그다지 현실적이지 않다.
- 대부분의 원소가 0이다 : 다루게 될 행렬의 크기는 큰데, 대부분이 0이면은 불필요한 정보가 많다는 뜻이다. 즉, 중요도가 낮은 정보가 많이 껴있어 **노이즈**가 발생한다는 것이다. 특히 이 문제에 대처하기 위해 생각해낸 방법이 **차원 감소** 이다.

### 차원 감소

위에서 대부분의 원소가 0이라 함은 대부분의 정보의 중요도가 낮다는 의미이므로, 우리는 벡터의 차원을 줄이는 방법을 고안하게 되었다. 핵심은 **중요한 정보는 최대한 유지** 하는 것이다. 직관적인 예를 들면 아래와 같다.

![2-8](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 2-8.png)

- 왼쪽은 데이터 점들을 2차원 좌표에 표시한 모습이다.

- 오른쪽은 **새로운 축**으ㄹ 도입하여 데이터를 좌표축 하나만으로 표시했다. 이때 각 데이터 값들은 사영된 값으로 변하게 된다, 이때 중요한 점은 **1차원 값 만으로도 데이터의 본직적인 차이를 구별할 수 있어야 한다.**

- 위와 같이 차원을 감소시키는 방법은 여러가지지만, 우리는 **특이값 분해(SVD, Singular Value Decomposition)**를 사용할 것이다. 수식으로는 아래와 같다.

  <center>
    $X = USV^T$
  </center>

SVD는 임의의 행렬 X를 U, S, V의 세 행렬의 곱으로 분해한다. 여기서 U와 V는 **직교행렬(Orthogonal Matrix)** 이며, S는 **대각행렬(Diagonal Matrix)**이다. 

- U는 직교행렬로, 직교행렬은 어떠한 공간의 축을 형성한다. 이러한 행렬을 단어 공간으로 취급할 수 있다. 
- S는 대각행렬로, 대각 성분에는 **특이값(Singular Value)**이 큰 순서로 나열되어있다. 특이값은 다시 말해 **해당 축**의 중요도라고 간주할 수 있다. 
- 즉, 행렬 S에서 중요도가 작으므로 행렬 U에서 여분의 열벡터를 깎아내어 원래의 행렬을 근사할 수 있다. 

이제, SVD를 사용하여 차원감소를 해보겠다.

```python
import sys
sys.path.append('..')
import numpy as np
import matplotlib.pyplot as plt
from common.util import preporcess, create_co_matrix, ppmi

test = "you say goodbye ans i say hello"
corpus, word2id, id2word = preprocess(text)
vocab_size = len(id2word)
C = create_co_matrix(corpus, vocab_size, window_size = 1)
W = ppmi(C)

#SVD
U, S, V = np.linalg.svd(W)

print(C[0]) #동시 발생 행렬
#[0 1 0 0 0 0 0]

print(W[0]) #PPMI 행렬
#[0. 1.807 0. 0. 0. 0. 0. ]

print(U[0]) #SVD
#[3.409e-01 -1.11-e-16 -1.205e-01 ...]와 같이 나오며 여기서 2차원 벡터로 줄이려면 처음의 두 원소를 꺼내기만 하면 된다. 여기서 각 단어를 2차원 벡터로 표현한 후 그래프로 그려보자

for word, word2id in word2id.items():
  plt.annotate(word, (U[word2id,0], U[word2id,1]))
  
  plt.scatter(U[:0], U[:1], alpha=0.5)
  plt.show()
```

- SVD를 구할 때 실제로는 O(N^3)가 걸리므로 시간을 아끼려면 Truncated SVD와 같은 기법을 사용한다. 앞으로 scikit-learn 라이브러리의 Truncated SVD를 사용할 것이다.

### PTB 데이터셋 

위에서는 아주 작은 텍스트 데이터를 사용하여 결과가 잘 나오지 않았지만, 앞으로는 본격적인 말뭉치를 사용할 것인데, 그것의 주인공은 바로 **PTB(Penn TreeBank) 데이터셋**이다. 이 데이터셋은 word2vec의 발명자인 토마스 미콜로프의 웹 페이지에서 다운로드가 가능하며 아래의 특징과 같이 전처리가 적용되었다.

- 희소한 단어를 <unk>으로 치환함
- 구체적인 숫자를 N으로 대체하였다.

아래와 같은 구현으로 불러와서 기존에 사용하였던 구현과 같이 데이터를 받을 수 있다

```python
import sys
sys.path.append('..')
from dataset import ptb

corpus, word2id, id2word = ptr.load_data('train')
```

## word2vec

앞선 챕터에서는 **통계 기반 기법** 을 배웠고, 이번 챕터에서는 **추론 기반 기법** 을 배워 볼 예정이다. 추론 기반 기법에서는 word2vec가 드디어 등장한다. 초반부는 word2vec의 간단한 구현을 해볼것이고, 후에는 좀 더 큰 데이터를 다루기 위해 몇 가지 개선을 한 후 진짜 word2vec을 환성해보자.

### 통계 기반 기법의 문제점

지금까지는 통계 기반 기법을 사용하여 **주변 단어의 빈도**를 기초로 단어를 표현하였다. 이는 구체적으로 **동시발생 행렬을 만들고 그 행렬에 SVD를 적용하여 밀집벡터(U)를 얻어낸 방식이다.** 하지만, 어휘 수가 100만개라면 동시발생 행렬의 크기는 10^12만큼 커지므로 이정도 크기의 행렬에 SVD를 적용하기란 현실적이지 않다. 그렇다면 통계 기반 기법과 추론 기반 기법의 대략적인 차이를 알아보자.

- 통계 기반 기법 : 말뭉치 **전체의 통계**를 이용해 단 1회의 처리(SVD)만에 단어의 분산표현을 얻어낸다.
- 추론 기반 기법 : 학습 데이터의 **일부**를 이용하여 신경망으로 처리하여 순차적으로 학습한다.(미니배치 학습)

추론 기반 기법에서 가장 큰 특징은 게산량이 많은 거대한 데이터도 신경망을 이용해 학습이 가능하다는 것이다. 데이터를 나눠서 학습한다는 것은 GPU를 사용한 병렬적 처리가 가능하다는 것이다. 

### 추론 기반 기법 개요

추론 기반 기법에서는 추론이 주된 작업이다. 쉽게 말해서 아래와 같이 주변 단어(맥락)이 주어졌을 때 빈 칸에 무슨 단어가 들어가는지 추측하는 작업이다. 이러한 추론 문제를 반복적으로 풀어보면서 단어의 출현 패턴을 학습하는 것이다. 이와 같은 기법을 모델을 이용해 구현한다고 하면, 아래와 같은 전체 그림이 나온다.

![3-3](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-3.png)

- 모델은 맥락정보를 입력받아 각 단어의 출력 확률을 출력한다. 이러한 모델로 올바른 추측을 내놓을 수 있도록 학습시키는 것이 추론 기반 기법의 전체적인 그림이다. 
- 추론 기반 기법도 통계 기반 기법처럼 **단어의 의미는 주변 단어에 의해 형성된다** 라는 가설에 기초한다. 

### 신경망에서의 단어 처리 

지금부터 신경망을 이용하여 단어를 처리할 것이다. 하지만 신경망에 있는 단어 그대로 처리할 수는 없으므로 단어를 **고정 길이의 벡터**로 변환한다. 이때 사용하는 대표적인 방법이 **원핫 벡터** 이다. 아래와 같이 단어를 나태내는 방법을 알아보겠다.

| 단어    | 단어 ID | 원핫 벡터             |
| ------- | ------- | --------------------- |
| you     | 0       | (1, 0 ,0 ,0 ,0 ,0 ,0) |
| goodbye | 2       | (0, 0, 1, 0, 0, 0, 0) |

- 원 핫 벡터 : 총 어휘 수 만큼의 원소를 갖는 벡터에, 인덱스가 단어 ID와 같은 원소를 1로 설정하고 나머지는 모두 0으로 만들면 원 핫 벡터이다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-6.png)

이와 같이 단어를 고정 길이 벡터로 변환하면, 모든 단어가 동일한 길이의 벡터를 가지게 되며, 이는 다시말해 **단어를 벡터로 나타낼 수 있고, 뉴런의 수를 고정할 수 있다는 의미이다.** 여기서 주의할 점은 편향이 없는 완전연결 계층은 **행렬의 곱과 같다는 점이다.** 여기까지의 이야기를 코드로 작성해보겠다. 

```python
 import numpy as np
 
C = np.array([1, 0, 0, 0, 0, 0, 0]) # 입력 
W = np.random.randn(7,3)						# 가중치
h = np.matmul(c,W)									# 중간 노드
print(h)
```

- 하지만 원 핫 벡터로 표현한 완전연결 계층에서는 편향이 없다면 **행렬의 곱** 연산이 된다는 것은 앞에서 설명을 했다. 따라서 이는 아래의 그림으로 표현하자면 다음과 같다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-8.png)

- 이와 같이 가중치에서 **행의 값을 뽑아내는 것과 같다.** 하지만, 단순히 가중치의 행을 뽑아내는 데 행렬의 곱을 사용한다는 것은 비효율적이지 않나? 이는 word2vec에서 개선할 예정이다.

### CBOW 모델의 구조

CBOW 모델은 맥락으로부터 타깃을 추측하는 용도의 신경망이다. (타깃은 중앙 단어이고, 그 주변 단어들이 맥락이다.) 아래는 CBOW 모델의 신경망 구조를 나타낸 그림이다. 

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-9.png)

- 입력층에서 은닉층 : 입력층이 2개이며, 두 개 다 같은 완전연결계층(Win)에 의해서 처리가 된다.
- 은닉층에서 출력층 : 앞선 계층에서 처리한 완전연결계층(Win)과는 다른 완전연결계층(Wout)이 처리한다. 
- 입력층이 2개인 이유 : 맥락으로 고려할 단어가 2개이기 때문이다. 만약 맥락으로 고려할 단어가 **N개** 라면 입력층의 개수도 **N개가 된다.**

앞에서 그림에 대한 설명에서는 입력층이 N개가 될 수도 있다고 하였다. 그러면 은닉층의 뉴런은 입력층의 완전연결계층에 의해 변환된 값이 되는데 입력층이 여러개이면 **전체를 평균하면 된다.** 은닉층의 뉴런을 일반화 한 식은 아래와 같다.

<center> 
  $frac{1}{N}(h_1 + h_2 + ... + h_N)$
</center>

- 출력층 : 출력층의 뉴런은 총 7개이며, 뉴런 하나하나가 각각의 단어가 대응한다는 것이다. 또한 출력층의 뉴런 각각은 점수를 뜻하며, 이 값이 높을수록 대응하는 단어의 출현 확률도 높아진다. 정확한 확률을 얻기 위해서는 Softmax 함수를 사용해야 한다. 

  ![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-10.png)

- Win : 이 가중치의 각 행에는 해당 단어의 **분산 표현(색의 RGB표현과 같이 단어를 나타내는 벡터 표현)** 임을 알 수 있
  다. 즉, 학습을 진행할 수록 맥락에서 출현하는 단어를 잘 추측하는 방향을 분산 표현들이 갱신됨을 알 수 있다. 또한 이렇게 해서 얻은 분산 표현에는 **단어의 의미** 또한 녹아 들어있다고 한다.

이제, 위의 뉴런 관점에서 그린 모델을 바탕으로 파이썬 구현을 해보겠다.

```python
import sys 
sys.path.append('..')
import numpy as np
from common.layers import MatMul

# 샘플 맥락 데이터
c0 = np.array([[1,0,0,0,0,0,0]])
c1 = np.array([[0,0,1,0,0,0,0]])

#가중치 초기화
W_in  = np.random.randn(7,3)
W_out  = np.random.randn(3,7)

#계층 생성 
in_layer0 = MatMul(W_in)
in_layer1 = MatMul(W_in)
out_layer = MatMul(W_out)

# 순전파
h0 = in_layer0.forward(c0)
h1 = in_layer1.forward(c1)
h = 0.5*(h0+h1)
s = out_layer.forward(h)

print (s)
```



### CBOW 모델의 학습

CBOW 모델에서의 학습은 학습시 배운 말뭉치로부터 배우기 때문에, 말뭉치가 다르면 학습 후 얻게되는 단어의 분산표현 또한 달라질 수 있다. 예를 들어서 스포츠 카테고리에서 학습한 단어와 음악 카테고리에서 학습한 단어의 분산표현은 맥락에 의해서 쓰임이 달라질 수 있기 때문에 크게 다를 수 있을 것이다. 

다시 앞서 본 신경망의 학습에 대해서 생각해보다. 우리는 다중 클래스 분류를 진행하므로 **소프트 맥스**와 **교차엔트로피**오차만 이용하면 된다. (교차 엔트로피에서는 정답 데이터만 유의미한 오차값을 출력하므로 다중 클래스 분류에 효과적이다.) 즉, 소프트맥스 함수를 이용하여 출력층에서 나온 점수를 확률로 변환하고, 그 확률과 정답 레이블로부터 교차엔트로피를 구한 후 그 값을 손실로 사용해 학습을 진행하면 된다. 우리가 구현할 대략적인 신경망의 모습은 아래와 같다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-14.png)

- Win : 각 **행에** 단어의 분산표현이 들어가있다.
- Wout : 각 **열에** 단어의 분산표현이 들어가있다. 

우리는 두 가지의 가중치에 담긴 분산 표현을 둘 중 하나만 사용할 수 있고, 둘 다 이용할 수 있다. 보통 **입력층의 분산 표현만을 사용하는것이 일반적이다.** 따라서 우리도 구현할 때 입력층의 분산 표현만을 사용하겠다. 

### 학습 데이터 준비 

word2vec에서 이용하는 신경망의 입력은 맥락이며, 정답 레이블은 맥락에 둘러싸인 중앙의 단어, 즉 타깃이다. 우리가 해야할 일은 맥락을 입력했을 때, 타깃이 출현 할 확률을 높이는 것이다. 아래 구현은 맥락과 타깃을 만드는 작업이다. 

```python
import sys 
sys.path.append('..')
from common.util import preprocess

text = 'you say goodbye and i say hello'
corpus, word2id, id2word = preprocess(text)
print(corpus)
# [0 1 2 3 4 1 5 6]
print(id2word)

# corpus로 부터 맥락과 타깃을 만들어내는 함수를 만들어 보자.
def create_contexts_target(corpus, window_size = 1):
  target = corpus[window_size: -window_size]		# 윈도우 사이즈에 맞지 않는 타깃은 제외
  contexts = []
	
  for idx in range(window_size, len(corpus)-window_size):
    cs = []		#맥락 1개를 저장하는 곳
    for t in range(-window_size, window_size + 1):
      if t==0:
        continue
      cs.append(corpus[idx+t])	# 타깃 주위 맥락의 id값을 배열에 집어넣는다.
    context.append(cs)					# 타깃의 순서대로 맥락의 id값이 저장된다.
    
  return np.array(contexts), np.array(target)
```

- target : 타깃은 처음에 구현될 때 윈도우의 사이즈에 맞지 않는 원소를 제외하고 시작한다. 따라서 [window_size : -window_size]로 데이터를 슬라이싱 한다. 
- contexts : 타깃에 해당하는 원소들은 for 연산으로 타깃의 대응하는 하나의 맥락 세트를  cs에 붙인다. 그 뒤로 윈도우 사이즈에 해당하는 맥락들이 다 저장되어 있으면 context에 붙여서 타깃에 대응하는 올바른 맥락들을 완성한다.

위의 구현에서는 필요한 데이터는 꺼냈지만, 우리가 원하는 데이터의 형태인 원 핫 표현은 아니다. 따라서 아래의 구현에서 맥락과 타깃 데이터를 원 핫 데이터로 변환해야하며, 아래의 결과는 데이터 준비과정을 한 칸에 담아낸 결과이다.

```python
import sys
sys.path.append.('..')
from common.util import preprocess, create_contexts_target, convert_one_hot

text = 'you say goodbye and i say hello.'
corpus, word2id, id2word = preprocess(text)

contexts, target = create_context_targer(corpus, window_size =1 )

vocab_size = len(word2id)
target = convert_one_hot(target, vocab_size)
context = convert_one_hot(contexts, vocab_size)
```

### CBOW 모델의 구현 

SimpleCBOW 클래스의 초기화 메서드부터 구현을 시작해보겠다.

```python
import sys
sys.path.append('..')
import numpy as np
from common.layers import MatMul, SoftmaxWithLoss

class SimpleCBOW
		def __init__(self, vocab_size, hidden_size):
    	V, H = vocab_size, hidden_size
      # 단어의 사이즈가 입력층의 크기이고, 분류해야 하는 출력층의 크기도 vocab_size이므로 output size는 따로 필요가 없다.
      
      # 가중치 초기화 과정
      W_in = 0.01 * np.random.randn(V,H).astype('f')		#32비트 부동소수점으로 초기화 
      W_out = 0.01 * np.random.randn(H,V).astype('f')
      
      # 계층 생성 
      self.in_layer0 = MatMul(W_in)
      self.in_layer1 = MatMul(W_in)
      self.out_layer = MatMul(W_out)
      self.loss_layer = SoftmaxWithLoss()
      
      # 모든 가중치와 기울기를 리스트에 모은다.
      layers = [self.in_layer0, self.in_layer1, self.out_layer, self.loss_layer]
      self.params, self.grads = [],[]
      for layer in layers : 
        self.params += layer.params
        self.grads += layer.grads
       
      # 인스턴스 변수에 단어의 분산 표현을 저장한다
      self.word_vecs = W_in
      
    def forward(self, contexts, target):
      h0 = self.in_layer0.forward(contexts[:,0])
      h1 = self.in_layer1.forward(contexts[:,1])
      h = (h0+h1)*0.5
      score = self.out_layer.forward(h)
      loss = self.loss_layer.forward(score, target)
      return loss
    
    def backward(self, dout = 1):
      ds = self.loss_layer.backward(dout)
      da = self.out_layer.backward(ds)
      da *= 0.5
      self.in_layer1.backward(da)
      self.in_layer0.backward(da)
      return None
```

### 학습코드 구현

CBOW 모델의 학습은 일반적인 신경망 학습방법과 완전히 같으므로 아래와 같이 기존에 사용하는 신경망 학습 코드를 사용할 수 있다. 아래에서 신경망 학습 과정을 차근차근 따라가보자.

```python
import sys
sys.path.append('..')
from common.trainer import Trainer
from common.optimizer import Adam
from simple_cbow import SimpleCBOW
from common.util import preprocess, create_context_target, convert_one_hot

window_size = 1
hidden_size = 5
batch_size = 3
max_epoch =1000

# 말뭉치 전처리 과정
text = 'you say goodbye and i say hello'
corpus, word2id, id2word, preprocess(text)

# 맥락, 타깃 데이터를 word2id로 부터 만들어내고, 이것을 다시 원 핫 레이블로 변환하는 과정이다.
vocab_size = len(word2id)
contexts, target = create_contexts_target(corpus, window_size)
target = convert_one_hot(target, vocab_size)
contexts = convert_one_hot(contexts, vocab_size)

# 학습 코드에 모델과 옵티마이저 입력
model = SimpleCBOW(vocab_size, hidden_size)
optimizer = Adam()
trainer = Trainer(model, optimizer)

trainer.fit(contexts, target, max_epoch, batch_size)
trainer.plot()
```

### word2vec 보충

우선  CBOW모델을 확률의 관점에서 다시 살펴보는 것으로 시작하겠다. 그 전에 확률 표기법에 관해 설명하겠다. 

- $P (A)$ : A가 일어날 확률이다. 
- $P(A \mid B)$ : **사후 확률**로 B가 주어졌을 때 A가 일어날 확률이다. 

위의 확률에 관한 설명을 들었으니, CBOW모델을 확률 표기법으로 기술해보자. 사후 확률로 타깃과 맥락을 설명하자면 CBOW모델은 맥락이 주어졌을 때 타깃이 일어날 확률이라고 말할 수 있다. 수식은 아래와 같이 표현할 수 있다. 

<center> 
  $P(w_t \mid w_{t-1},w_{t+1})$
</center>

- $w_t$ : 타깃을 의미한다. 확률 표기법에 의하면 $w_{t-1}, w_{t+1}$ 이 발생할 떄 $w_t$가 일어날 확률, 즉 맥락이 주어졌을 때 타깃이 발생할 확률을말하며 이는 CBOW의 모델의 근복적인 동작 방식을 나타내는 수식이라고 볼 수 있다.
- $w_{t-1}, w_{t+1}$ : 맥락을 의미한다. 

또한, 위의 확률 표기를 사용하여 손실함수도 표현이 가능하다. 정답 레이브을 원 핫 레이블로 표기하였으므로 교차 엔트로피 오차를 적용하는 것이 알맞은 선택이다. 따라서 기존 교차 엔트로피 식에서 $t_k$가 정답 레이블을 제외하고 나머지는 0이 된다는 것을 고려한다면 확률 표기법을 사용한 손실함수는 아래와 같이 나온다.

<center>
  $L = -logP(w_t \mid w_{t-1}, w_{t+1})$
</center>

- Negative log likelihood : 위와 같은 수식을 음의 로그 가능도라 한다. 또한 위의 수식은 샘플데이터 하나에 대한 손실함수 이므로 이를 전체로 확장한다면 아래의 수식과 같다.t

<center>
  $$L = -\frac{1}{T} \sum_{t=1}^{T} logP(w_t \mid w_{t-1}, w_{t+1})$$
</center>

- 우리가 최종적으로 바라봐야 할 목표는 위의 손실함수를 작게 만드는 것이며, 또한 위의 손실함수는 윈도우 크기가 1인 상황을 고려해서 작성한 수식이므로 윈도우 크기가 좀 더 확장된다면 P 에서 맥락의 갯수(조건)을 확장하면 그만이다. 

### skip-gram 모델

skip-gram 모델은 CBOW 모델과는 반대로 타깃(중앙의 단어)가 주어졌을 때 주변의 맥락(여러 단어)를 추측하는 것이다. 따라서 CBOW모델과는 달리 입력 층이 하나(타깃, 즉 중앙의 단어를 입력)이며, 출력층이 두 개 이상(맥락, 즉 중앙의 단어로부터 어떤 맥락이 나와야 적절한지 출력하는 모델임을 알 수 있다.)이다. skip-gram모델을 그림으로 나타내면 아래와 같다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 3-24.png)

- 출력층이 맥락 수 만큼 있다는 것을 알 수 있다. 또한 위에서 배운 확률 표기법을 사용해 skip-gram모델을 표현하면 아래와 같다.

<center>
  $P(w_{t-1},w_{t+1} \mid w_t)$ 
  $P(w_{t-1},w_{t+1} \mid w_t) = P(w_{t-1} \mid w_t)P(w_{t+1} \mid w_t)$
</center>

- 여기서 이 모델은 맥락들 단어 사이에 **관련성이 없다**고 가정하고 아래와 같이 분리가 가능하다.
- 또한, CBOW 모델의 손실함수를 확률 표기법으로 표현하였으므로,  skip-gram 모델에서 또한 손실함수를 확률 표기법으로 표현할 수가 있다.

<center>
 $$L = -\frac{1}{T} \sum_{t=1}^{T} ( logP(w_{t-1} \mid w_t) + logP(w_{t+1} \mid w_t) )$$
</center>

- skip-gram모델에서 손실함수 : 각 **맥락**에서 구한 손실의 총합
- CBOW 모델에서 손실함수 : 타깃 하나의 손실

대부분의 연구 결과에서  skip-gram이 CBOW모델보다 단어 분산 표현의 정밀도에 있어서 더 좋은 결과를 내놓기 때문에  skip-gram을 사용하기도 하고 말뭉치가 커질수록 저빈도 단어나 유추 문제에서 skip-gram 모델이 뛰어난 경향이 있다고 한다. 반면 **학습 속도**에 있어서는  CBOW모델이 빠르다고 한다. 

### 통계 기반 vs 추론 기반

- 통계 기반 기법 : 말뭉치의 전체 통계로 부터 1회 학습하여 단어의 분산표현을 얻었다. 만약 어휘에 추가할 단어가 생긴다면 계산을 처음부터 다시해야 한다. SVD로 다시 설정하고 동시 발생 행렬도 다시 설정해야 한다.
- 추론 기반 기법 : 말뭉치의 일부분씩 여러번 보면서 학습하였다. 만약 어휘에 추가할 단어가 생겼다면, 기존에 학습한 매개변수들을 초기값으로 다시 학습만 하면 된다. 

그렇다면 각 기법에서의 분산표현은 단어의 어떤 특징을 뽑아 낸 것일까?

- 통계 기반 기법에서는 단어의 유사성이 인코딩 된다고 한다. 
- 추론 기반 기법에서는 단어의 유사성과 단어 사이의 패턴까지도 파악되어 인코딩 된다고 한다. 

위의 기법에서 각각 단어의 유사성을 정량평가 해본 결과로는 두 기법에서 우열을 가릴 수가 없었다고 한다. 또한 **중요한 사실로는** 추론 기반 기법과 통계 기반 기법은 서로 **관련되어 있다고** 한다. skip-gram과 네거티브 샘플링을 이용한 모델은 모두 말뭉치 전체의 동시발생 행렬에 **특수한 행렬 분해**를 적용한 것과같다고 한다. 

개인적으로 두 방법을 융합한 모델이 있지 않을까? 생각하였는데 **GloVE기법**이 있다고 한다. 

### word2vec 속도개선 

앞선  CBOW 모델어세는 말뭉치에 포함된 어휘가 많아 질수록 계산량이 커지므로 시간이 오래 걸리게 된다. 따라서 이번 챕터의 목표는 word2vec의 속도를 개선하는 것이 목표이다. 우리가 앞서 구현한  word2vec에서 두 가지만 추가하여 개선할 것이다. 

- Embedding 계층 도입한다. 
- 네거티브 샘플링 이라는 새로운 손실 함수를 도입한다. 

이 두 가지 개선으로 실제 word2vec을 구할 수 있고, 이것을 사용해  **PTB 데이터 셋**을 가지고 학습을 수행할 수 있다. PTB데이터 셋은 실용적인 크기의 말뭉치를 가진 데이터 셋이다.

CBOW 모델에서 말뭉치 안의 단어의 수가 100만개라고 한다면, 입력층와 출력층에는 각각 100만개의 뉴런이 존재하게 된. 그렇다면 어떠한 부분이 계산에 있어서 발목을 잡는 것인가?

- 입력층의 원핫 표현과 가중치 행렬 Win의 곱 계산 : 어휘가 100만개라면 원소 수가 100만개인 벡터가 저장되며, **이는 메모리에 엄청난 부담을 줄것이다. 심지어 이 원핫 벡터와 가중치 행렬을 곱한다고 생각하면 자원을 심하게 낭비하게 될 것이다.** => Embedding 계층 도입
- 은닉층과 가중치 행렬 Wout의 곱 밑 softmax 계층의 계산 : softmax 계층에서 다루는 가중치 행렬  Wout의 계산을 생각하면 결코 적은 계산량이 아니다. => 네거티브 샘플링 이라는 새로운 손실함수 도입

### Embedding 계층 

앞서 구현한  CBOW모델에서 입력층에서 벡터의 값이 한 원소가 1이라는 것을 제외하면 모든 값이 0이라, 여기에 가중치 행렬을 곱하게 된다면 가중치  행렬의 **특정 행을 추출**한다는 것을 알고 있다. 즉, 사실상 **행렬 곱 계산이 따로 필요없다**는 소리가 된다. 따라서 단어  ID에 해당하는 행을 추출하는 계층을  Embedding 계층이라고 한다. 아래에서 Embedding 계층을 구현해보겠다.

```python
class Embedding :
  def __init__(self,W):
    self.params = [W]
    self.grads = [np.zeros_like(W)]
    self.idx = None
    
  def forward(self.idx):
    W, = self.params
    self.idx = idx
    out = W[idx]
    # 행을 추출하는 것은 단순히 행렬의 인덱스 값을 명시하면 된다. 추가로 n열을 추출하고 싶다면 [:,n]
    return out
  
  # Embedding 계층에서는 단순히 가중치 W의 행을 추출하는 계층이다. 따라서 역전파에서는 앞 층으로부터 전해진 기울기를 단순히 앞쪽 층으로 그대로 흘려보내면 되므로 구현은 아래와 같다. 
def backward(self,dout):
		dW, = self.grads
    dW[...] = 0
    # dW[...] = 0 은 dW의 원소를 0으로 덮어쓴다는 의미이다.
    for i, word_id in enumerate(self.idx):
      dW[word_id] += dout[i]  
    return None
```

### 은닉층 이후의 계산의 문제점

- 은닉층 뉴런과 가중치 행렬(Wout)의 곱
- Softmax의 계산

먼저 은닉층 뉴련과 Wout의 곱은 입력층 뉴련과 Win의 곱이 단순히  Win의 행을 출력하는 것과는 달리 실제로 계산을 수행햐야 한다. 따라서 엄청난 계산 자원과 메모리 낭비가 발생할 것이다.

또한 Softmax의 식을 보면  $y_k = \frac{exp(s_k)}{\sum_{i=1}^{1000000} exp(s_i)}$ 이므로 exp 연산을  100만번 수행하게 되며 이는 엄청난 계산자원이 낭비됨을 의미한다. 따라서 Softmax를 대신할 가벼운 계산이 필요하게 된다. 

### 다중 분류에서 이진 분류로(네거티브 샘플링)

다중 분류 : 우리가 다뤄왔던 기존의 문제로 100만개의 단어에서 옳은 단어를 하나 고르는 문제이다.

- you 와 goodbye가 맥락일 때, 타깃 단어는 무엇입니까?

이진 분류 : 예/아니오로 답하는 문제로 우리가 **다중 분류 문제에서 옮겨 가야할 분류법이다.**

- you와  goodbye가 맥락일 때, 타깃 던어가 say 입니까? 이런 식으로 질문을 한다면 우리는 출력층에 한 가지 뉴런만 준비하면 된다.  이렇게 이진분류를 이용한  CBOW모델을 아래 그림과 같이 된다.

![](/Users/jamang/Documents/jamangstangs.github.io/assets/images/post/2021-01-11-Deep Learning from Scratch2/fig 4-7.png) 

또한 출력 측의 가중치 Wout에서는 각 단어  ID의 단어벡터가 각각의 열로 저장되어 있으므로 W[:, 1]로 추출하여 은닉층과 Wout의 내적을 계산하면 최종 점수가 나오게 된다.

### Sigmoid - CrossEntropyError vs Softmax-CrossEntropyError

다중분류 문제 같은 경우에는 출력층에서 소프트맥스 함수를, 손실 함수로는 교차엔트로피 오차를 이용한다. 다중 분류 문제일 때 교차 엔트로피 오차의 식은 아래와 같다.

<center>
  $L = - \sum_k log t_ky_k$
</center>



이진 분류 문제 같은 경우에는 출력층에서 시그모이드 함수를, 손실 함수로는 교차엔트로피 오차를 이용한다. 이진 분류 문제일 때 교차 엔트로피 오차의 식은 아래와 같다. 즉, t=1일 때 정답이  yes이고,  t = 0 이면  No라는 의미가 된다. 또한 이는 yes와 no일 때 각각의 교차 엔트로피 오차가 다르게 출력됨을 알 수 있다.

<center>
  $L = -(tlogy + (1-t)log(1-y)$
</center>

Sigmoid 계층과 Cross Entropy Error 계층의 역전파를 계산하면  $y-t$과 같이 간단하게 나오게 된다.(y : 신경망이 출력한 확률, t: 정답 레이블)

### 다중 분류에서 이진 분류로 (구현)

다중분류에서 이진 분류로 넘어가는 과정에서 은닉층까지 도달하기에 있어서는 과정이 같다.

- 맥락데이터를 Embedding 계층으로 입력해 Win에서 맥락단어 id값을 입력해 그 단어에 해당하는 가중치 행을 추출하여 은닉층에 도달한 데이터를 정규화 (더해서 갯수만큼 나눔)한다.

여기서부터 다중 분류와 이진 분류의 차이가 발생하는데 아래에서 자세히 설명하겠다.

**은닉층 이후 다중분류**

- Softmax with Cross Entropy Error 계층을 사용하여 다중 분류 문제를 해결한다. 다중 분류에서 발생하는 문제는 은닉층의 뉴련과 엄청난 크기의  Wout의 MatMul 연산(이는 후에 입력층에서 Embedding 계층을 도입하여 계산량을 줄인 방법과 같은 방법으로 해결된다.)이며, 엄청난 크기으 ㅣ Softmax exp 계산이 문제가 된다.(이는 이진분류로 쓰지는  sigmoid with loss 계층을 사용하여 해결한다.)

**은닉층 이후 이진분류**

- 은닉층과 Wout 가중치를 곱할때, 정답에 해당하는 분산 표현(가중치 행렬)의 행을 추출(Embedding 계층에서 그 역할을 함)하여 계산량을 줄일 수 있다.
- Softmax에서  Sigmoid계층으로 변환되어 100만가지 분류에서 하나의 확률을 추출하는 것이 아닌 특정 원소 하나를  yes or no인지 답을 내는 손실함수를 사용하여 계산량을 줄였다.

추가적으로 실제 구현할 때는 은닉층 이후  Embedding 계층을 지날때 dot 연산까지 합쳐서  **Embedding dot**계층을 만들어 보기 쉽게 구현하겠다.

```python
class EmbeddingDot : 
  def __init__(self,W) : 
    self.embed = Embedding(W)
    #embed는  Embedding 계층을 잠시 유지하기 위한 변수로 사용됨.
    self.params = self.embed.params
    # 여기서는 따로 구현한 embeddingdot 계층이 아닌 Embedding 계층의 params, grads를 사용해야 하므로 위와 같이 작성하였다.
    self.grads = self.embed.grads
    self.cache = None
    # cache는 순전파 시의 계산 결과를 잠시 유지하기 위한 변수로 사용된다.
    
  def forward(self, h, idx) :
    # h : 은닉층 idx : 단어 ID의 넘파이 배열
    target_W = self.embed.forward(idx)
    out = np.sum(target_W*h, axis = 1)
    
    self.cache = (h, target_W)
    return out
  
 def backward(self.dout):
  	h, target_W = self.cache
    dout = dout.reshape(dout.shape[0], 1)
    
    dtarget_W = dout * h
    self.embed.backward(dtarget_W)
    dh = dout * target_W
    return dh
```



### 네거티브 샘플링

우리가 지금까지는 **긍정적인 대답**으로만 나올 결과를 예측하였기 때문에, 만약 부정적인 예를 입력하면 어떤 결과가 나올지는 모른다. 즉, "say"에 대한 정보는 획득했지만, "say"이외의 부정적인 예시의 대한 정보는 전혀 획득하지 못했다. 따라서 우리의 목표는 정답에 대해서는 출력을 1에 가깝게 만들고, **부정적인 예에 관해서는 출력을 0으로 만드는 것이 목표이다.**

하지만, 부정적인 예시를 전부 다 하는 것은 애초에 embedding 과정을 하지 않는 것이나 다름 없기 때문에 우리는 부정적인 예시를 **몇 개만 **선택 할 것이다. 이것을 바로 **네거티브 샘플링**이라고 한다.

물론 네거티브 샘플링을 할 때 무작위로 샘플링을 하는 것 보다 더 좋은 방법이 있다. 바로 말뭉치의 **통계 데이터**를 기초로 샘플링 하는 방법이다. 이 방법은 통계데이터에서 **자주 등장하는 단어를 많이 추출하고 드물게 등장하는 단어를 적게 추출하는** 방법이다. 따라서 말뭉치의 단어별 출현 횟수를 확률분포로 구한 다음에 확률분포에 따라서 샘플링을 하면 된다. 아래는 이를 구현할 코드이다. 

구현 전에, UnigramSampler를 사용하는 방법을 간단하게 알고 넘어가자

```python
>>> corpus = np.array([0,1,2,3,4,1,2,3])
>>> power = 0.75										# 제곱을 하여 확률이 낮은 원소의 출현 확률을 조금이나마 올려준다.
>>> sample_size = 2 								# 부정적인 예를 몇 개 샘플링 할것인지 정한다.
>>>
>>> sampler = UnigramSampler(corpus, power, sample_size)
>>> target = np.array([1, 3, 0])		# 즉, 여기 타겟의 원소 각각이 긍정적인 원소일때, 이것의 부정적인 예시를 출현 빈도에 따라서 뽑아낸다.
>>> negative_sample = sampler.get_negative_sampler(target)
```

### 네거티브 샘플링의 구현

위의 Unigram Sampler의 사용법을 터득하였으면, 아래 코드 구현을 차근차근 살펴보자.

```python
class NegativeSamplingLoss:
  def __init__(self, W, corpus, power = 0.75, sample_size = 5):
    #sample_size : 부정적 예의 샘플링 사이즈를 말한다.
    self.sample_size = sample_size
    self.sampler = UnigramSampler(corpus, power, sample_size)
    # Unigram Sampler의 인스턴스를 생성하여 후에 순전파, 역전파 구현시에 네거티브 샘플링을 그때 추출한다.
    self.loss_layers = [SigmoidWithLoss() for _ in range(sample_size +1)]
    self.embed_dot_layers = [EmbeddingDot(W) for _ in range(sample_size +1)]
    # 여기서는 부정적인 샘플(sample_size)와 긍정적인 샘플(1)의 갯수의 합만큼 loss와 embed 계층이 필요하므로 갯수를 이렇게 정했으며, 추가로 리스트에 계층을 저장하였다.
    self.params, self.grads = [],[]
    
    for layer in self.embed_dot_layers :
      self.params += layer.params
      self.grads += layer.grads
      
	def forward(self, h, target):
    batch_size = target.shape[0]
    # 타깃의 행의 크기만큼 배치 사이즈를 정함
    negative_sample = self.sampler.get_nagative_sample(target)
    # 네거티브 샘플을 구함
    
    # 긍정적인 예시를 순전파
    score = self.embed_dot_layers[0].forward(h, target)
    correct_label = np.ones(batch_size, dtype = np.int32)
    loss = self.loss_layers[0].forward(score, correct_label)
    
    # 부정적인 예 순전파
    negative_label = np.zeros(batch_size, dtype = np.int32)
    for i in range(self.sample_size):
      negative_target = negative_sample[:, i]
      score = self.embed_dot_layers[1+i].forward(h, negative_target)
      loss += self.loss_layers[1+i].forward(score, negative_label)
      
      return loss 
    
  def backward(self, dout = 1):
    dh = 0
    for l0, l1 in zip(self.loss_layers, self.embed_dot_layers):
      dscore = l0.backward(dout)
      dh += l1.backward(dscore)
      
   	return dh
```



### 개선된 CBOW 모델 구현

우리는 지금까지 CBOW 모델을 구현하는데 개선할 점을 Embedding 계층의 추가, Negative Sampling Loss 계층이 어떤지 알아보면서 배워왔다. 이제 이러한 계층을 실제 CBOW모델을 구현할 때 적용해보겠다.

```python
import sys
sys.path.append('..')
import numpy as np
from commong.layers import Embedding
# Embedding 계층 추가
from ch04.negative_sampling_layer import NegativeSamplingLoss
# Negative Sampling Loss 계층 추가

class CBOW:
  def __init__(self, vocab_size, hidden_size, window_size, corpus):
    V, H = vocab_size, hidden_size
    
    W_in = 0.01 * np.random.randn(V, H).astype('f')
    W_out = 0.01 * np.random.randn(V, H).astype('f')
    
    self.in_layers = []
    for i in range(2 * window_size):
      layer = Embedding(W_in)
      self.in_layers.append(layer)
    self.ns_loss = NegativeSamplingLoss(W_out, corpus, power = 0.75, sample_size = 5)
    
    layers = self.in_layers + [self.ns_loss]
    self.params, self.grads = [], []
    for layer in layers:
      self.params += layer.params
      self.grads += layer.grads
      
    self.word_vecs = W_in
    # 단어의 분산표현에 접근할 수 있도록 할당한다. 
  
  def forward(self, contexts, target):
    h = 0 
    for i , layer in enumerate(self.in_layers):
      h+=layer.forward(context[:, i])
    h*= 1/len(self.in_layers)
    loss = self.ns_loss.forward(h,target)
    return loss 
  
  def backward(self, dout = 1):
    dout = self.ns_loss.backward(dout)
    dout *= 1/len(self.in_layers)
    for layer in self.in_layers:
      layer.backward(dout)
    return None
```

지금까지 내가 구현해왔던 신경망들은 피드포워드(Feed Forward)라는 유형의 신경망으로, 흐름이 단반향인 신경망을 의미한다. 즉, 입력 신호가 다음 층으로 또 다음 층으로 전달되고.. 이렇게 한 방향으로만 전달되는 신경망을 의미한다.

하지만, 피드포워드 유형의 신경망은 **시계열 데이터**를 잘 다루지 못한다는게 단점으로 작용한다. 자세히 말하면 피드포워드 유형의 신경망에서는 시계열 데이터의 **성질(패턴)**을 충분히 학습할 수가 없다고 한다. 따라서 **순환 신경망(RNN)**이 등장하게 된다. 

이제부터 알아낼 두 가지 정보는 아래와 같다.

- 피드포워드 신경망의 문제점을 알아보자.
- RNN이 문제점을 어떻게 해결하는가

## 확률과 언어모델

지금까지 배운 word2vec의 CBOW모델을 복습해보겠다. 단어열을 나열 할 때, $w_t$은 타깃,  $w_{t-1}, w_{t+1}$은 타깃 주변의 맥락이라고 표현하였다. 그러면 맥락이 주어졌을 때 타깃이 $W_t$가 될 확률은 아래와 같이 나타낸다.

<center>
  $P(w_{t} \mid w_{t-1},w_{t+1})$
</center>


- 이는 윈도우 크기가 1일 때의 CBOW을 모델을 나타낸 사후 확률 모델링이며, 맥락이 좌우 대칭일 때를 나타낸 확률이다.

하지만, 우리는 이제 맥락을 왼쪽 윈도우 한정으로 나타낸다면 확률 모델 표기는 아래와 같다.

<center>
  $P(w_t \mid w_{t-2}, w_{t-1})$
</center>


- 맥락이 왼쪽 두 단어만을 의미하는 확률 모델이다.

<center>
  $L = -logP(w_t \mid w_{t-2}, w_{t-1}$
</center>


- 위의 확률 모델을 사용해 손실 함수를 나타낸 수식이다. 

우리의 목적은 손실 함수를 최소화 하는 가중치 매개변수를 찾는 것이다. 이러한 가중치 매개변수가 발견되면 CBOW모델로 부터 맥락이 주어졌을 때 타깃을 정확하게 추출할 수 있을 것이다. 이러한 목적을 가지고 학습을 진행할 때 단어의 의미가 인코딩 된 **분산표현**을 얻을 수 있는 것이다.

그렇다면, 우리가 주목해야 할 것은 분산표현을 얻는 것이 아닌 원래 목적인 **맥락으로 부터 타깃을 추측하는 능력**은 어디에 써야하는 것인가? 여기서 우리는 **언어모델**을 기억하고 다음 장으로 넘어가도록 하자.

**우리가 가져가야 할 궁금증**: 윈도우는 하이퍼 파라미터이며, 우리가 정하는 값인데 윈도우의 크기를 좌우 비대칭으로 설정한 이유는 도대체 무엇일까?

### 언어모델

언어 모델은 수식에서 알 수 있듯이 **단어 나열에 확률을 부여**한다.  즉, "you say goodbye" 라는 시퀀스에는 높은 확률을 부여하고 "you say good die"라는 시퀀스에는 낮은 확률을 부여하는 것이 언어 모델이라고 할 수 있다.

그렇다면 특정한 단어 시퀀스에 확률을 부여하는 것을 사용하여 어떤 것을 할 수 있는지 알아보자.

- 음성 인식 시스템 : 사람의 음성으로부터 몇 개의 문장을 후보로 생성한다. 그 다음 후보 문장이 문장으로써 자연스러운지 순서를 매길 수 있다.
- 새로운 문장 생성 : 단어 순서의 자연스러움을 확률 적으로 평가가 가능하므로 다음으로 적합한 단어를 **확률에 따라 샘플링이 가능하다.**

#### 확률의 곱셈정리

<center>
  $P(A,B) = P(A \mid B)P(B)
</center>


- P(A,B): A랑 B 모두 일어날 확률을 의미한다. 또한 이때 사후 확률에서 조건의 순서를 바꿔도 값은 똑같이 나온다. 

#### 확률의 곱셈정리를 이용한 언어모델의 수식

<center>
  $P(w_1,...,w_{m}) = P(w_m\mid w_1,...,w_{m-1})P(w_{m-1}\mid w_1,...,w_{m-2}) \cdot \cdot \cdot P(w_3\mid w_2, w_1)P(w_2\mid w_1) P(w_1) = \Pi_t=1^m P(w_t \mid w_1,...,w_{t-1})$
</center>


- m 개의 단어의 동시에 나타날 확률을 사후 확률로 나타낸 것이며, 간단하게 축약하여 표현하면 아래와 같다.

<center>
 $ P(w_1,...,w_{m-1},w_m) = P(A,w_m) = P(w_m \mid A)P(A)$
</center>


- 이와 같이 단어 1개씩 떼가며 사후 확률로 표현하면 기존에 $\Pi$로 표현하던 식과 같이 나오게 된다. 

지금까지 써왔던 수식들에서 주목해야 할 점은 사후 확률이 타깃 단어보다 왼쪽에 있는 모든 단어들을 **맥락** 으로 했을 때의 확률인 것이다. 

### CBOW모델을 언어모델로 

우리가 실제로 구현할 때, 맥락의 크기는 제한적이다. 따라서 맥락의 크기를 말뭉치 전체에 적용하여 하는 것은 상당히 무리가 있으며, 맥락의 크기를 특정 값으로 한정하여 근사적으로 나타내야한다. 수식으로는 아래와 같다.

<center>
  $ P(w_1,...,w_m) = \Pi^m_{t=1} P(w_t \mid w_1,...,w_{t-1}) \approx \Pi^m_{t=1} P(w_t \mid w_{t-2},w_{t-1})
</center>


- 근사한 식은 맥락을 왼쪽 2개의 단어로 한정한다. 따라서 CBOW 모델의 맥락의 크기에 따라 근사적으로 나타낼 수 있음을 알 수 있다.

맥락의 크기는 임의의 길이로 **설정** 하였다는 의미는 특정 길이로 **고정** 이 된다는 의미이다. 이는 현재 나와야 하는 단어가 맥락의 크기를 벗어난 곳에 위치해 있다면 확률모델을 적용할 수 없어 답할수가 없다. 따라서 우리는 **맥락의 크기가 코정됨을 알고 있어야 한다.**

그렇다면 맥락의 크기만 키우면 문제가 해결이 되는가? 아니다. CBOW 모델에서는 맥락 안의 단어 순서가 **무시 된다는 한계가 있다.**















