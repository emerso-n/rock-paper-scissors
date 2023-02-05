console.info("Javascript loaded")
const menuAnimDelay = 3000

const rock = "rock"
const paper = "paper"
const scissors = "scissors"

const Outcomes = { win: "YOU WIN", loss: "YOU LOSE", tie: "TIE", gamewin: "GAME WIN", gameloss: "GAME LOSS" }
const RoundType = { bo3: { text: "Bo3", rounds: 3 }, bo5: { text: "Bo5", rounds: 5 }, endless: { text: "" }}
let currentRoundType

let playerScore = 0
let computerScore = 0

let gameStart = false;

const pageCon = document.querySelector("#page_con")

const menuDiv = document.querySelector("#menu_div_div")
const resultsDiv = document.querySelector("#results_div")

const playerChoiceDiv = document.querySelector("#player-choice")
const computerChoiceDiv = document.querySelector("#computer-choice")
const resultsTextDiv = document.querySelector("#result-text")
const scoreDiv = document.querySelector("#score")

const choiceView = document.querySelector('#buttons_con')
const resultsView = document.querySelector('#results_con')

const roundSelectBtns = document.querySelectorAll("#round-buttons_con button")
const choiceBtns = choiceView.querySelectorAll("button")
const againBtn = document.querySelector("#results_div button")
const homeBtn = document.querySelector('h2');

const customNumInput = document.querySelector('#custom-input');
customNumInput.value = 7
const customStartBtn = document.querySelector('#custom-start_btn');
const backBtn = document.querySelector('#back_btn');

roundSelectBtns.forEach(button => button.addEventListener('click', selectRoundsType))

choiceBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        pageCon.style.pointerEvents = "none";
        e.target.classList.add("hand-animate-out");
        e.target.style.backgroundImage = `url(static/images/hand_${e.target.id}.png), url(static/images/${e.target.id}.svg)`;
    });
    button.addEventListener('animationend', (e) => {
        pageCon.style.pointerEvents = "all";
        e.target.classList.remove("hand-animate-out")
        e.target.style.backgroundImage = "";
        displayResult(e)
    }
    );
})

againBtn.addEventListener('click', (e) => e.target.textContent == "Again" ? switchGameViews() : location.reload());
    
homeBtn.addEventListener('click', () => location.reload())

function numLimiter(value) {
    if (+value % 2 != 1) {
        ++value
        customNumInput.value = value;
    }
}

customStartBtn.addEventListener('click', selectRoundsType)

backBtn.addEventListener('click', (e) => {document.querySelector("#custom-input_div").classList.toggle('hide');
document.querySelector("#round-buttons_con").classList.toggle('hide');})

async function selectRoundsType(e) {
    if (e.target.id == "custom_btn") {
        document.querySelector("#custom-input_div").classList.toggle('hide');
        document.querySelector("#round-buttons_con").classList.toggle('hide');
        return
    }
    if (e.target.id == "bo3_btn") {
        currentRoundType = RoundType.bo3
        roundSelectBtns.forEach(button => button.id != e.target.id ? button.style.visibility = "hidden" : button.style.color = "var(--againhovercolor)")
    }
    else if (e.target.id == "bo5_btn") {
        currentRoundType = RoundType.bo5
        roundSelectBtns.forEach(button => button.id != e.target.id ? button.style.visibility = "hidden" : button.style.color = "var(--againhovercolor)")
    }
    else { //custom start btn
        currentRoundType = { text: `Bo${customNumInput.value}`, rounds: customNumInput.value }
        backBtn.style.visibility = "hidden";
        document.querySelector("label").style.visibility = "hidden";
        customStartBtn.style.color = "var(--againhovercolor)";
    }
    //wait for hand animation to finish then:
    // await Sleep.sleep(1000);
    // Sleep.cancel() //this cancels the whole animation loop, if it was waiting
    gameStart = true;
    switchMenuGameViews()
    switchGameViews()
}

function switchMenuGameViews() {
    Sleep.cancel()
    resultsDiv.classList.toggle('hide');
    menuDiv.classList.toggle('hide');

    playerChoiceDiv.classList.remove("hand-animate-out");
    computerChoiceDiv.classList.remove("hand-animate-out");
    playerChoiceDiv.classList.add("hand-animate-in");
    computerChoiceDiv.classList.add("hand-animate-in");

    playerChoiceDiv.classList.toggle('margin-left');
    computerChoiceDiv.classList.toggle('margin-right');

    scoreDiv.textContent = `${currentRoundType.text}  ${playerScore} - ${computerScore}`;
}

function displayResult(e) {
    let playerChoice = e.target.id;
    let computerChoice = getComputerChoice();
    let outcome = getOutcome(playerChoice, computerChoice)
    if (currentRoundType != RoundType.endless) {
        if (playerScore == currentRoundType.rounds / 2 + 0.5) {
            outcome = Outcomes.gamewin;
            againBtn.textContent = "Again?"
        }
        else if (computerScore == currentRoundType.rounds / 2 + 0.5) {
            outcome = Outcomes.gameloss;
            againBtn.textContent = "Again?"
        }
    }
    playerChoiceDiv.style.backgroundImage = `url(static/images/hand_${playerChoice}.png)`;
    computerChoiceDiv.style.backgroundImage = `url(static/images/hand_${computerChoice}.png)`;

    resultsTextDiv.textContent = outcome;
    scoreDiv.innerHTML = `${currentRoundType.text}  ${playerScore} - ${computerScore}`;
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


const Sleep = {
    async sleep(milliseconds) {
        await new Promise(resolve => {
            return this.timeoutID = setTimeout(resolve, milliseconds)
        });
    },
    cancel() {
        clearTimeout(this.timeoutID);
    }
};

const animateMenu = async (delay) => {
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
    await Sleep.sleep(delay);

    //trigger animate out
    playerChoiceDiv.classList.remove("hand-animate-in");
    computerChoiceDiv.classList.remove("hand-animate-in");
    playerChoiceDiv.offsetWidth;
    computerChoiceDiv.offsetWidth;
    playerChoiceDiv.classList.add("hand-animate-out");
    computerChoiceDiv.classList.add("hand-animate-out");
}
playerChoiceDiv.addEventListener('animationend', (e) => {
    e.target.classList.contains("hand-animate-out") == true && gameStart == false ? animateMenu(menuAnimDelay) : null
});
animateMenu(menuAnimDelay)


function switchGameViews() {
    choiceView.classList.toggle('hide');
    resultsView.classList.toggle('hide');
}
