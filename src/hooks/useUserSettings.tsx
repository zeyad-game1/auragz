
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { UserSettings, DEFAULT_USER_SETTINGS } from '@/types/userSettings';
import { 
  applySettings, 
  saveSettingsToLocalStorage, 
  getSettingsFromLocalStorage 
} from '@/utils/settingsUtils';
import { 
  fetchUserSettingsFromDB, 
  createDefaultSettingsInDB,
  updateUserSettingsInDB
} from '@/services/settingsService';

// Global settings state to ensure consistency across components
let globalSettings: UserSettings | null = null;

export function useUserSettings() {
  const { user, isLoading: authLoading } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(globalSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch settings from database or localStorage
  const fetchSettings = useCallback(async () => {
    if (!user) {
      // For non-authenticated users, use localStorage
      const localSettings = getSettingsFromLocalStorage();
      if (localSettings) {
        setSettings(localSettings);
        globalSettings = localSettings;
      } else {
        // Use default settings if none exist
        setSettings(DEFAULT_USER_SETTINGS);
        globalSettings = DEFAULT_USER_SETTINGS;
        saveSettingsToLocalStorage(DEFAULT_USER_SETTINGS);
      }
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Fetch settings for authenticated users
      let userSettings = await fetchUserSettingsFromDB(user.id);
      
      if (!userSettings) {
        // Create default settings if none exist
        userSettings = await createDefaultSettingsInDB(user.id);
        
        if (!userSettings) {
          throw new Error('Failed to create settings');
        }
      }
      
      setSettings(userSettings);
      globalSettings = userSettings;
      
      // Also save to localStorage for offline mode
      saveSettingsToLocalStorage(userSettings);
    } catch (error: any) {
      console.error('Error fetching settings:', error.message);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء استرجاع الإعدادات",
        variant: "destructive"
      });
      
      // Fall back to localStorage if there's an error
      const localSettings = getSettingsFromLocalStorage();
      if (localSettings) {
        setSettings(localSettings);
        globalSettings = localSettings;
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Update settings in database and localStorage
  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    // If settings is null, we shouldn't try to update anything
    if (!settings) return;
    
    const updatedSettings = { ...settings, ...newSettings } as UserSettings;
    setSettings(updatedSettings);
    globalSettings = updatedSettings;
    
    // Always save to localStorage
    saveSettingsToLocalStorage(updatedSettings);
    
    // If user is authenticated, update in database
    if (user) {
      try {
        const success = await updateUserSettingsInDB(user.id, newSettings);
        
        if (success) {
          toast({
            title: "تم الحفظ",
            description: "تم حفظ الإعدادات بنجاح",
          });
        } else {
          throw new Error('Failed to update settings');
        }
      } catch (error: any) {
        console.error('Error updating settings:', error.message);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حفظ الإعدادات",
          variant: "destructive"
        });
      }
    }
    
    // Apply the updated settings
    applySettings(updatedSettings);
  }, [settings, user]);

  // Load settings on mount and when auth state changes
  useEffect(() => {
    if (!authLoading) {
      fetchSettings();
    }
  }, [fetchSettings, authLoading]);

  // Apply settings when they change
  useEffect(() => {
    if (settings) {
      applySettings(settings);
    }
  }, [settings]);

  return {
    settings,
    isLoading,
    updateSettings,
    refreshSettings: fetchSettings
  };
}
