import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, Trophy, Gamepad2, Settings, User, LogIn, Book } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, profile, isLoading, signOut } = useAuth();
  const isLoggedIn = !!user;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { path: "/", label: "الرئيسية", icon: <Home className="h-5 w-5" /> },
    { path: "/games", label: "الألعاب", icon: <Gamepad2 className="h-5 w-5" /> },
    { path: "/leaderboard", label: "المتصدرون", icon: <Trophy className="h-5 w-5" /> },
    { path: "/about", label: "عن المنصة", icon: <Book className="h-5 w-5" /> },
    { path: "/settings", label: "الإعدادات", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-space-950/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-white flex items-center">
            <span className="text-aura-400 mr-2">Auragz</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isActive(link.path)
                    ? "bg-aura-500/20 text-aura-400"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                } transition-colors`}
              >
                <span className="ml-1.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Authentication */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md flex items-center ${
                    isActive("/profile")
                      ? "bg-aura-500/20 text-aura-400"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  } transition-colors`}
                >
                  <User className="h-5 w-5 ml-1.5" />
                  الملف الشخصي
                </Link>
                <Link
                  to="/settings"
                  className={`px-3 py-2 rounded-md flex items-center ${
                    isActive("/settings")
                      ? "bg-aura-500/20 text-aura-400"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  } transition-colors`}
                >
                  <Settings className="h-5 w-5 ml-1.5" />
                  الإعدادات
                </Link>
                <Avatar className="h-8 w-8 border-2 border-aura-500/30">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || ''} />
                  <AvatarFallback className="bg-aura-500/20 text-aura-400">
                    {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button 
                className="hidden md:flex bg-aura-600 hover:bg-aura-700"
                onClick={handleLoginClick}
              >
                <LogIn className="h-5 w-5 ml-1.5" />
                تسجيل الدخول
              </Button>
            )}
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glass-morphism bg-space-900/95 border-white/10">
                <div className="flex flex-col h-full">
                  <div className="space-y-4 py-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center py-2 px-3 rounded-md ${
                          isActive(link.path)
                            ? "bg-aura-500/20 text-aura-400"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        } transition-colors`}
                      >
                        <span className="ml-2">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-9 w-9 ml-3 border-2 border-aura-500/30">
                            <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || ''} />
                            <AvatarFallback className="bg-aura-500/20 text-aura-400">
                              {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">{profile?.username || user.email}</p>
                            <p className="text-xs text-white/60">لاعب</p>
                          </div>
                        </div>
                        
                        <Link
                          to="/profile"
                          className="flex items-center py-2 px-3 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <User className="h-5 w-5 ml-2" />
                          الملف الشخصي
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center py-2 px-3 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Settings className="h-5 w-5 ml-2" />
                          الإعدادات
                        </Link>
                        <Button 
                          variant="destructive" 
                          className="w-full mt-2"
                          onClick={handleLogout}
                        >
                          تسجيل الخروج
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full bg-aura-600 hover:bg-aura-700"
                        onClick={handleLoginClick}
                      >
                        <LogIn className="h-5 w-5 ml-1.5" />
                        تسجيل الدخول
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
};

export default Navbar;
