// script.js
const board = document.getElementById("board");
const playerPositionSpan = document.getElementById("player-position");
const diceResultSpan = document.getElementById("dice-result");
const rollDiceButton = document.getElementById("roll-dice");

const numSquares = 100;
let playerPosition = 0;

// Mapa de escaleras y serpientes
const ladders = { 2: 15, 5: 7, 9: 27, 20: 41, 28: 84, 40: 59, 51: 67, 63: 81 };
const snakes = { 16: 3, 47: 19, 49: 11, 56: 53, 62: 22, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };

// Crear el tablero
function createBoard() {
    for (let i = 1; i <= numSquares; i++) {
        const square = document.createElement("div");
        square.innerText = i;
        square.dataset.index = i;
        
        // Colocar serpientes
        if (snakes[i]) {
            square.classList.add('snake');
        }
        
        // Colocar escaleras
        if (ladders[i]) {
            square.classList.add('ladder');
        }
        
        board.appendChild(square);
    }
}

// Mover al jugador
function movePlayer(roll) {
    // Actualizar la posición del jugador
    playerPosition += roll;

    // Evitar que el jugador se salga del tablero (máximo 100)
    if (playerPosition > 100) {
        playerPosition = 100;
    }

    // Verificar si el jugador cae en una escalera o serpiente
    if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
    } else if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
    }

    // Actualizar la posición en la pantalla
    playerPositionSpan.innerText = playerPosition;
    updateBoard();
}

// Tirar el dado
function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;  // Número aleatorio entre 1 y 6
    diceResultSpan.innerText = roll;
    movePlayer(roll);
}

// Actualizar la visualización del jugador
function updateBoard() {
    const squares = document.querySelectorAll(".board div");
    
    // Resetear colores de todas las casillas
    squares.forEach(square => {
        square.style.backgroundColor = "white";  
    });

    // Resaltar la casilla donde está el jugador
    const playerSquare = document.querySelector(`.board div[data-index="${playerPosition}"]`);
    if (playerSquare) {
        playerSquare.style.backgroundColor = "#4CAF50";  // Color para la casilla del jugador
    }
}

// Iniciar el juego
createBoard();
rollDiceButton.addEventListener("click", rollDice);

// Iniciar visualización
updateBoard();
