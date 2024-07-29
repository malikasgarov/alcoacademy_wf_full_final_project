import "./css/Contactform.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import logo from "./img/logo-removebg-preview.png";
import { useState } from "react";
import { contactMess } from "../api";

function Contactform() {
    const [username, setUsername] = useState('');
    const [contactmessage, setContactMessage] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await contactMess(username, email, contactmessage);
            setMessage(data.message);
            setUsername('');
            setEmail('');
            setContactMessage('');
            document.getElementById("back").style.display = "block";
            // alert("Your Message Sent!");
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(error.message || "An error occurred");
            alert("Wasn't able to send the message");
        }
    }
    function Close() {
        document.getElementById("back").style.display = "none";
    }

    return (<>
        <div className="back" id="back">
            <div className="sendmessage" id="sendmessage">
                <h2>Message Sent Succesfully!</h2>
                <div className="closebtn" id="closebtn" onClick={Close}>
                    Close
                </div>
            </div>
        </div>
        <div className="formbck">
            <div className="contactform container">
                <form onSubmit={handleSubmit}>
                    <label for="name">NAME</label>
                    <input id="username" type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label for="email">EMAIL</label>
                    <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label for="message">MESSAGE</label>
                    <textarea id="message" name="message" rows={6} value={contactmessage} onChange={(e) => setContactMessage(e.target.value)} required></textarea>
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
                    <div><div>Developed by </div>&nbsp;&nbsp;&nbsp;<i> MALIK ASGAROV</i></div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Contactform;