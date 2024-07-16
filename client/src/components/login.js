import { Link } from "react-router-dom";
import "./css/login.css";


function Register() {
   return (
      <div className="login-bg">
      <form className="box">
        <h1>Login</h1>
        <div>
          <i className="user"></i>
          <input type="text" placeholder="Username" />
        </div>
        <div>
          <i className="lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <input type="submit" value="Log in" />
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
   );
}

export default Register;