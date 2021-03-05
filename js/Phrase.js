/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
//

class Phrase {
    constructor(phrase) {
        this.phrase=phrase ;
        this.addPhraseToDisplay() ;
    }

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


checkLetter(letter, keyEl) {
    console.log(keyEl)
    var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
    var flag = false ;
    if (letter.length == 1) { 
        for (var i=0; i<phraseUlAll.length; i++) {
           if(phraseUlAll[i].innerText.toLowerCase() == letter) {   
            this.showMatchedLetter(letter,i) ; // maybe I change this back and remove the showMathedLetter  
            flag = true ;
           } 
         }
         if (!flag) {
             //this.missed += 1 ;
             //console.log(this.missed) ;
             keyEl.classList.add('wrong') ;
             Game.removeLife() ; // iam calling a static method of Game
           }
        }
    return flag ;
} ;


showMatchedLetter(letter,i) {
    var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
    phraseUlAll[i].classList.add('chosen') ;           
}

} // end of class 
