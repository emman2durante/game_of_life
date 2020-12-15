'''The starting files are unrelated to the exercise.

They show examples of writing and testing
  o) a global function
  o) an instance method
Pick the style most suitable to your exercise.
'''
import time, os

class GameOfLife:
    DEAD_CELL = '.'
    ALIVE_CELL = '*'

    def __init__(self, board):
        self.board = board
        self.height = len(board)
        self.width = len(board[0]) if self.height > 0 else 0

    def count_live_neighbors(self, pos):
        cnt = 0

        i, j = pos[0], pos[1]
        for row in range(i-1, i+2):
            if row < 0 or row >= self.height:
                continue
            # if row < 0:
            #     row = self.height - 1
            # if row >= self.height:
            #     row = 0

            for col in range(j-1, j+2):
                if col < 0 or col >= self.width:
                    continue
                # if col < 0:
                #     col = self.width - 1
                # if col >= self.width:
                #     col = 0

                if (row, col) == (i, j):
                    continue

                cell = self.board[row][col]
                if cell == GameOfLife.ALIVE_CELL:
                    cnt = cnt + 1

        return cnt

    def get_next_cell(self, pos):
        live_neighbor_cnt = self.count_live_neighbors(pos)
        i, j = pos[0], pos[1]
        cell = self.board[i][j]
        if cell == GameOfLife.DEAD_CELL:
            if live_neighbor_cnt == 3:
                return GameOfLife.ALIVE_CELL
            else:
                return GameOfLife.DEAD_CELL
        else:
            if live_neighbor_cnt in (2, 3):
                return GameOfLife.ALIVE_CELL
            else:
                return GameOfLife.DEAD_CELL

    def next_generation(self):
        next_board = []
        rows = range(self.height)

        for row in rows:
            columns = range(self.width)
            next_board_row = []

            for col in columns:
                pos = (row, col)
                next_cell = self.get_next_cell(pos)
                next_board_row.append(next_cell)

            next_board.append(next_board_row)
        return next_board


















def run(board):
    gol = GameOfLife(board)
    return gol.next_generation()

def print_board(board):
    for row in board:
        tmp = ''
        for cell in row:
            tmp = f'{tmp} {cell} '
        print(tmp)

init_board = \
      [[".",".",".",".","."],
      ["*",".","*",".","."],
      ["*","*",".","*","."],
      [".",".","*",".","."],
      [".",".",".",".","."]]

current_gen = run(init_board)
print_board(init_board)
print('')
print('==========================')
print_board(current_gen)

# while (True):


#     # time.sleep(0.01)
#     os.system('clear')
#     current_gen = run(current_gen)
