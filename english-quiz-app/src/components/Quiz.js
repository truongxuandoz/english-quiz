import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz">
            {showScore ? (
                <div className="score-section">
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                questions.length > 0 && (
                    <Question
                        question={questions[currentQuestionIndex]}
                        onAnswerOptionClick={handleAnswerOptionClick}
                    />
                )
            )}
        </div>
    );
}

export default Quiz;
