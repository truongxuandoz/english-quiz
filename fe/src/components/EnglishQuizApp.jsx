import React, { useState } from "react";
import { FaEdit, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const EnglishQuizApp = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the past tense of 'go'?",
      options: ["goed", "went", "gone", "going"],
      correctAnswer: "went",
    },
    {
      id: 2,
      question: "Which word is a synonym for 'happy'?",
      options: ["sad", "joyful", "angry", "tired"],
      correctAnswer: "joyful",
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed
        alert("Quiz completed!");
      }
    }, 2000);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...newQuestion, id: questions.length + 1 }]);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setNewQuestion(questionToEdit);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          English Quiz App
        </h1>

        {!isAdminMode ? (
          <div>
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="mr-3"
                      aria-label={`Select answer: ${option}`}
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={!selectedAnswer}
              aria-label="Submit answer"
            >
              Submit
            </button>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg ${
                  isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isCorrect ? (
                  <div className="flex items-center">
                    <FaCheck className="mr-2" />
                    <span>Correct answer!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaTimes className="mr-2" />
                    <span>
                      Incorrect. The correct answer is:
                      {questions[currentQuestion].correctAnswer}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              placeholder="Enter question"
              className="w-full p-2 border rounded"
              aria-label="Enter question"
            />
            {newQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuestion.options];
                  newOptions[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: newOptions });
                }}
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border rounded"
                aria-label={`Enter option ${index + 1}`}
              />
            ))}
            <input
              type="text"
              value={newQuestion.correctAnswer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
              }
              placeholder="Correct answer"
              className="w-full p-2 border rounded"
              aria-label="Enter correct answer"
            />
            <button
              onClick={handleAddQuestion}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Add question"
            >
              Add Question
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
            aria-label="Toggle admin mode"
          >
            {isAdminMode ? "Exit Admin Mode" : "Admin Mode"}
          </button>
          {!isAdminMode && (
            <div className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          )}
        </div>

        {isAdminMode && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Existing Questions:</h3>
            <ul className="space-y-2">
              {questions.map((q) => (
                <li
                  key={q.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>{q.question}</span>
                  <button
                    onClick={() => handleEditQuestion(q.id)}
                    className="text-blue-500 hover:text-blue-600"
                    aria-label={`Edit question: ${q.question}`}
                  >
                    <FaEdit />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishQuizApp;
