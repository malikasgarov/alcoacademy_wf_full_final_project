import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { loginUser } from "../api";
import { useState } from "react";
import App from "../App";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const hadleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setMessage("Login Succesfully");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", JSON.stringify(username));
      navigate("/");
    } catch (error) {
      setMessage(error.err);
      // alert("invalid password");
      document.getElementById("back").style.display = "flex";
    }
  }
  function Close(){
    document.getElementById("back").style.display = "none";
  }
  return (
    <>
      <Header></Header>
      <div className="back fade-in" id="back">
        <div className="sendmessage" id="sendmessage">
          <h2>Invalid Password!</h2>
          <div className="closebtn" id="closebtn" onClick={Close}>
            Close
          </div>
        </div>
      </div >
      <div className="login-bg">
        <form className="box" onSubmit={hadleLogin}>
          <h1>Login</h1>
          <div>
            <i className="user"></i>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <i className="lock"></i>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <p>{message ? message : ' '}</p>
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