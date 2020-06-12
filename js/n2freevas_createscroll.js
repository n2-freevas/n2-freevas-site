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
const cd_flame = document.getElementById('cd_flame');
const sq_prog = document.getElementById('sequencebar');
const sq_ratio = document.getElementById('sequenceratio');
const jnc = document.getElementById('jnc');
const jumpnextcontent = document.getElementById('jumpnextcontent');
var create_detail = document.getElementById('create_detail1');
const create = document.getElementById('create')

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
window.addEventListener('resize', function(){setScrollstatus();set_cd_Scrollstartus()});


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
    nowSection = Math.ceil(($('#portfolioscroll').scrollTop() / one_content_height) + 0.5);
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
// start, cd_text1 ,cd_text2, ...... cd_text(N-1)
const cd1_control = [0,1,2,3,4,5,5,5,6];
const cd2_control = [0,1,2,2,3];
const cd3_control = [0,0,0,0,0,0,0,0,0,0,0];
const cd5_control = [0,1,2,3,4,5,6];
var cd_control = cd1_control;
var cd_LCR = create_detail.children;
var cd_C = cd_LCR[1].children;
var cd_R = cd_LCR[2].children;
var numof_image = 0;
var nowImage = 0;
var preImage = 0;
var cd_scroll_margin = 0;
var cd_box_height = 0
var over_scroll_counter = 0
var cd_scroll = cd_LCR[2].scrollHeight;
var jnc_str = '';
var timeoutId ;

function set_cd_Scrollstartus(){
    cd_scroll_margin = cd_LCR[2].scrollHeight - cd_LCR[2].clientHeight;
    cd_box_height = cd_R[0].clientHeight;
}

function content_access(event){
    if(nowSection-1 == 3){
        window.open('http://n2-freevas-blog.deca.jp/2020/06/01/developed-kotodaman-support-tool/');
    }
    else{
        var openSection = 'create_detail'+String(((nowSection-1)%numof_content) + 1);
        create_detail = document.getElementById(openSection);
        if((nowSection-1)%numof_content == 0){cd_control = cd1_control}
        else if((nowSection-1)%numof_content == 1){cd_control = cd2_control}
        else if((nowSection-1)%numof_content == 2){cd_control = cd3_control}
        else if((nowSection-1)%numof_content == 4){cd_control = cd5_control}
        else{console.log('fuck error')}
        cd_LCR = create_detail.children;cd_C = cd_LCR[1].children;cd_R = cd_LCR[2].children;
        numof_image = cd_R.length - 1;cd_text_index = 0;
        $(cd_LCR[2]).scrollTop(0);
        cd_scroll_margin = cd_LCR[2].scrollHeight - (cd_LCR[2].clientHeight*1.75);
        cd_box_height = cd_R[0].clientHeight;
        preImage = 0;
        cd_LCR[2].addEventListener("touchmove", cd_scrollController, { passive: true });
        // PCでのスクロール制御
        if(userBrowser==='firefox'){cd_LCR[2].addEventListener('DOMMouseScroll',cd_scrollController,{ passive: true });}
        else{cd_LCR[2].addEventListener("mousewheel", cd_scrollController,{ passive: true });}
        cd_LCR[2].addEventListener('click',cd_closeup,{passive:true})
        //animation sequence
        detail_mask.classList.add('slide');detail_mask2.classList.add('slide');create_detail.classList.remove('bottom');
        window.setTimeout(()=>{cd_flame.classList.remove('bottom');detail_mask.classList.add('shrink');detail_mask2.classList.add('shrink');create.classList.add('hidden')},500);}
}

function backtoCreates(){
    create.classList.remove('hidden');detail_mask.classList.remove('shrink');detail_mask2.classList.remove('shrink');create_detail.classList.add('bottom');
    window.setTimeout(()=>{cd_flame.classList.add('bottom');detail_mask.classList.remove('slide');detail_mask2.classList.remove('slide');},500);
    cd_LCR[2].removeEventListener("touchmove", cd_scrollController, { passive: true });
    // PCでのスクロール制御
    if(userBrowser==='firefox'){cd_LCR[2].removeEventListener('DOMMouseScroll',cd_scrollController,{ passive: true });}
    else{cd_LCR[2].removeEventListener("mousewheel", cd_scrollController,{ passive: true });}
    cd_LCR[2].removeEventListener('click',cd_closeup,{passive:true});
    reset_cd_flame();
}

function cd_scrollController(){
    if ( timeoutId ) return ;

    timeoutId = setTimeout( function () {
        timeoutId = 0 ;

        ns = $(cd_LCR[2]).scrollTop()
        nowImage = Math.floor((ns / cd_box_height) + 0.65);
        
        if((nowImage != preImage)&&(numof_image > nowImage)){
            cd_R[nowImage].children[0].classList.remove('fil');
            cd_R[preImage].children[0].classList.add('fil');
            
            if(cd_control[nowImage] != cd_control[preImage]){
                cd_C[cd_control[nowImage]].classList.add('show');
                cd_C[cd_control[preImage]].classList.remove('show');
            }
            preImage = nowImage;
        }
        let sq_str = '';
        sq_val = Math.floor((ns * 20) / cd_scroll_margin);
        if (sq_val > 20){sq_val = 20;};
        sq_str = 'Progress:';
        for (let i = 0; i<sq_val;i++){
            sq_str += '|';
        }
        
        sq_prog.innerText = sq_str;
        sq_str = '';
        sq_val = Math.floor((ns * 100) / cd_scroll_margin);
        if (sq_val > 100){sq_val = 100;};
        sq_str += ':'+ String(sq_val);
        sq_str += '%';
        sq_ratio.innerText = sq_str;
        
        if($(cd_LCR[2]).scrollTop() >= cd_scroll_margin){
            jumpnextcontent.classList.add('show');
            over_scroll_counter += 1;
            sq_val = Math.floor((1/5)*over_scroll_counter);
            jnc_str='';
            for (let i = 0; i<sq_val;i++){
                jnc_str += '*';
            }
            jnc.innerText = jnc_str;
            
            if(over_scroll_counter >35){
                nowSection = (nowSection%numof_content)+1
                reset_cd_flame();
                detail_mask.classList.remove('shrink');detail_mask2.classList.remove('shrink');create_detail.classList.add('bottom');
                window.setTimeout(()=>{if(nowSection == 4){nowSection = 5;alert('Content 4/5 will be skip. If you want to look it, BACK to create-menu.');}content_access()},700);
            }
        }
        else{
            over_scroll_counter = 0;
            jumpnextcontent.classList.remove('show');
        }
    }, 50 ) ;
    
}
function cd_closeup(){
    cd_LCR[2].classList.toggle('closeup');
    
}
function reset_cd_flame(){
    over_scroll_counter = 0;
            sq_ratio.innerText = 'Progress:';
            sq_ratio.innerText = ':0%';
            jumpnextcontent.classList.remove('show');
}
scrollEventManager();