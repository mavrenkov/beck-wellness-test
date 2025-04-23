import { useState, useCallback, useMemo, useEffect } from 'react';

export function useQuiz(questions) {
  // App state
  const [showWelcome, setShowWelcome] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [animationState, setAnimationState] = useState('initial');

  // Animation effect on question change
  useEffect(() => {
    setAnimationState('entering');
    const timer = setTimeout(() => {
      setAnimationState('entered');
    }, 500);
    return () => clearTimeout(timer);
  }, [current]);

  // Навігація
  const navigation = useMemo(() => ({
    next: () => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    },
    back: () => {
      if (current > 0) {
        setCurrent(current - 1);
      }
    },
    restart: () => {
      setAnswers(Array(questions.length).fill(null));
      setCurrent(0);
      setShowResult(false);
      setShowWelcome(true);
    },
    startQuiz: () => {
      setShowWelcome(false);
    }
  }), [current, questions.length]);

  // Обробники
  const handleAnswer = useCallback((value) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[current] = value;
      return newAnswers;
    });
  }, [current]);

  // Розрахунок результату
  const score = useMemo(() => 
    answers.reduce((acc, val) => acc + (val !== null ? val : 0), 0), 
    [answers]
  );

  // Статус питання
  const hasAnswered = answers[current] !== null;

  return {
    showWelcome,
    current,
    answers,
    showResult,
    animationState,
    score,
    hasAnswered,
    handleAnswer,
    ...navigation
  };
} 