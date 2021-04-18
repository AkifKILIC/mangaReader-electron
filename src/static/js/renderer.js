const remote = require('electron').remote;
const db = require('better-sqlite3')('src/static/db/db.db');

const win = remote.getCurrentWindow();
 /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}
function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
const sol1 = document.getElementById('sol1');
const sol2 = document.getElementById('sol2');
const leftBarButton = document.getElementById('leftBarButton');
const buttonIcon = document.getElementById('buttonicon');
const verticalMenu = document.getElementById('verticalMenu');
state = true;
const page1 = document.getElementById('p1');
const page2 = document.getElementById('p2');
const page3 = document.getElementById('p3');
const page4 = document.getElementById('p4');
function page(tab) { //*** For Tabs to Work for Content Change ***
    if(tab == 'mangakakalot'){
        pageStructure('mangakakalot',1);
        document.getElementById("content").innerHTML = fullPage;
        document.getElementById("content").innerHTML.replace('undefined' , '');
        console.log('Page = Mangakakalot');
        tabActiveToggle(page1);
    }
    if(tab == 'mangaoku'){
        readTextFile("mangaoku.html");
        document.getElementById("content").innerHTML = inner;
        document.getElementById("content").innerHTML.replace('undefined' , '');
        console.log('Page = MangaOku');
        tabActiveToggle(page2);
    }
    if(tab == 'manytoon'){
        readTextFile("manytoon.html");
        document.getElementById("content").innerHTML = inner;
        console.log('Page = ManyToon');
        tabActiveToggle(page3);
    }
    if(tab == 'readerdemo'){
        readTextFile("readerdemo.html");
        document.getElementById("content").innerHTML = inner;
        console.log('Page = ReaderDemo');
        tabActiveToggle(page4);
    }
}
var fullPage = "";
function pageStructure(tab,page){
    var lastManga = 24 * page;
    var firstManga = lastManga - 24 + 1;
    if(tab == 'mangakakalot'){
        for (i = firstManga; i <= lastManga; i++) {
        const row = db.prepare('SELECT * FROM MangakakalotHot WHERE id = ?').get(i);
        readTextFile("mangakakalot.html");
        var inner1 = inner;
        var inner2 = inner1.replace('taytil',row.name);
        var inner3 = inner2.replace('image',row.image);
        var inner4 = inner3.replace( /haref/g ,row.href);
        var inner5 = inner4.replace( /content/g ,row.content);
        fullPage = fullPage + inner5;
      }
    }
    if(tab == 'mangaoku'){
        readTextFile("mangaoku.html");
        document.getElementById("content").innerHTML = inner;
        console.log('Page = MangaOku');
        tabActiveToggle(page2);
    }
    if(tab == 'manytoon'){
        readTextFile("manytoon.html");
        document.getElementById("content").innerHTML = inner;
        console.log('Page = ManyToon');
        tabActiveToggle(page3);
    }
    if(tab == 'readerdemo'){
        readTextFile("readerdemo.html");
        document.getElementById("content").innerHTML = inner;
        console.log('Page = ReaderDemo');
        tabActiveToggle(page4);
    }
}

function tabActiveToggle(b1){
    if(page1.classList.contains('active')){page1.classList.remove('active');}
    if(page2.classList.contains('active')){page2.classList.remove('active');}
    if(page3.classList.contains('active')){page3.classList.remove('active');}
    if(page4.classList.contains('active')){page4.classList.remove('active');}
    b1.classList.add('active');
}
function tabDisable(){
    page1.classList.toggle('disabled');
    page2.classList.toggle('disabled');
    page3.classList.toggle('disabled');
    page4.classList.toggle('disabled');
}
function leftBarState() {
    tabDisable();
    if(state){
        if(sol1.classList.contains('solTwo')){
            sol1.style.width = '95px';
            sol2.style.width = '95px';
            sol1.classList.remove('solTwo');
            sol2.classList.remove('solTwo');
        }
        sol1.classList.add('sol');
        sol2.classList.add('sol');
    console.log('Didit');
    state = !state;
        if(leftBarButton.classList.contains('deActives')){
            leftBarButton.classList.remove('deActives');
            leftBarButton.classList.add('actives');

        }else{
            leftBarButton.classList.add('actives');
        }
        if(verticalMenu.classList.contains('fadeout')){
            verticalMenu.classList.remove('fadeout');
            verticalMenu.classList.add('fadein');
        }else{
            verticalMenu.classList.add('fadein');
        }

        buttonIcon.classList.remove('fa-2x');
        buttonIcon.classList.add('fa-1x');
    }else{
        sol1.style.width = '250px';
        sol2.style.width = '250px';
        if(sol1.classList.contains('sol')){
            sol1.classList.remove('sol');
            sol2.classList.remove('sol');
        }
        sol1.classList.add('solTwo');
        sol2.classList.add('solTwo');
        console.log('Diditreverse');
        state = !state;    
        if(leftBarButton.classList.contains('actives')){
            leftBarButton.classList.remove('actives');
            leftBarButton.classList.add('deActives');
        }else{
            leftBarButton.classList.add('deActives');
        }
        buttonIcon.classList.remove('fa-1x');
        buttonIcon.classList.add('fa-2x');
        if(verticalMenu.classList.contains('fadein')){
            verticalMenu.classList.remove('fadein');
            verticalMenu.classList.add('fadeout');
        }else{
            verticalMenu.classList.add('fadeout');
        }
    }
}
var inner;
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                inner = allText;
            }
        }
    }
    rawFile.send(null);
}
function data(){
    const row = db.prepare('SELECT * FROM MangakakalotHot WHERE id = ?').get(0);
    console.log(row.id, row.name);
}
/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); //! For Sleep Time
}
*/
