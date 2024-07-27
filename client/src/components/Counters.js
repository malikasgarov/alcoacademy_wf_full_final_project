import "./css/Counters.css";
import { getUsersLength, getQuizzesLength } from "../api";
import { useState, useEffect } from "react";

function Counters() {
    let [usersLength, setUsersLength] = useState([]);
    let [quizzesLength, setQuizzesLength] = useState([]);


    useEffect(() => {
        async function fetchLength() {
            try {
                const data = await getUsersLength();
                const data1 = await getQuizzesLength();
                setUsersLength(data);
                setQuizzesLength(data1);
            } catch (error) {
                console.error("Failed to fetch quizzes", error);
            }
        }
        setInterval(()=>{
            fetchLength();
        }, 3000)
    }, []);


    return (
        <div className="Counter container">
            <div className="number">
                <h2>NUMBER OF USERS REGISTERED</h2>
                <div className="userslength">{usersLength ? usersLength.length : "there is no user"}</div>
            </div>
            <div className="number">
                <h2>NUMBER OF QUIZES</h2>
                <div className="quizzeslength">{quizzesLength ? quizzesLength.length : "there is no quiz"}</div>
            </div>
        </div>
    );
}

export default Counters;