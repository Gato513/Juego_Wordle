const CONFIRM_BUTTON = document.getElementById('confirm-word');
const LETTER_BOX = document.getElementsByClassName('letter-box');
const SPAN = document.getElementsByClassName('letter-column');
const TEXT_FIELD  = document.getElementById("word-entry");
const TABLE_CONTEN = document.getElementById

const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("close-button");

const TEXT_MESSAGE = document.getElementById("message-text");

const URL_API = 'https://random-word-api.herokuapp.com/word?length=5&lang=es';
let WORD;

function getWord(){
    fetch(URL_API)
    .then(response => response.json())
    .then(response => {
        WORD = response[0].toUpperCase();
        main();
    })
    .catch(err => console.error(err));
}

let attemptNumber = 1;
let letterIndex = 0;

function gameOver(){
    overlay.style.display = "block";
    TEXT_MESSAGE.innerText = "Perdiste";
    TEXT_FIELD.disabled = true;
}
function gameWon(){
    overlay.style.display = "block";
    TEXT_MESSAGE.innerText = "Ganaste";
    TEXT_FIELD.disabled = true;
}
function resetField(){
    TEXT_FIELD.value = "";
}
function readInput (){
    let attempt_word = document.getElementById('word-entry').value;
    return attempt_word.toUpperCase();
}
function indexCalculation(index){
    index = parseInt(index);
    return (((5 * attemptNumber) + index) - 5);
}
function boxColorStyle(index, colorIndex){
    let indexBox = indexCalculation(index);
    const color = ["green", "yellow", "gray", "blueviolet"];
    LETTER_BOX[indexBox].classList.add(color[colorIndex]);
}
function attempt(){
    const INPUT_WORT = readInput();
    if(INPUT_WORT ===  WORD){
        
        gameWon();
        
        for (const index in WORD) {
            boxColorStyle(index, 0);
        }
        return
    }
    for (const index in WORD) {
        if (INPUT_WORT[index] === WORD[index]) {
            boxColorStyle(index, 0);
        }
        else if( WORD.includes(INPUT_WORT[index]) ) {
            boxColorStyle(index, 1);
        } 
        else {
            boxColorStyle(index, 2);
        }
    }
    attemptNumber++;

    if (attemptNumber > 6) {
        gameOver();
    }

    letterIndex = 0;
    resetField();
}
function writingLetters(event){
    const LETTER = event.key;
    const VALOR_EVENT = event.keyCode;

    if (VALOR_EVENT == 13) {
        attempt();
        return
    }

    if (VALOR_EVENT == 8) {
        if (letterIndex > 0) {
            letterIndex--;
            let = indexSpan = indexCalculation(letterIndex);
            SPAN[indexSpan].innerHTML = "";
        }
        return
    }

    if (letterIndex < 5) {
        let = indexSpan = indexCalculation(letterIndex);
        SPAN[indexSpan].innerHTML = `${LETTER.toUpperCase()}`;
        letterIndex++;
    }

};
function main(){

    console.log(WORD); // Muestra la palabra a Adibinar.

    TEXT_FIELD.addEventListener("keydown", writingLetters);

    CONFIRM_BUTTON.addEventListener('click', attempt);

    closeButton.addEventListener("click", function () {
        overlay.style.display = "none";
        location.reload(false); //No es recomendable, pero mequede sin tiempo. Perdon.
        resetField();
    });
}
window.onload = getWord;