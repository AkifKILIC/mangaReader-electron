
    
const request = require('request');
const { session } = require('electron');
var fs = require('fs');
const { WriteStream } = require('tty');


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
function loadChapter(url){
    _url = url;
    var el = document.createElement('html');
    request(options).pipe(fs.createWriteStream('src/static/db/temp.txt'));
    var fr = new XMLHttpRequest();
    fr.open('GET','static/db/temp.txt',false);
    fr.onreadystatechange = function(){
        if(fr.readyState === 4){
            if(fr.status === 200 || fr.status === 0){
                el.innerHTML = fr.responseText;
            }
        }
    }
    fr.send(null);
    var el2 = el.getElementsByClassName('container-chapter-reader');
    if(el2.length == 1){
        var el3 = el2.item(0).getElementsByTagName('img');
        newImages = startUp;
        for (i = 0; i < el3.length; i++) {
            _imgUrl = el3.item(i).getAttribute('src');
            request(options2).pipe(fs.createWriteStream('src/static/temp/imgtemp/'+'temp'+ i +'.txt'));
        }
        for (i = 0; i < el3.length; i++) {
            newImages = newImages + '<img src="'+ 'src/static/temp/imgtemp/temp'+ i +'.txt' +'" id="img'+ i +'" style="width: auto;">' ;
        }
        document.getElementById('con').innerHTML = newImages;
    }
};
var _url = 'https://manganelo.com/chapter/hyer5231574354229/chapter_1';
var _imgUrl = '';
var _refUrl = _url.replace(_url.split('/')[5], '');
const options = {
    url: _url.toString(),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
      "Referer" : _refUrl.toString()
    }
};
/*
const filter = {
    urls: ['https://manganelo.com/chapter/hyer5231574354229/chapter_1']
}
function lol(){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "https://s31.mkklcdnv6tempv2.com/mangakakalot/t1/tales_of_demons_and_gods/chapter_1_rebirth/15.jpg", true);
    oReq.setRequestHeader("referer", "https://manganelo.com/manga/hyer5231574354229");
    oReq.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125");
    // use multiple setRequestHeader calls to set multiple values
    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        var u8 = new Uint8Array(arrayBuffer);
        var b64encoded = btoa(String.fromCharCode.apply(null, u8));
        var mimetype="image/jpg"; // or whatever your image mime type is
        document.getElementById("img2").src="data:"+mimetype+";base64,"+b64encoded;
      }
    };
    oReq.send(null);
}
function lol3(){
    request(options2).pipe(fs.createWriteStream('src/static/img/temp.txt'));
    document.getElementById('con').innerHTML += '<img src="static/img/temp.txt" id="img2" style="width: auto;">' ;
    console.log('done');
}*/
const options2 = {
    url: _imgUrl.toString(),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
      "Referer" : _refUrl.toString()
    }
};