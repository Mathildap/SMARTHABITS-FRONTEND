import React from 'react';
import logo from '../images/logo.png';
import Habit from '../components/Habit';
import Todo from '../components/Todo';
import Notes from '../components/Notes';
import { FiLogOut } from 'react-icons/fi';

function LandingPage({ logOutHandler }) {
    return (
        <section className='landing-page'>
            <article className='components-container'>
                <Habit />
                <Todo />
                <Notes />
            </article>
            <footer>
                <div />
                <div>
                    <img src={logo} alt='smarthabits logga' width={75} />
                </div>
                <button className='btn-icon' onClick={logOutHandler}>
                    <FiLogOut className='react-icon' />
                </button>
            </footer>
        </section>
    );
}

export default LandingPage;
