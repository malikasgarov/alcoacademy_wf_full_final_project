import "./css/Quizz.css";
import { getQuizzes } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import Loading from "./Loading";

function Quizz() {
    let { id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuizzes() {
            setLoading(true);
            try {
                const data = await getQuizzes();
                const foundQuiz = data.find(quiz => quiz._id === id);
                setQuiz(foundQuiz);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
            setLoading(false);
        }

        fetchQuizzes();
    }, []);

    return (
        <>
            <Header />
            <div className="quiz-container container">
                {loading ? (
                    <Loading />
                ) : quiz ? (
                    <form className="quizz" action="/api/result" method="POST">
                        <h1>{quiz.question}</h1>
                        <div className="options">
                            <label>
                                <input type="radio" name="option" value="A" /> {quiz.A}
                            </label>
                            <label>
                                <input type="radio" name="option" value="B" /> {quiz.B}
                            </label>
                            <label>
                                <input type="radio" name="option" value="C" /> {quiz.C}
                            </label>
                            <label>
                                <input type="radio" name="option" value="D" /> {quiz.D}
                            </label>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <div>Quiz not found</div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Quizz;
