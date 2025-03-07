
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Trophy, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// TicTacToe Types
type Player = 'X' | 'O';
type Board = (Player | null)[];
type GameStatus = 'playing' | 'won' | 'draw' | 'waiting';

const Auraxo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  // Game state
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [aiThinking, setAiThinking] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showIntro, setShowIntro] = useState(true);
  const [stats, setStats] = useState({
    played: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0
  });
  
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  // Fetch user stats
  useEffect(() => {
    if (user) {
      fetchGameStats();
    }
  }, [user]);
  
  const fetchGameStats = async () => {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', user?.id)
        .eq('game_id', 'auraxo')
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching game stats:', error);
        return;
      }
      
      if (data) {
        const winRate = data.total_games > 0 
          ? Math.round((data.wins / data.total_games) * 100) 
          : 0;
          
        setStats({
          played: data.total_games,
          wins: data.wins,
          losses: data.losses,
          draws: data.draws,
          winRate
        });
      } else {
        // Initialize stats if they don't exist
        if (user) {
          await supabase
            .from('game_stats')
            .insert({
              user_id: user.id,
              game_id: 'auraxo',
              wins: 0,
              losses: 0,
              draws: 0,
              total_games: 0
            });
        }
      }
    } catch (err) {
      console.error('Error fetching game stats:', err);
    }
  };
  
  // Update user stats
  const updateGameStats = async (result: 'win' | 'loss' | 'draw') => {
    if (!user) return;
    
    try {
      const updates: any = {
        total_games: stats.played + 1
      };
      
      if (result === 'win') {
        updates.wins = stats.wins + 1;
      } else if (result === 'loss') {
        updates.losses = stats.losses + 1;
      } else {
        updates.draws = stats.draws + 1;
      }
      
      const { error } = await supabase
        .from('game_stats')
        .update(updates)
        .eq('user_id', user.id)
        .eq('game_id', 'auraxo');
        
      if (error) throw error;
      
      // Update local stats
      const newStats = {
        played: stats.played + 1,
        wins: result === 'win' ? stats.wins + 1 : stats.wins,
        losses: result === 'loss' ? stats.losses + 1 : stats.losses,
        draws: result === 'draw' ? stats.draws + 1 : stats.draws,
        winRate: 0
      };
      
      newStats.winRate = Math.round((newStats.wins / newStats.played) * 100);
      setStats(newStats);
      
    } catch (err) {
      console.error('Error updating game stats:', err);
    }
  };
  
  const startGame = () => {
    setShowIntro(false);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStatus('playing');
    playSound('button');
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStatus('playing');
    playSound('button');
  };
  
  const checkWinner = (boardToCheck: Board): Player | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] as Player;
      }
    }
    return null;
  };
  
  const isBoardFull = (boardToCheck: Board): boolean => {
    return boardToCheck.every(cell => cell !== null);
  };
  
  const handleCellClick = (index: number) => {
    if (gameStatus !== 'playing' || board[index] !== null || aiThinking) {
      return;
    }
    
    playSound('button');
    
    // Player move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    // Check for win or draw
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameStatus('won');
      playSound('success');
      updateGameStats('win');
      return;
    }
    
    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      updateGameStats('draw');
      return;
    }
    
    // AI move
    setAiThinking(true);
    setTimeout(() => {
      const aiMoveIndex = getAIMove(newBoard);
      const aiBoard = [...newBoard];
      aiBoard[aiMoveIndex] = 'O';
      setBoard(aiBoard);
      
      // Check if AI won
      const aiWinner = checkWinner(aiBoard);
      if (aiWinner) {
        setWinner(aiWinner);
        setGameStatus('won');
        playSound('error');
        updateGameStats('loss');
      } else if (isBoardFull(aiBoard)) {
        setGameStatus('draw');
        updateGameStats('draw');
      }
      
      setAiThinking(false);
    }, 500);
  };
  
  // AI logic based on difficulty
  const getAIMove = (currentBoard: Board): number => {
    // Easy: Random empty cell
    if (difficulty === 'easy') {
      const emptyCells = currentBoard.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    // Medium & Hard: Try to win or block player
    // Check if AI can win
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'O';
        if (checkWinner(boardCopy) === 'O') {
          return i; // Winning move
        }
      }
    }
    
    // Check if player can win and block
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'X';
        if (checkWinner(boardCopy) === 'X') {
          return i; // Blocking move
        }
      }
    }
    
    // Hard: Strategic moves
    if (difficulty === 'hard') {
      // Take center if available
      if (currentBoard[4] === null) return 4;
      
      // Take corners if available
      const corners = [0, 2, 6, 8].filter(i => currentBoard[i] === null);
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      }
    }
    
    // Default: take any empty cell
    const emptyCells = currentBoard.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };
  
  // Render cell with appropriate styling
  const renderCell = (index: number) => {
    const value = board[index];
    const isWinningCell = winner && winningCombinations.some(
      combo => combo.includes(index) && combo.every(i => board[i] === winner)
    );
    
    return (
      <button
        onClick={() => handleCellClick(index)}
        disabled={gameStatus !== 'playing' || value !== null || aiThinking}
        className={`w-24 h-24 text-4xl font-bold flex items-center justify-center rounded-lg transition-all duration-300 ${
          isWinningCell ? 'bg-aura-600/50 text-white animate-pulse' : 
          value === null ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10'
        }`}
      >
        {value}
      </button>
    );
  };
  
  // Render game status message
  const renderStatus = () => {
    if (gameStatus === 'waiting') {
      return null;
    }
    
    if (gameStatus === 'won') {
      return (
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">
            {winner === 'X' ? 'أحسنت! لقد فزت!' : 'للأسف، لقد خسرت.'}
          </p>
        </div>
      );
    }
    
    if (gameStatus === 'draw') {
      return (
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">تعادل! مباراة جيدة.</p>
        </div>
      );
    }
    
    if (aiThinking) {
      return (
        <div className="text-center mb-4">
          <p className="text-white/70">الذكاء الاصطناعي يفكر...</p>
        </div>
      );
    }
    
    return (
      <div className="text-center mb-4">
        <p className="text-white/70">دورك للعب</p>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center">
            <Link to="/games" className="mr-2">
              <Button 
                variant="ghost" 
                className="bg-white/5 border-white/10 hover:bg-white/10"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('button')}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                عودة إلى الألعاب
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">Auraxo</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-morphism p-6 rounded-xl">
              {showIntro ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">مرحبًا بك في لعبة Auraxo</h2>
                  <p className="text-white/70">
                    Auraxo هي نسخة متطورة من لعبة إكس-أو الكلاسيكية مدعومة بالذكاء الاصطناعي. 
                    تتكيف اللعبة مع أسلوب لعبك وتقدم تحديًا متزايدًا كلما تحسنت مهاراتك.
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">اختر مستوى الصعوبة:</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant={difficulty === 'easy' ? 'default' : 'outline'}
                        className={`${difficulty === 'easy' ? 'bg-aura-600 text-white' : 'bg-white/5 border-white/10 text-white'}`}
                        onClick={() => {
                          setDifficulty('easy');
                          playSound('button');
                        }}
                      >
                        سهل
                      </Button>
                      <Button 
                        variant={difficulty === 'medium' ? 'default' : 'outline'}
                        className={`${difficulty === 'medium' ? 'bg-aura-600 text-white' : 'bg-white/5 border-white/10 text-white'}`}
                        onClick={() => {
                          setDifficulty('medium');
                          playSound('button');
                        }}
                      >
                        متوسط
                      </Button>
                      <Button 
                        variant={difficulty === 'hard' ? 'default' : 'outline'}
                        className={`${difficulty === 'hard' ? 'bg-aura-600 text-white' : 'bg-white/5 border-white/10 text-white'}`}
                        onClick={() => {
                          setDifficulty('hard');
                          playSound('button');
                        }}
                      >
                        صعب
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-aura-600 hover:bg-aura-700 text-white"
                      onClick={startGame}
                    >
                      ابدأ اللعب
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {renderStatus()}
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {Array(9).fill(null).map((_, i) => (
                      <div key={i}>{renderCell(i)}</div>
                    ))}
                  </div>
                  
                  {gameStatus !== 'playing' && (
                    <Button 
                      className="mb-4 bg-aura-600 hover:bg-aura-700 text-white"
                      onClick={resetGame}
                    >
                      العب مرة أخرى
                    </Button>
                  )}
                  
                  <div className="flex gap-4 mt-4">
                    <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                      المستوى: {difficulty === 'easy' ? 'سهل' : difficulty === 'medium' ? 'متوسط' : 'صعب'}
                    </Badge>
                    
                    <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                      أنت تلعب بـ: X
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <Card className="glass-morphism bg-space-900/50 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-aura-400" />
                    إحصائياتك
                  </h3>
                  
                  {user ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-white">{stats.played}</p>
                          <p className="text-xs text-white/60">المباريات</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-white">{stats.winRate}%</p>
                          <p className="text-xs text-white/60">نسبة الفوز</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/5 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-green-500">{stats.wins}</p>
                          <p className="text-xs text-white/60">فوز</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-red-500">{stats.losses}</p>
                          <p className="text-xs text-white/60">خسارة</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 text-center">
                          <p className="text-lg font-bold text-yellow-500">{stats.draws}</p>
                          <p className="text-xs text-white/60">تعادل</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-white/70 mb-2">سجل الدخول لحفظ إحصائياتك</p>
                      <Button 
                        className="bg-aura-600 hover:bg-aura-700 text-white"
                        onClick={() => navigate('/auth')}
                      >
                        تسجيل الدخول
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="glass-morphism bg-space-900/50 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Gamepad2 className="mr-2 h-5 w-5 text-aura-400" />
                    قواعد اللعبة
                  </h3>
                  
                  <ul className="space-y-2 text-white/70 text-sm list-disc list-inside">
                    <li>أنت تلعب بالرمز X والذكاء الاصطناعي يلعب بالرمز O</li>
                    <li>اللاعبون يتناوبون على وضع رموزهم في خلايا فارغة</li>
                    <li>أول لاعب يحصل على ثلاثة رموز في صف أفقي أو عمودي أو قطري يفوز</li>
                    <li>إذا امتلأت جميع الخلايا دون وجود فائز، تنتهي اللعبة بالتعادل</li>
                    <li>يتكيف الذكاء الاصطناعي مع أسلوب لعبك، مما يجعل كل مباراة فريدة</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auraxo;
