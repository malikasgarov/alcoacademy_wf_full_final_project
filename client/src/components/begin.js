import "./css/begin.css";
import React from "react";
import beginfoto from './img/Group 338.svg';
import {Link} from 'react-router-dom';
function Begin() {
    return (
    <div className="begin container">
        <div className="beginleft">
            <h1 >Play Online Quiz & Have Fun</h1>
            <p >Welcome to QuizMaster, the ultimate app to test your knowledge!</p>
            <Link className="register" to="/register">REGISTER NOW</Link>
        </div>
        <div className="beginimg">
            <img src={beginfoto}></img>
        </div>
    </div>
    );
}

export default Begin;