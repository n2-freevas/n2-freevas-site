var birthday = new Date(1996,09,30,0,26,29); //誕生日の時間情報を生成
var birthtime = Math.ceil(birthday.getTime()/1000); //誕生日の絶対時間を計算
var now = new Date();           //現在の時間情報ゲット
var nowtime = Math.ceil(now.getTime()/1000);    //現在の絶対時間を計算

//絶対経過時間を計算(これが自身が誕生してからの経過時間(s)となる)
var passtime = nowtime - birthtime;


var age = 0 //年齢
var birthyear = birthday.getFullYear(); //
var nowyear = now.getFullYear();

do{
    if ( ( (birthyear%4 == 0)&&(birthyear%100 != 0) ) || (birthyear%400 == 0) ){
        passtime -= 31536000;
        if (passtime >= 0){
            age += 1;
        }
        else{
            passtime += 31536000;
        }
    }
    else{
        passtime -= 31622400;
        if (passtime >= 0){
            age += 1;
        }
        else{
            passtime += 31622400;
        }
    }
    birthyear += 1;
}while(birthyear < nowyear);

var day = 0;
do{
    passtime -= 86400
    if (passtime >= 0){
        day += 1;
    }
    else{
        passtime += 86400
    }

}while(passtime >= 86400)

var ageid = document.getElementById('age');
var passtimeid = document.getElementById('passtime');
ageid.insertAdjacentHTML('afterbegin','Age : '+age+' ')
passtimeid.insertAdjacentHTML('afterbegin',' ( + ' + day +'[day] + '+ passtime+ '[sec])')
