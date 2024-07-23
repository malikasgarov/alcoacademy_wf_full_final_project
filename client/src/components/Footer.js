import "./css/Footer.css"
import { Link } from "react-router-dom";
import "./css/Contactform.css";
import logo from "./img/logo-removebg-preview.png"
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";


function Footer() {
    return (
        <div className="bck">
            {/* <hr className="hr container"></hr> */}
            <footer className="container">
                <div className="footlogo">
                    <img src={logo}></img>
                </div>
                <div className="footmenu">
                    <p>MENU</p>
                    <div className="footlinks">
                        <Link to="/" >Home</Link>
                        <HashLink to="/#howtoplay" >How to Play</HashLink>
                        <HashLink to="/#categories" >Categories</HashLink>
                        <HashLink to="/#contact" >Contact</HashLink>
                        <Link to="/quiz">Quizzes</Link>
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

export default Footer;