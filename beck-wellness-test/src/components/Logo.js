import React from 'react';

const Logo = ({ size = 60, darkMode = false, withTagline = false, standalone = false }) => {
  // Brighter gold gradient for better visibility
  const goldGradient = 'linear-gradient(135deg, #fff0b3 0%, #ffdc40 40%, #ffc125 70%, #ffe484 100%)';
  
  // Deeper background for more contrast
  const bgGradient = darkMode 
    ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(5, 5, 5, 0.95) 100%)' 
    : 'linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(5, 5, 5, 0.95) 100%)';
  
  // Enhanced text shadow for more glow and depth
  const textShadow = darkMode 
    ? '0 0 12px rgba(255, 215, 0, 1), 0 0 25px rgba(255, 215, 0, 0.7), 0 1px 2px rgba(0,0,0,0.8)'
    : '0 0 15px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.7), 0 1px 3px rgba(0,0,0,0.8)';
  
  const containerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: standalone ? '0' : '10px',
    marginBottom: standalone ? '15px' : '0',
    verticalAlign: 'middle',
    padding: `${size / 4}px ${size / 1.5}px`,
    background: bgGradient,
    borderRadius: `${size / 4}px`,
    border: `1px solid ${darkMode ? '#ffcc33' : '#ffd700'}`,
    boxShadow: `0 4px 18px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3), 0 0 25px rgba(255, 215, 0, 0.2)`,
    animation: 'logo-shimmer 2.5s infinite',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: standalone ? '100%' : 'auto',
    width: standalone ? 'fit-content' : 'auto',
    margin: standalone ? '0 auto' : null
  };
  
  return (
    <div 
      className="mvrkn-logo" 
      style={containerStyle}
    >
      {/* Enhanced gold accent line on top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #ffcc33, transparent)',
          opacity: 0.9,
          zIndex: 2
        }}
      />
      
      {/* Premium shimmer effect overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '-100%',
          left: '-100%',
          width: '300%',
          height: '300%',
          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
          transform: 'rotate(30deg)',
          animation: 'logo-shine 4s infinite ease-in-out',
          zIndex: 1
        }}
      />
      
      <span style={{
        fontFamily: "'Didot', 'Playfair Display', 'Times New Roman', serif",
        fontSize: `${size * 1.2}px`,
        fontWeight: '700',
        backgroundImage: goldGradient,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textShadow: textShadow,
        letterSpacing: `${size / 8}px`,
        position: 'relative',
        zIndex: 2,
        textTransform: 'uppercase',
        paddingBottom: '3px',
        transform: 'scale(1, 0.95)', // Slightly condensed for elegance
      }}>
        MVRKN
      </span>
      
      {/* Optional tagline */}
      {withTagline && (
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: `${size * 0.3}px`,
          fontWeight: '500',
          backgroundImage: goldGradient,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          letterSpacing: `${size / 20}px`,
          textTransform: 'uppercase',
          marginTop: `${size / 10}px`,
          opacity: 0.95,
          zIndex: 2
        }}>
          Luxury Wellness
        </span>
      )}
      
      {/* Enhanced gold accent line on bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          right: '5%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #ffcc33, transparent)',
          opacity: 0.9,
          zIndex: 2
        }}
      />
      
      {/* Subtle corner embellishments */}
      <div style={{
        position: 'absolute',
        top: 3,
        left: 3,
        width: `${size / 6}px`,
        height: `${size / 6}px`,
        borderTop: `1px solid rgba(255, 215, 0, 0.7)`,
        borderLeft: `1px solid rgba(255, 215, 0, 0.7)`,
        zIndex: 2
      }}/>
      <div style={{
        position: 'absolute',
        top: 3,
        right: 3,
        width: `${size / 6}px`,
        height: `${size / 6}px`,
        borderTop: `1px solid rgba(255, 215, 0, 0.7)`,
        borderRight: `1px solid rgba(255, 215, 0, 0.7)`,
        zIndex: 2
      }}/>
      <div style={{
        position: 'absolute',
        bottom: 3,
        left: 3,
        width: `${size / 6}px`,
        height: `${size / 6}px`,
        borderBottom: `1px solid rgba(255, 215, 0, 0.7)`,
        borderLeft: `1px solid rgba(255, 215, 0, 0.7)`,
        zIndex: 2
      }}/>
      <div style={{
        position: 'absolute',
        bottom: 3,
        right: 3,
        width: `${size / 6}px`,
        height: `${size / 6}px`,
        borderBottom: `1px solid rgba(255, 215, 0, 0.7)`,
        borderRight: `1px solid rgba(255, 215, 0, 0.7)`,
        zIndex: 2
      }}/>
    </div>
  );
};

// Add necessary animations to make the logo shine
const injectGlobalStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById('mvrkn-logo-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'mvrkn-logo-styles';
    styleEl.innerHTML = `
      @keyframes logo-shine {
        0% { transform: translateX(-100%) rotate(30deg); }
        100% { transform: translateX(100%) rotate(30deg); }
      }
      
      @keyframes logo-shimmer {
        0% { box-shadow: 0 4px 18px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3), 0 0 25px rgba(255, 215, 0, 0.2); }
        50% { box-shadow: 0 4px 18px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3), 0 0 30px rgba(255, 215, 0, 0.4); }
        100% { box-shadow: 0 4px 18px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3), 0 0 25px rgba(255, 215, 0, 0.2); }
      }
    `;
    document.head.appendChild(styleEl);
  }
};

// Inject the styles when the component is loaded
if (typeof window !== 'undefined') {
  injectGlobalStyles();
}

export default Logo; 