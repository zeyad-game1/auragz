
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Games from '@/pages/Games';
import About from '@/pages/About';
import Leaderboard from '@/pages/Leaderboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import TicTacToe from '@/pages/games/TicTacToe';
import Chess from '@/pages/games/Chess';
import Auraxo from '@/pages/games/Auraxo';
import FAQ from '@/pages/FAQ';
import Privacy from '@/pages/Privacy';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/games/chess" element={<Chess />} />
        <Route path="/games/auraxo" element={<Auraxo />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
