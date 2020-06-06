var nowContent = 'menu';
var nextContent = '';
var menu_box = document.getElementById('menu_box');
var black_bg = document.getElementById('black-background');
var contactbox = document.getElementById('contact');
var bg_clock = document.getElementById('bg_clock');
var clockbody = document.getElementById('clockbody');
var profilecontents = document.getElementsByClassName('profilecontent');
var blackmask = document.getElementsByClassName('blackmask');
var redmask = document.getElementsByClassName('redmask');

//スクロールステータス
var speed = 1; //スピード
var move = 20; //なめらかさ
var upscroll = true /* true: 上へ移動するor左へ移動する   /  false: その逆 */
var index = 0;
var scrollarraylen = 0;
var scrollarray = new Array();
/*
    ブラウザ判定プロトコル
*/
const userAgent = window.navigator.userAgent.toLowerCase();
var userBrowser = ''
if(userAgent.indexOf('chrome') !== -1){userBrowser = 'chrome';}
else if(userAgent.indexOf('edge') !== -1){userBrowser = 'edge';}
else if(userAgent.indexOf('msie 9.') !== -1){userBrowser = 'ie9';}
else if(userAgent.indexOf('trident/7') !== -1){userBrowser = 'ie11';}
else if(userAgent.indexOf('firefox') !== -1){userBrowser = 'firefox';}
else if(userAgent.indexOf('opera') !== -1){userBrowser = 'opera';}
else if(userAgent.indexOf('safari') !== -1){userBrowser = 'safari';}
else{userBrowser = 'unknown';}
console.log('this Browser is '+userBrowser)
/*
    Createギャラリーの高度なスクロール制御プロトコル
*/
now_scroll_position = 0;
wheel_agent = 10;
const creates = document.getElementById('portfolioscroll');
var scroll_margin = creates.scrollHeight - creates.clientHeight;

window.addEventListener('resize', function(){
    scroll_margin = creates.scrollHeight - creates.clientHeight;
    this.window.scrollTo 
});


// スクロール禁止
function scrollEventManager() {
    // スマホでのタッチ操作でのスクロール禁止
    document.addEventListener("touchmove", scroll_control, { passive: false });
    // PCでのスクロール禁止
    document.addEventListener("wheel", scroll_control, { passive: false });
}

// スクロール関連メソッド
function scroll_control(event){
    event.preventDefault();
    
    let wheel = (-1) * event.wheelDelta;
    now_scroll_position += parseInt(wheel/wheel_agent);

    
    creates.scrollTo(0,now_scroll_position);
    console.log($('#portfolioscroll').scrollTop(),now_scroll_position)
    
    if(now_scroll_position > scroll_margin){
        console.log('if');
        $('#portfolioscroll').scrollTop(1);
        now_scroll_position = 1;
    }
    else if(now_scroll_position < 0){
        console.log('else');
        $('#portfolioscroll').scrollTop(creates.scrollHeight - 1);
        now_scroll_position = creates.scrollHeight - 1;
    }
}

/* 
    背景ランダム配置
*/
$(function(){
    var num = Math.ceil(5*Math.random());
    $('#red-background').addClass('red_bg'+num);
});

/*
    各ページへ遷移する自動スクロール制御プロトコル
*/





function movetoContent(from,to){ 
    console.log(from,to)
    if ((userBrowser === 'chrome')||(userBrowser === 'firefox')||(userBrowser === 'opera')){
        console.log('scrollIntoView can use');
        var element = document.getElementById(to);
        element.scrollIntoView({behavior:'smooth'});
    }
    else{
        console.log('scrollIntoView cannot use. Alternative scroll function launch.');
        /* set direction to move using FROM and TO imformaiton  */
        console.log(window.pageXOffset,window.pageYOffset)
        if(from === 'menu'){
            if(to ==='profile'){
                upscroll = false;
                scrollControllerMake(window.innerHeight,0)
                scroll_y();
            }
            else if(to === 'create'){
                upscroll = true;
                scrollControllerMake( window.innerWidth,window.innerWidth*2)
                scroll_x();
            }
        }
        else if(from === 'profile'){
            upscroll = true;
            scrollControllerMake(0,window.innerHeight)
            scroll_y();
        }
        else if(from === 'create'){
            upscroll = false;
            scrollControllerMake( window.innerWidth*2,window.innerWidth )
            scroll_x();
        }
    }
    nowContent = nextContent;
};

