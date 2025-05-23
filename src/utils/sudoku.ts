type Grid = number[][];

export function generatePuzzle(difficulty: 'easy' | 'medium' | 'hard'): { puzzle: Grid; solution: Grid } {
  const full = generateFullGrid();
  const puzzle = removeCells(full.map(row => [...row]), difficulty);
  return { puzzle, solution: full };
}

function generateFullGrid(): Grid {
  const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillGrid(grid);
  return grid;
}

function fillGrid(grid: Grid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        const nums = shuffle([1,2,3,4,5,6,7,8,9]);
        for (let n of nums) {
          if (isValid(grid, r, c, n)) {
            grid[r][c] = n;
            if (fillGrid(grid)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(grid: Grid, row: number, col: number, val: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === val || grid[i][col] === val) return false;
    const br = 3 * Math.floor(row/3) + Math.floor(i/3);
    const bc = 3 * Math.floor(col/3) + (i % 3);
    if (grid[br][bc] === val) return false;
  }
  return true;
}

function removeCells(grid: Grid, difficulty: string): Grid {
  let toRemove = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;
  while (toRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (grid[r][c] !== 0) {
      grid[r][c] = 0;
      toRemove--;
    }
  }
  return grid;
}

function shuffle<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}
