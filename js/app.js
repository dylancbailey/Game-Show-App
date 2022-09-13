const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let missed = 0;

// return a random phrase from an array
const getRandomPhrasesAsArray = arr => {

    const phrases = [
        ['Random phrase 1'],
        ['Random phrase 2'],
        ['Random phrase 3'],
        ['Random phrase 4'],
        ['Random phrase 5'],
    ];

};

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {

};

// check if a letter is in the phrase
const checkLetter = button => {

};

// check if the game been won or lost
const checkWin = () => {

};

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {

});