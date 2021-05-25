// TODO : Implement Those DownBellow to Application
var colortheme = 'Default';
var mangaDatabaseRefleshTimeout = 2;
var mangaDatabaseRefleshCount = 200;
var readerWebtoonOrNot = 'Webtoon';
var readerAllImagesInOnePage = 'Vertical';
var readerScrolDownSpeed = '5';
var readerAutomaticScrollKeybind = 'Down Arrow Key';




function settingPageLoad() {
    //StartUp
    document.querySelector('#startUpFirst').placeholder = mangaDatabaseRefleshCount; //Manga Database Reflesh Countout
    document.querySelector('#startUpSecond').placeholder = mangaDatabaseRefleshTimeout; //Manga Database Reflesh Timeout
    //Theme
    var themeFirst = document.querySelector('#themeFirst').getElementsByTagName('option');
    for (var i = 0; i < themeFirst.length; i++) {
        if (themeFirst[i].innerHTML == colortheme) {
            document.querySelector('#themeFirst').selectedIndex = i; //themeFirst = Color Theme
        }
    }
    //Reader
    var readerFirst = document.querySelector('#readerFirst')
    for (var i = 0; i < readerFirst.length; i++) {
        if (readerFirst[i].innerHTML == readerWebtoonOrNot) {
            document.querySelector('#readerFirst').selectedIndex = i; // readerFirst = Reader Chose = readerWebtoonOrNot
        }
    }
    var readerSecond = document.querySelector('#readerSecond')
    for (var i = 0; i < readerSecond.length; i++) {
        if (readerSecond[i].innerHTML == readerAllImagesInOnePage) {
            document.querySelector('#readerSecond').selectedIndex = i; //readerSecond = Reading Direction = readerAllImagesInOnePage
        }
    }
}