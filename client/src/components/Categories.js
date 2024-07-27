import { Link, useNavigate } from "react-router-dom";
import "./css/Categories.css";
import Math from "./img/Math.png";
import English from "./img/English.png";
import Programming from "./img/Programming1.png";
import Science from "./img/Science.jpg";
import History from "./img/History.jpg";
import Geography from "./img/geography.png";
import { useEffect } from "react";

function Categories() {

    let tologin = useNavigate();

    function Check(e) {
        let token = getItems("token");
        if (!token) {
            e.preventDefault();
            tologin("/login");
        }
    }

    return (
        <>
            <div className="words container">
                <h1>Explore Our Quiz Categories</h1>
                <Link to="/exploreall">EXPLORE ALL</Link>
            </div>
            <div className="categories container" id="categories">
                <Link to="/math" className="subject" onClick={Check}>
                    <div>
                        <img src={Math} alt="Math"></img>
                    </div>
                    <h2>Math</h2>
                    <p>Sky was cloudless and of a deep dark blue spectacle before us was indeed</p>
                </Link>
                <Link to="/english" className="subject" onClick={Check}>
                    <div>
                        <img src={English} alt="English"></img>
                    </div>
                    <h2>English</h2>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                </Link>
                <Link to="/programming" className="subject" onClick={Check}>
                    <div>
                        <img src={Programming} alt="Programming"></img>
                    </div>
                    <h2>Programming</h2>
                    <p>Explore the diverse world of programming.</p>
                </Link>
                <Link to="/science" className="subject" onClick={Check}>
                    <div>
                        <img src={Science} alt="Science"></img>
                    </div>
                    <h2>Science</h2>
                    <p>Unorthographic life One day however a small line of blind text.</p>
                </Link>
                <Link to="/history" className="subject" onClick={Check}>
                    <div>
                        <img src={History} alt="History"></img>
                    </div>
                    <h2>History</h2>
                    <p>History reveals the stories of our past and shapes our understanding of the present.</p>
                </Link>
                <Link to="/geography" className="subject" onClick={Check}>
                    <div>
                        <img src={Geography} alt="Geography"></img>
                    </div>
                    <h2>Geography</h2>
                    <p>Geography explores the diverse landscapes and cultures of our planet.</p>
                </Link>
            </div>
        </>
    );
}

function getItems(e) {
    return localStorage.getItem(`${e}`) || false;
}

export default Categories;