function scrollControllerMake(d,target){
    var scrollController = new Array();
    const dx = 0.03;
    for(let i = 0;true ; i++){
        value = Math.ceil(Math.exp(-1*dx*i)*move);
        if(upscroll){
            d += value;
            if (d > target){
                scrollController.push(Math.abs(d-target));
                break;
            }
            scrollController.push(value);
        }
        else{
            d -= value;
            if (d < target){
                scrollController.push(-1*Math.abs(d-target));
                break;
            }
            scrollController.push(-1*value);
        }
    }
    arraylen = scrollController.length
    scrollarray =  scrollController;
}

function scroll_x(){
    window.scrollBy(scrollarray[index],0); // スクロール処理
    index += 1;
	var rep = setTimeout("scroll_x()", speed);
	if(index == arraylen ){ // スクロールし終わっていたら処理を終了
        index = 0;
        clearTimeout(rep);
	}
};
function scroll_y(){
    window.scrollBy(0, scrollarray[index]); // スクロール処理
    index += 1;
	var rep = setTimeout("scroll_y()", speed);
	if(index == arraylen ){ // スクロールし終わっていたら処理を終了
        index = 0;
        clearTimeout(rep);
	}
}
//アプリケーションボタン関連イベント
function OnclickProfileButton(){
    nextContent = 'profile';
    ClockQuickSpin();
    menu_box.classList.remove('active');
    
    window.setTimeout(function(){
        movetoContent(nowContent,nextContent);
    },700);

    for( let i = 0; i < profilecontents.length; i++){
        window.setTimeout(() => {
            profilecontents[i].classList.add('fadein');
        }, 1200+i*200);
    }
    for(let i = 0; i<blackmask.length; i++)
    window.setTimeout(()=>{
        blackmask[i].classList.add('slideup');
        redmask[i].classList.add('slideleft');
    },1000);
}

function OnclickCreateButton(){
    nextContent = 'create';
    ClockSlide();
    black_bg.classList.add('opacityMax');
    menu_box.classList.remove('active');
    window.setTimeout(function(){
        movetoContent(nowContent,nextContent);
    },700);
}
function OnclickBlogButton(){
    console.log('Blog');
    window.open('http://n2-freevas-blog.deca.jp/');
}
function OnclickArtifacteButton(){
    nextContent = 'artifact';
}

function OnclickContactButton(){
    console.log('Contact');
    contactbox.classList.toggle('up');

}
function OnclickBackMenuButton(){
    if (nowContent === 'profile'){
        ClockQuickSpin();
        for( let i = 0; i < profilecontents.length; i++){
            profilecontents[i].classList.remove('fadein');
        }
        for(let i = 0; i<blackmask.length; i++){
            blackmask[i].classList.remove('slideup');
            redmask[i].classList.remove('slideleft');
        }
    }
    else if (nowContent === 'create'){
        ClockSlide();
    }
    nextContent = 'menu';
    movetoContent(nowContent,nextContent);
    black_bg.classList.remove('opacityMax');
    window.setTimeout(function(){
        menu_box.classList.add('active');
    },500);
}



function ClockQuickSpin(){clockbody.classList.toggle('spin')}
function ClockSlide(){clockbody.classList.toggle('slideleft')}
//矢印キーのイベントを制御
//window.document.onkeydown = function(evt){if ((evt.which == 37)||(evt.which == 38)||(evt.which == 39)||(evt.which == 40)){ evt.which = null;return false;}}

//scrollEventManager();