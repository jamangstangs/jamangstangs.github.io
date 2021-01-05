---

title: Linear Algebra for Coder

toc: true

use_math: true

categories:

 - Math

---

## Vector, Matrix and Determinent

|                      | 의미                                  |
| -------------------- | ------------------------------------- |
| 벡터 (Vector)        | 화살표, 공간 안의 점                  |
| 행렬 (Matrix)        | 공간에서 공간으로의 직교사상(mapping) |
| 행렬식 (Determinent) | 위의 사상에 따른 부피 확대율          |

### 벡터와 공간

벡터에서는 특별히 언급하지 않는 한, 종벡터(Column Vector)가 default이다. 이때 종벡터를 그대로 표기하면 위아래 공간이 너무 낭비이므로 횡벡터(Row Vector)에 Transpose를 하여 종벡터로 만드는데, 기본적인 정의는 아래와 같다.

- Transpose (전치) : $x = (2,3,4,5)$에 Transpose를 한다면 $x = (2,3,4,5)^T = \left (\begin{array}{c} ) \right$

