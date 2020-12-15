// problems
// validate input and board constraints
// count live neighbors
// determine if each cell should be alive
// generate next state

const DEAD = '.';
const ALIVE = '*';

const isBoardValid = (board) => {
  const initWidth = board[0].length;

  for(let i = 1; i < initWidth; i++) {
    if (board[i].length != initWidth) return false
  }

  return true;
}

const wrap = (n, max) => n < 0 ? max + n : n % max;

const countLiveNeighbors = (board, pos) => {
  const {i, j} = pos;
  let count = 0;

  const getNeighbor = (x, y) => board[wrap(x, board.length)][wrap(y, board[0].length)];

  [-1, 0, 1].forEach((iOffset) => {
    [-1, 0, 1].forEach((jOffset) => {
      if (iOffset === 0 && jOffset === 0) return;
      count += getNeighbor(i + iOffset, j + jOffset) === ALIVE ? 1 : 0;
    });
  })

  return count;
}

const shouldLive = (currentState, liveNeighbors) => {
  return currentState === DEAD
    ? liveNeighbors === 3
    : [3,2].includes(liveNeighbors);
};

const nextGeneration = (board) => board.map(
  (row, i) => row.map(
    (cell, j) => shouldLive(cell, countLiveNeighbors(board, {i, j})) ? ALIVE : DEAD
  )
);

const run = (board) => nextGeneration(board);

const currentGen = run([
  ["*",".",".",".","."],
  [".",".",".",".","."],
  [".",".",".",".","."],
  [".",".",".",".","."],
  ["*","*",".",".","*"]]);

currentGen.forEach((col) => {
  let tmp = '';
  col.forEach((cell) => {
    tmp = `${tmp} ${cell} `
  });
  console.log(tmp);
});