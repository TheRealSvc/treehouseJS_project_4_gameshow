/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * callback function to initialize the game 
 */
function letsStart() {
    gameObj = new Game(phrases) ; 
    gameObj.startGame() ; 
    gameObj.handleInteraction() ;
} 

const startButton = document.querySelector("#btn__reset") ;

// event listener to start the game 
startButton.addEventListener('click', (e) => { 
letsStart() ;  
e.stopImmediatePropagation() ;
},false) ;
