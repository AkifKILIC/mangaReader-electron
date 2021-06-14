var currentPage = 1;
var fullPage = "";
var pageContent = document.getElementById("content");
var mangakakalotURL = '';

async function pageStructure(tab, subURL, search) {
    // TODO: Make it look Nice
    if (search) {
        if (document.getElementById('contentFooter')) {
            document.getElementById('contentFooter').outerHTML = '';
            document.getElementsByClassName('scrollbarRow')[0].style.height = '100%';
        }
    } else {
        currentPage = subURL;
    }
    pageContent.innerHTML = "";
    fullPage = "";
    var dummy = document.createElement("html");
    if (tab == "mangakakalot") {
        if (search) {
            mangakakalotURL = 'https://mangakakalot.com/search/story/' + subURL;
        } else {
            mangakakalotURL = 'https://mangakakalot.com/manga_list?type=topview&category=all&state=all&page='
        }
        let response = await fetch(mangakakalotURL + currentPage, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125",
                Referer: "https://manganelo.com/",
            },
        });
        let responseText = await getTextFromStream(response.body);
        dummy.innerHTML = responseText;
        if (dummy.getElementsByClassName('group_page')[0]) {
            lastPage = dummy.getElementsByClassName('group_page')[0].lastChild.innerText.replace('Last(', '').replace(')', '');
            lastPageInt = parseInt(lastPage);
        } else {

        }
        var dummyElement = dummy.getElementsByClassName('list-truyen-item-wrap');
        for (i = 0; i < dummy.getElementsByClassName('list-truyen-item-wrap').length; i++) {
            var cardHTML = readTextFile("mangakakalot.html");
            var cardHTML1 = cardHTML.replace("taytil", dummyElement[i].firstElementChild.getAttribute('title'));
            var cardHTML2 = cardHTML1.replace("image", dummyElement[i].getElementsByTagName('img')[0].getAttribute('src'));
            var cardHTML3 = cardHTML2.replace(/content/g, dummyElement[i].lastElementChild.innerText);
            var hrefF = "toggleModal('" + dummyElement[i].firstElementChild.getAttribute('href') + "','toggle')";
            var cardHTML4 = cardHTML3.replace(/haref/g, hrefF);
            var cardHTML5 = cardHTML4.replace(/gorunurluk/g, "0%");
            pageContent.innerHTML += cardHTML5;
        }
        if (pageContent.classList.contains("MangaorReader")) {} else {
            pageContent.classList.add("MangaorReader");
        }
        if (search) {} else { pageOrder(); }

        /*for (i = firstManga; i <= lastManga; i++) {
            if (i < parseInt(lastPage.id) + 1) {
                const row = db
                    .prepare("SELECT * FROM MangakakalotHot WHERE id = ?")
                    .get(i);
                var inner1 = readTextFile("mangakakalot.html");
                var inner2 = inner1.replace("taytil", row.name);
                var inner3 = inner2.replace("image", row.image);
                var hrefF = "toggleModal('" + row.href + "','toggle')";
                var inner4 = inner3.replace(/haref/g, hrefF);
                var inner5 = inner4.replace(/content/g, row.content);
                if (row.updated == 1) {
                    var inner6 = inner5.replace(/gorunurluk/g, "100%");
                    fullPage = fullPage + inner6;
                } else {
                    var inner6 = inner5.replace(/gorunurluk/g, "0%");
                    fullPage = fullPage + inner6;
                }
                pageContent.innerHTML = fullPage;
            }
        }
        if (pageContent.classList.contains("MangaorReader")) {} else {
            pageContent.classList.add("MangaorReader");
        }
        pageOrder();*/
    }
    if (tab == "mangaoku") {
        // TODO : MANGAOKU SCRAPPER
    }
    if (tab == "manytoon") {
        // TODO : MANYTOON SCRAPPER
    }
    if (tab == "readerdemo") {
        if (pageContent.classList.contains("MangaorReader")) {
            pageContent.classList.remove("MangaorReader");
        }
        document.getElementById("content").innerHTML =
            readTextFile("readerdemo.html");
        console.log("Page = ReaderDemo");
        tabActiveToggle(page4);
    }
}
async function chapterToReader(url) {
    await modalEnable('', 'close');
    if (document.getElementById('contentFooter')) {
        document.getElementById('contentFooter').outerHTML = '';
        document.getElementsByClassName('scrollbarRow')[0].style.height = '100%';
    }
    document.getElementById("content").innerHTML =
        readTextFile("readerdemo.html");
    console.log("Page = ReaderDemo");
    var lol = await tabActiveToggle(page4);
    readerOnline = true;
    await $.cachedScript("static/js/reader.js").done(function(script, textStatus) {
        console.log("Status for Reader.js = " + textStatus);
    });
    loadChapter(url);
}

function pageChange(current) {
    if (current == "first") {
        if (min != currentPage) {
            pageStructure("mangakakalot", 1);
            cur = 1;
        }
    }
    if (current == "minusx") {
        if (min != currentPage) {
            pageStructure("mangakakalot", min);
            cur--;
        }
    }
    if (current == "x") {
        if (cur != currentPage) {
            pageStructure("mangakakalot", cur);
        }
    }
    if (current == "plusx") {
        if (max != currentPage) {
            pageStructure("mangakakalot", max);
            cur++;
        }
    }
    if (current == "last") {
        if (max != currentPage) {
            pageStructure("mangakakalot", lastPageInt);
            cur = lastPageInt;
        }
    }
    pageOrder();
}
var min = 1;
var cur = 2;
var max = 3;
var lastPage = 100;
/*db
    .prepare("SELECT * FROM MangakakalotHot ORDER BY ID DESC LIMIT 1")
    .get();*/
var lastPageInt = parseInt(lastPage);

function pageOrder() {
    minText = min.toString();
    curText = cur.toString();
    maxText = max.toString();
    if (currentPage == 1) {
        min = 1;
        cur = 2;
        max = 3;
    }
    if (currentPage != 1 && currentPage != lastPageInt) {
        min = currentPage - 1;
        cur = currentPage;
        max = currentPage + 1;
    }
    if (currentPage == lastPageInt) {
        min = lastPageInt - 2;
        cur = lastPageInt - 1;
        max = lastPageInt;
    }
    document.getElementById("pageFirst").innerText = min.toString();
    document.getElementById("pageCur").innerText = cur.toString();
    document.getElementById("pageLast").innerText = max.toString();
    for (i = 0; i < pagination.length; i++) {
        if (pagination[i].classList.contains("active")) {
            pagination[i].classList.remove("active");
        }
        if (pagination[i].firstChild.innerHTML == currentPage) {
            pagination[i].classList.add("active");
        }
    }
}

var pageInput = document.getElementById("pageSearch");
pageInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        pageStructure(
            "mangakakalot",
            parseInt(document.querySelector("#pageSearch").value)
        );
        pageOrder();
    }
});