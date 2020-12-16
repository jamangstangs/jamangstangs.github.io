---
title: YouTube Clone Coding
categories:
  - YouTube Clone Coding
---

## YouTube 클론 코딩을 시작한 계기

이전에 생활코딩에서 HTML과 CSS 강의를 들으면서 직접 구현해본다면 대단한 웹사이트가 탄생할거라는 믿음으로 배워나갔었지만, 처음부터 직접 구현해보기에는 무리가 있었다. 지인중에서 유튜브에서 클론코딩 강의가 많으니까 한번 시작해보라는 권유에 검색한 결과, 드림코딩 by 앨리라는 유튜버의 강의를 참고하여 시작하였다. 이전에 생활코딩 강의에서 프론트엔드 강의를 들었던 덕분인지 어떤 부분에서 무엇을 써야할지 감은 왔지만, 아래와 같은 문제로 인하여 처음부터 다시 구현하게 되었다. (Github에 들어가보면 폴더명에 ver2가 적혀있을텐데, 같은 이유이다.) <br>

- 태그의 섹션을 제대로 나누지 않았다.
- 태그의 class 이름을 중복하여 CSS 적용이 중복이 되었다.<br>

위와 같은 이유에서 초기 버전에서는 실패를 하였지만, 처음부터 갈아 엎고 다시 시작한 결과 아래의 코드로 결과물을 확인할 수 있다. 비록 javascript 부분에서 스스로의 힘으로 구현하기는 어려웠지만 생활코딩에서 javascript를 어느정도 수강하고 진행하여 이해를 하는데 어렵지는 않았다.

## Cloning Step 1: HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <script
      src="https://kit.fontawesome.com/0132b9869a.js"
      crossorigin="anonymous"
    ></script>
    <script src="main.js" defer></script>
    <title>YouTube</title>
  </head>
  <body>
    <!-- top -->
    <div class="top">
      <nav>
        <div class="left">
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#">YouTube</a>
        </div>
        <div class="right">
          <a href="#"><i class="fas fa-search"></i></a>
          <a href="#"><i class="fas fa-ellipsis-v"></i></a>
        </div>
      </nav>
    </div>
    <section class="videoplayer">
        <video autoplay controls src="video/videoplayback.mp4"></video>
      </section>
    </div>
      <!-- bottom -->
    <div class="bottom">
      <!-- header -->
      <header>
        <div class="metadata">
          <ul class="hashtags">
            <li>#Jamangs</li>
            <li>#clonecoding</li>
            <li>#jamangstangs.github.io</li>
          </ul>
          <div class="titleandbutton">
            <span class="title clamp">
              Jamangs와 함께하는 클론코딩: HTML, CSS 그리고 아쉽지만
              자바스크립트는 잘 구현을 못했네요 ㅠㅠ 동영상 꼭 보시고 구독,
              그리고 좋아요 꼭 눌러주시고 버튼 한번 눌러보면 제가 구현을 했을지
              안했을지 궁금하지 않나요? 그러니까 꼭 눌러보세요~!!
            </span>
            <button class="morebutton">
              <i class="fas fa-caret-down"></i>
            </button>
          </div>
          <span class="views"> 100m views</span>
        </div>
        <ul class="icons">
          <li>
            <button class="up">
              <i class="fas fa-thumbs-up"></i>
              <div>Up</div>
            </button>
          </li>
          <li>
            <button class="down">
              <i class="fas fa-thumbs-down"></i>
              <div>Down</div>
            </button>
          </li>
          <li>
            <button class="share">
              <i class="fas fa-share"></i>
              <div>Share</div>

            </button>
          </li>
          <li>
            <button class="save">
              <i class="fas fa-plus"></i>
              <div>Save</div>

            </button>
          </li>
          <li>
            <button class="report">
              <i class="fas fa-flag"></i>
              <div>Report</div>
            </button>
          </li>
        </ul>
        <div class="youtuber">
          <div class="profile">
            <img src="img/profile.jpg" alt="" />
            <div class="nameandsubscribes">
              <div class="name">Jamangstangs</div>
              <div class="num">구독자 100만명</div>
            </div>
          </div>
          <div class="subscribes">
            <button>SUBSCRIBES<button>
          </div>
        </div>
      </header>
      <!-- footer -->
      <footer class="upnext">
        <span class="title">Up next</span>
        <ul class="videos">
            <li class="items">
                <div class="img">
                    <img src="img/fall-1072821_1920.jpg" alt="" />
                </div>
                <div class="video">
                    <span class="videotitle">가을에 대한 대비를 어떻게 해야하는지에 대한 아주 깊은 고찰. 그리고 구독과 좋아요는 필수이며 나중에 무료 나눔 이벤트를 해드리겠습니당 ㅎㅎ </span>
                    <span class="videoinfo">Jamangstangs</span>
                    <span class="views">100k</span>
                </div>
                <button><i class="fas fa-ellipsis-v"></i></button>
            </li>
            <li class="items">
                <div class="img">
                    <img src="img/night-3078326_1920.jpg" alt="" />
                </div>
                <div class="video">
                    <span class="videotitle">이거는 밤에대한 비디오이며 나중에 꼭 무료나눔음 해드리겠습니당 ㅎㅎ </span>
                    <span class="videoinfo">Jamangstangs</span>
                    <span class="views">100k</span>
                </div>
                <button> <i class="fas fa-ellipsis-v"></i></button>
            </li>
            <li class="items">
                <div class="img">
                    <img src="img/fall-1072821_1920.jpg" alt="" />
                </div>
                <div class="video">
                    <span class="videotitle">이거는 나무에 관한 동영상이며 나중에 꼭 나무를 다듬어서 여러분들게 무료 식탁을 나눔해드리겠습니다</span>
                    <span class="videoinfo">Jamangstangs</span>
                    <span class="views">100k</span>
                </div>
                <button> <i class="fas fa-ellipsis-v"></i></button>
            </li>
        </ul>
      </footer>
    </div>
  </body>
