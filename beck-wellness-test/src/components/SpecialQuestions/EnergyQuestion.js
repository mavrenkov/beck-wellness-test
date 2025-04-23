import React from 'react';
import QuestionEmoji from '../QuestionEmoji';
import QuestionText from '../QuestionText';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import '../../styles/Question.css';
import '../../styles/SpecialQuestions.css';

const EnergyQuestion = ({ 
  question, 
  style, 
  darkMode, 
  currentAnswer, 
  onAnswer, 
  animationState 
}) => {
  const themeStyles = useThemeStyles(style, darkMode);
  
  const renderOptions = () => (
    <div className="energy-meter-container">
      {question.answers.map((opt, i) => (
        <div 
          key={i}
          className={`energy-option ${currentAnswer === opt.value ? 'selected' : ''}`}
          onClick={() => onAnswer(opt.value)}
        >
          <div className="energy-bar-wrapper">
            <div 
              className="energy-bar" 
              style={{ 
                height: `${(4-i) * 25}%`,
                background: `linear-gradient(to top, 
                  ${i === 0 ? '#4CAF50' : i === 1 ? '#8BC34A' : i === 2 ? '#FFC107' : '#F44336'},
                  ${i === 0 ? '#2E7D32' : i === 1 ? '#689F38' : i === 2 ? '#FF8F00' : '#C62828'}
                )`,
                boxShadow: currentAnswer === opt.value 
                  ? `0 0 15px ${i === 0 ? '#4CAF50' : i === 1 ? '#8BC34A' : i === 2 ? '#FFC107' : '#F44336'}` 
                  : 'none'
              }}
            ></div>
          </div>
          <div className="energy-label">{opt.text}</div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className={`question-container special-question energy-question ${animationState}`}>
      <div className="energy-background">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="lightning-bolt" 
            style={{ 
              left: `${10 + i * 12}%`, 
              animationDelay: `${i * 0.2}s`,
              opacity: darkMode ? 0.7 : 0.5
            }}
          >⚡</div>
        ))}
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

export default EnergyQuestion; 