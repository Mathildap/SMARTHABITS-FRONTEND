import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function Page404() {
    let navigate = useNavigate();

    return (
        <section className='error-page'>
            <h2>OOPS, nu har du hamnat fel!</h2>
            <button onClick={() => navigate('/')}>Ta mig tillbaka</button>
            <div>
                <img src={logo} alt='logo' />
            </div>
        </section>
    );
}

export default Page404;
