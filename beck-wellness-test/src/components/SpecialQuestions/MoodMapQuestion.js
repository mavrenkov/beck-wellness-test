import React, { useState } from 'react';
import QuestionEmoji from '../QuestionEmoji';
import QuestionText from '../QuestionText';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import '../../styles/Question.css';
import '../../styles/SpecialQuestions.css';

const MoodMapQuestion = ({ 
  question, 
  style, 
  darkMode, 
  currentAnswer, 
  onAnswer, 
  animationState 
}) => {
  const [hoverPosition, setHoverPosition] = useState({ x: null, y: null });
  const themeStyles = useThemeStyles(style, darkMode);
  
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(2);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(2);
    
    onAnswer(`${x},${y}`);
  };
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width).toFixed(2);
    const y = ((e.clientY - rect.top) / rect.height).toFixed(2);
    
    setHoverPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setHoverPosition({ x: null, y: null });
  };
  
  const getCoordinates = () => {
    if (currentAnswer) {
      const [x, y] = currentAnswer.split(',');
      return { x, y };
    }
    return { x: null, y: null };
  };
  
  const renderMoodMap = () => {
    const coords = getCoordinates();
    const position = hoverPosition.x ? hoverPosition : coords;
    
    return (
      <div 
        className="mood-map-container"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Mood map - click to select your mood position"
        role="button"
      >
        <div className="mood-map-labels">
          <div className="mood-label top">HIGH ENERGY</div>
          <div className="mood-label right">POSITIVE</div>
          <div className="mood-label bottom">LOW ENERGY</div>
          <div className="mood-label left">NEGATIVE</div>
        </div>
        
        {position.x && (
          <div 
            className={`mood-marker ${currentAnswer ? 'selected' : 'hover'}`}
            style={{
              left: `calc(${position.x * 100}% - 10px)`,
              top: `calc(${position.y * 100}% - 10px)`,
              backgroundColor: themeStyles.color,
              boxShadow: `0 0 10px ${themeStyles.color}`
            }}
          ></div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`question-container special-question mood-map-question ${animationState}`}>
      <QuestionEmoji 
        emoji={style.emoji} 
        textColor={themeStyles.textColor} 
      />
      <QuestionText text={question.text} />
      {renderMoodMap()}
    </div>
  );
};

export default MoodMapQuestion; 