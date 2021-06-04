var chapterPageLeft = document.getElementById("left");
var chapterPageRight = document.getElementById("right");
var _url = "";
var _imgUrl = "";
var _refUrl = _url.replace(_url.split("/")[5], "");
var startUp =
    '<div class="col nopad page-left" id="left" onclick="chapterLeft()"></div><div class="col nopad page-right" id="right" onclick="chapterRight()"></div>';
var newImages = "";
var elText = "";
var chapterComboBox = document.getElementById("chapterComboBox");
var readerHoverButtonsInnerHTML = '';
var fullScreenReader = false;
var firstChapter = document.getElementById('firstChapter');
var lastChapter = document.getElementById('lastChapter');
var myModalEl = document.getElementById('fullScreenPopUp');

if (!readerKeyEventJS) {
    $.cachedScript('static/js/readerKeyEvent.js').done(function(script, textStatus) {
        console.log("Status  :  " + textStatus);
        readerKeyEventJS = true;
    });
}
win.on('resize', function() {
    if (document.body.clientWidth > 1200) {
        if (document.getElementById('readerHoverButtons')) {
            if (document.getElementById('readerHoverButtons').classList.contains('top225')) {
                document.getElementById('readerHoverButtons').classList.remove('top225');
            }
            document.getElementById('readerHoverButtons').classList.add('mt-3');
        }
    } else {
        if (document.getElementById('readerHoverButtons')) {
            document.getElementById('readerHoverButtons').classList.add('top225');
            if (document.getElementById('readerHoverButtons').classList.contains('mt-3')) {
                document.getElementById('readerHoverButtons').classList.remove('mt-3');
            }
        }
    }
});

function chapterLeft() {
    console.log("left");
}

function chapterRight() {
    console.log("right");
}

async function loadChapter(url) {
    _url = url;
    var el = document.createElement("html");
    let response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125",
            Referer: _refUrl,
        },
    });
    let responseText = await getTextFromStream(response.body);
    el.innerHTML = responseText;
    var mangaName = el.getElementsByClassName("panel-chapter-info-top")[0]
        .firstElementChild.textContent;
    document.getElementById("mangaName").innerHTML = mangaName;
    chapterComboBox.innerHTML = el.getElementsByClassName(
        "navi-change-chapter"
    )[0].innerHTML;
    var el2 = el.getElementsByClassName("container-chapter-reader");
    if (el2.length == 1) {
        var el3 = el2.item(0).getElementsByTagName("img");
        newImages = startUp;
        for (i = el3.length - 1; i >= 0; i--) {
            newImages =
                newImages +
                '<img src="' +
                el3.item(i).getAttribute("src") +
                '" id="img' +
                i +
                '" style="width: 850px;">';
        }
        if (!fullScreenReader) {
            console.log('fullScreenReader = ' + fullScreenReader)
            document.getElementById("con").innerHTML = newImages;
        } else {
            console.log('fullScreenReader = ' + fullScreenReader)
            document.getElementById("fscreenCon").innerHTML = newImages;
        }
    } else {
        console.error("el2 has no element!!!");
    }
}
chapterComboBox.addEventListener("change", function() {
    console.log(
        "Changed to : " +
        chapterComboBox.childNodes[chapterComboBox.selectedIndex].getAttribute(
            "data-c"
        )
    );
    chapterComboBoxChange();
});

function chapterComboBoxChange() {
    var originURL = new URL(_url);
    var parentURL = originURL.origin + "/" + originURL.pathname.split("/")[1];
    loadChapter(
        parentURL +
        "/chapter-" +
        chapterComboBox.childNodes[chapterComboBox.selectedIndex].getAttribute(
            "data-c"
        )
    );
}

async function autoMaticScroll() {
    autoMaticScroll: for (var i = 0; i < document.getElementsByClassName('modal-body')[0].scrollHeight; i++) {
        document.getElementsByClassName('modal-body')[0].scrollTop += 1;
        await sleep(1);
        if (document.getElementsByClassName('modal-body')[0].scrollTop == document.getElementsByClassName('modal-body')[0].scrollHeight) { break autoMaticScroll; }
        console.log(document.getElementsByClassName('modal-body')[0].scrollTop);
    }
}

function fullscreenModalCon(input) {
    fullScreenReader = input;
    if (input) {
        document.getElementById('fscreenCon').innerHTML = document.getElementById('con').innerHTML;
        document.getElementById('con').innerHTML = '';
        win.fullScreen = true;
    } else {
        document.getElementById('con').innerHTML = document.getElementById('fscreenCon').innerHTML;
        document.getElementById('fscreenCon').innerHTML = '';
        win.fullScreen = false;

    }
}
myModalEl.addEventListener('show.bs.modal', function(event) {
    fullscreenModalCon(true);
});
myModalEl.addEventListener('hide.bs.modal', function(event) {
    fullscreenModalCon(false);
});
lastChapter.addEventListener('hidden.bs.toast', function() {
    //lastChapter.tabIndex = -10000;
})
firstChapter.addEventListener('hidden.bs.toast', function() {
    //firstChapter.tabIndex = -10000;
})