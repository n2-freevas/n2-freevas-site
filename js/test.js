var jsonfile = './n2freevas_create.json';
var request = new XMLHttpRequest();

request.open('GET',jsonfile);
request.responseType = 'json';
request.send();

request.onload = function() {
    var json = request.response;
    console.log(json[0]["title"])
  }