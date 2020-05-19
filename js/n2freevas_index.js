var menu_box = document.getElementById('menu_box')

// スクロール禁止
function no_scroll() {
    // PCでのスクロール禁止
    document.addEventListener("mousewheel", scroll_control, { passive: false });
    // スマホでのタッチ操作でのスクロール禁止
    document.addEventListener("touchmove", scroll_control, { passive: false });
}
// スクロール禁止解除
function return_scroll() {
    // PCでのスクロール禁止解除
    document.removeEventListener("mousewheel", scroll_control, { passive: false });
    // スマホでのタッチ操作でのスクロール禁止解除
    document.removeEventListener('touchmove', scroll_control, { passive: false });
}

// スクロール関連メソッド
function scroll_control(event) {
    event.preventDefault();
}

$(function(){
    var num = Math.ceil(5*Math.random());
    $('.body_home').addClass('body_home_bg'+num);
});

//矢印キーのイベントを制御
window.document.onkeydown = function(evt){
    if ((evt.which == 37)
    || (evt.which == 38)
    || (evt.which == 39)
    || (evt.which == 40)
    ){ evt.which = null;
    return false;}
   }


