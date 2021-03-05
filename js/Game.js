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
            this.activePhrase.checkLetter(e.target.textContent, e.target) ; // here if wrong the keyboard letter will be marked as wrong
            } else { } ; // reminder to clean up 
            this.checkForWin() ;   
        }) ;
        
        document.addEventListener('keyup', (ee) => {
            console.log(`keyup callback called ${ee.target}`) ;
            if(this.keyupCount == 0) { // couldnt stop keyup event from firing twice. This is some workaround.  
               this.keyupCount = 1 ;
                if (/[a-z]/.test(ee.key)) { // react only when a letter (lowercase) is pressed 
                    for(var i=0; i<qwertyEl.children.length; i++) {
                        var subEl = qwertyEl.children[i] ; 
                        for (var j=0 ; j < subEl.children.length ; j++ ) {
                         if (subEl.children[j].textContent === ee.key) {
                          subEl.children[j].disabled = true ; // this disables the display-keyboard button after keyborad input  
                          flag = this.activePhrase.checkLetter(ee.key,subEl.children[j]) ;  // here if wrong the keyboard letter will be marked as wrong
                          break ;
                         }
                     }                      
                 } 
                }
            } else { 
                this.keyupCount = 0 ; 
            } 
            this.checkForWin() ;
            console.log(this.missed) ;
        }) ; 
    }  

    static removeLife() {
        var heartsOl = document.querySelector("#scoreboard").children[0] ; 
        for (var i=heartsOl.children.length-1; i >= 0; i-=1) { // replace right heart first 
            var heartsImg = heartsOl.children[i].children ;
            if (/live/.test(heartsImg[0].outerHTML)) {
                heartsImg[0].outerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">' ;
                break ;
            }
        }
        //this.missed += 1 ; 
        //console.log(`missed is ${this.missed}`);
    } 

    checkForWin() {
        if (this.missed>=5 ) { 
            this.gameOver() ;
        } 
    }; 

 /*
 Includes gameOver() method that displays a final "win" or "loss" message by showing the original start screen
overlay styled with either the win or lose CSS class
 */
    gameOver() {
        const gameSection = document.querySelector('#overlay') ;
        gameSection.style.display = 'block' ;
        if(this.missed >=5) {
            console.log("you lost !!!!!!! ") ;
            location.reload() ;
        } 
    } ;

}