import "./css/HowtoPlay.css";
import logimg from "./img/Screenshot_1.png";
import logimg1 from "./img/Screenshot_2.png";
import logimg2 from "./img/Screenshot_3.png";
import logimg3 from "./img/Screenshot_4.png";


function Howtoplay() {
    return (
        <div className="bck">
            <div className="container phowtoplay">
                <h1>How to play</h1>
                <div className="howtoplay" id="howtoplay">
                    <div className="cart">
                        <div className="img">
                            <img src={logimg}></img>
                        </div>
                        <div className="word">
                            <h2>Step 1</h2>
                            <h4>Enter your username</h4>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="img">
                            <img src={logimg1}></img>
                        </div>
                        <div className="word">
                            <h2>Step 2</h2>
                            <h4>Enter your password</h4>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="img">
                            <img src={logimg2}></img>
                        </div>
                        <div className="word">
                            <h2>Step 3</h2>
                            <h4>Click Log in</h4>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="img" >
                            <img src={logimg3}></img>
                        </div>
                        <div className="word">
                            <h2>Step 4</h2>
                            <h4>Choose subject </h4>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="img">
                            <img src="https://placehold.co/250x200"></img>
                        </div>
                        <div className="word">
                            <h2>Step 5</h2>
                            <h4>A question will have 4 options</h4>
                        </div>
                    </div>
                    <div className="cart">
                        <div className="img">
                            <img src="https://placehold.co/250x200"></img>
                        </div>
                        <div className="word">
                            <h2>Step 6</h2>
                            <h4>Click on the right answer</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Howtoplay;
