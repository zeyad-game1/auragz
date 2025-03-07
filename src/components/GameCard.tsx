
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Users, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  playersCount: number;
  winRate: number;
  leaderboardPosition?: number;
}

const GameCard = ({ id, title, description, image, playersCount, winRate, leaderboardPosition }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        z: 20
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 10
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/games/${id}`}>
        <Card className="h-full overflow-hidden border-white/10 bg-space-900/60 backdrop-blur-sm relative group hover:border-aura-500/50 transition-colors duration-300">
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
            style={{
              transform: `translateZ(0)`,
            }}
          />
          
          <div 
            className="h-48 overflow-hidden"
            style={{
              transform: `translateZ(10px)`,
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
          
          <div className="p-4 relative z-20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-xl text-white">{title}</h3>
              {leaderboardPosition && (
                <div className="flex items-center text-aura-400 text-sm">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>#{leaderboardPosition}</span>
                </div>
              )}
            </div>
            
            <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>
            
            <div className="flex justify-between mb-4 text-xs text-white/60">
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                {playersCount.toLocaleString()} لاعب
              </div>
              <div className="flex items-center">
                <Percent className="h-3.5 w-3.5 mr-1" />
                نسبة الفوز {winRate}%
              </div>
            </div>

            <Button 
              className={`w-full bg-aura-600 hover:bg-aura-700 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}
              style={{
                transform: isHovered ? `translateZ(20px)` : `translateZ(5px)`,
              }}
            >
              <span>العب الآن</span>
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default GameCard;
