const morebtn = document.querySelector('.bottom .metadata .titleandbutton .morebutton');
const title = document.querySelector('.bottom .metadata .titleandbutton .title');

morebtn.addEventListener('click',() =>{
    morebtn.classList.toggle('clicked');
    title.classList.toggle('clamp');
})