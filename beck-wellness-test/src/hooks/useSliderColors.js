import { useMemo } from 'react';

/**
 * Custom hook that generates color gradients for sliders based on their value
 */
export function useSliderColors(value, baseColor = '#3498db') {
  return useMemo(() => {
    // Create gradient colors based on value
    const getGradientColor = () => {
      // Default to blue for mid-range
      if (value >= 40 && value <= 60) {
        return baseColor;
      }
      
      // Use green for higher values
      if (value > 60) {
        const intensity = 0.4 + ((value - 60) / 40) * 0.6;
        return `rgba(46, 204, 113, ${intensity})`;
      }
      
      // Use red for lower values
      if (value < 40) {
        const intensity = 0.4 + ((40 - value) / 40) * 0.6;
        return `rgba(231, 76, 60, ${intensity})`;
      }
      
      return baseColor;
    };

    // Get background with gradient
    const getTrackBackground = () => {
      return `linear-gradient(to right, 
        rgba(231, 76, 60, 0.7) 0%, 
        rgba(241, 196, 15, 0.7) 50%, 
        rgba(46, 204, 113, 0.7) 100%)`;
    };

    return {
      thumbColor: getGradientColor(),
      trackBackground: getTrackBackground(),
      valueColor: getGradientColor()
    };
  }, [value, baseColor]);
} 