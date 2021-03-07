/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

function letsStart() {
    gameObj = new Game(phrases) ; 
    gameObj.startGame() ; 
    gameObj.handleInteraction() ;
} 

const startButton = document.querySelector("#btn__reset") ;

startButton.addEventListener('click', (e) => { 
//e.preventDefault() ;
letsStart() ;  
e.stopImmediatePropagation() ;
},false) ;
