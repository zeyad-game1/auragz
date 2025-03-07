
import { supabase } from '@/integrations/supabase/client';
import { UserSettings, DEFAULT_USER_SETTINGS } from '@/types/userSettings';

/**
 * Fetches user settings from the database
 */
export const fetchUserSettingsFromDB = async (userId: string): Promise<UserSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (data) {
      // Cast the database response to match our UserSettings type
      const rawData = data as any;
      
      // Create a complete UserSettings object with defaults for missing properties
      return {
        // Theme & Appearance
        theme: (rawData.theme || DEFAULT_USER_SETTINGS.theme) as "dark" | "light" | "system",
        language: (rawData.language || DEFAULT_USER_SETTINGS.language) as "ar" | "en" | "es" | "zh" | "ja" | "fr",
        animations_reduced: rawData.animations_reduced ?? DEFAULT_USER_SETTINGS.animations_reduced,
        colorblind_mode: (rawData.colorblind_mode || DEFAULT_USER_SETTINGS.colorblind_mode) as "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia",
        font_size: (rawData.font_size || DEFAULT_USER_SETTINGS.font_size) as "small" | "medium" | "large",
        
        // Audio Settings
        master_volume: rawData.master_volume ?? DEFAULT_USER_SETTINGS.master_volume,
        effects_volume: rawData.effects_volume ?? DEFAULT_USER_SETTINGS.effects_volume,
        ai_volume: rawData.ai_volume ?? DEFAULT_USER_SETTINGS.ai_volume,
        
        // AI Settings
        ai_difficulty: (rawData.ai_difficulty || DEFAULT_USER_SETTINGS.ai_difficulty) as "easy" | "medium" | "hard" | "expert",
        ai_personality: (rawData.ai_personality || DEFAULT_USER_SETTINGS.ai_personality) as "aggressive" | "competitive" | "friendly" | "strategic" | "fun",
        ai_voice_type: (rawData.ai_voice_type || DEFAULT_USER_SETTINGS.ai_voice_type) as "male" | "female" | "neutral",
        
        // Privacy Settings
        profile_visibility: (rawData.profile_visibility || DEFAULT_USER_SETTINGS.profile_visibility) as "public" | "friends" | "private",
        activity_status: rawData.activity_status ?? DEFAULT_USER_SETTINGS.activity_status,
        show_game_activity: rawData.show_game_activity ?? DEFAULT_USER_SETTINGS.show_game_activity,
        allow_friend_requests: rawData.allow_friend_requests ?? DEFAULT_USER_SETTINGS.allow_friend_requests,
        share_stats: rawData.share_stats ?? DEFAULT_USER_SETTINGS.share_stats,
        
        // System
        notifications_enabled: rawData.notifications_enabled ?? DEFAULT_USER_SETTINGS.notifications_enabled,
        sounds_enabled: rawData.sounds_enabled ?? DEFAULT_USER_SETTINGS.sounds_enabled,
        animations_enabled: rawData.animations_enabled ?? DEFAULT_USER_SETTINGS.animations_enabled
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

/**
 * Creates default settings in the database
 */
export const createDefaultSettingsInDB = async (userId: string): Promise<UserSettings | null> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .insert({ 
        user_id: userId, 
        ...DEFAULT_USER_SETTINGS 
      });
      
    if (error) throw error;
    
    return DEFAULT_USER_SETTINGS;
  } catch (error) {
    console.error('Error creating default settings:', error);
    return null;
  }
};

/**
 * Updates user settings in the database
 */
export const updateUserSettingsInDB = async (userId: string, settings: Partial<UserSettings>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update(settings)
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating settings:', error);
    return false;
  }
};
