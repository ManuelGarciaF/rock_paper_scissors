/*
Rock paper scissors game.
*/

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
returns 1 for a Win, 0 for a Tie or -1 for a Lose.
*/
const playRound = (playerSelection, computerSelection) => {
    // Check for a Tie.
    if (playerSelection === computerSelection) return 0;

    //Check result.
    switch (playerSelection) {
        case "rock":
            return computerSelection === "scissors" ? 1 : -1;
        case "paper":
            return computerSelection === "rock" ? 1 : -1;
        case "scissors":
            return computerSelection === "paper" ? 1 : -1;
    }
};

const promptUser = () => {
    let playerSelection;
    let valid = false;
    do {
        playerSelection = prompt("Rock, Paper or Scissors?");
        playerSelection = playerSelection.toLowerCase();
        if (
            playerSelection === "rock" ||
            playerSelection === "paper" ||
            playerSelection === "scissors"
        ) {
            valid = true;
        }
    } while (!valid);
    return playerSelection;
};

const game = (rounds) => {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < rounds; i++) {
        
        let roundScore;
        do {
            roundScore = playRound(promptUser(), computerPlay());
        } while (roundScore === 0);
        
        if (roundScore === 1) {
            playerScore++;
            console.log("You Win!");
        } else {
            console.log("You Lose!");
            computerScore++;
        }
    }
    let result =
        playerScore === computerScore
            ? "It's a tie"
            : playerScore > computerScore
            ? "The Player Wins!"
            : "Computer Wins!";
    console.log(result);
    console.log(`The final score is ${playerScore}-${computerScore}.`);
};
