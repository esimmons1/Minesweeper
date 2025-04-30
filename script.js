// Variables for the game
let grid = []; // Store all cells
let rows, cols, mineCount; // Grid size and number of mines
let gameEl = document.getElementById('game'); // Game display
let introEl = document.getElementById('intro'); // Intro screen
let revealedCells = 0; // Track revealed cells
let totalCells; // Track total non-mine cells

// Start the game based on difficulty
function startGame(difficulty) {
  introEl.style.display = 'none'; // Hide intro
  revealedCells = 0; // Reset revealed cells

  // Set grid size and mines based on difficulty
  if (difficulty === 'easy') {
    rows = cols = 9; mineCount = 10;
  } else if (difficulty === 'medium') {
    rows = cols = 16; mineCount = 40;
  } else {
    rows = cols = 24; mineCount = 99;
  }

  grid = []; // Reset grid
  totalCells = rows * cols - mineCount; // Total non-mine cells
  gameEl.innerHTML = ''; // Clear game area
  gameEl.style.gridTemplateColumns = `repeat(${cols}, 28px)`; // Set grid layout

  // Create cells for the grid
  for (let i = 0; i < rows * cols; i++) {
    let cell = {
      el: document.createElement('div'), // Cell element
      revealed: false, // Cell revealed status
      mine: false, // Cell contains mine or not
      flagged: false, // Cell flagged or not
      neighbors: 0, // Neighboring mine count
      x: i % cols, // X position
      y: Math.floor(i / cols), // Y position
    };

    cell.el.className = 'cell'; // Set CSS class for cell
    cell.el.addEventListener('click', () => reveal(cell)); // Left-click to reveal
    cell.el.addEventListener('contextmenu', e => {
      e.preventDefault();
      toggleFlag(cell); // Right-click to flag
    });

    gameEl.appendChild(cell.el); // Add cell to grid
    grid.push(cell); // Add cell to array
  }

  placeMines(); // Place mines randomly
  calculateNeighbors(); // Calculate neighboring mines
}

// Place mines randomly
function placeMines() {
  let placed = 0;
  while (placed < mineCount) {
    let i = Math.floor(Math.random() * grid.length);
    if (!grid[i].mine) {
      grid[i].mine = true;
      placed++;
    }
  }
}

// Calculate neighboring mines for each cell
function calculateNeighbors() {
  for (let cell of grid) {
    if (cell.mine) continue;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let neighbor = getCell(cell.x + dx, cell.y + dy);
        if (neighbor && neighbor.mine) cell.neighbors++;
      }
    }
  }
}

// Get cell at specific (x, y) position
function getCell(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return null;
  return grid[y * cols + x];
}

// Reveal a cell when clicked
function reveal(cell) {
  if (cell.revealed || cell.flagged) return;
  cell.revealed = true;
  revealedCells++;
  cell.el.classList.add('revealed');

  if (cell.mine) {
    cell.el.classList.add('mine');
    cell.el.textContent = '💣';
    gameOver();
  } else if (cell.neighbors > 0) {
    cell.el.textContent = cell.neighbors;
  } else {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let neighbor = getCell(cell.x + dx, cell.y + dy);
        if (neighbor) reveal(neighbor);
      }
    }
  }

  checkWin(); // Check win condition
}

// Toggle flag on right-click
function toggleFlag(cell) {
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  cell.el.classList.toggle('flagged');
  cell.el.textContent = cell.flagged ? '🚩' : '';
}

// End the game and show all mines
function gameOver() {
  for (let cell of grid) {
    if (cell.mine && !cell.revealed) {
      cell.el.classList.add('revealed', 'mine');
      cell.el.textContent = '💣';
    }
  }
  alert("Game Over");
}

// Check if the player has won
function checkWin() {
  if (revealedCells === totalCells) {
    alert("You Win!");
  }
}
