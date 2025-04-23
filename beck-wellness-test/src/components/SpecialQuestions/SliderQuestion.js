import React, { useState, useEffect } from 'react';
import QuestionEmoji from '../QuestionEmoji';
import QuestionText from '../QuestionText';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useSliderColors } from '../../hooks/useSliderColors';
import '../../styles/Question.css';
import '../../styles/SpecialQuestions.css';

const SliderQuestion = ({ 
  question, 
  style, 
  darkMode, 
  currentAnswer, 
  onAnswer, 
  animationState 
}) => {
  const [sliderValue, setSliderValue] = useState(currentAnswer || 50);
  const themeStyles = useThemeStyles(style, darkMode);
  const sliderColors = useSliderColors(sliderValue, style.color || '#3498db');

  useEffect(() => {
    if (currentAnswer) {
      setSliderValue(currentAnswer);
    }
  }, [currentAnswer]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    onAnswer(value);
  };

  const renderSlider = () => {
    return (
      <div className="slider-container">
        <div className="slider-labels">
          <span>{question.min || 'Low'}</span>
          <span>{question.max || 'High'}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="mood-slider"
          style={{
            '--thumb-color': sliderColors.thumbColor,
            '--track-color': sliderColors.trackBackground,
            background: sliderColors.trackBackground
          }}
          aria-label={`Scale from ${question.min || 'Low'} to ${question.max || 'High'}`}
        />
        <div 
          className="slider-value" 
          style={{ color: sliderColors.valueColor }}
        >
          {sliderValue}%
        </div>
      </div>
    );
  };

  return (
    <div className={`question-container special-question slider-question ${animationState} ${sliderValue > 0 ? 'animated' : ''}`}>
      <QuestionEmoji 
        emoji={style.emoji} 
        textColor={themeStyles.textColor} 
      />
      <QuestionText text={question.text} />
      {renderSlider()}
    </div>
  );
};

export default SliderQuestion; 