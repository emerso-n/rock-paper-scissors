console.info("Javascript loaded")
//you could also make variables for Rock, Paper, and Scissors strings to keep them consistent. idk maybe do that later? yeah seems worth idk
const rockStr = "Rock"
const paperStr = "Paper"
const scissorsStr = "Scissors"

const rpsButtons = document.querySelectorAll("#buttons_con button")

rpsButtons.forEach(button => button.addEventListener('click', buttonClicked))

function buttonClicked(e) {
    console.log(e)
}

function getComputerChoice() {
    //randomly select rock, paper or scissors
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return rockStr;
        case 1:
            return paperStr;
        case 2:
            return scissorsStr;
        default:
            console.error("Something very wrong with getComputerChoice()")
            break;
    }
}

function playRound(playerSelection, computerSelection) {
    //there has to be a better way to do this right? right?
    if (playerSelection == computerSelection) {
        return `Tie! ${computerSelection} vs ${computerSelection}`
    }
    if (playerSelection == "rock") {
        switch (computerSelection) {
            case paperStr:
                return "You Lose! Paper beats Rock"
            case scissorsStr:
                return "You Win! Rock beats Scissors"
            default:
                console.error("Something very wrong with playRound()")
                break
        }
    }
    if (playerSelection == "paper") {
        switch (computerSelection) {
            case rockStr:
                return "You Win! Paper beats Rock"
            case scissorsStr:
                return "You Lose! Scissors beats Paper"
            default:
                console.error("Something very wrong with playRound()")
                break
        }
    }
    if (playerSelection == "scissors") {
        switch (computerSelection) {
            case paperStr:
                return "You Win! Scissors beats Paper"
            case rockStr:
                return "You Lose! Rock beats Scissors"
            default:
                console.error("Something very wrong with playRound()")
                break
        }
    }
}

function playGame() {
    for (let i = 0; i < roundsInt; i++) {
        let playerChoice = prompt("Rock, Paper, Scissors: ").toLowerCase()
        console.log(playRound(playerChoice, getComputerChoice()))
    }
}

function displayResult() {
    //put the result script in here and call it from the switches
}