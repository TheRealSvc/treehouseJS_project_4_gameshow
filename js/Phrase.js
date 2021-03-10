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
 */
    checkLetter(letter) {
        var phraseUlAll = document.querySelector("#phrase").children[0].children ; 
        var flag = false ;
         if (letter.length == 1) { 
            for (var i=0; i<phraseUlAll.length; i++) {
               if(phraseUlAll[i].innerText.toLowerCase() == letter) {   
                flag = true ;             
             }
         }
        }
        return flag ;
    }
    

    /**  
    */
    showMatchedLetter(keySelected) {
     var phraseUl = document.querySelector("#phrase").children[0] ;
     for (let i=0 ; i < this.phrase.length ; i++) {
            if(phraseUl[i].children.classList.contains(keySelected)) { 
                    phraseUl[i].children.classList.remove('hide') 
                    phraseUl[i].children.classList.add('show')                  
            }
        }
    }
} // end of class 
