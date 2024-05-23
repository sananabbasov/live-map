// Question.js
import React from 'react';
import Options from './Options';

function Question({ question, onAnswerOptionClick }) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        {question.image && (
          <img src={question.image} alt="Question" className="mb-4 max-w-full" />
        )}
        <Options
          options={question.options}
          correctOption={question.correctAnswer}
          onAnswerOptionClick={onAnswerOptionClick}
        />
      </div>
    );
  }
export default Question;
