$(function(){
    　$(window).scroll(function (){
        $('.effect-fade').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight){
                $(this).addClass('effect-scroll');
            }
        });
    });
});
$(function(){
    　$(window).scroll(function (){
        $('.effect-fade-delay').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight - 300){
                $(this).addClass('effect-scroll');
            }
        });
    });
});
$(function(){
    　$(window).scroll(function (){
        $('.effect-fade-left').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight){
                $(this).addClass('effect-scroll-left');
            }
        });
    });
});
$(function(){
    　$(window).scroll(function (){
        $('.effect-fade-right').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight){
                $(this).addClass('effect-scroll-right');
            }
        });
    });
});
$(function(){
    $(".headC").click(function(){
        $(".headB").slideToggle();
    });
});