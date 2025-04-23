import React, { useState, useEffect } from 'react';
import '../styles/Result.css';
import results from '../data/results.json';
import Footer from './Footer';
import Logo from './Logo';

const Result = ({ score, restart, darkMode }) => {
  // Find the appropriate result for the current score
  const result = results.find(r => score <= r.range[1]) || results[results.length - 1];
  
  // Determine progress color based on severity
  const progressColor = {
    'minimal': '#27ae60',
    'mild': '#f1c40f',
    'moderate': '#e67e22',
    'severe': '#e74c3c',
    'extreme': '#34495e'
  }[result.severity];
  
  // Animation states
  const [animate, setAnimate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Clipboard functionality
  const [copied, setCopied] = useState(false);

  // Animation sequence on load
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
    
    // Show confetti for good results
    if (result.severity === 'minimal' || result.severity === 'mild') {
      setTimeout(() => setShowConfetti(true), 500);
    }
  }, [result.severity]);

  const shareResult = () => {
    const text = `Мій результат Емоційного чек-іну: ${result.title} (${score} балів)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`result-container ${darkMode ? 'dark' : ''} ${animate ? 'animate-in' : ''}`} 
      style={{ 
        color: darkMode ? '#eee' : '#333',
        boxShadow: darkMode ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Background elements */}
      <div className="result-background">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="result-bg-circle" 
            style={{ 
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              background: darkMode 
                ? `rgba(${Math.floor(Math.random() * 30 + 50)}, ${Math.floor(Math.random() * 30 + 80)}, ${Math.floor(Math.random() * 50 + 150)}, 0.3)` 
                : `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 150)}, 0.2)`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Confetti effect for good results */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: [
                  '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
                  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
                  '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
                  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
                ][Math.floor(Math.random() * 16)]
              }}
            />
          ))}
        </div>
      )}
      
      {/* Brand logo */}
      <div className="result-logo">
        <Logo size={32} darkMode={darkMode} />
      </div>
      
      <div className="result-emoji" style={{ animation: animate ? 'emoji-bounce 2s infinite' : 'none' }}>
        {result.severity === 'minimal' ? '💚' : 
         result.severity === 'mild' ? '💛' : 
         result.severity === 'moderate' ? '🧡' : 
         result.severity === 'severe' ? '❤️' : '🖤'}
      </div>
      
      <h2 className="result-title" style={{ 
        color: darkMode ? '#fff' : '#333',
        textShadow: darkMode ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {result.title}
      </h2>
      
      <div className="result-progress-container">
        <div className="result-progress-bar" style={{ background: darkMode ? '#444' : '#eee' }}>
          <div 
            className="result-progress-fill" 
            style={{ 
              width: animate ? `${(score / 63) * 100}%` : '0%', 
              background: progressColor,
              transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)'
            }}
          ></div>
        </div>
        <div className="result-score-label">
          <strong>Ваш бал:</strong> <span className="score-value">{score}</span> з 63
        </div>
      </div>
      
      <p className="result-description">{result.description}</p>
      
      {result.recommendations && (
        <div className={`result-recommendations ${animate ? 'animate-recommendations' : ''}`}>
          <h3>Рекомендації:</h3>
          <ul>
            {result.recommendations.map((rec, i) => (
              <li key={i} style={{ animationDelay: `${0.3 + i * 0.2}s` }}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="result-buttons">
        <button 
          onClick={shareResult}
          className={`result-share-button ${copied ? 'copied' : ''}`}
          style={{ boxShadow: darkMode ? '0 4px 12px rgba(52, 152, 219, 0.4)' : '0 4px 8px rgba(52, 152, 219, 0.2)' }}
        >
          {copied ? 'Скопійовано!' : 'Поділитись результатом'}
        </button>
        <button 
          onClick={restart} 
          className="result-restart-button"
          style={{ boxShadow: darkMode ? '0 4px 12px rgba(46, 204, 113, 0.4)' : '0 4px 8px rgba(46, 204, 113, 0.2)' }}
        >
          Пройти ще раз
        </button>
      </div>
      
      <div className="result-footer">
        <div className="result-love-message">
          З любов'ю для чарівної Анічки 💖
          <span>Ти неймовірна та найкраща у всьому!</span>
          <span>Твоя краса, розум та доброта захоплюють 🌟</span>
        </div>
        <Footer darkMode={darkMode} className="result-copyright" />
      </div>
    </div>
  );
};

export default Result; 