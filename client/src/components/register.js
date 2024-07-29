import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/register.css";
import Header from "./header"
import { registerUser } from "../api";
import { useState } from "react";


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let tohome = useNavigate();
    // function loginCheck(event) {
    //     event.preventDefault();  
    //     const email = document.getElementById("email");
    //     const password = document.getElementById("password");
    //     let valid = true;
    //     document.getElementById("emailError").style.display = "none";
    //     document.getElementById("passwordLengthError").style.display = "none";
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailPattern.test(email.value)) {
    //       document.getElementById("emailError").style.display = "block";
    //       valid = false;
    //     }
    //     if (password.value.length < 7 || password.value.length > 20) {
    //       document.getElementById("passwordLengthError").style.display = "block";
    //       valid = false;
    //     if (valid) {
    //       document.getElementById("loginForm").submit();
    //     }
    //   }
      
    //   document.getElementById("loginForm").addEventListener("submit", loginCheck);
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(username, password);
            setMessage(data.message);
            tohome("/");
        } catch (error) {
            setMessage(error.error);
            alert("user already exists");
        }
    }

    return (
        <>
            <Header></Header>
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
                    {/* <div>
                        <i className="lock"></i>
                        <input type="password" placeholder="Repeat Password" />
                    </div> */}
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