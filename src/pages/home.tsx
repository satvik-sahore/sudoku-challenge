import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="page landing">
      <h1>Sudoku</h1>
      <p>Select difficulty to start</p>
      <div className="buttons">
        {(['easy','medium','hard'] as const).map(level => (
          <button key={level} onClick={() => nav(`/game/${level}`)}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
