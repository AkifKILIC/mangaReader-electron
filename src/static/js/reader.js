
const { session } = require('electron');
const fs = require('fs');
const { WriteStream } = require('tty');


var chapterPageLeft = document.getElementById("left");
var chapterPageRight = document.getElementById("right");
var _url = 'https://manganelo.com/chapter/hyer5231574354229/chapter_1';
var _imgUrl = '';
var _refUrl = _url.replace(_url.split('/')[5], '');
var startUp = '<div class="col nopad page-left" id="left" onclick="chapterLeft()"></div><div class="col nopad page-right" id="right" onclick="chapterRight()"></div>';
var newImages = '';
var elText = '';

function chapterLeft(){
    console.log("left");
};

function chapterRight(){
    console.log("right");
};
async function lod(){
    var outside;
    let promise = fetch('https://s7.mkklcdnv6tempv3.com/mangakakalot/r1/read_hajime_no_ippo_manga/chapter_1/1.jpg',
    {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
            'referer' : 'https://mangakakalot.com/'
        },
        referer: 'https://mangakakalot.com/'
    });
    console.log(promise);
}
async function loadChapter(url){
    _url = url;
    var el = document.createElement('html');
    let response =  await fetch(url,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
            'Referer' : _refUrl
        }
    });
    let responseText = await getTextFromStream(response.body);
    el.innerHTML = responseText;
    var el2 = el.getElementsByClassName('container-chapter-reader');
    if(el2.length == 1){
        var el3 = el2.item(0).getElementsByTagName('img');
        newImages = startUp;
        options2.headers.Referer = url.replace(_url.split('/')[5], '');
        for (i = (el3.length - 1); i >= 0 ; i--) {
            newImages = newImages + '<img src="'+ el3.item(i).getAttribute('src') +'" id="img'+ i +'" style="width: auto;">';
        }
        document.getElementById('con').innerHTML = newImages;
    }else{
        console.error('el2 has no element!!!');
    }
}

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
