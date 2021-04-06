const remote = require('electron').remote;

const win = remote.getCurrentWindow();
 /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}
function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
const sol1 = document.getElementById('sol1');
const sol2 = document.getElementById('sol2');
const leftBarButton = document.getElementById('leftBarButton');
const buttonIcon = document.getElementById('buttonicon');
const verticalMenu = document.getElementById('verticalMenu');
state = true;
function leftBarState() {
    if(state){
        if(sol1.classList.contains('solTwo')){
            sol1.style.width = '95px';
            sol2.style.width = '95px';
            sol1.classList.remove('solTwo');
            sol2.classList.remove('solTwo');
        }
        sol1.classList.add('sol');
        sol2.classList.add('sol');
    console.log('Didit');
    state = !state;
        if(leftBarButton.classList.contains('deActives')){
            leftBarButton.classList.remove('deActives');
            leftBarButton.classList.add('actives');

        }else{
            leftBarButton.classList.add('actives');
        }
        if(verticalMenu.classList.contains('fadeout')){
            verticalMenu.classList.remove('fadeout');
            verticalMenu.classList.add('fadein');
        }else{
            verticalMenu.classList.add('fadein');
        }

        buttonIcon.classList.remove('fa-2x');
        buttonIcon.classList.add('fa-1x');
    }else{
        sol1.style.width = '250px';
        sol2.style.width = '250px';
       // verticalMenu.style.width = '250px';
        if(sol1.classList.contains('sol')){
            sol1.classList.remove('sol');
            sol2.classList.remove('sol');
        }
        sol1.classList.add('solTwo');
        sol2.classList.add('solTwo');
        console.log('Diditreverse');
        state = !state;    
        if(leftBarButton.classList.contains('actives')){
            leftBarButton.classList.remove('actives');
            leftBarButton.classList.add('deActives');
        }else{
            leftBarButton.classList.add('deActives');
        }
        buttonIcon.classList.remove('fa-1x');
        buttonIcon.classList.add('fa-2x');
        if(verticalMenu.classList.contains('fadein')){
            verticalMenu.classList.remove('fadein');
            verticalMenu.classList.add('fadeout');
        }else{
            verticalMenu.classList.add('fadeout');
        }
    }    
        /*if(state){
        sizingEffect('sol1',95,250,true);
        sizingEffect('sol2',95,250,true);
    }else{
        sizingEffect('sol1',250,95,true);
        sizingEffect('sol2',250,95,true);
    }
    state = !state;*/
}

/*async function sizingEffect(elementId,size,toSize,widthOrHeight){
    if(widthOrHeight){
        if (size < toSize){
            for (i= size ; i <= toSize ; i++){
                pixel = i + 'px';
                document.getElementById(elementId).style.width = pixel;
                await sleep(1);
                console.log('elementId = '+ elementId + ' // i = ' + i);
            }
        }
        if (size > toSize){
            for (i= size ; i >= toSize ; i--){
                pixel = i + 'px';
                document.getElementById(elementId).style.width = pixel;
                await sleep(1); 
                console.log('elementId = '+ elementId + ' // i = ' + i);
            }
        }
    }else{
        if (size < toSize){
            for (i= size ; i < toSize ; i++){
                pixel = i + 'px';
                document.getElementById(elementId).style.height = pixel;
                await sleep(1);
            }
        }
        if (size > toSize){
            for (i= size ; i > toSize ; i--){
                pixel = i + 'px';
                document.getElementById(elementId).style.height = pixel;
                await sleep(1);
            }
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/