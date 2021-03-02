/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


class Game {
    constructor(phrases) {
        this.phrases = phrases ;
        this.missed = 0 ;
        this.activePhrase = new Phrase(this.getRandomPhrase()) ;
        console.log(`active phrase is: ${this.activePhrase.phrase}`)
    }

    startGame(phrases=this.phrases) {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'none' ;
        this.missed = 0 ;    
        this.handleInteraction() ;
    } ;
    
    getRandomPhrase() {
       return this.phrases[Math.min(Math.floor(Math.random()*this.phrases.length),this.phrases.length)] ;
    }



    handleInteraction() {
        var qwertyEl = document.querySelector('#qwerty') ;
        qwertyEl.addEventListener('click', (e) => this.showMatchedLetter(e.target.textContent)) ;
        window.addEventListener('keydown', (ee) => { 
            if (ee.keyCode >= 65 && ee.keyCode <= 90) { 
            console.log(ee.keyCode)       
            this.showMatchedLetter(ee.key) }} );
    }  

    removeLife() {

    } 

    showMatchedLetter(letter) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
            console.log(letter)
            var flag = false ;
            if (letter.length == 1) {
             console.log(phraseUlAll.length) ; 
   
             for (var i=0; i<phraseUlAll.length; i++) {
               if(phraseUlAll[i].innerText.toLowerCase() == letter) {
                 phraseUlAll[i].classList.add('chosen') ;   
                 flag = true ;
               } 
             }
             if (!flag) {
                 this.missed+=1 ;
                 console.log(this.missed);
               }
           }
    } 

    checkForWin() {

    }; 

    gameOver() {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'block' ;
    } ;

}