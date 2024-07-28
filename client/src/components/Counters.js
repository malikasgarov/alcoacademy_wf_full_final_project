import "./css/Counters.css";
import { getUsersLength, } from "../api";
import { useState, useEffect } from "react";

function Counters() {
    let [usersLength, setUsersLength] = useState([]);

    useEffect(() => {
        async function fetchLength() {
            try {
                const data = await getUsersLength();
                setUsersLength(data);
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
                <div className="quizzeslength">75</div>
            </div>
        </div>
    );
}

export default Counters;