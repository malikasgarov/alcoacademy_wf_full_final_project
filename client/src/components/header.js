import './css/header.css';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Home() {
    return (
        <header className='container'>
            <div className='logo'><i class="fa-solid fa-list-check"></i> Quiz Master</div>
            <div className='links'>
                <Link to="/">Home</Link>
                <HashLink to="/#howtoplay">How to Play</HashLink>
                <Link to="/categories">Categories</Link>
                <HashLink to="/#contact">Contact</HashLink>
                <Link to="/quiz">Quizes</Link>
            </div>
            <Link className='login' to="/login"><i class="fa-solid fa-arrow-right-to-bracket"></i> Log in</Link>
        </header>
    );
}

export default Home;