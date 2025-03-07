
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { User, Edit, Key, LogOut, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { UserSettings } from "@/types/userSettings";

interface AccountSectionProps {
  user: any;
  profile: any;
  signOut: () => Promise<void>;
  updateProfile: (profile: any) => Promise<any>;
  theme: any;
}

const AccountSection = ({ user, profile, signOut, updateProfile, theme }: AccountSectionProps) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  
  const [newUsername, setNewUsername] = useState(profile?.username || '');
  const [isChangingUsername, setIsChangingUsername] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور الجديدة غير متطابقة",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Here you would add the actual password change logic with Supabase
      // For example: await supabase.auth.updateUser({ password: newPassword })
      
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تحديث كلمة المرور الخاصة بك بنجاح",
      });
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تغيير كلمة المرور",
        variant: "destructive"
      });
    }
  };
  
  const handleChangeEmail = async () => {
    try {
      // Here you would add the actual email change logic with Supabase
      // For example: await supabase.auth.updateUser({ email: newEmail })
      
      toast({
        title: "تم تغيير البريد الإلكتروني",
        description: "تم إرسال رابط التأكيد إلى البريد الإلكتروني الجديد",
      });
      setIsChangingEmail(false);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تغيير البريد الإلكتروني",
        variant: "destructive"
      });
    }
  };
  
  const handleChangeUsername = async () => {
    if (!newUsername.trim()) {
      toast({
        title: "خطأ",
        description: "اسم المستخدم لا يمكن أن يكون فارغًا",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { error } = await updateProfile({ username: newUsername });
      
      if (error) throw error;
      
      toast({
        title: "تم تغيير اسم المستخدم",
        description: "تم تحديث اسم المستخدم الخاص بك بنجاح",
      });
      setIsChangingUsername(false);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تغيير اسم المستخدم",
        variant: "destructive"
      });
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className={theme.card}>
        <CardHeader>
          <CardTitle className={theme.cardTitle}>معلومات الحساب</CardTitle>
          <CardDescription className={theme.cardDescription}>عرض وتحديث معلومات حسابك الشخصية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-aura-500/20 flex items-center justify-center overflow-hidden border-2 border-aura-500/40">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.username || "المستخدم"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-aura-200" />
                )}
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-right">
              <h3 className={`text-2xl font-semibold ${theme.text}`}>{profile?.username || "المستخدم"}</h3>
              <p className={`${theme.secondaryText}`}>{user?.email || ""}</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className={theme.buttonOutline}>
                  تغيير الصورة
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Settings */}
      <Card className={theme.card}>
        <CardHeader>
          <CardTitle className={theme.cardTitle}>إعدادات الحساب</CardTitle>
          <CardDescription className={theme.cardDescription}>تحديث اسم المستخدم والبريد الإلكتروني وكلمة المرور</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Username */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setIsChangingUsername(true)} 
                variant="outline" 
                size="sm" 
                className={theme.buttonOutline}
              >
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
              <div className="text-right">
                <Label className={theme.text}>اسم المستخدم</Label>
                <p className={theme.secondaryText}>{profile?.username}</p>
              </div>
            </div>
            
            <Dialog open={isChangingUsername} onOpenChange={setIsChangingUsername}>
              <DialogContent className={`${theme.card} max-w-md`}>
                <DialogHeader>
                  <DialogTitle className={theme.cardTitle}>تغيير اسم المستخدم</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className={theme.text}>اسم المستخدم الجديد</Label>
                    <Input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className={theme.input}
                      placeholder="اسم المستخدم الجديد"
                      dir="rtl"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangingUsername(false)} 
                    className={theme.buttonOutline}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleChangeUsername} 
                    className={theme.button}
                  >
                    حفظ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Change Email */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setIsChangingEmail(true)} 
                variant="outline" 
                size="sm" 
                className={theme.buttonOutline}
              >
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
              <div className="text-right">
                <Label className={theme.text}>البريد الإلكتروني</Label>
                <p className={theme.secondaryText}>{user?.email}</p>
              </div>
            </div>
            
            <Dialog open={isChangingEmail} onOpenChange={setIsChangingEmail}>
              <DialogContent className={`${theme.card} max-w-md`}>
                <DialogHeader>
                  <DialogTitle className={theme.cardTitle}>تغيير البريد الإلكتروني</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className={theme.text}>البريد الإلكتروني الجديد</Label>
                    <Input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className={theme.input}
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangingEmail(false)} 
                    className={theme.buttonOutline}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleChangeEmail} 
                    className={theme.button}
                  >
                    تغيير البريد الإلكتروني
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Change Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Button 
                onClick={() => setIsChangingPassword(true)} 
                variant="outline" 
                size="sm" 
                className={theme.buttonOutline}
              >
                <Key className="h-4 w-4 ml-2" />
                تغيير
              </Button>
              <div className="text-right">
                <Label className={theme.text}>كلمة المرور</Label>
                <p className={theme.secondaryText}>••••••••</p>
              </div>
            </div>
            
            <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
              <DialogContent className={`${theme.card} max-w-md`}>
                <DialogHeader>
                  <DialogTitle className={theme.cardTitle}>تغيير كلمة المرور</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className={theme.text}>كلمة المرور الحالية</Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={theme.input}
                      placeholder="••••••••"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={theme.text}>كلمة المرور الجديدة</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={theme.input}
                      placeholder="••••••••"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={theme.text}>تأكيد كلمة المرور الجديدة</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={theme.input}
                      placeholder="••••••••"
                      dir="ltr"
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangingPassword(false)} 
                    className={theme.buttonOutline}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handleChangePassword} 
                    className={theme.button}
                  >
                    تغيير كلمة المرور
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="destructive" 
            className={theme.buttonDestructive}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`${theme.buttonOutline} border-red-500/30 text-red-400 hover:bg-red-500/10`}
                >
                  <AlertTriangle className="h-4 w-4 ml-2" />
                  حذف الحساب
                </Button>
              </DialogTrigger>
              <DialogContent className={`${theme.card} max-w-md`}>
                <DialogHeader>
                  <DialogTitle className="text-red-500">تأكيد حذف الحساب</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className={theme.text}>هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه وسيتم حذف جميع بياناتك نهائيًا.</p>
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    className={theme.buttonOutline}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    variant="destructive" 
                    className={theme.buttonDestructive}
                  >
                    حذف الحساب نهائيًا
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSection;
