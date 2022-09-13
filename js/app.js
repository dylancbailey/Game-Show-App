const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const phrases = [
    ['Random phrase 1'],
    ['Random phrase 2'],
    ['Random phrase 3'],
    ['Random phrase 4'],
    ['Random phrase 5'],
];
let missed = 0;

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const arrLength = arr.length;
    const randomNumber = Math.floor(Math.random() * 5);
    const randomArr = arr[randomNumber];
    return randomArr;
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