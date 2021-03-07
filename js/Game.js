/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


class Game {
    constructor(phrases) {
        this.phrases = phrases ;
        this.missed = 0 ;
        this.activePhrase = new Phrase(this.getRandomPhrase()) ;
        this.keyupCount = 0 ;
    }

    startGame(phrases=this.phrases) {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'none' ;
        this.missed = 0 ;    
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

            if (this.activePhrase.checkLetter(e.target.textContent, e.target,this.missed)) {
                this.missed += 0 ; // just to make it implicit 
             } else if (!this.activePhrase.checkLetter(e.target.textContent, e.target,this.missed)) { 
                this.missed += 1 ; 
             }
            } else { 
                this.missed += 0 ; // undefined: just to make it implicit 
            } ;  
            console.log(`Number missed: ${this.missed}`) ;
            this.checkForWin() ;   
            e.stopImmediatePropagation(); }) ;
        
        document.addEventListener('keyup', (ee) => {
            console.log(`keyup callback called ${ee.target}`) ;  
                if (/[a-z]/.test(ee.key)) { // react only when a letter in lowercase is pressed 
                    for(var i=0; i<qwertyEl.children.length; i++) {
                        var subEl = qwertyEl.children[i] ; 
                        for (var j=0 ; j < subEl.children.length ; j++ ) {
                         if (subEl.children[j].textContent === ee.key) {
                          subEl.children[j].disabled = true ; // this disables the display-keyboard button after keyborad input  
                          if (this.activePhrase.checkLetter(ee.key,subEl.children[j],this.missed)) {
                               this.missed += 0 ; //  just to make it implicit 
                            } else if (!this.activePhrase.checkLetter(ee.key,subEl.children[j],this.missed)) { 
                               this.missed += 1 ; 
                            } else {
                               this.missed += 0 ; // undefined: just to make it implicit 
                            } 
                         }
                     }                      
                 }   
            } 
            console.log(`Number missed: ${this.missed}`) ;
            this.checkForWin() ;
            //ee.stopImmediatePropagation(); 
        }) ; 
    }  


    static removeLife(numMissed) {
        console.log(`number missed in remove life: ${numMissed}`)
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1 ; i >= (4-numMissed) ; i-=1) { // replace right heart first 
            var heartsImg = heartsOl.children[i].children ;
            if (/live/.test(heartsImg[0].outerHTML)) {
                heartsImg[0].outerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">' ;
            }
        }
    } 

    checkForWin() {
        var winLoseFlag = false ; //  false means winning
        
        if (this.missed >= 5) { 
             winLoseFlag = true ; // true means loosing ;-)  
             this.gameOver(winLoseFlag)
             return  // no need to further evaluate  
            }; 
        
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        for (var i=0; i<phraseUlAll.length ; i++ ) {
            if (!phraseUlAll[i].classList.contains('chosen') && !phraseUlAll[i].classList.contains('space') )   { 
                winLoseFlag = "nothing" ; // undefined means neither winning nor loosing 
                break ;
            } else {
                winLoseFlag = winLoseFlag || false  ;  // after the loop winLoseFlag is false only if all letters contain "chosen" class 
                if (winLoseFlag) {
                    winLoseFlag = "nothing" ;
                    break ;
                }    
            }        
        }    // false means winning
    this.gameOver(winLoseFlag)
    }
 


 /*
 Includes gameOver() method that displays a final "win" or "loss" message by showing the original start screen
overlay styled with either the win or lose CSS class
 */
    gameOver(winLoseFlag) {
        if(winLoseFlag && winLoseFlag !="nothing") {  // lost 
            const gameSection = document.querySelector('#overlay') ;
            gameSection.style.display = 'block' ;
            console.log("you lost !!!!!!! ") ;
            const h1El = document.getElementById("game-over-message") ;
            console.log(h1El) ;
            h1El.innerText = "Ups, you lost !" ;
            this.resetToOriginal() ;
        } else if (!winLoseFlag && winLoseFlag !="nothing") { // won
            const gameSection = document.querySelector('#overlay') ;
            gameSection.style.display = 'block' ;
            console.log("Congatulations... you won ...tadaaaa !!!!!!! ") ;
            const h1El = document.getElementById("game-over-message") ;
            console.log(h1El) ;
            h1El.innerText = "Congatulations... you won ...tadaaaa !!!!!!! " ;
            this.resetToOriginal() ;

        }  else if (winLoseFlag === "nothing") {}  // nothing does nothing
    } ;


    resetToOriginal() {
        //reset hearts 
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1; i >= 0; i-=1) { // replace right heart first 
         var heartsImg = heartsOl.children[i].children ;
             heartsImg[0].outerHTML = '<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">' ;
        }

        // re-enable keys and remove wrong class attribute
        var qwertyEl = document.querySelector('#qwerty') ;  
        for(var i=0; i<qwertyEl.children.length; i++) {
            var subEl = qwertyEl.children[i] ; 
            for (var j=0 ; j < subEl.children.length ; j++ ) {
                subEl.children[j].disabled = false  ; // this disables the display-keyboard button after keyborad input  
                subEl.children[j].classList.remove('wrong') ;
                subEl.children[j].classList.remove('chosen') ;
            }
        }                      
        // remove phrase list items
        var phraseUl = document.querySelector("#phrase").children[0];
        phraseUl.innerHTML = '' ;
        this.missed = 0 ; 
    };

}
