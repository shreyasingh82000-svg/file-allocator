import React, { useState, useEffect } from 'react';
import { saveQuizProgress, loadQuizProgress } from '../utils/storage';
import './QuizPage.css';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      question: 'What is the main advantage of Contiguous Allocation?',
      options: [
        'Fast direct access',
        'No external fragmentation',
        'Easy file growth',
        'Requires no pointers'
      ],
      correct: 0
    },
    {
      question: 'External fragmentation is a problem with which allocation method?',
      options: [
        'Linked Allocation',
        'Indexed Allocation',
        'Contiguous Allocation',
        'All of the above'
      ],
      correct: 2
    },
    {
      question: 'In Linked Allocation, what does each block contain?',
      options: [
        'File name',
        'Pointer to next block',
        'File size',
        'Checksum'
      ],
      correct: 1
    },
    {
      question: 'What is an Index Block?',
      options: [
        'A special block storing addresses of data blocks',
        'The first block of a file',
        'A pointer to another block',
        'A block containing file metadata'
      ],
      correct: 0
    },
    {
      question: 'Which allocation method is best for direct access?',
      options: [
        'Linked Allocation',
        'Contiguous or Indexed',
        'Neither of the above',
        'It depends on file size'
      ],
      correct: 1
    },
    {
      question: 'How many index blocks does a file need in Indexed Allocation?',
      options: [
        'One per data block',
        'Exactly one',
        'Depends on file size',
        'Multiple levels'
      ],
      correct: 1
    },
    {
      question: 'What happens when a pointer is lost in Linked Allocation?',
      options: [
        'The file is automatically recovered',
        'Lost data cannot be accessed',
        'The OS fixes it automatically',
        'Nothing happens'
      ],
      correct: 1
    },
    {
      question: 'Which method has NO external fragmentation?',
      options: [
        'Contiguous Allocation only',
        'Linked and Indexed only',
        'All methods',
        'None of the methods'
      ],
      correct: 1
    },
    {
      question: 'What is the overhead in Linked Allocation?',
      options: [
        'Pointer in each block',
        'Index block',
        'File table entry',
        'Memory allocation'
      ],
      correct: 0
    },
    {
      question: 'For sequential access, which method is fastest?',
      options: [
        'Linked Allocation',
        'Contiguous Allocation',
        'Indexed Allocation',
        'All are equally fast'
      ],
      correct: 1
    },
    {
      question: 'What is a free region in the context of fragmentation?',
      options: [
        'A deleted file',
        'A contiguous area of free blocks',
        'An unused disk partition',
        'A cached memory area'
      ],
      correct: 1
    },
    {
      question: 'How is logical block number converted to physical block in Contiguous Allocation?',
      options: [
        'Using a lookup table',
        'Physical = Start + Logical',
        'Using pointer traversal',
        'Through index block'
      ],
      correct: 1
    },
    {
      question: 'Which allocation method is most suitable for a system with frequent file growth?',
      options: [
        'Contiguous Allocation',
        'Linked or Indexed',
        'Sequential Allocation',
        'Only Contiguous'
      ],
      correct: 1
    },
    {
      question: 'What does the NULL pointer indicate in Linked Allocation?',
      options: [
        'End of file',
        'Start of file',
        'Middle of file',
        'Empty block'
      ],
      correct: 0
    },
    {
      question: 'How many disk accesses are needed for direct access in Indexed Allocation?',
      options: [
        'One',
        'Two (index + data)',
        'Three',
        'Depends on file size'
      ],
      correct: 1
    }
  ];

  useEffect(() => {
    const savedProgress = loadQuizProgress();
    if (savedProgress) {
      setScore(savedProgress.score);
      setSelectedAnswers(savedProgress.answers);
    }
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion]: optionIndex };
    setSelectedAnswers(newAnswers);

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      saveQuizProgress({ score, answers: selectedAnswers });
    }
  };

  const handleRetry = () => {
    handleStartQuiz();
  };

  const getPerformanceLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 'Outstanding';
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Satisfactory';
    return 'Need Improvement';
  };

  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <div className="quiz-start">
          <h1>File Allocation Methods Quiz</h1>
          <div className="quiz-info">
            <p>Test your knowledge of file allocation methods!</p>
            <div className="quiz-details">
              <p><strong>Total Questions:</strong> {questions.length}</p>
              <p><strong>Time Limit:</strong> No limit</p>
              <p><strong>Format:</strong> Multiple choice</p>
            </div>
            <button className="start-btn" onClick={handleStartQuiz}>
              START QUIZ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="quiz-page">
        <div className="quiz-results">
          <h1>Quiz Results</h1>
          <div className="results-summary">
            <div className="score-circle">
              <div className="score-text">
                <strong>{score}</strong>
                <span>/{questions.length}</span>
              </div>
            </div>
            <div className="results-details">
              <p className="percentage">{percentage.toFixed(1)}%</p>
              <p className="performance">{getPerformanceLevel()}</p>
            </div>
          </div>

          <div className="results-breakdown">
            <h2>Answer Review</h2>
            {questions.map((q, index) => (
              <div key={index} className={`answer-review ${selectedAnswers[index] === q.correct ? 'correct' : 'incorrect'}`}>
                <div className="review-header">
                  <span className="question-num">Q{index + 1}</span>
                  <span className="status">
                    {selectedAnswers[index] === q.correct ? '✓' : '✗'}
                  </span>
                </div>
                <p className="question-text">{q.question}</p>
                <p className="user-answer">
                  Your answer: <strong>{q.options[selectedAnswers[index]]}</strong>
                </p>
                {selectedAnswers[index] !== q.correct && (
                  <p className="correct-answer">
                    Correct answer: <strong>{q.options[q.correct]}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>

          <button className="retry-btn" onClick={handleRetry}>
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion);

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="quiz-content">
          <h2>{question.question}</h2>

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <button
            className="next-btn"
            onClick={handleNextQuestion}
            disabled={!isAnswered}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
          <div className="score-display">
            Current Score: <strong>{score}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
