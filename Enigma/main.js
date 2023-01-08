let enigma = null;
let canvas = document.getElementById('content');
let stch = true;

// function drawRotater(){
//     pen.drawRect(canvasWidth/2-60,50,40,150)
//     pen.drawRect(canvasWidth/2,50,40,150)
//     pen.drawRect(canvasWidth/2+60,50,40,150)
// }

// function drawButton(){

// }

window.onkeydown = (keyCode)=>{
    if(stch){
        stch=false;
        enigma.encodeLetter(keyCode.key,{fg:"red"})
    }
};

window.onkeyup = (keyCode)=>{
    stch=true;
    enigma.changeKeyColor(keyCode.key)
};





function resizeFrame(){
    console.log("Resizing ... ("+window.innerWidth+","+window.innerHeight+")");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Canvas Set ("+canvas.clientWidth+","+canvas.clientHeight+")");
}

function runMachine(){
    enigma = new Enigma(3,canvas);
    enigma.draw(canvas,"black",document.getElementsByClassName('ctrlbtn'));
}

function main(){
    resizeFrame();
    runMachine();
}
window.onload = main;
window.onresize = main;