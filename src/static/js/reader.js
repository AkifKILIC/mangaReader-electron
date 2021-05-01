
    
const request = require('request');

var chapterPageLeft = document.getElementById("left");
var chapterPageRight = document.getElementById("right");
function chapterLeft(){
    console.log("left");
};
function chapterRight(){
    console.log("right");
};
var startUp = '<div class="col nopad page-left" id="left" onclick="chapterLeft()"></div><div class="col nopad page-right" id="right" onclick="chapterRight()"></div>';
function loadChapter(){
    if(_body == null || _body == ''){
        request(options,callback);
    }else{
        var el = document.createElement('html');
        el.innerHTML = _body;
        var el2 = el.getElementsByClassName('container-chapter-reader');
        var el3 = el2[0];
        var el4 = el3.children();
        var newImages = startUp;
        //el3.forEach(element => {
        //    newImages = newImages + '<img src="' + element
        //});
        console.log(el4);
    }
};
var _body;
var _url = 'https://manganelo.com/chapter/hyer5231574354229/chapter_1';
const options = {
    url: _url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125'
    }
};
function callback(error, response, body){
    if(!error && response.statusCode == 200){
        _body = body;
    }
};