/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * callback function to initialize the game 
 */

const startButton = document.querySelector("#btn__reset") ;

// event listener to start the game 
startButton.addEventListener('click', (e) => { 
    gameObj = new Game(phrases) ; 
    gameObj.startGame() ; 
    gameObj.handleInteraction() ;
}, false) ;
