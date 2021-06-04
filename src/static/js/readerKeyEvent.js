document.addEventListener("keydown", (event) => { // Done  ``Fix !! its only taking whole numbers not example (10.5)``
    if (readerOnline) {
        if (event.isComposing || event.key === "ArrowRight") {
            console.log('RightArrow');
            if (document.getElementById('con')) {
                if (chapterComboBox.selectedIndex == 0) {
                    lastChapter.style.zIndex = 99999;
                    $("#lastChapter").toast("show");
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
                    firstChapter.tabIndex = 99999;
                    $("#firstChapter").toast("show");
                    return;
                } else {
                    chapterComboBox.selectedIndex = chapterComboBox.selectedIndex + 1;
                    chapterComboBoxChange();
                }
            }
        }
    }
    //if (event.isComposing || event.key === "ArrowDown") {
    //    if (fullScreenReader) {
    //        autoMaticScroll();
    //    }
    //}
    //if () //TODO: Breaking the loop or stopping and contining...
});
console.log('loading script readerKeyEvent.js SUCCESS  boolean = ' + readerOnline);