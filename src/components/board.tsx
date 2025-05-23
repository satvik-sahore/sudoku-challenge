import React from 'react';
import Cell from './cells';

type Grid = number[][];

interface Props {
  puzzle: Grid;
  current: Grid;
  errors: boolean[][];
  onCellChange: (r: number, c: number, v: number) => void;
}

export default function SudokuBoard({ puzzle, current, errors, onCellChange }: Props) {
  return (
    <div className="board">
      {current.map((row, r) =>
        row.map((val, c) => (
          <Cell
            key={`${r}-${c}`}
            rowIndex={r}
            colIndex={c}
            value={val}
            fixed={puzzle[r][c] !== 0}
            error={errors[r][c]}
            onChange={v => onCellChange(r, c, v)}
          />
        ))
      )}
    </div>
  );
}
