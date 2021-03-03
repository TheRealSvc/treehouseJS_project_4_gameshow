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
        qwertyEl.addEventListener('click', (e) => { 
            console.log('called by click');
            e.target.disabled = true ; // directly disable the display-keyboard button
            this.checkLetter(e.target.textContent, e.target) ; 
            }) ;
        
            window.addEventListener('keydown', (ee) => {
            console.log('called by keydown'); 
            if (ee.keyCode >= 65 && ee.keyCode <= 90) { 
            
            console.log(qwertyEl.children.length) ;    
            for(var i=0; i<qwertyEl.children.length; i++) {

                var subEl = qwertyEl.children[i] ; 
                for (var j=0; j < subEl.length ; j++ ) {
                    if (subEl[j].textContent === ee.key) {
                        console.log(`subEl is ${subEl}`)
                        subEl[j].disabled = true ; // this disables the display-keyboard button after keyborad input    
                        break ;
                    }
                }
            } 
            this.checkLetter(ee.key,subEl) ; 
            }
    }) ;
}  

    removeLife() {
    } 

    showMatchedLetter(letter,i) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        phraseUlAll[i].classList.add('chosen') ;           
    } 

    checkForWin(letter) {
    }; 

    checkLetter(letter, keyEl) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        var flag = false ;
        if (letter.length == 1) { 
         for (var i=0; i<phraseUlAll.length; i++) {
           if(phraseUlAll[i].innerText.toLowerCase() == letter) {   
            this.showMatchedLetter(letter,i) ; // maybe i change this back and remove the showMathedLetter  
            flag = true ;
           } 
         }
         if (!flag) {
             this.missed += 1 ;
             console.log(this.missed) ;
             keyEl.classList.add('wrong') ;
           }
        } 
    } 

    gameOver() {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'block' ;
    } ;

}