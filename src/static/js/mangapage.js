
async function modalEnable(input){
    if(!document.getElementById('myModal')){
        url = document.getElementById(input).getAttribute('alt');
        el3 = document.createElement('html');
        el2 = document.createElement('html');
        sec = document.createElement('html');
        el2.innerHTML = readTextFile('mangapage.html');
        let response =  await fetch(url,{
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
                'Referer' : 'https://manganelo.com/'
            }
        });
        let responseText = await getTextFromStream(response.body);
        el3.innerHTML = responseText;
        sec.innerHTML = el3.getElementsByClassName('row-content-chapter')[0].innerHTML;
        var chapters = sec.getElementsByClassName('a-h');
        for(var i = 0;i < chapters.length;i++){ //TODO List for Buttons do it with li ul elements
            el2.getElementsByClassName("list-group")[0].innerHTML += chapters[i].innerHTML;
        }
        document.getElementById('content').innerHTML+= el2.innerHTML;
        myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
        myModal.toggle();
    }else{
        if(input === "close"){
            myModal.toggle();
            document.getElementById('myModal').outerHTML = "";
        }
    }
}