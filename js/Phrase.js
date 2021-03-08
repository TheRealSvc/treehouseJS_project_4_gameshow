/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
//


/**
 * This Phrase class expects a phrase (string) for the constructor.
 */
class Phrase {
    constructor(phrase) {
        this.phrase=phrase ;
        this.addPhraseToDisplay() ;
    }

    /**
     * addPhraseToDisplay method to create and display the li items 
     */
   addPhraseToDisplay() {
    var phraseUl = document.querySelector("#phrase").children[0] ;
    for (let i=0 ; i < this.phrase.length ; i++) {
        var liToAppend = document.createElement('li') ;
        liToAppend.innerText = this.phrase[i] ;
        phraseUl.appendChild(liToAppend) ;
        if(this.phrase[i] ===" ") {
            liToAppend.classList.add('space') ;
        } else {
            liToAppend.className = `hide letter ${this.phrase[i]}` ;
        }
    } 
   } ;

/**    
 * checkLetter method check if letter is in phrase and handles 
 * @param letter the clckes or pressed letter
 * @param keyEl the Element that refers to the displayed keyboard
 * @param numMissed number missed 
 * @returns  flag true (hit) or undefined (else) 
 */
    checkLetter(letter, keyEl, numMissed) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        var flag = undefined ;
         if (letter.length == 1) { 
            for (var i=0; i<phraseUlAll.length; i++) {
               if(phraseUlAll[i].innerText.toLowerCase() == letter) {   
                this.showMatchedLetter(letter,i) ; // maybe I should change this back and remove the showMathedLetter, should i ?
                flag = true ;             
             }
         }
         if (!flag) {
            keyEl.classList.add('wrong') ;
            Game.removeLife(numMissed) ; // iam calling a static method of Game. Thats why iam passing numMissed through
        } 
    }
    return flag ;
}
    

/**
 * indicate the keyboard letter in case of hitting a correct key 
 * @param  letter the letter  
 * @param  i integer as reference to the keyborad button
 */
showMatchedLetter(letter,i) {
    var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
    phraseUlAll[i].classList.add('chosen') ;           
}

} // end of class 
