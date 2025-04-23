import React from 'react';
import '../styles/Question.css';

export const StandardOptions = ({ 
  answers, 
  currentAnswer, 
  onAnswer, 
  borderColor 
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {answers.map((opt, i) => (
        <label 
          key={i} 
          className={`option-label ${currentAnswer === opt.value ? 'selected' : ''}`}
          style={currentAnswer === opt.value ? { borderColor } : {}}
        >
          <input
            type="radio"
            name="question"
            checked={currentAnswer === opt.value}
            onChange={() => onAnswer(opt.value)}
            style={{ marginRight: '10px' }}
            aria-label={opt.text}
          />
          {opt.text}
        </label>
      ))}
    </div>
  );
};

export default StandardOptions; 