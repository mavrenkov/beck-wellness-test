import React, { useState } from 'react';
import QuestionEmoji from '../QuestionEmoji';
import QuestionText from '../QuestionText';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import '../../styles/Question.css';
import '../../styles/SpecialQuestions.css';

const JoyQuestion = ({ 
  question, 
  style, 
  darkMode, 
  currentAnswer, 
  onAnswer, 
  animationState 
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const themeStyles = useThemeStyles(style, darkMode);
  const emojis = ["😞", "🙁", "🙂", "😊"];
  
  const handleOptionHover = (index) => setHoveredOption(index);
  const handleOptionLeave = () => setHoveredOption(null);
  
  const renderOptions = () => (
    <div className="emoji-scale-container">
      {question.answers.map((opt, i) => (
        <div 
          key={i}
          className={`emoji-scale-option ${currentAnswer === opt.value ? 'selected' : ''} ${hoveredOption === i ? 'hovered' : ''}`}
          onClick={() => onAnswer(opt.value)}
          onMouseEnter={() => handleOptionHover(i)}
          onMouseLeave={() => handleOptionLeave()}
        >
          <div className="emoji-circle" style={{
            borderColor: currentAnswer === opt.value ? themeStyles.textColor : 'transparent',
            background: darkMode 
              ? `radial-gradient(circle, rgba(60,60,60,1) 0%, rgba(40,40,40,1) 100%)` 
              : `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)`
          }}>
            <span className="scale-emoji">{emojis[i]}</span>
            <span className="scale-text">{opt.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className={`question-container special-first-question ${animationState}`}>
      <div className="first-question-background-effects">
        <div className="floating-bubble" style={{ left: '10%', top: '20%', animationDelay: '0s' }}>😊</div>
        <div className="floating-bubble" style={{ left: '80%', top: '15%', animationDelay: '1.2s' }}>💭</div>
        <div className="floating-bubble" style={{ left: '20%', top: '75%', animationDelay: '0.8s' }}>✨</div>
        <div className="floating-bubble" style={{ left: '70%', top: '70%', animationDelay: '2s' }}>💫</div>
        <div className="floating-bubble" style={{ left: '90%', top: '40%', animationDelay: '1.5s' }}>🌟</div>
      </div>
      
      <QuestionEmoji 
        emoji={style.emoji} 
        textColor={themeStyles.textColor} 
      />
      <QuestionText text={question.text} />
      {renderOptions()}
    </div>
  );
};

export default JoyQuestion; 