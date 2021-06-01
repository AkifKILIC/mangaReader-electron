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
                '" style="width: auto;min-width: 60%;max-width:100%;">';
        }
        document.getElementById("con").innerHTML = newImages;
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
document.addEventListener("keydown", (event) => { // Done  ``Fix !! its only taking whole numbers not example (10.5)``
    if (event.isComposing || event.key === "ArrowRight") {
        console.log('RightArrow');
        if (document.getElementById('con')) {
            if (chapterComboBox.selectedIndex == 0) {
                return;
            } else {
                chapterComboBox.selectedIndex = chapterComboBox.selectedIndex - 1;
                chapterComboBoxChange();
            }
        }
    }
    if (event.isComposing || event.key === "ArrowLeft") {
        console.log('LeftArrow');
        if (document.getElementById('con')) {
            if (chapterComboBox.selectedIndex == (chapterComboBox.childElementCount - 1)) {
                return;
            } else {
                chapterComboBox.selectedIndex = chapterComboBox.selectedIndex + 1;
                chapterComboBoxChange();
            }
        }
    }
});