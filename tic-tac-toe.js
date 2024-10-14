let currentPlayer = "✖️";
const gridItems = document.querySelectorAll(".grid-item");
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let isMusicPlaying = false;
const musicToggleButton = document.getElementById("musicToggleButton");
const backgroundMusic = document.getElementById("backgroundMusic");

// Variables de score
let playerXScore = 0;
let playerOScore = 0;

// Sélection des éléments pour afficher les scores
const playerXScoreDisplay = document.getElementById("playerXScore");
const playerOScoreDisplay = document.getElementById("playerOScore");


const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Fonction pour jouer ou arrêter la musique
function toggleMusic() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggleButton.innerText = "🎵 douce mélodie"; 
  } else {
    backgroundMusic.volume = 0.3; 
    backgroundMusic.play();
    musicToggleButton.innerText = "🔇 vas'y ça soule"; 
  }
  isMusicPlaying = !isMusicPlaying; // Inverser l'état de la musique
}


function handleClick(index) {
  if (board[index] !== "" || !gameActive) 
    return;
  board[index] = currentPlayer;
  gridItems[index].innerText = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = "🟣"; // l'ordinateur joue maintenant
    setTimeout(computerMove, 500); // délai de réflexion
  }
}

function computerMove() {
  let availableMoves = board.map((value, index) => value === "" ? index : null).filter(value => value !== null);
  let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

  if (randomMove !== undefined) {
    board[randomMove] = currentPlayer;
    gridItems[randomMove].innerText = currentPlayer;
    checkWinner();
    if (gameActive) {
      currentPlayer = "✖️";  // retourne au joueur
    }
  }
}

function checkWinner() {
  let roundWon = false;
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === "" || board[b] === "" || board[c] === "") continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    alert(`Le joueur ${currentPlayer} a gagné!`);
    updateScore(currentPlayer);  // Met à jour le score du gagnant
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    alert("match nul !");
    gameActive = false;
  }
}

function updateScore(player) {
  if (player === "✖️") {
    playerXScore++;
    playerXScoreDisplay.innerText = `Score ✖️: ${playerXScore}`;
  } else if (player === "🟣") {
    playerOScore++;
    playerOScoreDisplay.innerText = `Score 🟣: ${playerOScore}`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gridItems.forEach(item => item.innerText = "");
  currentPlayer = "✖️";
  gameActive = true;
}

// Ajout des événements de clic sur chaque case
gridItems.forEach((item, index) => {
  item.addEventListener("click", () => handleClick(index));
});

// Ajout d'un bouton de réinitialisation
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

// Ajout d'un événement de clic sur le bouton de musique
musicToggleButton.addEventListener("click", toggleMusic);