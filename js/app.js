const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
const resetButton = document.querySelector('.btn__try-again');
const phrases = [
    ['Bite the bullet'],
    ['Curiosity killed the cat'],
    ['Raining cats and dogs'],
    ['A Piece of Cake'],
    ['Two Peas In a Pod'],
];
let missed = 0;
resetButton.style.display = 'none';

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
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
    const overlay = document.querySelector('#overlay');
    const title = document.querySelector('.title');
    const letters = document.querySelectorAll('.letter');

    if (letters.length === 0) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        resetButton.style.display = 'block';
        title.innerText = 'You win!';
    } else if (missed > 4) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        resetButton.style.display = 'block';
        title.innerText = 'You lose :(';
    }

};


// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');

    overlay.style.display = 'none';
    startButton.style.display = 'none';

    addPhraseToDisplay(phrases);
});

// listen for the reset game button to be pressed
resetButton.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    const btn = document.querySelectorAll('.chosen');
    const li = document.querySelectorAll('#phrase ul > li');
    const hearts = document.querySelectorAll('.tries img');

    btn.forEach(e => {
        e.classList.remove('chosen');
    });
    li.forEach(e => {
        e.parentNode.removeChild(e)
    });
    hearts.forEach(e => {
        e.src = 'images/liveHeart.png'
    });

    overlay.style.display = 'none';
    resetButton.style.display = 'none';
    missed = 0;

    addPhraseToDisplay(phrases);
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    const btn = document.querySelectorAll('button');

    for (let i = 0; i < btn.length; i++) {

        if (e.target !== btn[i] || btn[i].className === 'chosen') {
            // console.log('Not a button or proper class');
            // console.log(e.target);
        } else {
            
            const test = checkLetter(btn[i].innerText.toUpperCase());
            btn[i].className = 'chosen';

            if (test === null) {
                heartLost(missed);
                missed++;
            }
        }

    }

    checkWin();

});