import { Link } from "react-router-dom";
import "./css/login.css";
import Header from "./header";

function Register() {
  return (
    <>
    <Header></Header>
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
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;