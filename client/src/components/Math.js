import "./css/Math.css";
import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getMath } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Subject() {
    let toresult = useNavigate();
    const [math, setMath] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function fetchMath() {
            setLoading(true);
            try {
                const data = await getMath();
                setMath(data);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
            setLoading(false);
        }
        fetchMath();
    }, []);

    const handleAnswer = (answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < math[currentQuizIndex].questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuizIndex < math.length - 1) {
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
            setCurrentQuestionIndex(math[currentQuizIndex - 1].questions.length - 1);
        }
    };

    const renderQuestion = () => {
        const question = math[currentQuizIndex].questions[currentQuestionIndex];
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
        let correctCount = 0;
        math.forEach((quiz, quizIndex) => {
            quiz.questions.forEach((question, questionIndex) => {
                if (answers[quizIndex * quiz.questions.length + questionIndex] === question.correctAnswer) {
                    correctCount++;
                }
            });
        });
        

        return (
            <div className="results">
                <h2>Results</h2>
                <p>You answered {correctCount} out of {math.reduce((acc, quiz) => acc + quiz.questions.length, 0)} questions correctly!</p>
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
