/*
GAME FUNCTION
 -Player must guess a number between a min and max
 -Player gets a certain amount of guesses
 -Notify the player of guesses remaining 
 -Notify the player of the correct answer if loose
 -Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listen
game.addEventListener('click', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
    // console.log(guessInput.value);
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if won
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        } else {
            // Game continue - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            //  Clear Input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// function setMessage(msg) {
//     message.style.color = 'red';
//     message.textContent = msg;
// }

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
