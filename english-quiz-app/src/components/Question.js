import React from 'react';

const Question = ({ question, onAnswerOptionClick }) => {
    return (
        <div className="question-section">
            <div className="question-text">
                {question.questionText}
            </div>
            <div className="answer-section">
                {['optionA', 'optionB', 'optionC', 'optionD'].map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerOptionClick(question[option] === question.correctAnswer)}
                    >
                        {question[option]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
