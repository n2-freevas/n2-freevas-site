$(window).on('load', function(){
    $('body').removeClass('fo');
});
$('#button').on({
    
    'mouseover':function(){
        alert("over");
    },
    'mouseleave':function(){
        alert("leave")
    }
});
/*
$(function(){
    $('a:not([href^="#"]):not([target])').on('click', function(e){
        e.preventDefeat();
        url = $(this).attr('href');
        if(url !== ''){
            $('body').addClass('fadeout');
            setTimeout(function(){
                window.location = 'url';
            },800);
        }
        return false;
    });
});
*/
$(function(){
    var num = Math.ceil(5*Math.random());
    $('.body_home').addClass('body_home_bg'+num);
});

