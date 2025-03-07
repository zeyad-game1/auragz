
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Gamepad, User, Settings } from 'lucide-react';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import LightBackground from '@/components/LightBackground';
import Navbar from '@/components/Navbar';

// بيانات مؤقتة - سيتم استبدالها بـ Supabase
const featuredGames = [
  {
    id: 'auraxo',
    title: 'Auraxo',
    description: 'تحدى الذكاء الاصطناعي التكيفي في تجربة لعبة إكس أو المتطورة مع مستوى صعوبة ديناميكي.',
    image: 'https://images.unsplash.com/photo-1611032585406-f6b4d079fcf1?q=80&w=800&auto=format&fit=crop',
    playersCount: 12540,
    winRate: 48,
    leaderboardPosition: 1
  },
  {
    id: 'aurachess',
    title: 'AuraChess',
    description: 'اختبر مهاراتك ضد الذكاء الاصطناعي للشطرنج المدعوم بالشبكة العصبية التي تتكيف مع أسلوب لعبك.',
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop',
    playersCount: 8730,
    winRate: 32,
    leaderboardPosition: 2
  },
  {
    id: 'auravision',
    title: 'AuraVision',
    description: 'وسع مفرداتك في هذه اللعبة المدعومة بالذكاء الاصطناعي التي تتحدى قدراتك اللغوية.',
    image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?q=80&w=800&auto=format&fit=crop',
    playersCount: 6120,
    winRate: 64,
  },
  {
    id: 'auraquest',
    title: 'AuraQuest',
    description: 'انطلق في مغامرة فريدة من نوعها عبر قصص مولدة بالذكاء الاصطناعي تتكيف مع اختياراتك.',
    image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=800&auto=format&fit=crop',
    playersCount: 5890,
    winRate: 75,
  },
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('appSettings');
    if (savedTheme) {
      const parsedSettings = JSON.parse(savedTheme);
      return parsedSettings.theme || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    setLoaded(true);
    
    // Listen for theme changes
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('appSettings');
      if (savedTheme) {
        const parsedSettings = JSON.parse(savedTheme);
        setTheme(parsedSettings.theme || 'dark');
      }
    };
    
    window.addEventListener('storage', checkTheme);
    document.addEventListener('themeChange', checkTheme);
    
    return () => {
      window.removeEventListener('storage', checkTheme);
      document.removeEventListener('themeChange', checkTheme);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {theme === 'dark' ? <SpaceBackground /> : <LightBackground />}
      <Navbar />

      {/* قسم الترحيب */}
      <section className="pt-32 pb-20 relative hero-glow overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block bg-aura-500/10 backdrop-blur-sm border border-aura-500/30 px-3 py-1 rounded-full mb-6">
                <span className="text-xs font-medium text-aura-300">منصة ألعاب الذكاء الاصطناعي الجيل القادم</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                استمتع بتجربة ألعاب متطورة بالذكاء الاصطناعي
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                توفر Aurajz تجارب ألعاب ذكاء اصطناعي تكيفية تتعلم وتتطور معك، 
                وتقدم تحديات مخصصة وتحليلات في الوقت الفعلي.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/games">
                  <Button variant={theme === 'light' ? 'gradient' : 'default'} className="px-6 py-6">
                    استكشاف الألعاب
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-6">
                    عرض المتصدرين
                    <Trophy className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* قسم المميزات */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 heading-highlight inline-block">مميزات المنصة</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              اكتشف الميزات المتطورة التي تجعل Aurajz الوجهة النهائية لألعاب الذكاء الاصطناعي.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* الميزة الأولى */}
            <div className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-aura-500/10 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-aura-600/20 rounded-lg flex items-center justify-center mb-4">
                <Gamepad className="text-aura-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">ذكاء اصطناعي تكيفي</h3>
              <p className="text-white/70 text-sm">
                تتميز ألعابنا بشبكات عصبية تتعلم من طريقة لعبك، مما يوفر تحديًا مخصصًا في كل مرة.
              </p>
            </div>
            
            {/* الميزة الثانية */}
            <div className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-aura-500/10 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-aura-600/20 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="text-aura-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">لوحات المتصدرين</h3>
              <p className="text-white/70 text-sm">
                تصنيفات وإحصاءات في الوقت الفعلي تتحدث ديناميكيًا أثناء اللعب، وتتتبع تقدمك عبر جميع الألعاب.
              </p>
            </div>
            
            {/* الميزة الثالثة */}
            <div className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-aura-500/10 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-aura-600/20 rounded-lg flex items-center justify-center mb-4">
                <User className="text-aura-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">ملفات المستخدمين</h3>
              <p className="text-white/70 text-sm">
                قم بإدارة هويتك في اللعب مع ملفات تعريف مخصصة، وإنجازات، وتحليلات أداء.
              </p>
            </div>
            
            {/* الميزة الرابعة */}
            <div className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:shadow-aura-500/10 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-aura-600/20 rounded-lg flex items-center justify-center mb-4">
                <Settings className="text-aura-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">التخصيص</h3>
              <p className="text-white/70 text-sm">
                خصص تجربة اللعب الخاصة بك مع صعوبة الذكاء الاصطناعي القابلة للتعديل، وتفضيلات المظهر، والمزيد.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* الألعاب المميزة */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold heading-highlight">الألعاب المميزة</h2>
            <Link 
              to="/games" 
              className="text-aura-400 hover:text-aura-300 font-medium flex items-center gap-1 transition-colors"
            >
              عرض الكل <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map(game => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </section>
      
      {/* قسم الدعوة للانضمام */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative glass-morphism rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* تدرج الخلفية */}
            <div className="absolute inset-0 bg-gradient-to-br from-aura-700/30 to-transparent z-0"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">هل أنت مستعد للانضمام إلى مستقبل الألعاب؟</h2>
              <p className="text-lg text-white/80 mb-8">
                أنشئ حسابك اليوم وابدأ رحلتك مع Aurajz. تتبع تقدمك، 
                تنافس على لوحات المتصدرين، واختبر ألعاب الذكاء الاصطناعي كما لم تفعل من قبل.
              </p>
              <Button variant={theme === 'light' ? 'gradient' : 'default'} className="px-8 py-7 text-lg">
                ابدأ الآن
              </Button>
            </div>
            
            {/* عناصر زخرفية */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-aura-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-aura-700/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
