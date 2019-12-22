$(function(){
    $('body').append("<div id='mom_layer'></div><div id='kids_layer'></div>");
    $("#mom_layer").click(function(){
        $(this).hide();
        $("#kids_layer").hide();
    });
    $("a.modal").click(function(){
        $("#mom_layer").show();
        $("#kids_layer").show().html("<img src='"+$(this).attr("href")+"'>");
        return false;
    });
});

$(function () {
	var box = $('.box'), link = $('.link_list li '), box_cover = $('.box_cover'), close = $('.close'), box_load = $('.box_load'), box_load_li = $('.box_load>li'), arrow_left = $('.arrow_left>.arrow_span'), arrow_rigth = $('.arrow_rigth>.arrow_span');
	// box_load内に要素を入れる 
	// ①新しい配列all_linkを作る 
	// ②link_listの中のliがいくつあるのか取ってきてforで回す
	// ③配列all_linkに171115_0.html、171115_1.html・・・のような感じで値を格納する 
	// ④box_loadの中にlink_listのliの数だけ'<li class="load_'+i+'"></li>を増やす 
	// ⑤<li class="load_'+i+'"></li>に配列all_link[i]をloadする 
	// ※load_0に対応するのはall_link[0](←配列の1番目。配列は0から始まります) 
	var all_link = new Array(), links = $('.link_list').find('li'); for (var i = 0; i < links.length; i++) { all_link[i] = '171115_' + i + '.html'; box_load.append('<li class="load_' + i + '"></li>'); $('.load_' + i).load(all_link[i]); }
	//一度box_load>liを非表示にする
	$('.box_load>li').hide();
	// linkをクリックしたとき 
	link.on('click', function () {
		//link.index(this)で、クリックされたliを指定する
		var li_index = link.index(this); $('.box_load>li').removeClass('active');
		$('.load_' + li_index).addClass('active'); $('.box_load>li').hide();
		$('.box_load >li.active').show();
		//もし.boxに「active」というクラスがあったら
		if (box.hasClass('active')) {
			box.removeClass('active');
			box_cover.removeClass('active');
			close.removeClass('active');
			$('.box_load>li').removeClass('active');
		} else {
			// もしないなら
			box.addClass('active');
			box_cover.addClass('active');
			close.addClass('active');
		}
	});
	//box_coverをクリックしたとき
	box_cover.on('click', function () {
		box.removeClass('active');
		box_cover.removeClass('active');
		close.removeClass('active');
		$('.box_load>li').removeClass('active');
	});
	//closeをクリックしたとき 
	close.on('click', function () {
		box.removeClass('active');
		box_cover.removeClass('active');
		close.removeClass('active');
		$('.box_load>li').removeClass('active');
	});
	// 矢印をクリックした時 
	// fade_speedは切り替わりの速さ
	var fade_speed = 300;
	arrow_rigth.on('click', function () {
		var load_active = $('.box_load >li.active'),
			// [right].box_load >li.activeの次のli、それがない場合は最初のliに戻る 
			right = load_active.next('li').length ? load_active.next('li') : $('.box_load >li:first');
		// .box_load >li.activeをfaceOutしてクラスを削除、 
		// [right]をfadeInしてクラスを付ける 
		$('.box_load >li.active').fadeOut(fade_speed).removeClass('active');
		right.fadeIn(fade_speed).addClass('active');
	});
	arrow_left.on('click', function () {
		var load_active = $('.box_load >li.active'),
			// [left].box_load >li.activeの前のli、それがない場合は最後のliに戻る 
			left = load_active.prev('li').length ? load_active.prev('li') : $('.box_load >li:last'); $('.box_load >li.active').fadeOut(fade_speed).removeClass('active');
		left.fadeIn(fade_speed).addClass('active');
	});
});