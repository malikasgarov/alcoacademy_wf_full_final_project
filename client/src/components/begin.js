import "./css/begin.css";
import React from "react";
import beginfoto from './img/Group 338.svg';
import { Link } from 'react-router-dom';
import { useEffect,  } from "react";

function Begin() {
    useEffect(() => {
        let token = getItems("token");
        let register = document.getElementById("register");
        if (token) {
            register.style.display = "none";
        }
    }, []);
    return (
        <div className="begin container" id="begin">
            <div className="beginleft">
                <h1 >Play Online Quiz & Have Fun</h1>
                <p >Welcome to QuizMaster, the ultimate app to test your knowledge!</p>
                <Link className="register" to="/register" id="register">REGISTER NOW</Link>
            </div>
            <div className="beginimg">
                <img src={beginfoto}></img>
            </div>
        </div>
    );
}
function getItems(e){
    return localStorage.getItem(`${e}`) || false;
}

export default Begin;