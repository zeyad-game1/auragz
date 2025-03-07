
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  Save, 
  RefreshCw,
  Volume2, 
  Moon, 
  Sun, 
  Globe,
  Bot,
  Palette,
  BrainCircuit,
  Sliders
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { useUserSettings } from '@/hooks/useUserSettings';
import { UserSettings, DEFAULT_USER_SETTINGS } from '@/types/userSettings';
import { useAuth } from '@/context/AuthContext';
import AccountSection from '@/components/settings/AccountSection';
import PrivacySettingsSection from '@/components/settings/PrivacySettingsSection';

const languages = [
  { value: 'ar', label: 'العربية' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' },
  { value: 'fr', label: 'Français' }
];

const aiPersonalities = [
  { value: 'aggressive', label: 'عدواني' },
  { value: 'competitive', label: 'تنافسي' },
  { value: 'friendly', label: 'ودي' },
  { value: 'strategic', label: 'استراتيجي' },
  { value: 'fun', label: 'مرح' }
];

const colorblindModes = [
  { value: 'none', label: 'لا شيء' },
  { value: 'protanopia', label: 'عمى اللون الأحمر' },
  { value: 'deuteranopia', label: 'عمى اللون الأخضر' },
  { value: 'tritanopia', label: 'عمى اللون الأزرق' },
  { value: 'achromatopsia', label: 'عمى الألوان الكامل' }
];

const aiVoiceTypes = [
  { value: 'male', label: 'صوت رجل' },
  { value: 'female', label: 'صوت امرأة' },
  { value: 'neutral', label: 'صوت محايد' }
];

const Settings = () => {
  const { settings: userDbSettings, updateSettings: updateDbSettings, isLoading: dbSettingsLoading } = useUserSettings();
  const { user, profile, signOut, updateProfile } = useAuth();
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_USER_SETTINGS;
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userDbSettings && !dbSettingsLoading) {
      setSettings(prev => ({
        ...prev,
        ...userDbSettings
      }));
    }
  }, [userDbSettings, dbSettingsLoading]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateDbSettings(settings);
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث الإعدادات بنجاح",
        className: "bg-aura-500/10 text-aura-200 border-aura-500/20"
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ الإعدادات، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    }
    setIsSaving(false);
  };

  // Get theme-specific classes based on current theme
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        card: "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-md",
        cardTitle: "text-blue-800",
        cardDescription: "text-purple-700",
        background: "bg-gradient-to-br from-blue-100 to-purple-100",
        text: "text-blue-900",
        secondaryText: "text-blue-600",
        slider: "bg-blue-300/50",
        button: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white",
        buttonSecondary: "bg-blue-200 hover:bg-blue-300 text-blue-800",
        buttonOutline: "bg-white border-blue-300 text-blue-700 hover:bg-blue-50",
        buttonDestructive: "bg-red-500 hover:bg-red-600 text-white",
        input: "bg-white border-blue-300 text-blue-700",
        activeTab: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white",
        inactiveTab: "data-[state=inactive]:text-blue-600",
        tabsList: "bg-white/80 border border-blue-200"
      };
    } else {
      return {
        card: "bg-space-900/50 border-aura-500/20",
        cardTitle: "text-aura-200",
        cardDescription: "text-white/60",
        background: "bg-space-950",
        text: "text-aura-200",
        secondaryText: "text-white/60",
        slider: "bg-aura-500/20",
        button: "bg-aura-500 hover:bg-aura-600 text-white",
        buttonSecondary: "bg-space-800 hover:bg-space-700 text-aura-200",
        buttonOutline: "bg-space-800 border-aura-500/20 text-aura-200 hover:bg-space-700",
        buttonDestructive: "bg-red-600 hover:bg-red-700 text-white",
        input: "bg-space-800 border-aura-500/20 text-aura-200",
        activeTab: "data-[state=active]:bg-aura-600 data-[state=active]:text-white",
        inactiveTab: "data-[state=inactive]:text-white/60",
        tabsList: "bg-space-900/50 border-aura-500/20"
      };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={`min-h-screen flex flex-col ${theme.background}`}>
      {settings.theme === 'dark' && <SpaceBackground />}
      <Navbar />

      <main className="flex-grow pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-4xl font-bold ${theme.text} mb-8 text-right`}>الإعدادات</h1>
            
            <Tabs defaultValue="account" className="space-y-6" dir="rtl">
              <TabsList className={`grid grid-cols-2 lg:grid-cols-5 gap-2 ${theme.tabsList} p-1`}>
                <TabsTrigger 
                  value="account" 
                  className={`flex items-center gap-2 ${theme.activeTab} ${theme.inactiveTab}`}
                >
                  الحساب
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className={`flex items-center gap-2 ${theme.activeTab} ${theme.inactiveTab}`}
                >
                  <Palette className="h-4 w-4" />
                  المظهر
                </TabsTrigger>
                <TabsTrigger 
                  value="audio" 
                  className={`flex items-center gap-2 ${theme.activeTab} ${theme.inactiveTab}`}
                >
                  <Volume2 className="h-4 w-4" />
                  الصوت
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className={`flex items-center gap-2 ${theme.activeTab} ${theme.inactiveTab}`}
                >
                  <BrainCircuit className="h-4 w-4" />
                  الذكاء الاصطناعي
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className={`flex items-center gap-2 ${theme.activeTab} ${theme.inactiveTab}`}
                >
                  الخصوصية
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <AccountSection 
                  user={user}
                  profile={profile}
                  signOut={signOut}
                  updateProfile={updateProfile}
                  theme={theme}
                />
              </TabsContent>

              <TabsContent value="appearance">
                <Card className={theme.card}>
                  <CardHeader>
                    <CardTitle className={theme.cardTitle}>إعدادات المظهر</CardTitle>
                    <CardDescription className={theme.cardDescription}>تخصيص شكل AuraGZ وطريقة عرضه</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant={settings.theme === 'dark' ? 'default' : 'outline'}
                            onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                            className={settings.theme === 'dark' ? theme.button : "bg-space-800/50 hover:bg-space-700"}
                          >
                            <Moon className="h-4 w-4 ml-2" />
                            داكن
                          </Button>
                          <Button
                            variant={settings.theme === 'light' ? 'default' : 'outline'}
                            onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                            className={settings.theme === 'light' ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white" : "bg-white/80 text-blue-800 hover:bg-white"}
                          >
                            <Sun className="h-4 w-4 ml-2" />
                            فاتح
                          </Button>
                        </div>
                        <Label className={theme.text}>السمة</Label>
                      </div>

                      <div className="flex items-center justify-between">
                        <Select
                          value={settings.language}
                          onValueChange={(value: any) => setSettings(prev => ({ ...prev, language: value }))}
                        >
                          <SelectTrigger className={`w-[180px] ${theme.input}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={theme.input}>
                            {languages.map(lang => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Label className={theme.text}>اللغة</Label>
                      </div>

                      <div className="flex items-center justify-between">
                        <Switch
                          checked={settings.animations_reduced}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, animations_reduced: checked }))}
                        />
                        <Label className={theme.text}>تقليل الرسوم المتحركة</Label>
                      </div>

                      <div className="flex items-center justify-between">
                        <Select
                          value={settings.colorblind_mode}
                          onValueChange={(value: any) => setSettings(prev => ({ ...prev, colorblind_mode: value }))}
                        >
                          <SelectTrigger className={`w-[180px] ${theme.input}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={theme.input}>
                            {colorblindModes.map(mode => (
                              <SelectItem key={mode.value} value={mode.value}>
                                {mode.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Label className={theme.text}>وضع عمى الألوان</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audio">
                <Card className={theme.card}>
                  <CardHeader>
                    <CardTitle className={theme.cardTitle}>إعدادات الصوت</CardTitle>
                    <CardDescription className={theme.cardDescription}>التحكم في تجربة الصوت الخاصة بك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className={`text-sm ${theme.text} px-2 py-1 rounded-md ${settings.theme === 'light' ? 'bg-blue-100' : 'bg-space-800'}`}>{settings.master_volume}%</div>
                          <Label className={theme.text}>مستوى الصوت الرئيسي</Label>
                        </div>
                        <Slider
                          value={[settings.master_volume]}
                          max={100}
                          step={1}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, master_volume: value }))}
                          className={theme.slider}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className={`text-sm ${theme.text} px-2 py-1 rounded-md ${settings.theme === 'light' ? 'bg-blue-100' : 'bg-space-800'}`}>{settings.effects_volume}%</div>
                          <Label className={theme.text}>مستوى المؤثرات الصوتية</Label>
                        </div>
                        <Slider
                          value={[settings.effects_volume]}
                          max={100}
                          step={1}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, effects_volume: value }))}
                          className={theme.slider}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className={`text-sm ${theme.text} px-2 py-1 rounded-md ${settings.theme === 'light' ? 'bg-blue-100' : 'bg-space-800'}`}>{settings.ai_volume}%</div>
                          <Label className={theme.text}>مستوى صوت الذكاء الاصطناعي</Label>
                        </div>
                        <Slider
                          value={[settings.ai_volume]}
                          max={100}
                          step={1}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, ai_volume: value }))}
                          className={theme.slider}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai">
                <Card className={theme.card}>
                  <CardHeader>
                    <CardTitle className={theme.cardTitle}>إعدادات الذكاء الاصطناعي</CardTitle>
                    <CardDescription className={theme.cardDescription}>تخصيص خصم الذكاء الاصطناعي الخاص بك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Select
                          value={settings.ai_difficulty}
                          onValueChange={(value: any) => setSettings(prev => ({ ...prev, ai_difficulty: value }))}
                        >
                          <SelectTrigger className={`w-[180px] ${theme.input}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={theme.input}>
                            <SelectItem value="easy">سهل</SelectItem>
                            <SelectItem value="medium">متوسط</SelectItem>
                            <SelectItem value="hard">صعب</SelectItem>
                            <SelectItem value="expert">خبير</SelectItem>
                          </SelectContent>
                        </Select>
                        <Label className={theme.text}>مستوى الصعوبة</Label>
                      </div>

                      <div className="flex items-center justify-between">
                        <Select
                          value={settings.ai_personality}
                          onValueChange={(value: any) => setSettings(prev => ({ ...prev, ai_personality: value }))}
                        >
                          <SelectTrigger className={`w-[180px] ${theme.input}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={theme.input}>
                            {aiPersonalities.map(personality => (
                              <SelectItem key={personality.value} value={personality.value}>
                                {personality.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Label className={theme.text}>شخصية الذكاء الاصطناعي</Label>
                      </div>

                      <div className="flex items-center justify-between">
                        <Select
                          value={settings.ai_voice_type}
                          onValueChange={(value: any) => setSettings(prev => ({ ...prev, ai_voice_type: value }))}
                        >
                          <SelectTrigger className={`w-[180px] ${theme.input}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={theme.input}>
                            {aiVoiceTypes.map(voice => (
                              <SelectItem key={voice.value} value={voice.value}>
                                {voice.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Label className={theme.text}>نوع صوت الذكاء الاصطناعي</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacySettingsSection 
                  settings={settings}
                  updateSettings={(newSettings) => setSettings(prev => ({ ...prev, ...newSettings }))}
                  theme={theme}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setSettings(DEFAULT_USER_SETTINGS)}
                className={theme.buttonOutline}
              >
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة تعيين الإعدادات الافتراضية
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className={theme.button}
              >
                <Save className="h-4 w-4 ml-2" />
                {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
