import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trophy, Medal, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';

// Mock data - will be replaced with Supabase data
const leaderboardData = [
  {
    id: '1',
    rank: 1,
    username: 'ProGamer123',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop',
    score: 15420,
    gamesPlayed: 245,
    winRate: 78,
    favorite: 'AURACHESS'
  },
  {
    id: '2',
    rank: 2,
    username: 'AuraKnight',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    score: 14850,
    gamesPlayed: 187,
    winRate: 72,
    favorite: 'AURAXO'
  },
  {
    id: '3',
    rank: 3,
    username: 'ChessMaster',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
    score: 13980,
    gamesPlayed: 203,
    winRate: 69,
    favorite: 'AURACHESS'
  },
  {
    id: '4',
    rank: 4,
    username: 'TicTacPro',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    score: 12340,
    gamesPlayed: 180,
    winRate: 65,
    favorite: 'AURAXO'
  },
  {
    id: '5',
    rank: 5,
    username: 'AuraQueen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    score: 11290,
    gamesPlayed: 162,
    winRate: 68,
    favorite: 'AURAQUEST'
  },
  {
    id: '6',
    rank: 6,
    username: 'WordWizard',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop',
    score: 10780,
    gamesPlayed: 145,
    winRate: 70,
    favorite: 'AURAVISION'
  },
  {
    id: '7',
    rank: 7,
    username: 'GameKing99',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    score: 9840,
    gamesPlayed: 132,
    winRate: 63,
    favorite: 'AURASIM'
  },
  {
    id: '8',
    rank: 8,
    username: 'QuestMaster',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=100&auto=format&fit=crop',
    score: 8950,
    gamesPlayed: 118,
    winRate: 60,
    favorite: 'AURAQUEST'
  },
  {
    id: '9',
    rank: 9,
    username: 'ChessKnight',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    score: 8240,
    gamesPlayed: 110,
    winRate: 59,
    favorite: 'AURACHESS'
  },
  {
    id: '10',
    rank: 10,
    username: 'AuraExplorer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    score: 7830,
    gamesPlayed: 98,
    winRate: 62,
    favorite: 'AURAQUEST'
  }
];

const games = [
  { id: 'all', name: 'All Games' },
  { id: 'auraxo', name: 'AURAXO' },
  { id: 'aurachess', name: 'AURACHESS' },
  { id: 'auravision', name: 'AURAVISION' },
  { id: 'auraquest', name: 'AURAQUEST' },
  { id: 'aurasim', name: 'AURASIM' },
  { id: 'aurarps', name: 'AURARPS' },
];

const timeframes = [
  { id: 'all-time', name: 'All Time' },
  { id: 'this-month', name: 'This Month' },
  { id: 'this-week', name: 'This Week' },
  { id: 'today', name: 'Today' },
];

