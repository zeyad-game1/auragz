
export interface UserSettings {
  // Theme & Appearance
  theme: "dark" | "light" | "system";
  language: "ar" | "en" | "es" | "zh" | "ja" | "fr";
  animations_reduced: boolean;
  colorblind_mode: "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
  font_size: "small" | "medium" | "large";
  
  // Audio Settings
  master_volume: number;
  effects_volume: number;
  ai_volume: number;
  
  // AI Settings
  ai_difficulty: "easy" | "medium" | "hard" | "expert";
  ai_personality: "aggressive" | "competitive" | "friendly" | "strategic" | "fun";
  ai_voice_type: "male" | "female" | "neutral";
  
  // Privacy Settings
  profile_visibility: "public" | "friends" | "private";
  activity_status: boolean;
  show_game_activity: boolean;
  allow_friend_requests: boolean;
  share_stats: boolean;
  
  // System
  notifications_enabled: boolean;
  sounds_enabled: boolean;
  animations_enabled: boolean;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  // Theme & Appearance
  theme: 'dark',
  language: 'ar',
  animations_reduced: false,
  colorblind_mode: 'none',
  font_size: 'medium',
  
  // Audio Settings
  master_volume: 100,
  effects_volume: 100,
  ai_volume: 100,
  
  // AI Settings
  ai_difficulty: 'medium',
  ai_personality: 'friendly',
  ai_voice_type: 'neutral',
  
  // Privacy Settings
  profile_visibility: 'public',
  activity_status: true,
  show_game_activity: true,
  allow_friend_requests: true,
  share_stats: true,
  
  // System
  notifications_enabled: true,
  sounds_enabled: true,
  animations_enabled: true
};
