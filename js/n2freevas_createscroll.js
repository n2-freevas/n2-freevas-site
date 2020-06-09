/*
    Createギャラリーの高度なスクロール制御プロトコル
*/
const numeratorClasses = document.getElementsByClassName('numerator');
const c_title = document.getElementsByClassName('c_title');
const create_wheel = document.getElementById('create_wheel');
const childs = document.getElementsByClassName('child');
const creates = document.getElementById('portfolioscroll');
const detail_mask = document.getElementById('detail_mask');
const detail_mask2 = document.getElementById('detail_mask2');
const create_detail = document.getElementById('create_detail');


var nowSection = 1;
var preSection = 1;

var scroll_height = 0
var scroll_margin = 0
var one_content_height = 0



numof_content = Math.floor(creates.scrollHeight / creates.clientHeight) - 1;
console.log(numof_content)


function setScrollstatus(){
    var createCSS = document.getElementById('createCSS');
    if(window.innerWidth >= window.innerHeight){
        console.log('YOKONAGA');
        createCSS.setAttribute('href','./css/n2freevas_create_horizontal.css');
        one_content_height = window.innerHeight;
    }
    else{
        console.log('TATENAGA');
        createCSS.setAttribute('href','./css/n2freevas_create_vertical.css');
        one_content_height = creates.clientHeight;
    }
    scroll_height = one_content_height * (numof_content + 1);
    scroll_margin = scroll_height - one_content_height;
    console.log(one_content_height);
    console.log(scroll_height);
    console.log(scroll_margin);
}
window.addEventListener('resize', function(){setScrollstatus()});


// スクロール禁止
function scrollEventManager() {
    
    setScrollstatus();

    $('#portfolioscroll').scrollTop(10);
    // スマホでのタッチ操作でのスクロール制御
    creates.addEventListener("touchmove", scroll_control, { passive: true });
    // PCでのスクロール制御
    if(userBrowser==='firefox'){
        creates.addEventListener('DOMMouseScroll',scroll_control,{ passive: true });
    }
    else{
        creates.addEventListener("mousewheel", scroll_control,{ passive: true });
    }
    creates.addEventListener('click',content_access,{passive:true})
    
    // firefoxカスのためのスクロール制御
}

// スクロール関連メソッド
function scroll_control(event){
    
    //スクロール位置に応じてnumeratorにshowをつけたりとったりする
    var val = $('#portfolioscroll').scrollTop() / one_content_height;
    nowSection = Math.ceil(val + 0.5);
    if((nowSection != preSection)&&(nowSection != 0)){
        create_wheel.classList.add('spin');
        window.setTimeout(()=>{
            create_wheel.classList.remove('spin');
        },1000);
        numeratorClasses[(preSection-1)%numof_content].classList.remove('show');
        numeratorClasses[(nowSection-1)%numof_content].classList.add('show');
        c_title[(preSection-1)%numof_content].classList.remove('show')
        c_title[(nowSection-1)%numof_content].classList.add('show');
        childs[(preSection-1)].classList.add('fil');
        childs[(nowSection-1)].classList.remove('fil');
        
        //先頭とケツにいる辻褄合わせを同期する
        if((preSection == 6)&&(nowSection != 1)){childs[0].classList.add('fil');}
        if((preSection == 1)&&(nowSection != 6)){childs[numof_content].classList.add('fil');}
        if(nowSection == 1){childs[numof_content].classList.remove('fil');}
        if(nowSection == 6){childs[0].classList.remove('fil');}
        

        preSection = nowSection;
    }

    if($('#portfolioscroll').scrollTop() <= 0){
        $('#portfolioscroll').scrollTop(scroll_margin-3);
    }
    if($('#portfolioscroll').scrollTop() == scroll_margin){
        $('#portfolioscroll').scrollTop(3);
    }
}

function content_access(event){
    $.getJSON('./n2freevas_create.json',function(data){
        console.log(data[0]['title'])
    })

    detail_mask.classList.add('slide');
    detail_mask2.classList.add('slide');
    create_detail.classList.remove('bottom');
    window.setTimeout(()=>{
        detail_mask.classList.add('shrink');
        detail_mask2.classList.add('shrink');
    },500);
}

function backtoCreates(){
    detail_mask.classList.remove('shrink');
    detail_mask2.classList.remove('shrink');
    create_detail.classList.add('bottom');
    window.setTimeout(()=>{
        detail_mask.classList.remove('slide');
        detail_mask2.classList.remove('slide');
    },500);
}
scrollEventManager();