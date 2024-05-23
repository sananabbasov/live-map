import React, { useState } from 'react';
import Result from '../components/Result';
import Question from '../components/Question';

function QuizPage() {
  const [quizData, setQuizData] = useState({
    quizTitle: "Fire Safety Quiz",
    questions: [
      {
        question: "What should you do if you encounter a forest fire while hiking?",
        options: {
          A: "Immediately start running in the opposite direction.",
          B: "Find a nearby body of water and submerge yourself.",
          C: "Stay low to the ground and move to a cleared area, away from trees and dry grass.",
          D: "Attempt to put out the fire with any available materials."
        },
        correctAnswer: "C"
      },
      {
        question: "How should you escape a building that is on fire?",
        options: {
          A: "Use the elevator to get downstairs quickly.",
          B: "Exit through the nearest window.",
          C: "Stay in your room and wait for help.",
          D: "Crawl low under smoke and exit the building via the nearest safe exit."
        },
        correctAnswer: "D"
      },
      {
        question: "What safety measures should you take to prevent wildfires in your area?",
        options: {
          A: "Conduct controlled burns regularly.",
          B: "Dispose of cigarette butts and matches in a safe container.",
          C: "Store firewood next to your house for easy access.",
          D: "Create a defensible space by clearing away dry vegetation from your home."
        },
        correctAnswer: "D"
      },
      // Add an image question
      {
        question: "Identify the equipment in the image:",
        image: "https://cdn.pixabay.com/photo/2016/11/15/13/08/wildfire-1826204_1280.jpg", // Replace with the image URL
        options: {
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D"
        },
        correctAnswer: "A"
      },
    ]
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        {showResult ? (
          <Result score={score} totalQuestions={quizData.questions.length} />
        ) : (
          <Question
            question={quizData.questions[currentQuestion]}
            onAnswerOptionClick={handleAnswerOptionClick}
          />
        )}
      </div>
    </div>
  );
}

export default QuizPage;
