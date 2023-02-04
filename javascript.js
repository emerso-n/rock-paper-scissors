console.info("Javascript loaded")
const menuAnimDelay = 3000

const rock = "rock"
const paper = "paper"
const scissors = "scissors"

const Outcomes = { win: "YOU WIN", loss: "YOU LOSE", tie: "TIE" }
const RoundType = { bo3: "Bo3", bo5: "Bo5", endless: "&infin;"}
let currentRoundType

let playerScore = 0
let computerScore = 0

const menuDiv = document.querySelector("#menu_div_div")
const resultsDiv = document.querySelector("#results_div")

const playerChoiceDiv = document.querySelector("#player-choice")
const computerChoiceDiv = document.querySelector("#computer-choice")
const resultsTextDiv = document.querySelector("#result-text")
const scoreDiv = document.querySelector("#score")

const choiceView = document.querySelector('#buttons_con')
const resultsView = document.querySelector('#results_con')

const roundSelectBtns = menuDiv.querySelectorAll("button")
const choiceBtns = choiceView.querySelectorAll("button")
const againBtn = document.querySelector("#results_div button")

roundSelectBtns.forEach(button => button.addEventListener('click', selectRoundsType))

choiceBtns.forEach(button => { button.addEventListener('click', (e) => e.target.classList.add("hand-animate-out")); button.addEventListener('animationend', displayResult) })

againBtn.addEventListener('click', switchGameViews);

function selectRoundsType(e) {
    if (e.target.id == "bo3_btn") currentRoundType = RoundType.bo3
    else if (e.target.id == "bo5_btn") currentRoundType = RoundType.bo5
    else currentRoundType = RoundType.endless
    switchMenuGameViews()
    switchGameViews()
}

function switchMenuGameViews(){
    resultsDiv.classList.toggle('hide');
    menuDiv.classList.toggle('hide');

    playerChoiceDiv.classList.remove("hand-animate-out");
    computerChoiceDiv.classList.remove("hand-animate-out");
    playerChoiceDiv.classList.add("hand-animate-in");
    computerChoiceDiv.classList.add("hand-animate-in");
    
    playerChoiceDiv.classList.toggle('margin-left');
    computerChoiceDiv.classList.toggle('margin-right');
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
    switchGameViews();
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


let abortController = new AbortController();
let signal = abortController.signal;

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const animateMenu = async () => {
    //change image
    playerChoiceDiv.style.backgroundImage = `url(static/images/hand_${getComputerChoice()}.png)`;
    computerChoiceDiv.style.backgroundImage = `url(static/images/hand_${getComputerChoice()}.png)`;

    //animate in
    playerChoiceDiv.classList.remove("hand-animate-out");
    computerChoiceDiv.classList.remove("hand-animate-out");
    playerChoiceDiv.offsetWidth; //this is a hacky solution to get the animation to retrigger when you remove and readd the class
    computerChoiceDiv.offsetWidth;
    playerChoiceDiv.classList.add("hand-animate-in");
    computerChoiceDiv.classList.add("hand-animate-in");

    //wait
    await sleep(menuAnimDelay);

    //trigger animate out
    playerChoiceDiv.classList.remove("hand-animate-in");
    computerChoiceDiv.classList.remove("hand-animate-in");
    playerChoiceDiv.offsetWidth;
    computerChoiceDiv.offsetWidth;
    playerChoiceDiv.classList.add("hand-animate-out");
    computerChoiceDiv.classList.add("hand-animate-out");
}
playerChoiceDiv.addEventListener('animationend', (e) => {
    e.target.classList.contains("hand-animate-out") == true && menuDiv.classList.contains("hide") == false ? animateMenu() : null
});
animateMenu()


function switchGameViews() {
    choiceView.classList.toggle('hide');
    resultsView.classList.toggle('hide');
}
