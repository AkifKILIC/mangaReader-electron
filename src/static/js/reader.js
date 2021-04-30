const puppeteer = require('puppeteer');
var chapterPageLeft = document.getElementById("left");
var chapterPageRight = document.getElementById("right");

function chapterLeft(){
    console.log("left");
};
function chapterRight(){
    console.log("right");
};
function loadChapter(){
    var lol = fetch("https://manganelo.com/chapter/hyer5231574354229/chapter_1");
    
    alert(lol.toString());
};
async function scrapeProuct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
}