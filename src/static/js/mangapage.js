
async function modalEnable(input){
    if(!document.getElementById('myModal')){
        url = input;
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
        for(var i = 0;i < chapters.length;i++){
            //el2.getElementsByClassName("list-group")[0].outerHTML += chapters[i].innerHTML;
            var element = '<a class="list-group-item d-flex justify-content-between align-items-center w-100" onclick="tiklama">chep<span class="badge bg-primary rounded-pill">zaman</span></a>';
            var element1 = element.replace('chep',chapters[i].getElementsByClassName('chapter-name')[0].innerHTML);
            var element2 = element1.replace('tiklama',"chapterToReader('"+ chapters[i].getElementsByClassName('chapter-name')[0].getAttribute('href') +"')");
            var element3 = element2.replace('zaman',chapters[i].getElementsByClassName('chapter-time')[0].innerHTML);
            el2.getElementsByClassName("list-group")[0].innerHTML += element3;
        }            
        console.log(chapters[0]);
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