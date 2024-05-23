// Result.js
import React from 'react';

function Result({ score, totalQuestions }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Quiz Result: {score}/{totalQuestions}
      </h2>
      {/* You can add a message or share buttons here */}
    </div>
  );
}

export default Result;
