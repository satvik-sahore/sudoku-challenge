import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generatePuzzle } from '../utils/sudoku';
import SudokuBoard from '../components/board';
import ReactConfetti from 'react-confetti';

type Grid = number[][];

export default function GamePage() {
  const { difficulty } = useParams<{ difficulty: string }>();
  const navigate = useNavigate();

  const [puzzle, setPuzzle] = useState<Grid>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [current, setCurrent] = useState<Grid>([]);
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!difficulty) {
      navigate('/');
      return;
    }
    const { puzzle: p, solution: s } = generatePuzzle(difficulty as any);
    setPuzzle(p);
    setSolution(s);
    setCurrent(p.map(row => [...row]));
    setErrors(Array(9).fill(null).map(() => Array(9).fill(false)));
   setSolved(false);
  }, [difficulty, navigate]);

 useEffect(() => {
   if (!solved && current.length) {
     const isComplete = current.every((row, r) =>
       row.every((v, c) => v === solution[r][c])
     );
     if (isComplete) setSolved(true);
   }
 }, [current, solution, solved]);

  const onChange = (r: number, c: number, val: number) => {
    const next = current.map(row => [...row]);
    next[r][c] = val;
    setCurrent(next);

    const errs = errors.map(row => [...row]);
    errs[r][c] = val !== 0 && val !== solution[r][c];
    setErrors(errs);
  };

  return (
    <div className="page game">
     {solved && (
       <>
         <div className="congrats">🎉 You solved it! 🎉</div>
        <ReactConfetti
           width={window.innerWidth}
           height={window.innerHeight}
         />
       </>
    )}
      <h2>Difficulty: {difficulty}</h2>
      <SudokuBoard
        puzzle={puzzle}
        current={current}
        errors={errors}
        onCellChange={onChange}
      />
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}
