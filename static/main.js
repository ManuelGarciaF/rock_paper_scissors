/*
Rock paper scissors game.
*/

const WIN_SCORE = 5;

let playerScore = 0;
let computerScore = 0;
let gameFinished = false;

// Chooses randomly from 0-2 to select the action the computer takes.
const computerPlay = () => {
    switch (Math.floor(Math.random() * 3)) {
        /*
        0 = Rock
        1 = Paper
        2 = Scissors
        */
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
};

/*
Plays a round with playerSelection and computerSelection
*/
const playRound = (playerSelection, computerSelection) => {
    // Check for a Tie.
    if (playerSelection === computerSelection) {
        updateComputerDisplay(computerSelection, 0)
        return;
    }

    //Check result.
    switch (playerSelection) {
        case "rock":
            if (computerSelection === "scissors") {
                updateComputerDisplay(computerSelection, 1)
                playerScore++;
            } else {
                updateComputerDisplay(computerSelection, -1)
                computerScore++;
            }
            break;
        case "paper":
            if (computerSelection === "rock") {
                updateComputerDisplay(computerSelection, 1)
                playerScore++;
            } else {
                updateComputerDisplay(computerSelection, -1)
                computerScore++;
            }
            break;
        case "scissors":
            if (computerSelection === "paper") {
                updateComputerDisplay(computerSelection, 1)
                playerScore++;
            } else {
                updateComputerDisplay(computerSelection, -1)
                computerScore++;
            }
            break;
    }
};

// Updates the face and button for the computer's display.
// Result can is 1 if the player wins, 0 for a tie and -1 if the computer won
const updateComputerDisplay = (computerSelection, result) => {
    
    // Update button
    const computerButton = document.querySelector(".computer-button .fake-button")
    computerButton.classList.remove("rock")
    computerButton.classList.remove("paper")
    computerButton.classList.remove("scissors")
    computerButton.classList.add(computerSelection)

    // Update face
    const computerFace = document.querySelector(".computer-button .computer-face")
    switch (result) {
        case 1:
            computerFace.textContent = "(╯°□°）╯"
            break;
        case 0:
            computerFace.textContent = "( .-. )"
            break;
        case -1:
            computerFace.textContent = "~(˘▾˘~)"
            break;
        default:
            computerFace.textContent = "(⌐■_■)"
            break;
    }
}

const updateScores = (playerSelection) => {
    const computerSelection = computerPlay();
    
    // Calculate result
    playRound(playerSelection, computerSelection);
    
    const scoreDiv = document.querySelector("div.score");
    const resultH3 = document.querySelector("h2.result");
    
    scoreDiv.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;
    if (playerScore >= WIN_SCORE) {
        resultH3.textContent = "Player Wins!";
        gameFinished = true;
        updateComputerDisplay("done", "")
    } else if (computerScore >= WIN_SCORE) {
        resultH3.textContent = "Computer Wins!";
        gameFinished = true;
        updateComputerDisplay("done", "")
    }
};

const buttons = document.querySelectorAll(".player-buttons button");
buttons.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (!gameFinished) {
            e.target.classList.add("clicked");
            updateScores(e.target.dataset.value);
        }
    });
    element.addEventListener("transitionend", (e) => {
        if (e.propertyName !== "transform") return; // make sure function only works once
        e.target.classList.remove("clicked");
    });
});