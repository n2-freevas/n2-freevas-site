$(function(){
    　$(window).scroll(function (){
        $('.effect-fade').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 150){
                $('body').stop().animate({backgroundColor: '#b40000'},100);
                $(this).addClass('effect-scroll');
            }
        });
    });
});


$(function(){
    $(".headC").click(function(){
        $(".headB").slideToggle();
    });
});