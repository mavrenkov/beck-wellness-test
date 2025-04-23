import React from 'react';
import Logo from './Logo';

const Footer = ({ darkMode = false, className = '', style = {} }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`mvrkn-footer ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem',
      fontSize: '0.9rem',
      opacity: 0.8,
      textAlign: 'center',
      width: '100%',
      ...style
    }}>
      <Logo size={30} darkMode={darkMode} standalone={true} />
      <span style={{ marginTop: '8px' }}>© {currentYear} All rights reserved</span>
    </footer>
  );
};

export default Footer; 