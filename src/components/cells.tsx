import React from 'react';

interface Props {
  rowIndex: number;
  colIndex: number;
  value: number;
  fixed: boolean;
  error: boolean;
  onChange: (val: number) => void;
}

export default function Cell({ rowIndex, colIndex, value, fixed, error, onChange }: Props) {
  const classes = ['cell'];
  if (fixed)        classes.push('fixed');
  if (error)        classes.push('error');
  if (rowIndex % 3 === 0)           classes.push('top-border');
  if ((rowIndex + 1) % 3 === 0)     classes.push('bottom-border');
  if (colIndex % 3 === 0)           classes.push('left-border');
  if ((colIndex + 1) % 3 === 0)     classes.push('right-border');

  return (
    <input
      className={classes.join(' ')}
      type="text"
      maxLength={1}
      value={value === 0 ? '' : value}
      disabled={fixed}
      onChange={e => {
        const v = parseInt(e.target.value) || 0;
        if (v >= 0 && v <= 9) onChange(v);
      }}
    />
  );
}
