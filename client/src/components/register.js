import { Link } from "react-router-dom";
import "./css/register.css";
import Header from "./header"

function login() {
    return (
        <>
            <Header></Header>
            <div className="login-bg">
                <form className="box">
                    <h1>Register</h1>
                    <div>
                        <i className="user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div>
                        <i className="lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <div>
                        <i className="lock"></i>
                        <input type="password" placeholder="Repeat Password" />
                    </div>
                    <input type="submit" value="Register" />
                    <p className="register-link">
                        Already have account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default login;