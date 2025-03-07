
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Gamepad } from 'lucide-react';
import GameCard from '@/components/GameCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';

// Mock data - will be replaced with Supabase
const allGames = [
  {
    id: 'auraxo',
    title: 'AURAXO',
    description: 'Challenge our adaptive AI in this next-level Tic-Tac-Toe experience with dynamic difficulty.',
    image: 'https://images.unsplash.com/photo-1611032585406-f6b4d079fcf1?q=80&w=800&auto=format&fit=crop',
    playersCount: 12540,
    winRate: 48,
    category: 'strategy',
    leaderboardPosition: 1
  },
  {
    id: 'aurachess',
    title: 'AURACHESS',
    description: 'Test your skills against our neural-network powered chess AI that adapts to your playstyle.',
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop',
    playersCount: 8730,
    winRate: 32,
    category: 'strategy',
    leaderboardPosition: 2
  },
  {
    id: 'auravision',
    title: 'AURAVISION',
    description: 'Expand your vocabulary in this AI-powered word game that challenges your linguistic abilities.',
    image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?q=80&w=800&auto=format&fit=crop',
    playersCount: 6120,
    winRate: 64,
    category: 'puzzle'
  },
  {
    id: 'auraquest',
    title: 'AURAQUEST',
    description: 'Embark on a unique adventure through AI-generated storylines that adapt to your choices.',
    image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=800&auto=format&fit=crop',
    playersCount: 5890,
    winRate: 75,
    category: 'adventure'
  },
  {
    id: 'aurasim',
    title: 'AURASIM',
    description: 'Experience a life simulation where AI creates unique characters and storylines in a virtual world.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    playersCount: 4270,
    winRate: 82,
    category: 'simulation'
  },
  {
    id: 'aurarps',
    title: 'AURARPS',
    description: 'Play rock-paper-scissors against an AI that learns your patterns and adapts its strategy.',
    image: 'https://images.unsplash.com/photo-1559480423-3bf5ef5e529f?q=80&w=800&auto=format&fit=crop',
    playersCount: 3940,
    winRate: 45,
    category: 'casual'
  },
  {
    id: 'aurapuzzle',
    title: 'AURAPUZZLE',
    description: 'Solve procedurally generated puzzles with increasing difficulty levels based on your performance.',
    image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=800&auto=format&fit=crop',
    playersCount: 3120,
    winRate: 58,
    category: 'puzzle'
  },
  {
    id: 'auraracing',
    title: 'AURARACING',
    description: 'Race against AI-controlled opponents on dynamically generated tracks that adapt to your skill level.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
    playersCount: 2870,
    winRate: 61,
    category: 'action'
  }
];

const categories = [
  { id: 'all', name: 'All Games' },
  { id: 'strategy', name: 'Strategy' },
  { id: 'puzzle', name: 'Puzzle' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'simulation', name: 'Simulation' },
  { id: 'action', name: 'Action' },
  { id: 'casual', name: 'Casual' }
];

const Games = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredGames, setFilteredGames] = useState(allGames);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    filterGames(query, activeCategory);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterGames(searchQuery, category);
  };

  const filterGames = (query: string, category: string) => {
    let filtered = allGames;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(game => game.category === category);
    }
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(lowercaseQuery) || 
        game.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredGames(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Games Collection</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore our diverse collection of AI-powered games, each offering unique challenges and adaptive experiences.
            </p>
          </div>

          {/* Search and Categories */}
          <div className="glass-morphism border border-white/10 rounded-xl p-6 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-aura-500"
                />
              </div>

              {/* Categories */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" value={activeCategory} onValueChange={handleCategoryChange}>
                  <TabsList className="w-full bg-space-900/50 border border-white/10 h-auto flex-wrap">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="data-[state=active]:bg-aura-600 data-[state=active]:text-white flex-1"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Gamepad className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Games Found</h3>
              <p className="text-white/60 max-w-md mx-auto">
                We couldn't find any games matching your current filters. Try adjusting your search or category selection.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
