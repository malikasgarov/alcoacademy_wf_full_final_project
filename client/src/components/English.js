import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getEnglish, postResults } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Subject() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [english, setEnglish] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    let tologin = useNavigate();
    useEffect(()=>{
        let token = getItems("token");
        if (!token) {
            tologin("/login");
        }
    });
    useEffect(() => {
        async function fetchenglish() {
            setLoading(true);
            try {
                const data = await getEnglish();
                setEnglish(data);
                // Initialize answers array based on the number of questions
                setAnswers(new Array(data.reduce((acc, quiz) => acc + quiz.questions.length, 0)).fill(null));
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
            setLoading(false);
        }
        fetchenglish();
    }, []);

    const handleAnswer = (answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuizIndex * english[currentQuizIndex].questions.length + currentQuestionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    const handleNext = async () => {
        if (currentQuestionIndex < english[currentQuizIndex].questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuizIndex < english.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            setShowResults(true);
            const totalCorrectAnswers = answers.filter((answer, index) => {
                const quizIndex = Math.floor(index / english[0].questions.length);
                const questionIndex = index % english[0].questions.length;
                return answer === english[quizIndex].questions[questionIndex].correctAnswer;
            }).length;
            const resultString = `${totalCorrectAnswers}/25`;
            const username = JSON.parse(localStorage.getItem("username"));
            const subject = "English";
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
            setCurrentQuestionIndex(english[currentQuizIndex - 1].questions.length - 1);
        }
    };

    const renderQuestion = () => {
        const question = english[currentQuizIndex].questions[currentQuestionIndex];
        const currentAnswer = answers[currentQuizIndex * english[currentQuizIndex].questions.length + currentQuestionIndex];
        return (
            <div className="question">
                <p>{currentQuestionIndex + 1}. {question.question}</p>
                <ul>
                    {question.choices.map((choice, choiceIndex) => (
                        <li
                            key={choiceIndex}
                            onClick={() => handleAnswer(choiceIndex)}
                            className={currentAnswer === choiceIndex ? "selected" : ""}
                        >
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
                {english.map((quiz, quizIndex) => (
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
                    const quizIndex = Math.floor(index / english[0].questions.length);
                    const questionIndex = index % english[0].questions.length;
                    return answer === english[quizIndex].questions[questionIndex].correctAnswer;
                }).length} / {answers.length}</p>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="Math container" id="Math">
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
function getItems(e) {
    return localStorage.getItem(`${e}`) || false;
}


export default Subject;
