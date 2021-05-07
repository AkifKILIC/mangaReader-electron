
const { session } = require('electron');
const fs = require('fs');
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
var elText = '';
async function getTextFromStream(readableStream) {
    let reader = readableStream.getReader();
    let utf8Decoder = new TextDecoder();
    let nextChunk;
    
    let resultStr = '';
    
    while (!(nextChunk = await reader.read()).done) {
        let partialData = nextChunk.value;
        resultStr += utf8Decoder.decode(partialData);
    }
    
    return resultStr;
}
async function loadChapter(url){
    options.url = url;
    var el = document.createElement('html');
    let response =  await fetch(url,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
            'Referer' : _refUrl
        }
    });
    let responseText = await getTextFromStream(response.body);
    el.innerHTML = responseText;
    fs.readFile('src/static/temp/temp.txt', 'utf-8');
    el.innerHTML = elText.toString(6);
    var el2 = el.getElementsByClassName('container-chapter-reader');
    if(el2.length == 1){
        var el3 = el2.item(0).getElementsByTagName('img');
        newImages = startUp;
        options2.headers.Referer = url.replace(_url.split('/')[5], '');
        for (i = 0; i < el3.length; i++) {
            options2.url = el3.item(i).getAttribute('src');
            request(options2).pipe(fs.createWriteStream('src/static/temp/imgtemp/temp'+ i +'.txt'));
            newImages = newImages + '<img src="'+ 'static/temp/imgtemp/temp'+ i +'.txt' +'" id="img'+ i +'" style="width: auto;">';
        }
        document.getElementById('con').innerHTML = newImages;
        /*for(i = 0; i < el3.length; i++){
            fs.unlink('src/static/temp/imgtemp/temp'+ i +'.txt', (err) => {
                if(err){
                    alert(err);
                    throw err;
                }
            });
        }
    }else{
        console.error('el2 has no element!!!');
    }
    fs.unlink('src/static/temp/temp.txt', (err) => {
        if(err){
            alert(err);
            throw err;
        }
    })*/
}
function rQuest(option,path){
    request(option).pipe(fs.createWriteStream(path));
}
function readFile(path){

}
var _url = 'https://manganelo.com/chapter/hyer5231574354229/chapter_1';
var _imgUrl = '';
var _refUrl = _url.replace(_url.split('/')[5], '');
const options = {
    url: _url.toString(),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125'
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
