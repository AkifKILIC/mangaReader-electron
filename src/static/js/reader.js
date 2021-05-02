
    
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
var newImages = '';
function loadChapter(){
    request(options,callback);
    sleep(500);
    var el = document.createElement('html');
    el.innerHTML = _body;
    var el2 = el.getElementsByClassName('container-chapter-reader');
    if(el2.length == 1){
        var el3 = el2.item(0).getElementsByTagName('img');
        newImages = startUp;
        for (i = 0; i < cars.length; i++) {
            newImages = newImages + '<img src="' + el3.item(i).getAttribute('src') + '" id="img'+ i +'" style="width: auto;">' ;
        }
        document.getElementById('con').innerHTML = newImages;
    }else{
        loadChapter();
    }
    //el3.forEach(element => {
    //    newImages = newImages + '<img src="' + element
    //});
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