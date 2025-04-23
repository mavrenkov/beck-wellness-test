import React from 'react';
import '../styles/Question.css';

export const QuestionText = ({ text }) => {
  return (
    <h3 className="question-text-animated">{text}</h3>
  );
};

export default QuestionText; 