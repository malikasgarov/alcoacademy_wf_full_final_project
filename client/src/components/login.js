import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import { loginUser } from "../api";
import { useState } from "react";
import App from "../App";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const hadleLogin = async(e)=>{
      e.preventDefault();
      try{
        const data = await loginUser(username, password);
        setMessage("Login Succesfully");
        localStorage.setItem("token", data.token);
        navigate("/");
      }catch(error){
        setMessage(error.error)
      }
      
    }

  return (
    <>
      <Header></Header>
      <div className="login-bg">
        <form className="box" onSubmit={hadleLogin}>
          <h1>Login</h1>
          <div>
            <i className="user"></i>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
            <i className="lock"></i>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <input type="submit" value="Log in" />
          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;