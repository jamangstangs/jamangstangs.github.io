---
title: 터미널 사용법
toc: true
categories:
- Basic Step for Developer
---

## Step 1: 터미널이란?
터미널은 컴퓨터를 관리하는데 있어서 매우 중요한 요소이다. 터미널의 사용 방식을 좀 더 간단하게 하기 위해 GUI를 사용한 PC 조작법이 출현하었고, 그로인해 PC 점유율이 높아지면서 터미널보다는 GUI를 이요한 컴퓨터 조작이 보편화 되었다.
이러한 방식이 보편화 되었음에도 불구하고 터미널로만 접근할 수 있는 기능들을 사용하기 위해 터미널 사용 방법을 충분히 익혀야 한다.

### 왜 터미널 사용 방식을 배워야 하는가??
-   GUI로 접근할 수 없는 파일들 다루기 위해
-   특정 OS에서 효율적으로 일을 하기 위해

### 비고
-   Window환경에서는 Git Bash를 사용하여 Linux 명령어를 사용하여 파일을 다룰 예정이기 때문에 **Linux** 운영체제 기준으로 포스팅 할 예정이다. 추가적으로 윈도우에서 Git Bash를 사용하더라도 사용할 수 없는 명령어가 있다. 

## Step 2: 터미널, 콘솔, 쉘의 차이점
-   Terminal(터미널): 시스템에 접속하여 입출력을 가능하게 하는 단말장치 
-   Console(콘솔): 터미널의 일종으로, 시스템 제어를 위한 특수 목적의 터미널이다.
-   Shell(쉘): Command Line Interface의 명령을 해석하는 소프트웨어. 

## Step 3: 개발자들이 알아야 할 터미널 명령어(Linux)
### 1. cd
-   Changing Directory
-   현재 디렉토리에서 다음 디렉토리로 접근하고자 할 때 사용하는 명령어
-   사용법 : cd "path/to/directory/"

### 2.  ls
-   Lists the contents of a directory
-   현재 디렉토리의 내용물을 보여주는 명령어
-   ls "path/to/directory/"

### 3. open
-   Open a File
-   파일을 연다.
-   open "filename"

### 4. cp
-   Copy a file to current directory
-   파일을 복사하여 현재 디렉토리에 저장한다.
-   cp "filename" "newFilename"

### 5. mv
-   Move a file
-   지정한 파일을 다른 디렉토리로 옮길 때 사용한다.
-   mv "filename" "path/to/directory/"

### 6. mkdir
-   Make a directory
-   새로운 디렉토리(폴더)를 만들때 사용하는 명령어이다.
-   mkdir "path/to/new/directory"

### 7. rmdir
-   Remove an empty Directory
-   "비어있는" 폴더를 지운다.
-   rmder "path/to/directory/"

### 8. rm -R
-   중첩되어있는 디렉토리들을 한 번에 지운다.
-   rm -R "path/to/root/directory"

### 9. sudo
-   Execute commands with superuser privileges
-   관리자권한으로 명령어를 실행시킨다.
-   sudo "command"

### 10. top
-   List actively running computer processes
-   현재 실행시키고 있는 컴퓨터 processes들을 나열한다.
-   top (Figure K)

### 11. q
-   Quit subscreen and return to terminal
-   top과 같은 커맨드를 사용하고 나서 q를 눌러서 빠져나온다.

### 12. clear 
-   Clear the Terminal Screen of all previous commands
-   clear

### 13. help 
-   Get help for the command