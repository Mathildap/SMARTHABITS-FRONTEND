import React from 'react';
import logo from '../images/logo.png';

function SmashScreen() {
    return (
        <section className='smash-screen-page'>
            <div>
                <img src={logo} alt='smarthabits logga' width={120} />
            </div>
            <h1>SMARTHABITS</h1>
        </section>
    );
}

export default SmashScreen;
