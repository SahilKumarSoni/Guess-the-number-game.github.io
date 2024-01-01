let randomNumber = parseInt(Math.random()*100+1)

const submit = document.querySelector('#subt')
const userInput = document.querySelector("#guessField")
const guessSlot = document.querySelector(".guesses")
const remaining = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")
const startOver = document.querySelector(".resultParas")

const p = document.createElement('p')

// let prevGuess = []
let numGuess = 0

let playGame = true

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert(`Please enter a valid Number`);
    } else if(guess<1){
        alert(`Please enter a number greater than 1`);
    } else if(guess>100){
        alert(`Please enter a number lesser than 100`);
    } else{
        // prevGuess.push(guess);
        if(numGuess === 9){
            cleanUpGuess(guess);
            displayMessage(`Game Over! Random Number was ${randomNumber}`)
            endGame()
        } else{
            cleanUpGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right!`)
        endGame()
    } else if(guess < randomNumber){
        displayMessage(`Your guessed number is TOO low`)
    } else if(guess > randomNumber){
        displayMessage(`Your guessed number is TOO high`)
    }
}

function cleanUpGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}`
    numGuess++
    remaining.innerHTML = `${10-numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `<p>${message}</p>`
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')
    p.classList.add('button');
    p.innerHTML = `<button id="newGame">Start new game</button>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(){
        randomNumber = parseInt(Math.random()*100+1)
        // prevGuess = []
        numGuess = 0
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${10-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        displayMessage(``)
        playGame = true
    })
}