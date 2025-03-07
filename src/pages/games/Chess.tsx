
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { motion } from 'framer-motion';
import { Crown, RefreshCw, Brain, Clock9, Play } from 'lucide-react';

const Chess = () => {
  const [isComingSoon, setIsComingSoon] = useState(true);
  const [isStartingGame, setIsStartingGame] = useState(false);

  const handleStartGameClick = () => {
    setIsStartingGame(true);
    
    // محاكاة تحميل اللعبة
    setTimeout(() => {
      setIsStartingGame(false);
      setIsComingSoon(false);
      toast({
        title: "تم بدء اللعبة!",
        description: "استمتع بلعبة الشطرنج.",
      });
    }, 2000);
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
            <h1 className="text-4xl font-bold text-white mb-2">أوراشيس</h1>
            <p className="text-white/70">شطرنج مدعوم بالذكاء الاصطناعي</p>
          </motion.div>

          {isComingSoon ? (
            <Card className="glass-morphism bg-space-900/40 border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Crown className="ml-2 h-5 w-5 text-aura-400" />
                  لعبة الشطرنج
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 1
                    }}
                  >
                    <Crown size={80} className="text-aura-400 mb-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-4">اللعبة جاهزة للتجربة!</h2>
                  <p className="text-white/70 text-center max-w-md mb-8">
                    يمكنك الآن تجربة نسخة أولية من لعبة الشطرنج المدعومة بالذكاء الاصطناعي. استمتع بميزات مثل تحليل اللعبة، واقتراحات الحركة، وتعلم أنماط اللعب الخاصة بك.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl mb-8">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <Brain className="h-8 w-8 text-aura-400 mb-2" />
                        <h3 className="font-medium text-white">ذكاء اصطناعي متكيف</h3>
                        <p className="text-white/60 text-sm">يتعلم من أسلوب لعبك ويتكيف معه</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <Clock9 className="h-8 w-8 text-aura-400 mb-2" />
                        <h3 className="font-medium text-white">تحديات يومية</h3>
                        <p className="text-white/60 text-sm">تحديات شطرنج جديدة كل يوم</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <RefreshCw className="h-8 w-8 text-aura-400 mb-2" />
                        <h3 className="font-medium text-white">تحليل الخطوات</h3>
                        <p className="text-white/60 text-sm">تعلم من أخطائك وحسن مهاراتك</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button 
                    className="bg-aura-600 hover:bg-aura-700 flex items-center gap-2 text-lg px-6 py-6"
                    onClick={handleStartGameClick}
                    disabled={isStartingGame}
                  >
                    {isStartingGame ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        جارِ التحميل...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        ابدأ اللعب الآن
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-morphism bg-space-900/40 border-white/10 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Crown className="ml-2 h-5 w-5 text-aura-400" />
                  لعبة الشطرنج
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="w-full aspect-square max-w-2xl mx-auto mb-6 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-8 grid-rows-8 w-full h-full p-2">
                    {/* لوحة الشطرنج */}
                    {Array.from({ length: 64 }).map((_, index) => {
                      const row = Math.floor(index / 8);
                      const col = index % 8;
                      const isBlack = (row + col) % 2 === 1;
                      
                      return (
                        <div 
                          key={index} 
                          className={`${isBlack ? 'bg-gray-700' : 'bg-gray-300'} relative`}
                        >
                          {/* نضع القطع هنا */}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between gap-4 mb-6">
                  <Card className="bg-white/5 border-white/10 flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-2">لاعب 1</h3>
                      <div className="flex justify-between">
                        <span className="text-white/70">الوقت:</span>
                        <span className="text-white">05:00</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5 border-white/10 flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-2">الذكاء الاصطناعي</h3>
                      <div className="flex justify-between">
                        <span className="text-white/70">الوقت:</span>
                        <span className="text-white">05:00</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    استسلم
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    اقتراح حركة
                  </Button>
                  <Button className="bg-aura-600 hover:bg-aura-700">
                    لعبة جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chess;
