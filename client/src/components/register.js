import { Link } from "react-router-dom";
import "./css/register.css";
import Header from "./header"
import { registerUser } from "../api";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(username, password);
            setMessage(data.message);
        } catch (error) {
            setMessage(error.error)
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

export default Register;