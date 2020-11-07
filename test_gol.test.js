import { GOL, isBoardValid, countLiveNeighbors, shouldLive , nextGeneration} from '../src/GOL';

describe('isBoardValid Function', () => {
  test('should return true given a valid board', () => {
    const validBoard = [
      ['.','.','.'],
      ['.','.','.'],
      ['.','.','.'],
    ];

    expect(isBoardValid(validBoard)).toBeTruthy();
  });

  test('should return false given an invalid board', () => {
    const invalidBoard = [
      ['.','.'],
      ['.','.','.'],
      ['.','.','.'],
    ];

    expect(isBoardValid(invalidBoard)).toBeFalsy();
  })
});

describe('countLiveNeighbors Function', () => {
  const board = [
    ['.','*','.'],
    ['*','*','.'],
    ['.','*','.'],
  ];

  test.each([
    [board, {i: 0, j: 0}, 3],
    [board, {i: 1, j: 1}, 3],
    [board, {i: 0, j: 2}, 2],
  ])('should count the correct number of live neighbors given a position', (board, pos, count) => {
    expect(countLiveNeighbors(board, pos)).toEqual(count);
  });
})

describe('shouldLive Function', () => {
    test.each([
        ['.', 1],
        ['.', 2],
        ['*', 1],
        ['*', 4],
    ])('should return false given current state and liveNeighbors', (currentState, liveNeighbors) => {
        expect(shouldLive(currentState, liveNeighbors)).toBeFalsy();
    });
    
    test.each([
        ['.', 3],
        ['*', 2],
        ['*', 3],
    ])('should return true given current state and liveNeighbors', (currentState, liveNeighbors) => {
        expect(shouldLive(currentState, liveNeighbors)).toBeTruthy();
    });
});

describe('nextGeneration Function', () => {
  const curr1 = [
    ['.','*'],
    ['*','*'],
  ];

  const next1 =[
    ['*','*'],
    ['*','*'],
  ];

  const curr2 = [
    [".",".",".",".",".",".",".","."],
    [".",".",".",".","*",".",".","."],
    [".",".",".","*","*",".",".","."],
    [".",".",".",".",".","*",".","."]
  ]

  const next2 = [
    [".",".",".",".",".",".",".","."],
    [".",".",".","*","*",".",".","."],
    [".",".",".","*","*","*",".","."],
    [".",".",".",".","*",".",".","."],
  ];

  test.each(
    [
      [curr1, next1],
      [curr2, next2],
    ]
  )('should generate the next state', (currentState, nextState) => {
    expect(nextGeneration(currentState)).toEqual(nextState);
  });
});