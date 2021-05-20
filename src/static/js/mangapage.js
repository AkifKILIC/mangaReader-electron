var recentModal;
async function modalEnable(url, input) {
    if (input === "toggle") {
        if (document.getElementById("myModal") && recentModal == url) {
            myModal.toggle();
            return;
        }
        if (document.getElementById("myModal") && recentModal != url) {
            document.getElementById("myModal").outerHTML = "";
        }
        if (!document.getElementById("myModal")) {
            var el3 = document.createElement("html");
            var el2 = document.createElement("div");
            var sec = document.createElement("html");
            var taytil = 'lol';
            el2.innerHTML = readTextFile("mangapage.html");
            let response = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125",
                    Referer: "https://manganelo.com/",
                },
            });
            let responseText = await getTextFromStream(response.body);
            el3.innerHTML = responseText;
            el2.getElementsByClassName('mangaTitle')[0].innerHTML = el3.getElementsByClassName('story-info-right')[0].getElementsByTagName('h1')[0].innerHTML;
            var mangaDesc = el3.getElementsByClassName('panel-story-info-description')[0].textContent;
            el2.getElementsByClassName('mangaDesc')[0].innerHTML = mangaDesc.split('Description :', 2)[1];
            console.log(mangaDesc.split('Description :', 2));
            el2.getElementsByClassName('mangaImage')[0].src = el3.getElementsByClassName('info-image')[0].firstElementChild.getAttribute('src');
            el2.getElementsByClassName('mangaGenre')[0].innerHTML = el3.getElementsByClassName('variations-tableInfo')[0].firstElementChild.getElementsByTagName('tr')[3].lastElementChild.textContent;
            el2.getElementsByClassName('mangaAuthor')[0].innerHTML += el3.getElementsByClassName('variations-tableInfo')[0].firstElementChild.getElementsByTagName('tr')[1].lastElementChild.textContent;
            sec.innerHTML = el3.getElementsByClassName("row-content-chapter")[0].innerHTML;
            var chapters = sec.getElementsByClassName("a-h");
            var element2 = "";
            for (var i = 0; i < chapters.length; i++) {
                var element =
                    '<a class="list-group-item d-flex justify-content-between align-items-center w-100" onclick="' +
                    "chapterToReader('" +
                    chapters[i]
                    .getElementsByClassName("chapter-name")[0]
                    .getAttribute("href") +
                    "')" +
                    '">' +
                    chapters[i].getElementsByClassName("chapter-name")[0].innerHTML +
                    '<span class="badge bg-primary rounded-pill">' +
                    chapters[i].getElementsByClassName("chapter-time")[0].innerHTML +
                    "</span></a>";
                element2 += element;
            }
            el2.getElementsByClassName("list-group")[0].innerHTML = element2;
            console.log(chapters[0]);
            document.getElementById("content").innerHTML += el2.innerHTML;
            myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
            myModal.toggle();
            recentModal = url;
        }
    }
    if (input === "close") {
        myModal.toggle();
        if (document.getElementById("myModal")) {
            document.getElementById("myModal").outerHTML = "";
        }
    }
}

function readFirstOrLast(input) {
    if (input === 'First') {
        var first = document.getElementById('paduc').firstElementChild.lastElementChild.getAttribute('onclick');
        chapterToReader(first.split('(', )[1].replace("'", "").replace("')", ""))
    }
    if (input === 'Last') {
        var last = document.getElementById('paduc').firstElementChild.firstElementChild.getAttribute('onclick');
        chapterToReader(last.split('(', )[1].replace("'", "").replace("')", ""))
    }
}