//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener

game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});



//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    console.log(guess);

    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if (guess === winningNum) {
        //Game over won
        gameOver(true, `${winningNum} is correct, You Win!`);
    } else {
        //Wrong number
        guessesLeft -= 1;
        if (guessesLeft > 0) {
            //Change border color
            guessInput.style.borderColor = 'red';
            //Set message
            setMessage(`${guess} is not a correct guess, you have ${guessesLeft} guess left`, 'red');
            //Clear Input
            guessInput.value = '';
        } else {
            gameOver(false, `Game is over, You Lost, winning number was ${winningNum}`);
            guessInput.value = '';
        }

    }
});

//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disbale input
    guessInput.disabled = true;
    //CHange border
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get random number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}