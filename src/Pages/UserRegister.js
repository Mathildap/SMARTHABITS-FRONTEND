import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

function UserRegister({ newUserInfo, emailExist, Auth }) {
    let navigate = useNavigate();

    // STATES
    let [newUserName, setNewUserName] = useState('');
    let [newEmail, setNewEmail] = useState('');
    let [newPassword, setNewPassword] = useState('');

    // NEW USER
    const newUserHandler = (e) => {
        e.preventDefault();

        let newUser = {
            userName: newUserName,
            email: newEmail,
            passWord: newPassword,
        };

        newUserInfo(newUser);
    };

    useEffect(() => {
        if (Auth === true) navigate('/');
    });

    return (
        <section className='login-page'>
            <article className='login-page-logo'>
                <div>
                    <img src={logo} alt='logo' />
                </div>
                <h1>SMARTHABITS</h1>
            </article>
            <article className='login-page-form'>
                <form onSubmit={newUserHandler}>
                    <input
                        type='text'
                        placeholder='Välj namn'
                        id='newUserName'
                        className='logInField'
                        required='required'
                        onChange={(e) => setNewUserName(e.target.value)}
                        value={newUserName}
                    />
                    <input
                        type='email'
                        placeholder='Välj e-postadress'
                        id='newEmail'
                        className='logInField'
                        required='required'
                        onChange={(e) =>
                            setNewEmail(e.target.value.toLowerCase())
                        }
                        value={newEmail}
                    />
                    <input
                        type='password'
                        placeholder='Välj lösenord'
                        id='newPassWord'
                        className='logInField'
                        required='required'
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                    {emailExist ? (
                        <p id='errorMsg'>E-postadressen finns redan!</p>
                    ) : (
                        ''
                    )}
                    <button id='createAccount' className='login-btn'>
                        Skapa konto
                    </button>
                    <button
                        className='btn-link'
                        onClick={() => navigate('/')}
                        id='signUp'
                    >
                        Har du redan ett konto?{' '}
                        <span className='span-bold'>Logga in</span>
                    </button>
                </form>
            </article>
        </section>
    );
}

export default UserRegister;
