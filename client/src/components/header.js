import './css/Header.css';
import { Link, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState, useEffect, useRef } from 'react';
import logo from "./img/logo.png";
import axios from "axios";

function Home() {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [profileDropdownActive, setProfileDropdownActive] = useState(false);
    const [namee, setNamee] = useState(null);

    const loginRef = useRef(null);
    const logoutRef = useRef(null);
    const profileRef = useRef(null);

    function toggleDropdown() {
        setDropdownActive(!dropdownActive);
    }

    function closeDropdown() {
        setDropdownActive(false);
        setProfileDropdownActive(false);
    }

    function toggleProfileDropdown() {
        setProfileDropdownActive(!profileDropdownActive);
    }

    function toggleDropdowns() {
        toggleProfileDropdown();
        toggleDropdown();
    }

    function logout() {
        setDropdownActive(false);
        setProfileDropdownActive(false);
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        if (loginRef.current) {
            loginRef.current.style.display = "block";
        }
        if (logoutRef.current) {
            logoutRef.current.style.display = "none";
        }
        if (profileRef.current) {
            profileRef.current.innerHTML = ``;
        }
    }

    useEffect(() => {
        const token = getItems("token");
        const name = JSON.parse(localStorage.getItem("username"));
        setNamee(name);
        if (token) {
            if (logoutRef.current) {
                logoutRef.current.style.display = "block";
            }
            if (loginRef.current) {
                loginRef.current.style.display = 'none';
            }
        }
        if (name && profileRef.current) {
            profileRef.current.innerHTML = `<i class="fa-solid fa-user"></i> ${name}`;
        }
    }, []);

    const [message, setMessage] = useState('');
    const handleDeleteAccount = async () => {
        const name = JSON.parse(localStorage.getItem("username"));
        const userName = name;
        try {
            const response = await fetch(`http://localhost:3001/delete-account/${userName}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const result = await response.json();
                logout();
                setMessage(result.message);
            } else {
                const errorResult = await response.json();
                setMessage(errorResult.message || 'Error deleting account.');
            }
        } catch (error) {
            setMessage('Error deleting account.');
        }
    };

    return (
        <header id='header'>
            <div className='container head' id='head'>
                <HashLink to="/#begin" className='logo' onClick={closeDropdown}>QUIZ MASTER</HashLink>
                <div className='links'>
                    <HashLink to="/#howtoplay" onClick={closeDropdown}>How to Play</HashLink>
                    <HashLink to="/#categories" onClick={closeDropdown}>Categories</HashLink>
                    <HashLink to="/#contact" onClick={closeDropdown}>Contact</HashLink>
                </div>
                <div className='lefticon'>
                    <div className='profile' id='profile' ref={profileRef} onClick={toggleProfileDropdown}>
                    </div>
                    <div className={`profile-dropdown ${profileDropdownActive ? 'active' : ''}`}>
                        <Link to={`/resultsforusername/${namee? namee : ' '}`} >Your Results</Link>
                        <Link to="#" onClick={handleDeleteAccount} style={{ color: "red" }}>
                            Delete Account
                        </Link>
                        <Link onClick={logout} ref={logoutRef}>
                            <i className="fa-solid fa-arrow-right-to-bracket"></i> Log out
                        </Link>
                    </div>
                    <Link className='login' to="/login" id='login' ref={loginRef} onClick={closeDropdown}>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i> Log in
                    </Link>
                    <div className='bars' onClick={toggleDropdowns}>
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
