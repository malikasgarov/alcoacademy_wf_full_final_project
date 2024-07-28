import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getHistory } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Subject() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function fetchHistory() {
            setLoading(true);
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
            setLoading(false);
        }
        fetchHistory();
    }, []);

    const handleAnswer = (answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuizIndex * history[currentQuizIndex].questions.length + currentQuestionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < history[currentQuizIndex].questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuizIndex < history.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            setShowResults(true);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentQuizIndex > 0) {
            setCurrentQuizIndex(currentQuizIndex - 1);
            setCurrentQuestionIndex(history[currentQuizIndex - 1].questions.length - 1);
        }
    };

    const renderQuestion = () => {
        const question = history[currentQuizIndex].questions[currentQuestionIndex];
        return (
            <div className="question">
                <p>{currentQuestionIndex + 1}. {question.question}</p>
                <ul>
                    {question.choices.map((choice, choiceIndex) => (
                        <li key={choiceIndex} onClick={() => handleAnswer(choiceIndex)}>
                            {String.fromCharCode(65 + choiceIndex)}. {choice}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderResults = () => {
        return (
            <div className="results">
                <h2>Results</h2>
                {history.map((quiz, quizIndex) => (
                    <div key={quizIndex}>
                        <h3>Quiz {quizIndex + 1}</h3>
                        {quiz.questions.map((question, questionIndex) => {
                            const answerIndex = answers[quizIndex * quiz.questions.length + questionIndex];
                            const isCorrect = answerIndex === question.correctAnswer;
                            return (
                                <div key={questionIndex} className={isCorrect ? "correct" : "incorrect"}>
                                    <p>{questionIndex + 1}. {question.question}</p>
                                    <p>Your answer: {String.fromCharCode(65 + answerIndex)}. {question.choices[answerIndex]}</p>
                                    {!isCorrect && (
                                        <p>Correct answer: {String.fromCharCode(65 + question.correctAnswer)}. {question.choices[question.correctAnswer]}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
                <p>Total correct answers: {answers.filter((answer, index) => {
                    const quizIndex = Math.floor(index / history[0].questions.length);
                    const questionIndex = index % history[0].questions.length;
                    return answer === history[quizIndex].questions[questionIndex].correctAnswer;
                }).length} / {answers.length}</p>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="Math container">
                {loading ? <Loading /> : showResults ? renderResults() : renderQuestion()}
                {!showResults && (
                    <div className="navigation">
                        <button onClick={handlePrev} disabled={currentQuizIndex === 0 && currentQuestionIndex === 0}>Prev</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Subject;