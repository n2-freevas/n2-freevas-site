const menu_box = document.getElementById('menu_box');
const bg_clock = document.getElementById('bg_clock');
const times = document.getElementsByClassName('time');
const insidewheel = document.getElementById('insidewheel')
const clockbody = document.getElementById('clockbody');
const profilecontents = document.getElementsByClassName('profilecontent');
const blackmask = document.getElementsByClassName('blackmask');
const redmask = document.getElementsByClassName('redmask');
const menu = document.getElementById('menu');
const profile = document.getElementById('profile');
const create = document.getElementById('create');
const contact = document.getElementById('contact');
const contact_bg = document.getElementById('contact_bg');
const window_mask = document.getElementById('window_mask');
const window_mask2 = document.getElementById('window_mask2');
const window_mask_tp = document.getElementById('window_mask_transparent');
const mask = document.getElementById('mask');
var scrolling = true;

var nowContent = menu
var nextContent = null;

//スクロールステータス
var speed = 1; //スピード
var move = 20; //なめらかさ
var upscroll = true /* true: 上へ移動するor左へ移動する   /  false: その逆 */
var index = 0;
var scrollarraylen = 0;
var scrollarray = new Array();
var processing = false;

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
    背景ランダム配置
*/
$(function(){
    var num = Math.ceil(5*Math.random());
    $('#red-background').addClass('red_bg'+num);
});

//アプリケーションボタン関連イベント
function OnclickProfileButton(){
    if (scrolling){
        scrolling = false;
        processing = true;
        nextContent = profile;
        ClockQuickSpin();
        menu_box.classList.remove('active');
        
        window.setTimeout(function(){
            contents_vert_down();
        },600);

        for( let i = 0; i < profilecontents.length; i++){
            window.setTimeout(() => {
                profilecontents[i].classList.add('fadein');
            }, 1800+i*500);
        }
        for(let i = 0; i<blackmask.length; i++)
        window.setTimeout(()=>{
            blackmask[i].classList.add('slideup');
            redmask[i].classList.add('slideleft');
        },1200);
    }
    
}

function OnclickCreateButton(){
    if (scrolling){
        scrolling = false;
        nextContent = create;
        ClockSlide();
        menu_box.classList.remove('active');
        window.setTimeout(()=>{window_mask2.classList.add('slidein');},400)
        window.setTimeout(()=>{window_mask.classList.add('slidein');},600)
        window.setTimeout(()=>{window_mask.classList.add('shrink');},1500)
        window.setTimeout(()=>{window_mask2.classList.add('shrink');},1600)
        window.setTimeout(()=>{contents_hori_left();},500);
    }
}
function OnclickBlogButton(){
    window.open('http://n2-freevas-blog.deca.jp/');
}

function OnclickCArtifactButton(){
    menu_box.classList.remove('active');
    window.setTimeout(()=>{menu.classList.add('transparent');},500);
    window.setTimeout(()=>{clockbody.classList.add('showmove');},700);
    window.setTimeout(()=>{window_mask_tp.classList.add('slidein');},1300);
}
function OnclickArtifactTransparent(){
    window_mask_tp.classList.remove('slidein');
    clockbody.classList.remove('showmove');
    window.setTimeout(()=>{menu.classList.remove('transparent');},500);
    window.setTimeout(()=>{menu_box.classList.add('active');},1000);
}
function OnclickContactButton(){
    contact.classList.toggle('contact_up');
    contact_bg.classList.toggle('popup');
}
function OnclickBackMenuButton(){
    if (scrolling){
        scrolling = false;
        nextContent = menu;
        if (nowContent === profile){
            ClockQuickSpin();
            contents_vert_up();
            for( let i = 0; i < profilecontents.length; i++){
                profilecontents[i].classList.remove('fadein');
            }
            for(let i = 0; i<blackmask.length; i++){
                blackmask[i].classList.remove('slideup');
                redmask[i].classList.remove('slideleft');
            }
            // border reborn
            window.setTimeout(function(){menu_box.classList.add('active');},800);
        }
        else if (nowContent === create){
            ClockSlide();
            window_mask2.classList.remove('shrink');
            window.setTimeout(()=>{window_mask.classList.remove('shrink');},200);
            window.setTimeout(()=>{contents_hori_right();},400);
            window.setTimeout(()=>{window_mask.classList.remove('slidein');},700);
            window.setTimeout(()=>{window_mask2.classList.remove('slidein');},900);
            // border reborn
            window.setTimeout(function(){menu_box.classList.add('active');},1500);
        }
        
    }
}


function contents_vert_up(){
    nowContent.classList.add('top'); //now
    window.setTimeout(()=>{
        nextContent.classList.remove('bottom'); //next
    },400);
    state_reset();
}
    
function contents_vert_down(){
    nowContent.classList.add('bottom'); //now
    window.setTimeout(()=>{
        nextContent.classList.remove('top'); //next
    },400);
    state_reset();
};
function contents_hori_left(){
    nowContent.classList.add('left'); //now
    window.setTimeout(()=>{
        nextContent.classList.remove('right'); //next
    },500);
    state_reset();
};
function contents_hori_right(){
    nowContent.classList.add('right'); //now
    window.setTimeout(()=>{
        nextContent.classList.remove('left'); //next
    },500);
    state_reset();
};

function state_reset(){
    nowContent = nextContent;
    scrolling = true;
};

function ClockQuickSpin(){
    if(nowContent === menu){
        insidewheel.classList.toggle('spin');
        for(let i=0; i< times.length;i++){
            window.setTimeout(()=>{
                times[i].classList.toggle('spin');
            },200+i*50);
        };
        window.setTimeout(()=>{
            clockbody.classList.toggle('spin');
        },400);
    }
    else{
        insidewheel.classList.toggle('spin');
        for(let i=0; i< times.length;i++){
            window.setTimeout(()=>{
                times[i].classList.toggle('spin');
            },500+i*200);
        };
        window.setTimeout(()=>{
            clockbody.classList.toggle('spin');
        },1500);
    }
}
    
    
function ClockSlide(){clockbody.classList.toggle('slideleft')}
//矢印キーのイベントを制御
window.document.onkeydown = function(evt){if ((evt.which == 37)||(evt.which == 38)||(evt.which == 39)||(evt.which == 40)){ evt.which = null;return false;}}
