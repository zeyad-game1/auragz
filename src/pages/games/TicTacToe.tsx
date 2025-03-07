
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { motion } from 'framer-motion';
import { Rotate3D, RefreshCw, Trophy, Brain } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = (Player)[][];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [aiLevel, setAiLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [score, setScore] = useState({ player: 0, ai: 0, tie: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // AI makes a move after player
    if (currentPlayer === 'O' && !winner && !gameOver) {
      setLoading(true);
      // Simulate thinking time
      const timeout = setTimeout(() => {
        makeAiMove();
        setLoading(false);
      }, 700);
      
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, winner, gameOver]);

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner || currentPlayer === 'O' || gameOver || loading) return;
    
    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        setScore({...score, player: score.player + 1});
        toast({
          title: "أنت الفائز!",
          description: "لقد فزت في هذه الجولة!",
          variant: "default",
        });
      } else {
        setScore({...score, ai: score.ai + 1});
        toast({
          title: "فاز الذكاء الاصطناعي",
          description: "حظ أوفر في المرة القادمة!",
          variant: "destructive",
        });
      }
      setGameOver(true);
    } else if (isBoardFull(newBoard)) {
      setScore({...score, tie: score.tie + 1});
      setGameOver(true);
      toast({
        title: "تعادل!",
        description: "انتهت اللعبة بالتعادل",
      });
    } else {
      // Switch players
      setCurrentPlayer('O');
    }
  };

  const makeAiMove = () => {
    if (winner || gameOver) return;
    
    let move: {row: number, col: number} | null = null;
    
    // Different AI strategies based on level
    switch(aiLevel) {
      case 'easy':
        move = makeRandomMove();
        break;
      case 'medium':
        // 50% chance to make a smart move, 50% to make a random move
        move = Math.random() > 0.5 ? findBestMove(board, 1) : makeRandomMove();
        break;
      case 'hard':
        move = findBestMove(board, 3);
        break;
    }
    
    if (move) {
      const newBoard = [...board];
      newBoard[move.row][move.col] = 'O';
      setBoard(newBoard);
      
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        if (gameWinner === 'O') {
          setScore({...score, ai: score.ai + 1});
          toast({
            title: "فاز الذكاء الاصطناعي",
            description: "حظ أوفر في المرة القادمة!",
            variant: "destructive",
          });
        }
        setGameOver(true);
      } else if (isBoardFull(newBoard)) {
        setScore({...score, tie: score.tie + 1});
        setGameOver(true);
        toast({
          title: "تعادل!",
          description: "انتهت اللعبة بالتعادل",
        });
      } else {
        setCurrentPlayer('X');
      }
    }
  };
  
  const makeRandomMove = () => {
    const emptyCells: {row: number, col: number}[] = [];
    
    // Find all empty cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          emptyCells.push({row: i, col: j});
        }
      }
    }
    
    if (emptyCells.length === 0) return null;
    
    // Pick a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };
  
  const findBestMove = (currentBoard: Board, depth: number): {row: number, col: number} | null => {
    // Simplified minimax for better UX (not unbeatable)
    // Check if AI can win in one move
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!currentBoard[i][j]) {
          const tempBoard = JSON.parse(JSON.stringify(currentBoard));
          tempBoard[i][j] = 'O';
          if (checkWinner(tempBoard) === 'O') {
            return {row: i, col: j};
          }
        }
      }
    }
    
    // Check if player can win in one move and block
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!currentBoard[i][j]) {
          const tempBoard = JSON.parse(JSON.stringify(currentBoard));
          tempBoard[i][j] = 'X';
          if (checkWinner(tempBoard) === 'X') {
            return {row: i, col: j};
          }
        }
      }
    }
    
    // Try to take center if available
    if (!currentBoard[1][1]) {
      return {row: 1, col: 1};
    }
    
    // Try to take corners
    const corners = [
      {row: 0, col: 0},
      {row: 0, col: 2},
      {row: 2, col: 0},
      {row: 2, col: 2}
    ];
    
    const availableCorners = corners.filter(
      ({row, col}) => !currentBoard[row][col]
    );
    
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Make a random move
    return makeRandomMove();
  };
  
  const checkWinner = (currentBoard: Board): Player => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (currentBoard[i][0] && 
          currentBoard[i][0] === currentBoard[i][1] && 
          currentBoard[i][0] === currentBoard[i][2]) {
        return currentBoard[i][0];
      }
    }
    
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (currentBoard[0][i] && 
          currentBoard[0][i] === currentBoard[1][i] && 
          currentBoard[0][i] === currentBoard[2][i]) {
        return currentBoard[0][i];
      }
    }
    
    // Check diagonals
    if (currentBoard[0][0] && 
        currentBoard[0][0] === currentBoard[1][1] && 
        currentBoard[0][0] === currentBoard[2][2]) {
      return currentBoard[0][0];
    }
    
    if (currentBoard[0][2] && 
        currentBoard[0][2] === currentBoard[1][1] && 
        currentBoard[0][2] === currentBoard[2][0]) {
      return currentBoard[0][2];
    }
    
    return null;
  };
  
  const isBoardFull = (currentBoard: Board): boolean => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!currentBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  };
  
  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };
  
  const renderCell = (row: number, col: number) => {
    const cellValue = board[row][col];
    const isWinningCell = winner && 
      ((row === 0 && col === 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
       (row === 0 && col === 2 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) ||
       (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][col] === winner) ||
       (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[row][col] === winner));
    
    return (
      <motion.div
        whileHover={{ scale: cellValue ? 1 : 1.05 }}
        whileTap={{ scale: cellValue ? 1 : 0.95 }}
        className={`w-full h-24 sm:h-32 flex items-center justify-center border-2 
          ${isWinningCell ? 'border-green-500 bg-green-500/20' : 'border-aura-500/30 bg-white/5'} 
          rounded-md cursor-pointer text-4xl sm:text-6xl font-bold transition-all
          ${!cellValue && !winner && !gameOver && currentPlayer === 'X' && !loading ? 'hover:bg-white/10' : ''}`}
        onClick={() => handleCellClick(row, col)}
      >
        {cellValue && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cellValue === 'X' ? 'text-aura-400' : 'text-red-400'}
          >
            {cellValue}
          </motion.span>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">اوراكسو</h1>
            <p className="text-white/70">العب ضد الذكاء الاصطناعي المتكيف</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="glass-morphism bg-space-900/40 border-white/10">
                <CardHeader className="pb-2 flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <Rotate3D className="mr-2 h-5 w-5 text-aura-400" />
                    XO لعبة
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                      onClick={resetGame}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      لعبة جديدة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-4 text-center">
                    <div className={`text-lg font-semibold ${currentPlayer === 'X' ? 'text-aura-400' : 'text-red-400'}`}>
                      {gameOver ? (
                        winner ? `الفائز: ${winner === 'X' ? 'أنت' : 'الذكاء الاصطناعي'}` : 'تعادل!'
                      ) : (
                        loading ? 'الذكاء الاصطناعي يفكر...' : `دورك: ${currentPlayer === 'X' ? 'أنت' : 'الذكاء الاصطناعي'}`
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {board.map((row, rowIndex) => (
                      row.map((_, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`}>
                          {renderCell(rowIndex, colIndex)}
                        </div>
                      ))
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-morphism bg-space-900/40 border-white/10 mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-aura-400" />
                    النتائج
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-md">
                      <span className="text-white/80">أنت:</span>
                      <span className="font-bold text-aura-400">{score.player}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-md">
                      <span className="text-white/80">الذكاء الاصطناعي:</span>
                      <span className="font-bold text-red-400">{score.ai}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-md">
                      <span className="text-white/80">تعادل:</span>
                      <span className="font-bold text-white/80">{score.tie}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism bg-space-900/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-aura-400" />
                    مستوى الصعوبة
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <Button 
                      variant={aiLevel === 'easy' ? 'default' : 'outline'}
                      className={`w-full ${aiLevel === 'easy' ? 'bg-aura-600' : 'bg-white/5 border-white/10'}`}
                      onClick={() => setAiLevel('easy')}
                    >
                      سهل
                    </Button>
                    <Button 
                      variant={aiLevel === 'medium' ? 'default' : 'outline'}
                      className={`w-full ${aiLevel === 'medium' ? 'bg-aura-600' : 'bg-white/5 border-white/10'}`}
                      onClick={() => setAiLevel('medium')}
                    >
                      متوسط
                    </Button>
                    <Button 
                      variant={aiLevel === 'hard' ? 'default' : 'outline'}
                      className={`w-full ${aiLevel === 'hard' ? 'bg-aura-600' : 'bg-white/5 border-white/10'}`}
                      onClick={() => setAiLevel('hard')}
                    >
                      صعب
                    </Button>
                  </div>
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

export default TicTacToe;
