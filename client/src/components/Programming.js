import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";
import "./css/Math.css";
import { useState, useEffect } from "react";
import { getProgramming, postResults } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Subject() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [programming, setProgramming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function fetchprogramming() {
            setLoading(true);
            try {
                const data = await getProgramming();
                setProgramming(data);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
            setLoading(false);
        }
        fetchprogramming();
    }, []);

    const handleAnswer = (answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuizIndex * programming[currentQuizIndex].questions.length + currentQuestionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleNext = async () => {
        if (currentQuestionIndex < programming[currentQuizIndex].questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuizIndex < programming.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            setShowResults(true);
            const totalCorrectAnswers = answers.filter((answer, index) => {
                const quizIndex = Math.floor(index / programming[0].questions.length);
                const questionIndex = index % programming[0].questions.length;
                return answer === programming[quizIndex].questions[questionIndex].correctAnswer;
            }).length;
            const resultString = `${totalCorrectAnswers}/25`;
            const username = JSON.parse(localStorage.getItem("username"));
            const subject = "Programming";
            const now = new Date();
            const date = {
                minute: now.getMinutes(),
                hour: now.getHours(),
                day: now.getDate(),
                month: now.getMonth() + 1,
                year: now.getFullYear()
            };
            try {
                await postResults(resultString, username, subject, date);
            } catch (error) {
                console.error("Failed to post results:", error);
            }
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentQuizIndex > 0) {
            setCurrentQuizIndex(currentQuizIndex - 1);
            setCurrentQuestionIndex(programming[currentQuizIndex - 1].questions.length - 1);
        }
    };

    const renderQuestion = () => {
        const question = programming[currentQuizIndex].questions[currentQuestionIndex];
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
                {programming.map((quiz, quizIndex) => (
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
                    const quizIndex = Math.floor(index / programming[0].questions.length);
                    const questionIndex = index % programming[0].questions.length;
                    return answer === programming[quizIndex].questions[questionIndex].correctAnswer;
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
