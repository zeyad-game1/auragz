import { useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Instagram, Mail, Heart, Star, Send } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Custom TikTok icon since it's not in Lucide
const TikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.94C17.36 6.59 15.58 4.81 15.23 2.58H12.2V13.66C12.2 14.99 11.12 16.07 9.79 16.07C8.46 16.07 7.38 14.99 7.38 13.66C7.38 12.33 8.46 11.24 9.79 11.24C10.2 11.24 10.59 11.35 10.93 11.53V8.35C10.57 8.27 10.19 8.23 9.79 8.23C6.79 8.23 4.36 10.66 4.36 13.66C4.36 16.67 6.79 19.1 9.79 19.1C12.8 19.1 15.23 16.67 15.23 13.66V7.77C16.42 8.71 17.91 9.3 19.59 9.3V6.94Z" fill="currentColor"/>
  </svg>
);

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { playSound } = useSoundEffects();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('button');
    
    if (!feedback || !email || rating === 0) {
      toast({
        title: "يرجى ملء جميع الحقول",
        description: "نحتاج إلى تقييمك وملاحظاتك وبريدك الإلكتروني للاستمرار.",
        variant: "destructive",
      });
      playSound('error');
      return;
    }
    
    toast({
      title: "شكراً لملاحظاتك!",
      description: "لقد تلقينا تقييمك وملاحظاتك، وسنعمل على تحسين المنصة.",
    });
    playSound('success');
    
    // Reset form
    setFeedback("");
    setRating(0);
    setEmail("");
  };

  return (
    <footer className="bg-space-950/80 backdrop-blur-sm pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-br from-aura-400 to-aura-600 rounded-full ml-2"
              />
              <span className="text-2xl font-bold text-white">AuraGZ</span>
            </div>
            <p className="text-white/60 mb-4">
              منصة ألعاب مدعومة بالذكاء الاصطناعي تقدم تجارب فريدة وتفاعلية تتكيف مع أسلوب اللعب الخاص بك.
            </p>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Link 
                to="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-aura-600 transition-colors"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('button')}
              >
                <Instagram size={18} />
              </Link>
              <Link 
                to="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-aura-600 transition-colors"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('button')}
              >
                <TikTok />
              </Link>
              <Link 
                to="mailto:contact@auragz.com" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-aura-600 transition-colors"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('button')}
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">روابط</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/games" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    الألعاب
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/leaderboard" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    المتصدرون
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    عن المنصة
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/profile" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    حسابي
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    الإعدادات
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-white/60 hover:text-aura-400 transition-colors"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('button')}
                  >
                    سياسة الخصوصية
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Feedback Form */}
          <div>
            <h3 className="font-semibold text-white mb-4">أرسل لي ملاحظاتك</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-3">
                <Input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="bg-white/5 border-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Textarea 
                  placeholder="أخبرني برأيك..." 
                  className="bg-white/5 border-white/10 min-h-[80px]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-white/60 text-sm ml-2">التقييم:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseEnter={() => {
                          setHoveredStar(star);
                          playSound('hover');
                        }}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => {
                          setRating(star);
                          playSound('button');
                        }}
                      >
                        <Star 
                          size={20} // Increased size from 16 to 20
                          className={`${
                            star <= (hoveredStar || rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-white/30'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <Send size={14} className="ml-1" />
                  إرسال
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <Separator className="bg-white/10 my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
          <p>© {new Date().getFullYear()} AuraGZ - جميع الحقوق محفوظة.</p>
          <div className="flex items-center mt-2 md:mt-0">
            <span>صنع بكل</span>
            <Heart size={14} className="text-red-500 mx-1 fill-red-500" />
            <span>بواسطة زياد حلواني المعروف بـ bxz.9</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
