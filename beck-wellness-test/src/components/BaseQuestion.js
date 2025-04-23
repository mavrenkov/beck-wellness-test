import React, { useState } from 'react';
import '../styles/Question.css';
import QuestionEmoji from './QuestionEmoji';
import QuestionText from './QuestionText';
import StandardOptions from './StandardOptions';
import { useThemeStyles } from '../hooks/useThemeStyles';

const BaseQuestion = ({ 
  question, 
  style, 
  darkMode, 
  currentAnswer, 
  onAnswer, 
  animationState 
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const themeStyles = useThemeStyles(style, darkMode);
  
  const handleOptionHover = (index) => setHoveredOption(index);
  const handleOptionLeave = () => setHoveredOption(null);
  
  return (
    <div className={`question-container ${animationState}`}>
      <QuestionEmoji 
        emoji={style.emoji} 
        textColor={themeStyles.textColor} 
      />
      <QuestionText text={question.text} />
      <StandardOptions 
        answers={question.answers} 
        currentAnswer={currentAnswer} 
        onAnswer={onAnswer} 
        borderColor={themeStyles.textColor} 
      />
    </div>
  );
};

export default BaseQuestion; 