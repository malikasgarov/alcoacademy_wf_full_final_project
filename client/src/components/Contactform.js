import { Link } from "react-router-dom";
import "./css/Contactform.css";
import logo from "./img/logo-removebg-preview.png"
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

function Contactform() {
    return (
        <div className="formbck">
            <div className="contactform container">
                <form>
                    <label for="name">NAME</label>
                    <input type="text" name="name" />

                    <label for="email">EMAIL</label>
                    <input type="text" name="email" />

                    <label for="message">MESSAGE</label>
                    <textarea name="message" rows={6}></textarea>
                    <input type="submit" value="Submit" className="sub"></input>
                </form>
            </div>
            <hr className="hr container"></hr>
            <footer className="container">
                <div className="footlogo">
                    <img src={logo}></img>
                </div>
                <div className="footmenu">
                    <p>MENU</p>
                    <div className="footlinks">
                        <HashLink to="/#begin" >Quiz Master</HashLink>
                        <HashLink to="/#howtoplay" >How to Play</HashLink>
                        <HashLink to="/#categories" >Categories</HashLink>
                        <HashLink to="/#contact" >Contact</HashLink>
                    </div>
                </div>
                <div className="medias">
                    <Link to="https://github.com/malikasgarov"><i class="fa-brands fa-github"></i></Link>
                </div>
            </footer>
            <hr className="container hr1"></hr>
            <div className="copyrights container">
                <div className="opac">Copyright &copy; 2024 Quiz Master. All Rights Reserved.</div>
                <div className="terms">
                    <Link to="/privacypolicy">Privacy Policy</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/termsofuse">Terms of Use</Link>
                </div>
            </div>
        </div>
    );
}

export default Contactform;