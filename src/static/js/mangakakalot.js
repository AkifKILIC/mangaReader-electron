var currentPage = 1;
var fullPage = "";
var pageContent = document.getElementById("content");

function pageStructure(tab,page) {  // TODO: Make it look Nice 
    currentPage = page;
    var lastManga = 24 * page;
    var firstManga = lastManga - 24 + 1;
    pageContent.innerHTML = "";
    fullPage = '';
    if(tab == 'mangakakalot'){
        for (i = firstManga; i <= lastManga; i++) {
            if(i < (parseInt(lastPage.id) + 1)){
            const row = db.prepare('SELECT * FROM MangakakalotHot WHERE id = ?').get(i);
            var inner1 = readTextFile("mangakakalot.html");
            var inner2 = inner1.replace('taytil',row.name);
            var inner3 = inner2.replace('image',row.image);
            var hrefF = "toggleModal('" + row.href + "')";
            var inner4 = inner3.replace( /haref/g ,hrefF);
            var inner5 = inner4.replace( /content/g ,row.content);
            if(row.updated == 1){
                var inner6 = inner5.replace(/gorunurluk/g , '100%');
                fullPage = fullPage + inner6;
            }else{
                var inner6 = inner5.replace(/gorunurluk/g , '0%');
                fullPage = fullPage + inner6;
            }
            pageContent.innerHTML = fullPage;
            }
        }      
            if(pageContent.classList.contains('MangaorReader')){
            }else{
                pageContent.classList.add('MangaorReader');
            }
            pageOrder();
    }
    if(tab == 'mangaoku'){
        
        document.getElementById("content").innerHTML = readTextFile("mangaoku.html");
        console.log('Page = MangaOku');
        document.getElementById("content").getAttribute("style").value = "";
        tabActiveToggle(page2);
    }
    if(tab == 'manytoon'){
        document.getElementById("content").innerHTML = readTextFile("manytoon.html");
        console.log('Page = ManyToon');
        tabActiveToggle(page3);
    }
    if(tab == 'readerdemo'){
             
        if(pageContent.classList.contains('MangaorReader')){
            pageContent.classList.remove('MangaorReader');
        }
        document.getElementById("content").innerHTML = readTextFile("readerdemo.html"); 
        console.log('Page = ReaderDemo');
        tabActiveToggle(page4);
    }
}
async function chapterToReader(url){
    document.getElementById("content").innerHTML = readTextFile("readerdemo.html");
    console.log('Page = ReaderDemo');
    var lol = await tabActiveToggle(page4);
    document.getElementById('pagination').style.cssText = 'opacity : 0%;';
    loadChapter(url);
}
function pageChange(current){
    if(current == 'first'){
        if(min != currentPage){
         pageStructure('mangakakalot',1);
         cur = 1;
        }
    };
    if(current == 'minusx'){
        if(min != currentPage){
         pageStructure('mangakakalot',min);
         cur--;
        }
    };
    if(current == 'x'){
        if(cur != currentPage){
            pageStructure('mangakakalot',cur);
        }
    };
    if(current == 'plusx'){
         if(max != currentPage){
            pageStructure('mangakakalot',max);
            cur++;
        }
    };
    if(current == 'last'){
         if(max != currentPage){
            pageStructure('mangakakalot',lastPageInt);
            cur = lastPageInt;
        }
    };
    pageOrder();
}
var min = 1;
var cur = 2;
var max = 3;
var lastPage = db.prepare('SELECT * FROM MangakakalotHot ORDER BY ID DESC LIMIT 1').get();
var lastPageInt = Math.ceil(parseInt(lastPage.id)/24);

function pageOrder(){
    minText = min.toString();
    curText = cur.toString();
    maxText = max.toString();
    if(currentPage == 1) {
            min = 1;
            cur = 2;
            max = 3;
    };
    if(currentPage != 1 && currentPage != lastPageInt) {
            min = currentPage - 1;
            cur = currentPage;
            max = currentPage + 1; 
    };
    if(currentPage == lastPageInt) {
            min = lastPageInt - 2;
            cur = lastPageInt - 1;
            max = lastPageInt;
    };
    document.getElementById('pageFirst').innerText = min.toString();
    document.getElementById('pageCur').innerText = cur.toString();
    document.getElementById('pageLast').innerText = max.toString();
    for(i = 0; i < pagination.length; i++){
        if(pagination[i].classList.contains('active')){
          pagination[i].classList.remove('active');
        };
        if(pagination[i].firstChild.innerHTML == currentPage){
          pagination[i].classList.add('active');
        };
    };
}


var pageInput = document.getElementById('pageSearch');
pageInput.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        pageStructure('mangakakalot',parseInt(document.querySelector("#pageSearch").value));
        pageOrder();
    }
});
