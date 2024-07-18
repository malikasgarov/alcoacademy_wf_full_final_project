import './css/header.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import logo from "./img/logo.png";
function Home() {
    const [dropdownActive, setDropdownActive] = useState(false);

    function toggleDropdown() {
        setDropdownActive(!dropdownActive);
    }

    function closeDropdown() {
        setDropdownActive(false);
    }

    return (
        <header>
            <div className='container head'>
                <div className='logo'>QUIZ MASTER</div>
                {/* <div className='logo'><img src={logo}></img></div> */}
                <div className='links'>
                    <Link to="/" onClick={closeDropdown}>Home</Link>
                    <HashLink to="/#howtoplay" onClick={closeDropdown}>How to Play</HashLink>
                    <HashLink to="/#categories" onClick={closeDropdown}>Categories</HashLink>
                    <HashLink to="/#contact" onClick={closeDropdown}>Contact</HashLink>
                    <Link to="/quiz" onClick={closeDropdown}>Quizzes</Link>
                </div>
                <div className='lefticon'>
                    <Link className='login' to="/login" onClick={closeDropdown}><i className="fa-solid fa-arrow-right-to-bracket"></i> Log in</Link>
                    <div className='bars' onClick={toggleDropdown}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
                    <Link to="/" onClick={closeDropdown}>Home</Link>
                    <HashLink to="/#howtoplay" onClick={closeDropdown}>How to Play</HashLink>
                    <Link to="/categories" onClick={closeDropdown}>Categories</Link>
                    <HashLink to="/#contact" onClick={closeDropdown}>Contact</HashLink>
                    <Link to="/quiz" onClick={closeDropdown}>Quizzes</Link>
                </div>
            </div>
        </header>
    );
}

export default Home;
