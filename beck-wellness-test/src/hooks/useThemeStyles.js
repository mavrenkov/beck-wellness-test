import { useMemo } from 'react';

export function useThemeStyles(style, darkMode) {
  return useMemo(() => {
    const baseBackground = darkMode ? '#1a1a1a' : '#ffffff';
    const baseColor = darkMode ? '#eeeeee' : '#333333';
    
    return {
      bgColor: darkMode 
        ? (style?.darkBackground || baseBackground) 
        : (style?.background || baseBackground),
      
      textColor: darkMode 
        ? (style?.darkColor || baseColor) 
        : (style?.color || baseColor),
        
      shadowStyle: darkMode 
        ? '2px 2px 4px rgba(0,0,0,0.3)' 
        : '1px 1px 2px rgba(0,0,0,0.1)',
        
      backgroundColor: (isActive) => isActive 
        ? (darkMode ? '#333' : '#f0f0f0') 
        : (darkMode ? '#222' : '#fff'),
        
      buttonColor: (type, isActive) => {
        if (!isActive) return '#666';
        
        switch (type) {
          case 'back': return '#e74c3c';
          case 'next': return '#27ae60';
          case 'share': return '#3498db';
          case 'restart': return '#2ecc71';
          default: return '#3498db';
        }
      },
      
      progressBg: darkMode ? '#444' : '#eee',
      
      borderColor: (isActive) => isActive 
        ? (darkMode ? style?.darkColor || '#eee' : style?.color || '#333') 
        : 'transparent'
    };
  }, [style, darkMode]);
} 