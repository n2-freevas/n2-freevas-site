$(window).on('load', function(){
    $('body').removeClass('fo');
});

$(function(){
    var num = Math.ceil(5*Math.random());
    $('.body_home').addClass('body_home_bg'+num);
});

