let grid = [];
let rows, cols, mineCount;
let gameEl = document.getElementById('game');
let introEl = document.getElementById('intro');
let revealedCells = 0;
let totalCells;

function startGame(difficulty) {
  // Hide the intro and show the game
  introEl.style.display = 'none';
  revealedCells = 0;

  // Set grid size and mine count based on difficulty
  if (difficulty === 'easy') {
    rows = cols = 9; mineCount = 10;
  } else if (difficulty === 'medium') {
    rows = cols = 16; mineCount = 40;
  } else {
    rows = cols = 24; mineCount = 99;
  }

  grid = [];
  totalCells = rows * cols - mineCount;
  gameEl.innerHTML = '';
  gameEl.style.gridTemplateColumns = `repeat(${cols}, 28px)`;

  // Create cells
  for (let i = 0; i < rows * cols; i++) {
    let cell = {
      el: document.createElement('div'),
      revealed: false,
      mine: false,
      flagged: false,
      neighbors: 0,
      x: i % cols,
      y: Math.floor(i / cols),
    };

    cell.el.className = 'cell';
    cell.el.addEventListener('click', () => reveal(cell));
    cell.el.addEventListener('contextmenu', e => {
      e.preventDefault();
      toggleFlag(cell);
    });

    gameEl.appendChild(cell.el);
    grid.push(cell);
  }

  placeMines();
  calculateNeighbors();
}

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

function getCell(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return null;
  return grid[y * cols + x];
}

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

  checkWin();
}

function toggleFlag(cell) {
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  cell.el.classList.toggle('flagged');
  cell.el.textContent = cell.flagged ? '🚩' : '';
}

function gameOver() {
  for (let cell of grid) {
    if (cell.mine && !cell.revealed) {
      cell.el.classList.add('revealed', 'mine');
      cell.el.textContent = '💣';
    }
  }
  alert("Game Over");
}

function checkWin() {
  if (revealedCells === totalCells) {
    alert("You Win!");
  }
}
