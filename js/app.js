const QWERTY = document.querySelector('#qwerty');
const START_BUTTON = document.querySelector('.btn__reset');
const RESET_BUTTON = document.querySelector('.btn__try-again');
const PHRASES = [
    {
        question: '🧽🟨👖',
        answer: 'Spongebob Squarepants'
    },
    {
        question: '🎈🎈🏠',
        answer: 'Up'
    },
    {
        question: '🦉🪄⚡',
        answer: 'Harry Potter'
    },
    {
        question: '🦇👨',
        answer: 'Batman'
    },
    {
        question: '👩‍❤️‍👨🌕🐺',
        answer: 'Twilight'
    },
    {
        question: '👱🏻‍♀️🐇🍄🎩🐛',
        answer: 'Alice In Wonderland'
    },
    {
        question: '🏊‍♂️🦈',
        answer: 'Jaws'
    },
    {
        question: '❄️🚢👩‍❤️‍👨🚪',
        answer: 'Titanic'
    },
    {
        question: '🐕🍝🐩',
        answer: 'Lady and the Tramp'
    },
    {
        question: '🧙🏻‍♂️🤴💍🌋',
        answer: 'The Lord of the Rings'
    },
    {
        question: '🧑‍🔬💊🤷🏻‍♂️🚐',
        answer: 'Breaking Bad'
    },
];
let MISSED = 0;
RESET_BUTTON.style.display = 'none';

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const header = document.querySelector('.header');
    const randomNumber = Math.floor(Math.random() * 11);
    const randomArr = arr[randomNumber];
    const randomAnswer = randomArr.answer;
    const randomQuestion = randomArr.question;

    header.innerText = `${randomQuestion}`;

    return randomAnswer;
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
            li.classList.add('letter');
        } else {
            li.classList.add('space');
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
            letter.classList.add('show');
            match = button;
        }

    }
    return match;
};

// remove heart
const heartLost = (MISSED) => {
    const hearts = document.querySelectorAll('.tries img');

    for (let i = 0; i < hearts.length; i++) {
        const heart = hearts[i];

        if (MISSED === i) {
            heart.src = 'images/lostHeart.png';
        }
    }
}

// check if the game been won or lost
const checkWin = () => {
    const overlay = document.querySelector('#overlay');
    const title = document.querySelector('.title');
    const letters = document.querySelectorAll('.letter');
    const showing = document.querySelectorAll('.show');

    if (letters.length === showing.length) {
        setTimeout( () => {
            overlay.style.display = 'flex';
            overlay.classList.add('win');
            RESET_BUTTON.style.display = 'block';
            title.innerText = 'You win!';
        }, 1500);
    } else if (MISSED > 4) {
        setTimeout( () => {
            overlay.style.display = 'flex';
            overlay.classList.add('lose');
            RESET_BUTTON.style.display = 'block';
            title.innerText = 'You lose :(';
        }, 400)
    }
};


// listen for the start game button to be pressed
START_BUTTON.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');

    overlay.style.display = 'none';
    overlay.classList.remove('start');
    START_BUTTON.style.display = 'none';

    addPhraseToDisplay(PHRASES);
});

// listen for the reset game button to be pressed
RESET_BUTTON.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    const btn = document.querySelectorAll('.chosen');
    const li = document.querySelectorAll('#phrase ul > li');
    const hearts = document.querySelectorAll('.tries img');

    btn.forEach(e => {
        e.classList.remove('chosen');
        e.classList.remove('wrong');
        e.style.animation = '';
        e.disabled = false;
    });
    li.forEach(e => {
        e.parentNode.removeChild(e)
    });
    hearts.forEach(e => {
        e.src = 'images/liveHeart.png'
    });

    overlay.style.display = 'none';
    overlay.classList.remove('win');
    overlay.classList.remove('lose');
    RESET_BUTTON.style.display = 'none';
    MISSED = 0;

    addPhraseToDisplay(PHRASES);
});

// listen for the onscreen keyboard to be clicked
QWERTY.addEventListener('click', (e) => {

    const btn = e.target;
    const letter = checkLetter(btn.innerText.toUpperCase());

    if (btn.tagName === "BUTTON") {
        btn.classList.add("chosen");
        btn.disabled = true;
    }

    if (letter === null) {
        btn.classList.add("wrong");
        btn.style.animation = "shake 0.5s";
        heartLost(MISSED);
        MISSED++;
    }

    checkWin();

});