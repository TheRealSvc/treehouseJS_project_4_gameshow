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
            if (e.target.className === "key") {  // this is order not to count "keyrow clicks" 
            e.target.disabled = true ; // directly disable the display-keyboard button
            console.log(`click callback called ${e.target}`)
            this.checkLetter(e.target.textContent, e.target) ; // here if wrong the keyboard letter will be marked as wrong
            } else { } ; // reminder to clean up 
            }) ;
        
            document.addEventListener('keyup', (ee) => {
                console.log(`keyup callback called ${ee.target}`)
            if (/[a-z]/.test(ee.key)) { // react only when a letter (lowercase) is pressed 
                for(var i=0; i<qwertyEl.children.length; i++) {
                    var subEl = qwertyEl.children[i] ; 
                    for (var j=0 ; j < subEl.children.length ; j++ ) {
                        if (subEl.children[j].textContent === ee.key) {
                            subEl.children[j].disabled = true ; // this disables the display-keyboard button after keyborad input  
                            this.checkLetter(ee.key,subEl.children[j]) ;  // here if wrong the keyboard letter will be marked as wrong
                            break ;
                        }
                    }
                } 
            } 
        },false ) ; 
    }  

    removeLife() {
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1; i >= 0; i-=1) { // replace right heart first 
            var heartsImg = heartsOl.children[i].children ;
            if (/live/.test(heartsImg[0].outerHTML)) {
                heartsImg[0].outerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">' ;
                break ;
            }
        } 
    } 

    showMatchedLetter(letter,i) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        phraseUlAll[i].classList.add('chosen') ;           
    } 

    checkForWin(letter) {
    }; 

    checkLetter(letter, keyEl) {
        console.log(keyEl)
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
             this.removeLife() ;
           }
        } 
    } 

    gameOver() {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'block' ;
    } ;

}