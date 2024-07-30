import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/Register.css";
import Header from "./Header";
import { registerUser } from "../api";
import { useState } from "react";


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let tologin = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(username, password);
            setMessage(data.message);
            tologin("/login");
        } catch (error) {
            setMessage(error.error);
            document.getElementById("back").style.display = "block";
        }
    }
    function Close() {
        document.getElementById("back").style.display = "none";
    }
    return (
        <>
            <Header></Header>
            <div className="back fade-in" id="back">
                <div className="sendmessage" id="sendmessage">
                    <h2>User Already Exists!</h2>
                    <div className="closebtn" id="closebtn" onClick={Close}>
                        Close
                    </div>
                </div>
            </div >
            <div className="login-bg">
                <form className="box" onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div>
                        <i className="user"></i>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <i className="lock"></i>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default Register;