console.info("Javascript loaded")

const rock = "rock"
const paper = "paper"
const scissors = "scissors"

const Outcomes = { win: "YOU WIN", loss: "YOU LOSE", tie: "TIE" }

let playerScore = 0
let computerScore = 0

const playerChoiceDiv = document.querySelector("#player-choice")
const computerChoiceDiv = document.querySelector("#computer-choice")
const resultsTextDiv = document.querySelector("#result-text")
const scoreDiv = document.querySelector("#score")

const choiceView = document.querySelector('#buttons_con')
const resultsView = document.querySelector('#results_con')

const choiceBtns = choiceView.querySelectorAll("button")
const againBtn = document.querySelector("#results_div button")

choiceBtns.forEach(button => { button.addEventListener('click', handAnimate); button.addEventListener('animationend', displayResult) })

againBtn.addEventListener('click', switchView);

function handAnimate(e) {
    e.target.classList.add("hand-animate-out")
}

function displayResult(e) {
    e.target.classList.remove("hand-animate-out")

    let playerChoice = e.target.id;
    let computerChoice = getComputerChoice();
    let outcome = getOutcome(playerChoice, computerChoice)

    playerChoiceDiv.style.backgroundImage = `url(static/images/hand_${playerChoice}.png)`;

    computerChoiceDiv.style.backgroundImage = `url(static/images/hand_${computerChoice}.png)`;

    resultsTextDiv.textContent = outcome;
    scoreDiv.textContent = `${playerScore} - ${computerScore}`;
    switchView();
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
        ++playerScore
        return Outcomes.win
    }
    else {
        ++computerScore
        return Outcomes.loss
    }
}


function switchView() {
    choiceView.classList.toggle('hide');
    resultsView.classList.toggle('hide');
}
