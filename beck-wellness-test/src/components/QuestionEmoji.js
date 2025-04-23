import React from 'react';
import '../styles/Question.css';

export const QuestionEmoji = ({ emoji, textColor }) => {
  return (
    <div className="question-emoji-enhanced">
      <div className="emoji-container">
        <div className="emoji-glow" style={{ background: textColor }}></div>
        <div className="emoji-char">{emoji}</div>
      </div>
    </div>
  );
};

export default QuestionEmoji; 