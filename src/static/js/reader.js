const remote = require('electron').remote;
const db = require('better-sqlite3')('src/static/db/db.db');

const win = remote.getCurrentWindow();

var chapterPageLeft = document.getElementById("left");
var chapterPageRight = document.getElementById("right");

chapterPageLeft.addEventListener("click" , function(){
    console.log("left");
});
chapterPageRight.addEventListener("click" , function(){
    console.log("right");
});