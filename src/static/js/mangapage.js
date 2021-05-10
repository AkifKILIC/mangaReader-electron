async function modalEnable(input){
    var url = document.getElementById(input).getAttribute('alt');
    var el = document.createElement('html');
    let response =  await fetch(url,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125',
            'Referer' : 'https://manganelo.com/'
        }
    });
    let responseText = await getTextFromStream(response.body);
    el.innerHTML = responseText;
    console.log(el.innerHTML);
}