</html>
```

## Cloning Step 2: CSS

```css
:root {
  /* 색상 */
  --youtube--color: #ff0000;
  --title-color: white;
  --title-background-color: #140a00;
  --header-icons-color: #848384;
  --header-icons-changed-color: #1450b0;

  /* 패딩 사이즈 */
  --padding: 12px;
  --profile-img-size: 36px;

  /* 폰트 사이즈 */
  --font-large: 18px;
  --font-medium: 14px;
  --font-small: 12px;
  --font-micro: 10px;
}

/* 모든 태그 설정 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

button,
button:focus {
  border: none;
  cursor: pointer;
  outline: none;
  background-color: white;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Top 설정 */
.top {
  background-color: var(--title-background-color);
}

.bottom {
  display: flex;
  flex-direction: column;
}

/* navigation bar 설정 */
nav {
  height: 44px;
  padding: var(--padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  font-size: var(--font-large);
  color: var(--title-color);
  text-decoration: none;
}
nav .left i {
  color: var(--youtube--color);
}

nav .right i {
  margin-right: var(--padding);
}
/* video 설정 */
.videoplayer {
  position: sticky;
  top: 0;
  text-align: center;
  background-color: var(--title-background-color);
}

.videoplayer video {
  width: 100%;
  height: 100%;
  max-width: 1000px;
}

/* bottom 설정 */
.bottom {
  padding: var(--padding);
}

/* header 설정 */
.metadata .hashtags {
  display: flex;
  color: var(--header-icons-changed-color);
  font-size: var(--font-small);
}

.metadata .hashtags li {
  margin-right: var(--padding);
}
.metadata .titleandbutton {
  display: flex;
  font-size: var(--font-large);
}

.metadata .titleandbutton .title {
  font-size: var(--font-medium);
  margin-right: var(--padding);
}

.metadata .titleandbutton .title.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.metadata .titleandbutton .morebutton {
  height: 100%;
  transition: transform 300ms ease-in-out;
}

.metadata .titleandbutton .morebutton.clicked {
  transform: rotate(180deg);
}

.metadata .views {
  font-size: var(--font-small);
  color: var(--header-icons-color);
}
.icons {
  display: flex;
  justify-content: space-around;
  margin: var(--padding);
}

.icons button {
  display: flex;
  flex-direction: column;
  color: var(--header-icons-color);
  font-size: var(--font-small);
}

.icons button i {
  margin: 0 auto;
  margin-bottom: calc(var(--padding) / 2);
  font-size: 16px;
}

.icons button i.active {
  color: var(--header-icons-changed-color);
}

.youtuber {
  display: flex;
  padding: var(--padding);
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid darkgray;
  border-top: 1px solid darkgray;
}

.youtuber .profile {
  display: flex;
  align-items: center;
}

.youtuber .nameandsubscribes {
  display: flex;
  flex-direction: column;
  padding-left: var(--padding);
}
.youtuber .name {
  font-size: var(--font-medium);
  color: black;
}
.youtuber .num {
  font-size: var(--font-small);
  color: var(--header-icons-color);
}

.youtuber .subscribes button {
  color: red;
}
.youtuber img {
  width: var(--profile-img-size);
  height: var(--profile-img-size);
  border-radius: 50%;
}

/* footer랑 비디오 */
.upnext {
  padding: 0 var(--padding);
}
.upnext > .title {
  font-size: var(--font-medium);
  color: darkgray;
  margin-bottom: calc(var(--padding) / 2);
}
.upnext .videos .items {
  display: flex;
  margin-top: var(--padding);
}

.upnext .videos .items .img {
  flex: 1 1 35%;
}
.upnext .videos .items .img img {
  width: 100%;
}
.upnext .videos .items .video {
  flex: 1 1 60%;
}
.upnext .videos .items button {
  flex: 1 1 5%;
  height: 100%;
}

.upnext .videos .items .video {
  display: flex;
  flex-direction: column;
  padding-left: var(--padding);
}
.upnext .videos .items .video .videotitle {
  font-size: var(--font-medium);
}
.upnext .videos .items .video .videoinfo {
  color: var(--header-icons-color);
  font-size: var(--font-small);
}
.upnext .videos .items .video .views {
  font-size: var(--font-small);
  color: var(--header-icons-color);
}

@media screen and (min-width: 760px) {
  .bottom {
    flex-direction: row;
    margin: var(--padding) 0;
  }
  .bottom header {
    flex: 1 1 50%;
  }
  .bottom footer {
    flex: 1 1 50%;
  }
}
```

## Cloning Step 3: Javascript

```javascript
const morebtn = document.querySelector(
  ".bottom .metadata .titleandbutton .morebutton"
);
const title = document.querySelector(
  ".bottom .metadata .titleandbutton .title"
);

morebtn.addEventListener("click", () => {
  morebtn.classList.toggle("clicked");
  title.classList.toggle("clamp");
});
```
