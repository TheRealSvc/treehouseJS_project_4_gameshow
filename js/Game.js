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
        this.phrases = []
        for (var i=0; i<5; i++) {
            this.phrases.push(new Phrase(phrases[i])) ; // now this is an array of phrase objects
        } 
        this.missed = 0 ;
        this.activePhrase = null ;// new Phrase(this.getRandomPhrase()) ;
    }

    /**
     *  removes the start screen and dispays the active phrase. 
     *  This callback is called when clicking the start button 
     *  */
    startGame() {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'none' ;
        this.activePhrase = this.getRandomPhrase(this.phrases) ;
        this.activePhrase.addPhraseToDisplay() ;
        console.log(this.activePhrase);
    } ;

    
    getRandomPhrase() {
       return this.phrases[Math.min(Math.floor(Math.random()*this.phrases.length),this.phrases.length)] ;
    }

    /**
     * main method to handle both click and keyup events
     */
    handleInteraction() { 
        var qwertyEl = document.querySelector('#qwerty') ;
        qwertyEl.addEventListener('click', (e) => { 
            if (e.target.className === "key") {  // this is order not to count "keyrow clicks" 
                e.target.disabled = true ; // directly disable the display-keyboard button
                if (!this.activePhrase.checkLetter(e.target.textContent)) { //}, e.target)) {
                    e.target.classList.add('wrong') ;
                    this.removeLife() ;
                    e.preventDefault() ;
                    e.stopImmediatePropagation() ;
                } else {
                    e.target.classList.add('chosen') ;
                    console.log(`here: letter is  ${e.target.textContent}`)
                    this.activePhrase.showMatchedLetter(e.target.textContent) ;
                    if(this.checkForWin()) { 
                        this.gameOver() ; // display win screen
                        e.preventDefault() ;
                        e.stopImmediatePropagation() ;
                    } ;   
                }
            }
        }) 
    }

    // iam not going for exceed but keep this as reference just in case :-)    
       /* document.addEventListener('keyup', (ee) => { 
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
        }) ; */
      

    /**
    * replaces one liveHeart with a lostHeart and call gameOver if missed==5
    * */ 
    removeLife() {
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1 ; i >= (4-this.missed) ; i-=1) { // replace right heart first 
            var heartsImg = heartsOl.children[i].children ;
            if (/live/.test(heartsImg[0].outerHTML)) {
                heartsImg[0].outerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">' ;
            }
        }
        this.missed += 1 ;
        if (this.missed==5) {
            this.gameOver() ;
        }
    } 

    /**
     *  checkForWin checks both for winning and loosing 
     *  the return value indicates wether game was "won" or "lost" or "nothing"  
     * */ 
    checkForWin() {  
        var winLoseFlag = false ; // false means "no win", true means "win"     
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
  
        for (var i=0; i < phraseUlAll.length ; i++ ) {
            if (!phraseUlAll[i].classList.contains('show') && !phraseUlAll[i].classList.contains('space') )   { 
                return false ;    
            }        
        }
        return true ;
    }

/**
 * Is called when the game is over either by winning or losing. 
 */
    gameOver() {
        if(this.missed==5) {  // lost 
            const gameSection = document.querySelector('#overlay') ;
            gameSection.className = 'lose' ;    
            gameSection.style.display = 'block' ;
            const h1El = document.getElementById("game-over-message") ;
            h1El.innerText = `Ups, you lost !!! \n The correct phrase was: \n  ${this.activePhrase.phrase}` ; // if lost active phrase is displayed
            this.resetToOriginal() ;
        } else { // won
            const gameSection = document.querySelector('#overlay') ;
            document.documentElement.style.setProperty("--color-win", "green"); // here i change the css win color 
            gameSection.className = 'win' ; 
            gameSection.style.display = 'block' ;
            const h1El = document.getElementById("game-over-message") ;
            h1El.innerText = "Congatulations... you won ...tadaaaa !!!!!!! " ;
            this.resetToOriginal() ;
        } 
    }

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
    } ;
}

