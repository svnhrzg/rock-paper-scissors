let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});
document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});
document.querySelector(".js-reset-score-button").addEventListener("click", () => {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  
  updateScore();
  saveToStorage();
});

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result;

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You loose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You loose";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You loose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You loose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  document.querySelector(
    ".js-player-move"
  ).innerHTML = `<img src="images/${playerMove}-left.png" />`;
  document.querySelector(
    ".js-computer-move"
  ).innerHTML = `<img src="images/${computerMove}-right.png" />`;
  document.querySelector(
    ".js-display-result"
  ).innerHTML = `${result}`;

  updateScore();
  saveToStorage();
  displayResult();
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const autoPlayButton = document.querySelector('.js-auto-play-button');

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      autoPlayButton.innerHTML = 'Stop play';
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButton.innerHTML = 'Auto play';
  }
}

function displayResult() {
  setTimeout(() => {
      document.querySelector(".js-display-result").innerHTML = '';
    }, 600);
}

function updateScore() {
  document.querySelector(
    ".js-score-player1"
  ).innerHTML = `Wins: ${score.wins}`;
  document.querySelector(
    ".js-score-computer"
  ).innerHTML = `Wins: ${score.losses}`;
  document.querySelector(
    ".js-score-ties"
  ).innerHTML = `Ties: ${score.ties}`;
}

function saveToStorage() {
  localStorage.setItem("score", JSON.stringify(score));
}
