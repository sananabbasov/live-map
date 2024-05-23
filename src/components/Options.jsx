// Options.js
import React from 'react';

function Options({ options, correctOption, onAnswerOptionClick }) {
  return (
    <div>
      {Object.keys(options).map((optionKey) => (
        <button
          key={optionKey}
          className="block w-full py-2 px-4 text-white bg-blue-500 rounded-md my-2 hover:bg-blue-600"
          onClick={() => onAnswerOptionClick(optionKey === correctOption)}
        >
          {options[optionKey]}
        </button>
      ))}
    </div>
  );
}

export default Options;
