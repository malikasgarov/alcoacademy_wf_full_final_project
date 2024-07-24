import { getQuizzes } from "../api";
import { useState, useEffect } from "react";
import "./css/Quiz.css";
import Footer from "./Footer";
import Header from "./header";
import { Link } from "react-router-dom";
import Loading from "./Loading";
// const quiz = [
//     {
//         question: quizzes.question,
//         options: { A: quizzes.A, B: quizzes.B, C: quizzes.C, D: quizzes.D},
//         answer: quizzes.answer
//     }
// ]
function Quiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchQuizzes() {
            setLoading(true);
            try {
                const data = await getQuizzes();
                setQuizzes(data);
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
            <div className="quizbck">
                <div className="container quizzes">
                    <div className="filters">
                        <div><i class="fa-solid fa-filter"></i> Filters</div>
                        <div className="filter">
                            <div><i class="fa-solid fa-list"></i> Categories</div>
                            <div><i class="fa-solid fa-stopwatch-20"></i> Time Limit</div>
                        </div>
                    </div>
                    <hr className="container"></hr>
                </div>
            </div>
            <div className="quizholder container">
                        {loading ? <Loading /> : quizzes.map((quiz, index) => (
                            <Link key={quiz._id} className="quiz" to={quiz._id}>
                                <h3>{quiz.question}</h3>
                            </Link>
                        ))}
                    </div>
            <Footer />
        </>
    );
}

export default Quiz;

// {quizzes.length === 0 ? (
//     <p>No quizzes available</p>
// ) : (
//     quizzes.map((quiz) => (
//         <div key={quiz._id} className="quiz">
//             <h3>{quiz.question}</h3>
//             <ul>
//                 <li>A: {quiz.A}</li>
//                 <li>B: {quiz.B}</li>
//                 <li>C: {quiz.C}</li>
//                 <li>D: {quiz.D}</li>
//             </ul>
//             <p><strong>Answer:</strong> {quiz.answer}</p>
//         </div>
//     ))
// )}