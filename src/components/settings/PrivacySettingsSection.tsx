
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye, Users, Activity, ChartBar } from "lucide-react";
import { UserSettings } from "@/types/userSettings";

interface PrivacySettingsSectionProps {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  theme: any;
}

const PrivacySettingsSection = ({ settings, updateSettings, theme }: PrivacySettingsSectionProps) => {
  return (
    <Card className={theme.card}>
      <CardHeader>
        <CardTitle className={theme.cardTitle}>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>إعدادات الخصوصية</span>
          </div>
        </CardTitle>
        <CardDescription className={theme.cardDescription}>تحكم في من يمكنه مشاهدة معلوماتك ونشاطك</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Select
              value={settings.profile_visibility}
              onValueChange={(value: "public" | "friends" | "private") => 
                updateSettings({ profile_visibility: value })
              }
            >
              <SelectTrigger className={`w-[180px] ${theme.input}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={theme.input}>
                <SelectItem value="public">عام</SelectItem>
                <SelectItem value="friends">الأصدقاء فقط</SelectItem>
                <SelectItem value="private">خاص</SelectItem>
              </SelectContent>
            </Select>
            <Label className={`${theme.text} flex items-center gap-2`}>
              <Eye className="h-4 w-4" />
              رؤية الملف الشخصي
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              checked={settings.activity_status}
              onCheckedChange={(checked) => updateSettings({ activity_status: checked })}
            />
            <Label className={`${theme.text} flex items-center gap-2`}>
              <Activity className="h-4 w-4" />
              إظهار حالة النشاط
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              checked={settings.show_game_activity}
              onCheckedChange={(checked) => updateSettings({ show_game_activity: checked })}
            />
            <Label className={`${theme.text} flex items-center gap-2`}>
              إظهار نشاط الألعاب
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              checked={settings.allow_friend_requests}
              onCheckedChange={(checked) => updateSettings({ allow_friend_requests: checked })}
            />
            <Label className={`${theme.text} flex items-center gap-2`}>
              <Users className="h-4 w-4" />
              السماح بطلبات الصداقة
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Switch
              checked={settings.share_stats}
              onCheckedChange={(checked) => updateSettings({ share_stats: checked })}
            />
            <Label className={`${theme.text} flex items-center gap-2`}>
              <ChartBar className="h-4 w-4" />
              مشاركة إحصائيات اللعبة
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrivacySettingsSection;
