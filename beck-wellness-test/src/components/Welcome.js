import React, { useState, useEffect, useRef } from 'react';
import '../styles/Welcome.css';
import Footer from './Footer';

// Updated compliments with specific facts about Anna
const compliments = [
  "Анічка, твоя подорож до США у 2021 році показує твою сміливість! 💖",
  "Ти найкраща господиня для Алекси та Сірі! Які чудові котики! 😺",
  "Твоя наполегливість у вивченні англійської надихає! 🌟",
  "Ти така сильна жінка з Калинова, Львівської області! 💪",
  "Твоя любов до України і ненависть до Путіна показує твій характер! 🇺🇦",
  "Твоя підтримка Сергія Стерненка доводить твою громадянську позицію! 👏",
  "Життя в Найлсі з коханим і котиками - твоє маленьке щастя! ❤️",
  "Ти найкрасивіша українка в усьому Найлсі! 🌹",
  "Кожен день з тобою - це пригода і радість! ✨",
  "Твоя посмішка робить Найлс яскравішим містом! ☀️",
  "Ти приносиш частинку України до нашого дому щодня! 🏡",
  "Ти найсміливіша, переїхавши через океан у нову країну! 🌊",
  "Алекса і Сірі обожнюють свою маму-українку! 🐱",
  "Твоя ненависть до Трампа показує твій гарний смак! 😄",
  "Калинів пишається такою чудовою дочкою як ти! 🌻"
];

const Welcome = ({ startQuiz, darkMode, toggleDarkMode }) => {
  const [activeCompliments, setActiveCompliments] = useState([]);
  const heartRef = useRef(null);
  const timerRef = useRef(null);
  const [heartBeat, setHeartBeat] = useState(false);

  // Function to add a new floating compliment
  const addCompliment = () => {
    if (!heartRef.current) return;
    
    // Get heart position
    const heartRect = heartRef.current.getBoundingClientRect();
    const heartCenterX = heartRect.left + heartRect.width / 2;
    const heartCenterY = heartRect.top + heartRect.height / 2;
    
    // Generate random x offset for non-straight movement
    const xOffset = Math.random() * 200 - 100; // Random value between -100 and 100
    
    const newCompliment = {
      id: Date.now(),
      text: compliments[Math.floor(Math.random() * compliments.length)],
      x: heartCenterX,
      y: heartCenterY,
      xOffset: xOffset,
      duration: Math.random() * 3 + 6 // Random duration between 6-9 seconds
    };
    
    setActiveCompliments(prev => [...prev, newCompliment]);
    
    // Remove compliment after animation completes (longer duration)
    setTimeout(() => {
      setActiveCompliments(prev => prev.filter(c => c.id !== newCompliment.id));
    }, newCompliment.duration * 1000); // Convert seconds to milliseconds
  };

  // Heart beat effect
  useEffect(() => {
    const pulsateInterval = setInterval(() => {
      setHeartBeat(true);
      setTimeout(() => setHeartBeat(false), 300);
      
      // Add new compliment on heartbeat with reduced frequency
      if (Math.random() > 0.6) { // 40% chance to show a compliment
        addCompliment();
      }
    }, 5000); // Increased interval to 5 seconds
    
    return () => clearInterval(pulsateInterval);
  }, []);

  const handleHeartClick = () => {
    // Force add a compliment on click
    addCompliment();
  };

  return (
    <div className={`welcome-container ${darkMode ? 'dark' : ''}`} style={{ 
      color: darkMode ? '#eee' : '#333',
      boxShadow: darkMode ? '0 4px 15px rgba(0, 0, 0, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Background elements */}
      <div className="welcome-background">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="bg-circle" 
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

      {/* Floating compliments */}
      {activeCompliments.map(compliment => (
        <div 
          key={compliment.id}
          className="floating-compliment"
          style={{
            left: compliment.x,
            top: compliment.y,
            background: darkMode ? 'rgba(40,40,40,0.8)' : 'rgba(255,255,255,0.8)',
            color: darkMode ? '#fff' : '#333',
            animationDuration: `${compliment.duration}s`,
            '--x-offset': `${compliment.xOffset}px`
          }}
        >
          {compliment.text}
        </div>
      ))}

      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        style={{ color: darkMode ? '#fff' : '#333' }}
        aria-label={darkMode ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="welcome-emoji-container">
        <span className="welcome-emoji">🧠</span>
        <span className="welcome-emoji">💭</span>
        <span className="welcome-emoji">💫</span>
      </div>
      
      <h1 className="welcome-title" style={{ color: darkMode ? '#fff' : '#333' }}>
        Вітаємо у Емоційному чек-іні
      </h1>
      
      <p className="welcome-text">
        Цей тест допоможе вам оцінити свій поточний емоційний стан та рівень психологічного благополуччя.
      </p>
      
      <ul className="welcome-list">
        <li className="welcome-list-item">Тест містить 21 питання</li>
        <li className="welcome-list-item">Відповідайте чесно, ґрунтуючись на вашому самопочутті за останні 2 тижні</li>
        <li className="welcome-list-item">Проходження займе близько 5 хвилин</li>
        <li className="welcome-list-item">Ваші відповіді конфіденційні та не зберігаються</li>
      </ul>
      
      <div className="welcome-bubbles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="bubble" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 3}s`,
              background: darkMode ? 
                `rgba(${Math.floor(Math.random() * 55) + 50}, ${Math.floor(Math.random() * 55) + 100}, ${Math.floor(Math.random() * 55) + 150}, 0.2)` :
                `rgba(${Math.floor(Math.random() * 55) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.floor(Math.random() * 55) + 200}, 0.3)`
            }}
          />
        ))}
      </div>
      
      <button 
        onClick={startQuiz}
        className="welcome-button"
        style={{
          boxShadow: darkMode ? '0 4px 12px rgba(52, 152, 219, 0.4)' : '0 4px 8px rgba(52, 152, 219, 0.2)'
        }}
      >
        Розпочати тест
      </button>

      <div className="welcome-message">
        З любов'ю для чарівної Анічки 💖
        <span>Ти найпрекрасніша, найдивовижніша та найталановитіша!</span>
        <span>Твоя посмішка освітлює весь світ ✨</span>
      </div>
      
      <button 
        className={`heart-button ${heartBeat ? 'beating' : ''}`} 
        onClick={handleHeartClick}
        ref={heartRef}
      >
        ❤️
      </button>
      
      <div className="welcome-footer-wrapper">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Welcome; 