const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(searchParams.get('game') || 'all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');
  const [filteredData, setFilteredData] = useState(leaderboardData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setFilteredData(leaderboardData);
    } else {
      const filtered = leaderboardData.filter(player => 
        player.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleGameChange = (value: string) => {
    setSelectedGame(value);
    if (value !== 'all') {
      setSearchParams({ game: value });
      // In real implementation, this would filter from Supabase
      // For now, just simulate filtering
      const gameFilterMap: Record<string, string> = {
        'auraxo': 'AURAXO',
        'aurachess': 'AURACHESS',
        'auravision': 'AURAVISION',
        'auraquest': 'AURAQUEST',
        'aurasim': 'AURASIM',
        'aurarps': 'AURARPS',
      };
      
      const filtered = leaderboardData.filter(player => 
        player.favorite === gameFilterMap[value]
      );
      setFilteredData(filtered.length > 0 ? filtered : leaderboardData);
    } else {
      setSearchParams({});
      setFilteredData(leaderboardData);
    }
  };

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    // In real implementation, this would filter from Supabase
    // For now, just keep the same data
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Global Leaderboard</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Track the top players across all AURAGZ games and see where you stand in the rankings.
            </p>
          </div>

          {/* Filters */}
          <div className="glass-morphism border border-white/10 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-aura-500"
                />
              </form>

              {/* Game Filter */}
              <div className="space-y-2">
                <Label className="text-sm text-white/70 flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5" />
                  Game
                </Label>
                <Select value={selectedGame} onValueChange={handleGameChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-900 border-white/10">
                    {games.map(game => (
                      <SelectItem key={game.id} value={game.id} className="text-white focus:bg-white/10 focus:text-white">
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Timeframe Filter */}
              <div className="space-y-2">
                <Label className="text-sm text-white/70 flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5" />
                  Timeframe
                </Label>
                <Select value={selectedTimeframe} onValueChange={handleTimeframeChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-900 border-white/10">
                    {timeframes.map(timeframe => (
                      <SelectItem key={timeframe.id} value={timeframe.id} className="text-white focus:bg-white/10 focus:text-white">
                        {timeframe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Top 3 Players Highlight */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6 text-white/90 text-center">Top Players</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredData.slice(0, 3).map((player, index) => (
                <div key={player.id} className="glass-morphism border border-white/10 rounded-xl p-5 text-center relative overflow-hidden">
                  {/* Trophy for 1st place */}
                  {index === 0 && (
                    <div className="absolute top-3 right-3">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                    </div>
                  )}
                  
                  {/* Medal icons */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-aura-500 to-transparent opacity-50"></div>
                  <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 mb-4" style={{
                    borderColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'
                  }}>
                    <img 
                      src={player.avatar} 
                      alt={player.username} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{player.username}</h3>
                  <p className="text-white/70 text-sm mb-3">Rank #{player.rank}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-aura-400 font-bold">{player.score.toLocaleString()}</p>
                      <p className="text-xs text-white/60">Score</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{player.gamesPlayed}</p>
                      <p className="text-xs text-white/60">Games</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{player.winRate}%</p>
                      <p className="text-xs text-white/60">Win Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-space-800">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-white/70">Rank</TableHead>
                  <TableHead className="text-white/70">Player</TableHead>
                  <TableHead className="text-white/70 text-right">Score</TableHead>
                  <TableHead className="text-white/70 text-right hidden md:table-cell">Games</TableHead>
                  <TableHead className="text-white/70 text-right hidden md:table-cell">Win Rate</TableHead>
                  <TableHead className="text-white/70 text-right hidden lg:table-cell">Favorite Game</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((player) => (
                  <TableRow key={player.id} className="hover:bg-white/5 border-white/10">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center">
                        {player.rank <= 3 ? (
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mr-2" 
                            style={{
                              backgroundColor: player.rank === 1 
                                ? 'rgba(255, 215, 0, 0.2)' 
                                : player.rank === 2 
                                  ? 'rgba(192, 192, 192, 0.2)' 
                                  : 'rgba(205, 127, 50, 0.2)'
                            }}
                          >
                            <Medal className="h-3.5 w-3.5" style={{
                              color: player.rank === 1 
                                ? '#FFD700' 
                                : player.rank === 2 
                                  ? '#C0C0C0' 
                                  : '#CD7F32'
                            }} />
                          </div>
                        ) : (
                          <span className="w-6 mr-2 text-center">{player.rank}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={player.avatar} 
                            alt={player.username} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white">{player.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-aura-400">
                      {player.score.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-white hidden md:table-cell">
                      {player.gamesPlayed}
                    </TableCell>
                    <TableCell className="text-right text-white hidden md:table-cell">
                      {player.winRate}%
                    </TableCell>
                    <TableCell className="text-right text-white hidden lg:table-cell">
                      {player.favorite}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination - Will be implemented with Supabase */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                disabled
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-aura-600 border-aura-600 text-white hover:bg-aura-700"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
