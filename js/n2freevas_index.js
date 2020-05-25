

// スクロール禁止
function scrollEventManager() {
    // PCでのスクロール禁止
    
        document.addEventListener("wheel", scroll_control, { passive: false });
    
    // スマホでのタッチ操作でのスクロール禁止
    document.addEventListener("touchmove", scroll_control, { passive: false });
}
// スクロール禁止解除
function return_scroll() {
    // PCでのスクロール禁止解除
    document.removeEventListener("wheel", scroll_control, { passive: false });
    // スマホでのタッチ操作でのスクロール禁止解除
    document.removeEventListener('touchmove', scroll_control, { passive: false });
}


// スクロール関連メソッド
function scroll_control(event) {
    console.log(event.wheelDelta);
    //console.log(event.detail);
    //event.preventDefault();
    
}



/* 背景ランダム配置 */
$(function(){
    var num = Math.ceil(5*Math.random());
    $('.body_home').addClass('body_home_bg'+num);
});


//アプリケーションボタン関連イベント
function OnclickProfileButton(){
    console.log('profile');
    var element = document.getElementById('profile');
    var menu_box = document.getElementById('menu_box');
    ClockQuickSpin();
    menu_box.classList.remove('active');
    window.setTimeout(function(){
        element.scrollIntoView({behavior:'smooth'})
    },700);
    
    
}

function OnclickBlogButton(){
    console.log('Blog');
}

function OnclickActivityButton(){
    console.log('Activity');
    var element = document.getElementById('menu')
    element.scrollIntoView({behavior:'smooth'})
}

function OnclickArticleButton(){
    console.log('Article');
    var element = document.getElementById('menu')
    element.scrollIntoView({behavior:'smooth'})
}

function OnclickContactButton(){
    console.log('Contact');
    var element = document.getElementById('menu')
    element.scrollIntoView({behavior:'smooth'})
}
function OnclickBackMenuButton(){
    var element = document.getElementById('menu')
    element.scrollIntoView({behavior:'smooth'})
    ClockTikTok();
    var menu_box = document.getElementById('menu_box');
    window.setTimeout(function(){
        menu_box.classList.add('active');
    },500);
    
}

function ClockQuickSpin(){
    var clock = document.getElementsByClassName('clockbody');
    clock[0].classList.add('spin')
}
function ClockTikTok(){
    var clock = document.getElementsByClassName('clockbody');
    clock[0].classList.remove('spin')
}
//矢印キーのイベントを制御
window.document.onkeydown = function(evt){
    if ((evt.which == 37)
    || (evt.which == 38)
    || (evt.which == 39)
    || (evt.which == 40)
    ){ evt.which = null;
    return false;}
}

scrollEventManager()

