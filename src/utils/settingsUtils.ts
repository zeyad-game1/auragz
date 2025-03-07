
import { UserSettings } from '@/types/userSettings';

/**
 * Applies user settings to the document
 */
export const applySettings = (settings: UserSettings): void => {
  // Apply theme
  if (settings.theme === 'dark') {
    document.documentElement.classList.remove('light-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
    document.body.classList.add('light-theme');
  }
  
  // Dispatch theme change event
  document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: settings.theme } }));
  
  // Apply language
  document.documentElement.lang = settings.language;
  document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
  
  // Apply reduced motion
  if (settings.animations_reduced) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
  
  // Apply colorblind mode
  document.documentElement.classList.remove(
    'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'
  );
  
  if (settings.colorblind_mode !== 'none') {
    document.documentElement.classList.add(settings.colorblind_mode);
  }
  
  // Hide/show notifications
  if (!settings.notifications_enabled) {
    document.documentElement.classList.add('notifications-disabled');
  } else {
    document.documentElement.classList.remove('notifications-disabled');
  }
  
  // Apply global volume settings
  const volumeStyle = document.createElement('style');
  volumeStyle.innerHTML = `
    :root {
      --master-volume: ${settings.master_volume / 100};
      --effects-volume: ${settings.effects_volume / 100};
      --ai-volume: ${settings.ai_volume / 100};
    }
  `;
  
  const existingVolumeStyle = document.getElementById('volume-settings');
  if (existingVolumeStyle) {
    existingVolumeStyle.remove();
  }
  
  volumeStyle.id = 'volume-settings';
  document.head.appendChild(volumeStyle);
  
  // Add styles for colorblind modes
  const colorblindStyle = document.createElement('style');
  colorblindStyle.innerHTML = `
    /* Protanopia (red-blind) */
    .protanopia {
      filter: url('#protanopia-filter');
    }
    
    /* Deuteranopia (green-blind) */
    .deuteranopia {
      filter: url('#deuteranopia-filter');
    }
    
    /* Tritanopia (blue-blind) */
    .tritanopia {
      filter: url('#tritanopia-filter');
    }
    
    /* Achromatopsia (complete color blindness) */
    .achromatopsia {
      filter: grayscale(100%);
    }
  `;
  
  const existingColorblindStyle = document.getElementById('colorblind-settings');
  if (existingColorblindStyle) {
    existingColorblindStyle.remove();
  }
  
  colorblindStyle.id = 'colorblind-settings';
  document.head.appendChild(colorblindStyle);
  
  // Add SVG filters for colorblind modes if they don't exist
  if (!document.getElementById('colorblind-filters')) {
    const svgFilters = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFilters.id = 'colorblind-filters';
    svgFilters.style.display = 'none';
    svgFilters.innerHTML = `
      <filter id="protanopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.567, 0.433, 0,     0, 0
                  0.558, 0.442, 0,     0, 0
                  0,     0.242, 0.758, 0, 0
                  0,     0,     0,     1, 0"/>
      </filter>
      <filter id="deuteranopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.625, 0.375, 0,   0, 0
                  0.7,   0.3,   0,   0, 0
                  0,     0.3,   0.7, 0, 0
                  0,     0,     0,   1, 0"/>
      </filter>
      <filter id="tritanopia-filter">
        <feColorMatrix
          type="matrix"
          values="0.95, 0.05,  0,     0, 0
                  0,    0.433, 0.567, 0, 0
                  0,    0.475, 0.525, 0, 0
                  0,    0,     0,     1, 0"/>
      </filter>
    `;
    document.body.appendChild(svgFilters);
  }
};

/**
 * Saves settings to localStorage
 */
export const saveSettingsToLocalStorage = (settings: UserSettings): void => {
  localStorage.setItem('userSettings', JSON.stringify(settings));
  // Also update appSettings for broader access
  localStorage.setItem('appSettings', JSON.stringify(settings));
};

/**
 * Retrieves settings from localStorage
 */
export const getSettingsFromLocalStorage = (): UserSettings | null => {
  const localSettings = localStorage.getItem('userSettings');
  return localSettings ? JSON.parse(localSettings) : null;
};
