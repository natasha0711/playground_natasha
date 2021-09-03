var xhr = new XMLHttpRequest();
var method = "GET";
    var url = "assets/ajax/tab1.json";
    xhr.open(method, url);

    xhr.setRequestHeader("Content-Type", "json;charset=UTF-8");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
function onScroll(){
    var myNav = document.getElementById('mainNav');
    if (document.documentElement.scrollTop >10 ) {
        myNav.style.backgroundColor = "#0f0f0f";;
    } 
    else {
        myNav.style.backgroundColor = "RGBA(205, 101, 43, 0.8)";
    }
}
function off(){
    document.getElementById("overlay").style.display = "none";
}
function onInit(){
    var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
draw();
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 1;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 1;
    }
    
    x += dx;
    y += dy;
    
    var interval = setInterval(draw, 1);
}

    $('.responsive-footer').hide();
document.getElementById("overlay").style.display = "block";
const img = document.getElementById('carousel');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');

let pictures = ['assets/images/banner-we-are.jpg',
                'assets/images/banner-we-do.jpg',
                'assets/images/banner-carrers.jpg'];

img.src = pictures[0];
let position = 0;

const moveRight = () => {
    if (position >= pictures.length - 1) {
        position = 0
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position + 1];
    position++;
}

const moveLeft = () => {
    if (position < 1) {
        position = pictures.length - 1;
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position - 1];
    position--;
}

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);
}
var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

function userNameValidation(usernameInput) {
    var username = document.getElementById("username");
    var issueArr = [];
    if (/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(usernameInput)) {
        issueArr.push("No special characters!");
    }
    if (issueArr.length > 0) {
        username.setCustomValidity(issueArr);
        username.style.borderColor = alertRedInput;
    } else {
        username.setCustomValidity("");
        username.style.borderColor = defaultInput;
    }
}

$.ajax({
    url: window.location.protocol +'assets/ajax/tab1.json',
    dataType: 'JSONP',
    jsonpCallback: 'callback',
    type: 'GET',
    success: function (data) {
        var topics = [];
        $.each(data, function(){
            topics.push({
                tab1Title: data.item.title,
                tab1Content: data.item.content,
                tab2Title: data.item2.title,
                tab2Content: data.item2.content,
                tab3Title: data.item3.title,
                tab3Content: data.item3.content
            }); 
            
            
        });
        var tabContent = $('#careers .tabbed')
        var html = 
        ' <input type="radio" name="tabs" id="tab-nav-1" onclick="load(1)" checked>'+
        '<label for="tab-nav-1" id="label1" >'+ topics[0].tab1Title +'</label>'+
        '<input type="radio" name="tabs" id="tab-nav-2" onclick="load(2)">'+
       ' <label for="tab-nav-2" id="label2">' + topics[0].tab2Title + '</label>'+
       ' <input type="radio" name="tabs" id="tab-nav-3" onclick="load(3)">'+
        '<label for="tab-nav-3" id="label3">' + topics[0].tab3Title + '</label>'+
        '<div class="tabs">'+
          '<div>' + topics[0].tab1Content + '</div>'+
          '<div>' + topics[0].tab2Content + '</div>'+
          '<div>' + topics[0].tab3Content + '</div>'+
        '</div>'+
     ' </div>';
        tabContent.append(html);
        console.log(topics)
       
    }
});
function load(tab){
    var image = document.createElement("img");
    switch (tab){
        case 1:
            imageParent = document.getElementById("label1");
        break;
        case 2:
            imageParent = document.getElementById("label2");
        break;
        case 3:
            imageParent = document.getElementById("label3");  
    }
    image.id = "loader";
    image.className = "loader";
    image.src = 'assets/images/loader.png';
    imageParent.appendChild(image);
    setTimeout(function () {
        document.getElementById("loader").remove('loader')
    }, 3000);
}
function pureFadeIn(elem, display){
    var el = document.getElementById(elem);
    el.style.opacity = 0;
    el.style.display = display || "block";
  
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .02) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  };
  function pureFadeOut(elem){
    var el = document.getElementById(elem);
    el.style.opacity = 1;
  
    (function fade() {
      if ((el.style.opacity -= .02) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  };
  
  function setCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }
  function eraseCookie(name) {
      document.cookie = name+'=; Max-Age=-99999999;';
  }
  
  function cookieConsent() {
    if (!getCookie('purecookieDismiss')) {
      document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + ' ' + purecookieLink + '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButton + '</a></div></div>';
      pureFadeIn("cookieConsentContainer");
    }
  }
  
  function purecookieDismiss() {
    setCookie('purecookieDismiss','1',7);
    pureFadeOut("cookieConsentContainer");
  }
  
  window.onload = function() { cookieConsent(); };
  var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length} ;
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
function onResize(){

  if ($(window).width() < 997) {
    $('.nav-horizontal').hide();
    $('.responsive-menu').show();
    $('.normal').hide();
    $('.responsive-footer').show();
  } else {

    $('.responsive-menu').hide();
    $('.nav-horizontal').show();
    $('.normal').show();
    $('.responsive-footer').hide();
  }
}
function onClose(){
    $('.responsive-menu').hide();
    $('.nav-horizontal').show();
}
function onOpen(){
    $('.nav-horizontal').hide();
    $('.responsive-menu').show();
}
