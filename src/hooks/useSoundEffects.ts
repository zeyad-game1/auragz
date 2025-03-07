
import { useEffect, useRef, useCallback } from 'react';
import { useUserSettings } from './useUserSettings';

// تعريف أنواع الأصوات
type SoundType = 'button' | 'success' | 'error' | 'notification' | 'hover' | 'ai';

export function useSoundEffects() {
  const { settings } = useUserSettings();
  const sounds = useRef<Record<SoundType, HTMLAudioElement | null>>({
    button: null,
    success: null,
    error: null,
    notification: null,
    hover: null,
    ai: null
  });

  // تهيئة الأصوات
  useEffect(() => {
    // إنشاء عناصر الصوت
    sounds.current = {
      button: new Audio('/sounds/button-click.mp3'),
      success: new Audio('/sounds/success.mp3'),
      error: new Audio('/sounds/error.mp3'),
      notification: new Audio('/sounds/notification.mp3'),
      hover: new Audio('/sounds/hover.mp3'),
      ai: new Audio('/sounds/ai-response.mp3')
    };

    // تحميل مسبق لجميع الأصوات
    Object.entries(sounds.current).forEach(([type, audio]) => {
      if (audio) {
        audio.load();
        
        // تعيين مستوى الصوت بناءً على نوع الصوت والإعدادات
        if (settings) {
          if (type === 'ai') {
            audio.volume = (settings.ai_volume / 100) * (settings.master_volume / 100);
          } else {
            audio.volume = (settings.effects_volume / 100) * (settings.master_volume / 100);
          }
        } else {
          audio.volume = 0.5;
        }
      }
    });

    // دالة التنظيف
    return () => {
      Object.values(sounds.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, [settings]);

  // تحديث مستويات الصوت عند تغيير الإعدادات
  useEffect(() => {
    if (!settings) return;
    
    Object.entries(sounds.current).forEach(([type, audio]) => {
      if (audio) {
        if (type === 'ai') {
          audio.volume = (settings.ai_volume / 100) * (settings.master_volume / 100);
        } else {
          audio.volume = (settings.effects_volume / 100) * (settings.master_volume / 100);
        }
      }
    });
  }, [settings?.master_volume, settings?.effects_volume, settings?.ai_volume, settings]);

  // دالة تشغيل الصوت
  const playSound = useCallback((type: SoundType) => {
    if (!settings?.sounds_enabled) return;
    
    const audio = sounds.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error('خطأ في تشغيل الصوت:', err));
    }
  }, [settings?.sounds_enabled]);

  return { playSound };
}
