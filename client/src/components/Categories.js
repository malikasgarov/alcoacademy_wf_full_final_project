import { Link } from "react-router-dom";
import "./css/Categories.css";

function Categories() {
    return (
        <>
            <div className="words container">
                <h1>Explore Our Quiz Categories</h1>
                <Link to="/exploreall">EXPLORE ALL</Link>
            </div>
            <div className="categories container" id="#categories">
                
            </div>
        </>
    );
}

export default Categories;