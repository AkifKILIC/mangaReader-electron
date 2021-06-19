async function addFav(mangaSite, cardID) {
    console.log(mangaSite);
    console.log(cardID);
    var mangaCard = document.getElementById(cardID);
    var mangaTitle = mangaCard.getElementsByClassName('card-title')[0].innerHTML;
    var mangaContent = mangaCard.getElementsByClassName('card-text')[0].textContent;
    var mangaImage = mangaCard.getElementsByClassName('card-img-top')[0].getAttribute('src');
    var replace1 = mangaCard.getElementsByClassName('card-img-top')[0].getAttribute('onclick').replace("toggleModal('", "");
    var mangaHref = replace1.replace("','toggle')", "");
    const insert = db.prepare("INSERT INTO Favorites (name, content, image, href, genres, updated, lastread, lastchapter) VALUES ('" + mangaTitle + "', '" + mangaContent + "', '" + mangaImage + "', '" + mangaHref + "', " + "NULL" + ", " + "NULL" + ", " + "NULL" + ", " + "NULL" + ")");
    const info = insert.run();
    //const row = db.prepare()
}