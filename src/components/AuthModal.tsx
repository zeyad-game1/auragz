import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحبًا بعودتك!"
        });
        onClose();
      } else {
        if (!username.trim()) {
          throw new Error('يرجى إدخال اسم المستخدم');
        }
        
        const { error } = await signUp(email, password, username);
        if (error) throw error;
        
        toast({
          title: "تم إنشاء الحساب",
          description: "تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل الدخول"
        });
        setMode('signin');
      }
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية التسجيل، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشل تسجيل الدخول بواسطة Google",
        variant: "destructive"
      });
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-morphism border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'signin' ? 'مرحبًا بعودتك' : 'انضم إلى أوراجز'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? 'سجل دخولك للاستمرار في رحلتك في عالم الألعاب'
              : 'أنشئ حسابًا للبدء باللعب ومتابعة تقدمك'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={mode} value={mode} onValueChange={(value) => setMode(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 bg-space-900/50">
            <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input 
                      id="email" 
                      placeholder="name@example.com" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-aura-600 hover:bg-aura-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                المتابعة باستخدام Google
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input 
                      id="username" 
                      placeholder="اسم_المستخدم" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input 
                      id="signup-email" 
                      placeholder="name@example.com" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-aura-600 hover:bg-aura-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                التسجيل باستخدام Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
