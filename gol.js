// problems
// validate input and board constraints
// count live neighbors
// determine if each cell should be alive
// generate next state

const DEAD = '.';
const ALIVE = '*';

export const isBoardValid = (board) => {
  const initWidth = board[0].length;

  for(let i = 1; i < initWidth; i++) {
    if (board[i].length != initWidth) return false
  }

  return true;
}

export const countLiveNeighbors = (board, pos) => {
  const {i, j} = pos;
  let count = 0;

  const getNeighbor = (x, y) => {
    const isOutOfBounds = x >= board.length || x < 0 || y >= board[0].length || y < 0;
    return !isOutOfBounds ? board[x][y] : DEAD;
  }

  [-1, 0, 1].forEach((iOffset) => {
    [-1, 0, 1].forEach((jOffset) => {
      if (iOffset === 0 && jOffset === 0) return;
      count += getNeighbor(i + iOffset, j + jOffset) === ALIVE ? 1 : 0;
    });
  })

  return count;
}

export const shouldLive = (currentState, liveNeighbors) => {
  return currentState === DEAD
    ? liveNeighbors === 3
    : [3,2].includes(liveNeighbors);
};

export const nextGeneration = (board) => board.map(
  (row, i) => row.map(
    (cell, j) => shouldLive(cell, countLiveNeighbors(board, {i, j})) ? ALIVE : DEAD
  )
);