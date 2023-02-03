console.info("Javascript loaded")
//you could also make variables for Rock, Paper, and Scissors strings to keep them consistent. idk maybe do that later? yeah seems worth idk
const rock = "rock"
const paper = "paper"
const scissors = "scissors"

const Outcomes = { win: "YOU WIN", loss: "YOU LOSE", tie: "TIE" }

const playerChoiceDiv = document.querySelector("#player-choice")
const computerChoiceDiv = document.querySelector("#computer-choice")
const resultsTextDiv = document.querySelector("#result-text")

const choiceView = document.querySelector('#buttons_con')
const resultsView = document.querySelector('#results_con')

const choiceBtns = choiceView.querySelectorAll("button")
const againBtn = document.querySelector("#results_div button")

choiceBtns.forEach(button => button.addEventListener('click', displayResult))

againBtn.addEventListener('click', switchView);

function displayResult(e) {
    let playerChoice = e.target.id;
    let computerChoice = getComputerChoice();
    let outcome = getOutcome(playerChoice, computerChoice)

    playerChoiceDiv.style.backgroundImage = `url(static/images/hand_${playerChoice}.png)`;
    computerChoiceDiv.style.backgroundImage = `url(static/images/hand_${computerChoice}.png)`;
    resultsTextDiv.textContent = outcome;
    switchView()
}

const rpsArray = [rock, paper, scissors]
function getComputerChoice() {
    //randomly select rock, paper or scissors
    return rpsArray[Math.floor(Math.random() * 3)]
}

function getOutcome(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return Outcomes.tie
    }
    else if (playerSelection == rock && computerSelection == scissors || playerSelection == paper && computerSelection == rock || playerSelection == scissors && computerSelection == paper) {
        return Outcomes.win
    }
    else {
        return Outcomes.loss
    }
}


function switchView() {
    choiceView.classList.toggle('hide');
    resultsView.classList.toggle('hide');
}
