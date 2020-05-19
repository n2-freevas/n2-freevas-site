var ua = window.navigator.userAgent.toLowerCase()
var body = document.body;




window.onload = function(){
    var loader = document.getElementById("loader");
    var first_bg = document.getElementById('first_bg');
    var first_logo = document.getElementById('first_logo');
    var menu_box = document.getElementById('menu_box');
    var contents = document.getElementById('contents');
    var count = 0;
    
    //this.document.getElementById('menu_box').scrollIntoView(true)
    this.scrollTo(0,0)
    if((ua.indexOf("android") !== -1) || (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1)) {
        console.log('Adress bar infection is avoid.');
        this.scrollTo(this.document.documentElement.innerWidth,this.document.documentElement.innerHeight)
    }
    else {
        console.log('Scrolling menu box')
        this.scrollTo(window.innerWidth,window.innerHeight)
    }
    

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



