import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/home';
import GamePage from './pages/game';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game/:difficulty" element={<GamePage />} />
    </Routes>
  );
}
