import './css/header.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import logo from "./img/logo.png";
import { useEffect } from 'react';
import { loginUser } from "../api";
import axios from "axios";


function Home() {
    const [dropdownActive, setDropdownActive] = useState(false);

    function toggleDropdown() {
        setDropdownActive(!dropdownActive);
    }

    function closeDropdown() {
        setDropdownActive(false);
    }
    function logout() {
        setDropdownActive(false);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        let login = document.getElementById("login")
        let logout = document.getElementById("logout");
        login.style.display = "block";
        logout.style.display = "none";
    }

    useEffect(() => {
        let token = getItems("token");
        let name = JSON.parse(localStorage.getItem("username"));
        let login = document.getElementById('login');
        let logout = document.getElementById("logout");
        if (token) {
            if (login) {
                logout.style.display = "block";
                login.style.display = 'none';
            } else {
                console.error("Element with ID 'login' not found");
            }
        }
        if (name) {
            logout.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${name}`;
        }

    }, []);


    return (
        <header>
            <div className='container head'>
                <HashLink to="/#begin" className='logo' onClick={closeDropdown}>QUIZ MASTER</HashLink>
                {/* <div className='logo'><img src={logo}></img></div> */}
                <div className='links'>
                    {/* <Link to="/" onClick={closeDropdown}>Home</Link> */}
                    <HashLink to="/#howtoplay" onClick={closeDropdown}>How to Play</HashLink>
                    <HashLink to="/#categories" onClick={closeDropdown}>Categories</HashLink>
                    <HashLink to="/#contact" onClick={closeDropdown}>Contact</HashLink>
                    {/* <Link to="/quiz" onClick={closeDropdown}>Quizzes</Link> */}
                    {/* <Link to="/createquiz" onClick={closeDropdown}>Create Quiz</Link> */}
                </div>
                <div className='lefticon'>
                    <Link className='login' to="/login" id='login' onClick={closeDropdown}><i className="fa-solid fa-arrow-right-to-bracket"></i> Log in</Link>
                    <Link className='logout' onClick={logout} id='logout'><i className="fa-solid fa-arrow-right-to-bracket"></i> Log out</Link>
                    <div className='login' id='logindiv'></div>
                    <div className='bars' onClick={toggleDropdown}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                <div className={`dropdown ${dropdownActive ? 'active' : ''} container`}>
                    <HashLink to="/#howtoplay" onClick={closeDropdown}>How to Play</HashLink>
                    <HashLink to="/#categories" onClick={closeDropdown}>Categories</HashLink>
                    <HashLink to="/#contact" onClick={closeDropdown}>Contact</HashLink>
                </div>
            </div>
        </header>
    );
}
function getItems(e) {
    return localStorage.getItem(`${e}`) || false;
}

export default Home;
