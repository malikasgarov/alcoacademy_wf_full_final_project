import { Link } from "react-router-dom";
import "./css/Categories.css";
import Math from "./img/Math.png";
import English from "./img/English.png";
import Programming from "./img/Programming1.png";
import Science from "./img/Science.jpg";
import History from "./img/History.jpg"
import Geography from "./img/geography.png";

function Categories() {
    return (
        <>
            <div className="words container">
                <h1>Explore Our Quiz Categories</h1>
                <Link to="/exploreall">EXPLORE ALL</Link>
            </div>
            <div className="categories container" id="categories">
                <div className="subject">
                    <div>
                        <img src={Math}></img>
                    </div>
                    <h2>Math</h2>
                    <p>Sky was cloudless and of a deep dark blue spectacle before us was indeed</p>
                </div>
                <div className="subject">
                    <div>
                        <img src={English}></img>
                    </div>
                    <h2>English</h2>
                    <p>Even the all-powerful Pointing has no control about the blind texts.</p>
                </div>
                <div className="subject">
                    <div>
                        <img src={Programming}></img>
                    </div>
                    <h2>Programming</h2>
                    <p>Explore the diverse world of programming.</p>
                </div>
                <div className="subject">
                    <div>
                        <img src={Science}></img>
                    </div>
                    <h2>Science</h2>
                    <p>Unorthographic life One day however a small line of blind text.</p>
                </div>
                <div className="subject">
                    <div>
                        <img src={History}></img>
                    </div>
                    <h2>History</h2>
                    <p>History reveals the stories of our past and shapes our understanding of the present.</p>
                </div>
                <div className="subject">
                    <div>
                        <img src={Geography}></img>
                    </div>
                    <h2>Geography</h2>
                    <p>Geography explores the diverse landscapes and cultures of our planet.</p>
                </div>

            </div>
        </>
    );
}

export default Categories;