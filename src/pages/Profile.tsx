
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Settings, Shield, Edit, Save, ChevronRight, Trophy, Gamepad, Clock, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, profile, refreshProfile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    full_name: '',
    email: '',
    avatar_url: '',
  });
  const [gameStats, setGameStats] = useState({
    chessRating: 0,
    totalPoints: 0,
    gamesPlayed: 0,
    winRate: 0,
    achievements: 0,
    recentGames: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      toast({
        title: "غير مسجل الدخول",
        description: "يرجى تسجيل الدخول لعرض الملف الشخصي",
        variant: "destructive"
      });
    }
  }, [user, authLoading, navigate]);

  // Load user data when profile is available
  useEffect(() => {
    if (profile) {
      setUserData({
        id: profile.id,
        username: profile.username || '',
        full_name: profile.full_name || '',
        email: profile.email || '',
        avatar_url: profile.avatar_url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop',
      });
      
      // Fetch game stats
      fetchGameStats(profile.id);
    }
  }, [profile]);

  const fetchGameStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Calculate aggregate stats
        const totalGames = data.reduce((sum, game) => sum + game.total_games, 0);
        const totalWins = data.reduce((sum, game) => sum + game.wins, 0);
        const totalScore = data.reduce((sum, game) => sum + game.score, 0);
        
        // Find chess rating if available
        const chessGame = data.find(game => game.game_id === 'chess');
        
        setGameStats({
          chessRating: chessGame ? chessGame.score : 1200,
          totalPoints: totalScore,
          gamesPlayed: totalGames,
          winRate: totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0,
          achievements: 0, // Will implement achievements later
          recentGames: []
        });
      } else {
        // Set default stats
        setGameStats({
          chessRating: 1200,
          totalPoints: 0,
          gamesPlayed: 0,
          winRate: 0,
          achievements: 0,
          recentGames: []
        });
      }
    } catch (error: any) {
      console.error('Error fetching game stats:', error.message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: userData.username,
          full_name: userData.full_name,
          avatar_url: userData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      await refreshProfile();
      setIsEditing(false);
      toast({
        title: "تم الحفظ",
        description: "تم تحديث الملف الشخصي بنجاح"
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <SpaceBackground />
        <Navbar />
        <main className="flex-grow pt-28 pb-16 flex items-center justify-center">
          <div className="text-white">جاري التحميل...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="glass-morphism rounded-xl overflow-hidden sticky top-24">
                <div className="relative h-32 bg-gradient-to-r from-aura-800 to-aura-600">
                  <div className="absolute -bottom-16 left-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-space-900">
                      <img 
                        src={userData.avatar_url} 
                        alt={userData.username} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-20 pb-6 px-6">
                  <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
                  <p className="text-white/60 mb-4">عضو منذ {profile?.created_at ? formatDate(profile.created_at) : 'حديثًا'}</p>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-white">{gameStats.gamesPlayed}</p>
                        <p className="text-xs text-white/60">المباريات</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-white">{gameStats.winRate}%</p>
                        <p className="text-xs text-white/60">نسبة الفوز</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-aura-400" />
                          <span className="text-sm text-white/80">الترتيب</span>
                        </div>
                        <span className="text-sm font-medium text-white">#-</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-aura-400" />
                          <span className="text-sm text-white/80">النقاط الكلية</span>
                        </div>
                        <span className="text-sm font-medium text-white">{gameStats.totalPoints}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Gamepad className="h-4 w-4 text-aura-400" />
                          <span className="text-sm text-white/80">تصنيف الشطرنج</span>
                        </div>
                        <span className="text-sm font-medium text-white">{gameStats.chessRating}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-aura-400" />
                          <span className="text-sm text-white/80">الإنجازات</span>
                        </div>
                        <span className="text-sm font-medium text-white">{gameStats.achievements}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="default" 
                      className="w-full justify-start bg-aura-600 hover:bg-aura-700 text-white"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="ml-2 h-4 w-4" />
                      {isEditing ? 'إلغاء التعديل' : 'تعديل الملف الشخصي'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="glass-morphism border border-white/10 bg-space-900/50">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-aura-600 data-[state=active]:text-white"
                  >
                    نظرة عامة
                  </TabsTrigger>
                  <TabsTrigger 
                    value="games" 
                    className="data-[state=active]:bg-aura-600 data-[state=active]:text-white"
                  >
                    سجل الألعاب
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="data-[state=active]:bg-aura-600 data-[state=active]:text-white"
                  >
                    الإعدادات
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="data-[state=active]:bg-aura-600 data-[state=active]:text-white"
                  >
                    الأمان
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card className="glass-morphism bg-space-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">معلومات الملف الشخصي</CardTitle>
                      <CardDescription className="text-white/60">
                        بياناتك الشخصية وتفضيلاتك
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="username" className="text-white/80">اسم المستخدم</Label>
                              <Input 
                                id="username" 
                                value={userData.username}
                                onChange={(e) => setUserData({...userData, username: e.target.value})}
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="full_name" className="text-white/80">الاسم الكامل</Label>
                              <Input 
                                id="full_name" 
                                value={userData.full_name}
                                onChange={(e) => setUserData({...userData, full_name: e.target.value})}
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-white/80">البريد الإلكتروني</Label>
                              <Input 
                                id="email" 
                                value={userData.email}
                                disabled
                                className="bg-white/5 border-white/10 text-white/60"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="avatar_url" className="text-white/80">رابط الصورة الشخصية</Label>
                              <Input 
                                id="avatar_url" 
                                value={userData.avatar_url}
                                onChange={(e) => setUserData({...userData, avatar_url: e.target.value})}
                                className="bg-white/5 border-white/10 text-white"
                              />
                            </div>
                          </div>
                          <Button 
                            onClick={handleSaveProfile}
                            className="bg-aura-600 hover:bg-aura-700 text-white"
                            disabled={isLoading}
                          >
                            <Save className="ml-2 h-4 w-4" />
                            {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-white/60">اسم المستخدم</p>
                              <p className="text-white">{userData.username}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-white/60">الاسم الكامل</p>
                              <p className="text-white">{userData.full_name || '-'}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-white/60">البريد الإلكتروني</p>
                              <p className="text-white">{userData.email}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-white/60">معرف المستخدم</p>
                              <p className="text-white/60 text-xs">{userData.id}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-morphism bg-space-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">النشاط الأخير</CardTitle>
                      <CardDescription className="text-white/60">
                        آخر ألعابك وإنجازاتك
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {gameStats.recentGames && gameStats.recentGames.length > 0 ? (
                        <div className="space-y-4">
                          {/* Display recent games here */}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Gamepad className="mx-auto h-12 w-12 text-white/20 mb-3" />
                          <p className="text-white/70">لم تلعب أي مباريات بعد</p>
                          <p className="text-white/50 text-sm mt-1">ابدأ باللعب لعرض نشاطاتك هنا</p>
                          <Button
                            variant="default"
                            className="mt-4 bg-aura-600 hover:bg-aura-700"
                            onClick={() => navigate('/games')}
                          >
                            ابدأ اللعب
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Games Tab */}
                <TabsContent value="games">
                  <Card className="glass-morphism bg-space-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">سجل الألعاب</CardTitle>
                      <CardDescription className="text-white/60">
                        عرض سجل ألعابك الكامل والإحصائيات
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Clock className="mx-auto h-12 w-12 text-white/20 mb-3" />
                        <p className="text-white/70">قادم قريبًا</p>
                        <p className="text-white/50 text-sm mt-1">سيتم عرض سجل ألعابك الكامل هنا</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card className="glass-morphism bg-space-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">التفضيلات</CardTitle>
                      <CardDescription className="text-white/60">
                        تخصيص تجربة اللعب الخاصة بك
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center py-6">
                        <Button 
                          variant="outline"
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                          onClick={() => navigate('/settings')}
                        >
                          <Settings className="ml-2 h-4 w-4" />
                          الذهاب إلى صفحة الإعدادات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security">
                  <Card className="glass-morphism bg-space-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">إعدادات الأمان</CardTitle>
                      <CardDescription className="text-white/60">
                        إدارة أمان حسابك
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Shield className="mx-auto h-12 w-12 text-white/20 mb-3" />
                        <p className="text-white/70">قادم قريبًا</p>
                        <p className="text-white/50 text-sm mt-1">ستتمكن قريبًا من تغيير كلمة المرور وإعدادات الأمان الأخرى</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
