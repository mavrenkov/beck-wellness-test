// Стартовий шаблон React додатку для "Емоційний чек-ін"
import React, { useState } from 'react';
import './styles/index.css';

// Data imports
import questions from './data/questions.json';
import questionStyles from './data/styles.json';

// Component imports
import Welcome from './components/Welcome';
import Result from './components/Result';
import BaseQuestion from './components/BaseQuestion';
import JoyQuestion from './components/SpecialQuestions/JoyQuestion';
import EnergyQuestion from './components/SpecialQuestions/EnergyQuestion';
import SliderQuestion from './components/SpecialQuestions/SliderQuestion';
import Footer from './components/Footer';

// Context imports
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  // Get theme context
  const { darkMode, toggleDarkMode } = useTheme();
  
  // App state
  const [showWelcome, setShowWelcome] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [animationState, setAnimationState] = useState('initial');

  // Animation effect on question change
  React.useEffect(() => {
    setAnimationState('entering');
    const timer = setTimeout(() => {
      setAnimationState('entered');
    }, 500); // Reduced from 600ms
    return () => clearTimeout(timer);
  }, [current]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < questions.length - 1) {
      // Smoother transition - no intermediate animation state
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const back = () => {
    if (current > 0) {
      // Smoother transition - no intermediate animation state
      setCurrent(current - 1);
    }
  };

  const restart = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
    setShowWelcome(true);
  };

  const startQuiz = () => {
    setShowWelcome(false);
  };

  // Calculate score
  const score = answers.reduce((acc, val) => acc + (val !== null ? val : 0), 0);
  
  // Show welcome screen
  if (showWelcome) {
    return <Welcome startQuiz={startQuiz} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }
  
  // Show results screen
  if (showResult) {
    return <Result score={score} restart={restart} darkMode={darkMode} />;
  }

  // Handle which question component to render
  const renderQuestion = () => {
    const hasAnswered = answers[current] !== null;
    const style = questionStyles[current] || {};

    // Specialized question components
    if (current === 0) {
      return (
        <JoyQuestion 
          question={questions[current]}
          style={style}
          darkMode={darkMode}
          currentAnswer={answers[current]}
          onAnswer={handleAnswer}
          animationState={animationState}
        />
      );
    } else if (current === 1) {
      return (
        <EnergyQuestion
          question={questions[current]}
          style={style}
          darkMode={darkMode}
          currentAnswer={answers[current]}
          onAnswer={handleAnswer}
          animationState={animationState}
        />
      );
    } else if (current === 2) {
      return (
        <SliderQuestion
          question={questions[current]}
          style={style}
          darkMode={darkMode}
          currentAnswer={answers[current]}
          onAnswer={handleAnswer}
          animationState={animationState}
        />
      );
    }

    // Default question component
    return (
      <BaseQuestion
        question={questions[current]}
        style={style}
        darkMode={darkMode}
        currentAnswer={answers[current]}
        onAnswer={handleAnswer}
        animationState={animationState}
      />
    );
  };

  // Use dark mode colors if darkMode is true
  const style = questionStyles[current] || {};
  const bgColor = darkMode ? (style.darkBackground || '#1a1a1a') : (style.background || '#ffffff');
  const textColor = darkMode ? (style.darkColor || '#eeeeee') : (style.color || '#333333');
  const hasAnswered = answers[current] !== null;

  return (
    <div className="app-container" style={{ 
      fontFamily: 'sans-serif', 
      padding: '2rem', 
      background: bgColor, 
      color: textColor, 
      transition: 'all 0.5s ease',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: textColor,
          zIndex: 10
        }}
        aria-label={darkMode ? "Світлий режим" : "Темний режим"}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: darkMode ? '2px 2px 4px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(0,0,0,0.1)'
      }}>Емоційний чек-ін</h1>
      
      {/* Render current question */}
      {renderQuestion()}

      {/* Navigation buttons */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={back}
          disabled={current === 0}
          className="btn btn-back"
          style={{ backgroundColor: hasAnswered ? '#e74c3c' : '#666' }}
        >
          Назад
        </button>
        <button
          onClick={next}
          disabled={!hasAnswered}
          className="btn btn-next"
          style={{ backgroundColor: hasAnswered ? '#27ae60' : '#666' }}
        >
          Далі
        </button>
      </div>
      
      {/* Progress indicator */}
      <div style={{ marginTop: '1.5rem', width: '100%', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: '1' }}>
            <div style={{ 
              height: '8px', 
              background: darkMode ? '#444' : '#eee', 
              borderRadius: '4px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                height: '100%', 
                width: `${(current / (questions.length - 1)) * 100}%`, 
                background: textColor,
                transition: 'width 0.3s ease' 
              }}></div>
            </div>
          </div>
          <div>Питання {current + 1} з {questions.length}</div>
        </div>
      </div>
      
      <div style={{ 
        position: 'absolute', 
        bottom: '0.5rem', 
        width: '100%',
        left: '0',
        textAlign: 'center'
      }}>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 