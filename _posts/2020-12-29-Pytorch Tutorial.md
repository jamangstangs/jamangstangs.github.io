---
title: PS 정리
categories : Probelm Solving
---
## 자료구조
### 스택
한쪽 끝에서만 자료를 넣고 뺄 수 있는 자료구조, 또한 마지막에 넣은 것이 가장 먼저 나오기 때문에 LIFO(Last in First out, 후입선출)라고 한다.
-   push : 스택에 자료를 넣는다.
-   pop : 스택의 자료를 뺀다.
-   top : 스택의 가장 위에 있는 자료를 본다.
-   empty : 스택이 비어있는지 판단하는 연산
-   size : 스택에 저장된 자료의 개수를 알아낸다.
```C++
#include<iostream>
#include<string>
using namespace std;

struct Stack{
    int data[10000];
    int size;

    Stack(){
        size = 0;
    }

    bool empty(){
        if(size == 0)
            return true;
        else 
            return false;
    }

    void push(int x){
        data[size]=x;
        size+=1;
    }

    int pop(){
        if(empty()){
            return -1;
        }
        else {
            size -=1;
            return data[size];
        }
    }
    
    int top(){
        if(empty()){
            return -1;
        }
        else {
            return data[size-1];
        }
    }
};

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int N;
    string cmd;

    Stack s;
    
    cin >> N;
    int x;

    while(N--){
        cin >> cmd;
        if(cmd=="push"){
            cin >> x;
            s.push(x);
        }
        else if(cmd == "top"){
            cout<<s.top()<<endl;
        }
        else if(cmd == "pop"){
            cout<<s.pop()<<endl;
        }
        else if(cmd == "size"){
            cout<<s.size<<endl;
        }
        else if(cmd == "empty"){
            cout<<s.empty()<<endl;
        }
    }
}
```  

### 스택을 사용하면 유용한 문제
단어 뒤집기(9093)
1. 입력받은 문장들을 스택에 넣는다.
2. 공백, 혹은 엔터를 입력받으면 스택에서 그대로 꺼낸다(단어를 뒤집는다.).

괄호(9012)
1. 괄호 조건이 틀린 경우를 생각한다.
    a. (가 스택에 남아있을 경우 -> (가 많은 경우
    b. )를 비어있는데 빼내려고 하는 경우 -> )가 많은 경우
2. 입력 받을 때 ignore, getline을 사용하며, 이것들을 사용할 때 주의할 점을 생각해보자.
    -   getline(cin,str)은 개행문자를 입력의 단위로 받으므로 입력이 완료된 str에는 개행문자가 없는 것을 생각하자.
    -   ignore은 숫자 입력 다음에 문자열을 받는다면 **버퍼를 꼭 비워줘야** 다음 문자열 입력때 버퍼 안에 남아있던 개행문자가 들어가지 않게 된다.



## 스킬
### while(cin>>a>>b)
cin>> a 안에 올바른 값이 들어왔다면 True, 그렇지 않다면 false값을 리턴하므로 어떤 값이 들어왔는지에 따라서 반복문을 제어 가능함.
**테스트 케이스의 개수가 명시적으로 주어지지 않았을 때 사용하는 방법**
### exit()
C프로그램 자체를 완전 종료하는 기능 -> if문 속에서 주로 사용되며 특정 조건이 들어왔을 때 프로그램을 종료하기 위한 명령어로 사용된다. exit(0)에서 0은 에러가 없이 종료된다는 의미이다.
### 입력이 몇개인지 주어지지 않은 경우
```c++
while(cin >> a >> b)
```  
### 입력이 주어진 경우
```c++
int T; 
cin >> T;
while(T--)  /*후치 연산자로 먼저 실행하고 수를 빼야 올바른 횟수만큼 실행이 됨*/ 
```  

### getline 함수
공백을 포함한 라인을 통째로 읽어오는 라인입력 함수이다. 엔터를 기준으로 문자를 받음.

### for(char ch: str)
string자료형인 str안의 char형 문자를 앞에서 부터 수색하여 있으면 반복문을 실행하고, ch를 반복인자로 잡고 그 다음에 있는 문자를 반복적으로 잡아 실행한다. 