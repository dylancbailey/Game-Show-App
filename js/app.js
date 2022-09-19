const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
const resetButton = document.querySelector('.btn__try-again');
const phrases = [
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
let missed = 0;
resetButton.style.display = 'none';

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
    const showing = document.querySelectorAll('.show');

    if (letters.length === showing.length) {
        setTimeout( () => {
            overlay.style.display = 'flex';
            overlay.classList.add('win');
            resetButton.style.display = 'block';
            title.innerText = 'You win!';
        }, 2000);
    } else if (missed > 4) {
        setTimeout( () => {
            overlay.style.display = 'flex';
            overlay.classList.add('lose');
            resetButton.style.display = 'block';
            title.innerText = 'You lose :(';
        }, 500)
    }
};


// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');

    overlay.style.display = 'none';
    overlay.classList.remove('start');
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
        e.classList.remove('wrong');
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
            btn[i].classList.add('chosen');

            // Not shaking when RESTATING GAME FIX IT
            if (test === null) {
                btn[i].classList.add('wrong');
                btn[i].style.animation = 'shake 0.5s';
                heartLost(missed);
                missed++;
            }
        }

    }

    checkWin();

});