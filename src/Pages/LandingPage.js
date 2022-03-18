import React from 'react';
import logo from '../images/logo.png';
import Habit from '../components/Habit';
import Todo from '../components/Todo';
import Notes from '../components/Notes';
import { FiLogOut } from 'react-icons/fi';

function LandingPage() {
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
                <button>
                    <FiLogOut className='logout-icon' />
                </button>
            </footer>
        </section>
    );
}

export default LandingPage;
