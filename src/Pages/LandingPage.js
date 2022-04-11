import React from 'react';
import logo from '../images/logo.png';
import Habit from '../components/Habit';
import Todo from '../components/Todo';
import Notes from '../components/Notes';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function LandingPage({ logOutHandler }) {
    return (
        <section className='landing-page'>
            <Habit />
            <Todo />
            <Notes />
            <footer>
                <div> </div>
                <div>
                    <img src={logo} alt='logo' />
                </div>
                <button onKeyPress={logOutHandler}>
                    <FiLogOut className='logout-icon' onClick={logOutHandler} />
                </button>
            </footer>
        </section>
    );
}

export default LandingPage;
