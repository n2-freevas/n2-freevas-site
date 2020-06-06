var ua = window.navigator.userAgent.toLowerCase()
var body = document.body;

function css_reload(){
    var createCSS = document.getElementById('createCSS');
    if(window.innerWidth >= window.innerHeight){
        console.log('YOKONAGA');
        createCSS.setAttribute('href','./css/n2freevas_create_horizontal.css')
        
    }
    else{
        console.log('TATENAGA');
        createCSS.setAttribute('href','./css/n2freevas_create_vertical.css')
    }
};



function scrollToMenu(){
    //this.document.getElementById('menu_box').scrollIntoView(true)
    this.scrollTo(0,0)
    if((ua.indexOf("android") !== -1) || (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1)) {
        console.log('Adress bar infection is avoid.');
        // documentElement.client--　で，スマホの画面上下にあるアドレスバーを無視できる．
        this.scrollTo(this.document.documentElement.clientWidth,this.document.documentElement.clientHeight)
    }
    else {
        console.log('Scrolling menu box')
        this.scrollTo(window.innerWidth,window.innerHeight)
    }
}

window.addEventListener('resize', function(){
    css_reload();
});

window.onload = function(){
    css_reload();
    var loader = document.getElementById("loader");
    var first_bg = document.getElementById('first_bg');
    var first_logo = document.getElementById('first_logo');
    var menu_box = document.getElementById('menu_box');
    var contents = document.getElementById('contents');
    var count = 0;
    
    scrollToMenu();
    

    this.setTimeout(
        function(){
            loader.classList.add('fadeout')
        },1000
    );
    this.loader.ontransitionend = function(){
        first_logo.classList.add('fadein')
    };
    this.first_bg.ontransitionend = function(){
        
        //ロゴが縮小を終え，黒背景が投下し切ったタイミング
        if(count==1){
            
            loader.classList.add('is_hide')
            first_logo.classList.add('is_hide')
            first_bg.classList.add('is_hide')
            contents.setAttribute('display','inline')
           
        }
        //ロゴがフェードインしたタイミング
        else{
            first_logo.classList.add('shrink')
            first_bg.classList.add('fadeout')
            menu_box.classList.add('active')
            count = count + 1
        }
        console.log(count)
    };
    
}



