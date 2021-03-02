/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase) {
        this.phrase=phrase ;
        this.addPhraseToDisplay() ;
    }

   addPhraseToDisplay() {
    var phraseUl = document.querySelector("#phrase").children[0] ;
    for (let i=0 ; i < this.phrase.length ; i++) {
        var liToAppend = document.createElement('li') ;
        liToAppend.className = `hide letter ${this.phrase[i]}` ;
        liToAppend.innerText = this.phrase[i] ;
        phraseUl.appendChild(liToAppend) ;
    } 
   } ;

   checkLetter() {

   };
   showMatchedLetters()  {

   } ;

}

// <li class="hide letter h">h</li>