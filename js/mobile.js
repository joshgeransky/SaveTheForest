let gameDiv = document.getElementById('game');
let msg = document.getElementById('msgLandscape');
let header = document.getElementById('heading');
let scores = document.getElementById('scoreTable');
let body = document.getElementsByTagName('BODY')[0];

/* ----- Check if on a mobile device ----- */
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    initialOrientation();
    
    
} else {
    
    /* For Desktop */
    gameDiv.style.display = 'block';
    msg.style.display = 'none';
    
}

window.addEventListener("orientationchange", changeOrientation, false);

function initialOrientation() {

    /* Landscape Mode */
    if (window.matchMedia("(orientation: landscape)").matches) {
        
        gameDiv.style.display = 'block';
        msg.style.display = 'none';
        header.style.display = 'none';
        scores.style.display = 'none';
    }

    /* Portrait Mode */
    if (window.matchMedia("(orientation: portrait)").matches) {
        
        gameDiv.style.display = 'none';
        msg.style.display = 'block';
        header.style.display = 'block';
        scores.style.display = 'table';
        
    }
}


function changeOrientation() {
    /* Landscape Mode */
    if (window.matchMedia("(orientation: portrait)").matches) {
        
        gameDiv.style.display = 'block';
        msg.style.display = 'none';
        header.style.display = 'none';
        scores.style.display = 'none';
    }

    /* Portrait Mode */
    if (window.matchMedia("(orientation: landscape)").matches) {
        
        gameDiv.style.display = 'none';
        msg.style.display = 'block';
        header.style.display = 'block';
        scores.style.display = "table";
        
    }
}
