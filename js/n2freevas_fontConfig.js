var ua = window.navigator.userAgent.toLowerCase()
var body = document.body;


if(ua.indexOf('windows nt') !== -1){
    console.log('This user used to Microsoft windows');
}
else if(ua.indexOf("android") !== -1) {
    console.log('This user used to Android');
}
else if(ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
    console.log("This user used to iOS");
}
else if(ua.indexOf("mac os x") !== -1) {
    console.log("This user used to Mac OS");
    body.style.fontWeight = 'bold';
}
else {
    console.log("This user used to unknown OS");
}
