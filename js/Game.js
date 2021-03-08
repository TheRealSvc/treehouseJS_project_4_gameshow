/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


/**
 * The Game class is the main class. It only contains three variables
 * @param phrases as the array of phrases as created in Data.js. Thats the only param the contructor requires 
 * @param missed holding the number missed letter guesses
 * @param activePhrase holding a Phrase object representing the active phrase
 */
class Game {
    constructor(phrases) {
        this.phrases = phrases ;
        this.missed = 0 ;
        this.activePhrase = new Phrase(this.getRandomPhrase()) ;
    }

    /**
     *  removes the start screen and dispays the active phrase. 
     *  This callback is called when clicking the start button 
     *  */
    startGame(phrases=this.phrases) {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'none' ;
        this.missed = 0 ;    
    } ;
    
    getRandomPhrase() {
       return this.phrases[Math.min(Math.floor(Math.random()*this.phrases.length),this.phrases.length)] ;
    }

    /**
     * main method to handle both click and keyup events
     */
    handleInteraction() { 
        var qwertyEl = document.querySelector('#qwerty') ;
        // Reminder for refactoring at a later point in time: Try to use one event delegator callback
        // to hande both mouse clicks and keyboard events     
        qwertyEl.addEventListener('click', (e) => { 
            if (e.target.className === "key") {  // this is order not to count "keyrow clicks" 
            e.target.disabled = true ; // directly disable the display-keyboard button
            if (this.activePhrase.checkLetter(e.target.textContent, e.target,this.missed)) {
                this.missed += 0 ; // just to make it implicit 
             } else if (!this.activePhrase.checkLetter(e.target.textContent, e.target,this.missed)) { 
                this.missed += 1 ; 
             }
            } else { 
                this.missed += 0 ; // undefined: just to make it implicit 
            } ;  
            this.checkForWin() ;   
            e.stopImmediatePropagation(); }) ;
        
        document.addEventListener('keyup', (ee) => { 
                if (/[a-z]/.test(ee.key)) { // react only when a letter in lowercase is pressed (omit the space in between)
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
            this.checkForWin() ;
            ee.stopImmediatePropagation(); 
        }) ; 
    }  

    /**
     * replaces one liveHeart with a lostHeart
     * It is a static methd to be called from a Phrase class object, hence it doesnt change
     * the state of the game object 
     *  */ 
    static removeLife(numMissed) {
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1 ; i >= (4-numMissed) ; i-=1) { // replace right heart first 
            var heartsImg = heartsOl.children[i].children ;
            if (/live/.test(heartsImg[0].outerHTML)) {
                heartsImg[0].outerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">' ;
            }
        }
    } 

    /**
     *  checkForWin checks both for winning and loosing 
     *  the return value indicates wether game was "won" or "lost" or "nothing"  
     * */ 
    checkForWin() {
        var winLoseFlag = false ; //  false means winning
        
        if (this.missed >= 5) { 
             winLoseFlag = true ; // true means loosing ;-)  
             this.gameOver(winLoseFlag)
             return  // no need to further evaluate  
            }; 
        
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        if (phraseUlAll.length == 0) {return "nothing"} // i added this to fix a "lost screen" issue. Without it the lose screen switches to win on keyup. 
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
        }    
    this.gameOver(winLoseFlag)
    }
 


/**
 * Is called when the game is over either by winning or losing. 
 * @param winLoseFlag comes from the checkForEin function. Based on this different screens are presented
 */
    gameOver(winLoseFlag) {
        if(winLoseFlag && winLoseFlag !="nothing") {  // lost 
            const gameSection = document.querySelector('#overlay') ;
            gameSection.className = 'lose' ;    
            gameSection.style.display = 'block' ;
            const h1El = document.getElementById("game-over-message") ;
            h1El.innerText = `Ups, you lost !!! \n The correct phrase was: \n  ${this.activePhrase.phrase}` ; // if lost active phrase is displayed
            this.resetToOriginal() ;
        } else if (!winLoseFlag && winLoseFlag !="nothing") { // won
            const gameSection = document.querySelector('#overlay') ;
            document.documentElement.style.setProperty("--color-win", "green"); // here i change the css win color 
            gameSection.className = 'win' ; 
            gameSection.style.display = 'block' ;
            const h1El = document.getElementById("game-over-message") ;
            h1El.innerText = "Congatulations... you won ...tadaaaa !!!!!!! " ;
            this.resetToOriginal() ;

        }  else if (winLoseFlag === "nothing") {}  // nothing does nothing
    } ;

/**
 * resetToOriginal resets the state of the DOM, since reinstantiating the Game object 
 * is not doing this.
 */
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
