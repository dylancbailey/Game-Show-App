const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const phrases = [
    ['This is my first phrase'],
    ['eee ee ee e eeee'],
    ['O ya ya number three'],
    ['one two three four'],
    ['And my last one is mr five'],
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
    const phraseUL = document.querySelector('#phrase ul');
    const randomArr = getRandomPhraseAsArray(arr);
    const splitArr = randomArr.toString().toUpperCase().split('');
    
    for (let i = 0; i < splitArr.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${splitArr[i]}`;

        if (splitArr[i] != ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }

        phraseUL.appendChild(li);
    }
};

// check if a letter is in the phrase
const checkLetter = button => {
    const checkLetter = document.querySelectorAll('.letter');
    let match = null;
    
    for (let i = 0; i < checkLetter.length; i++) {
        let letter = checkLetter[i];

        if (button === letter.innerText) {
            letter.className = 'show';
            match = button;
        }
        
    }
    return match;

};

// remove heart
const heartLost = (missed) => {
    const hearts = document.querySelectorAll('.tries img');

    for (let i = 0; i < hearts.length; i++) {
        const heart = hearts[i];

        if (missed === i) {
            heart.src = 'images/lostHeart.png';
        }
    }
}

// check if the game been won or lost
const checkWin = () => {

};


// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';

    addPhraseToDisplay(phrases);
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const btn = document.querySelectorAll('button');

    for (let i = 0; i < btn.length; i++) {
        
        if (e.target !== btn[i] || btn[i].className === 'chosen') {
            // console.log('Not a button or proper class');
        } else {
            
            btn[i].className = 'chosen';
            const test = checkLetter(btn[i].innerText.toUpperCase());

            if (test === null) {
                heartLost(missed);
                missed++;
                console.log(`You missed: ${missed} time(s)`);
            } else  {
                console.log('Correct!');
            }
        }
        
    }

});