import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
// import { auth } from '../Firebase/firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login({ userInfo, errorMsg, googleLogin }) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    const pWordHandler = (e) => {
        setPassword(e.target.value);
    };

    // async function signInWithGoogle() {
    //     const provider = new GoogleAuthProvider();
    //     try {
    //         const res = await signInWithPopup(auth, provider);
    //         let googleUserInfo = {
    //             email: res.user.email,
    //             userName: res.user.displayName,
    //         };
    //         googleLogin(googleUserInfo);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const sendUserInfo = (e) => {
        e.preventDefault();
        let info = { email, password };
        userInfo(info);
    };

    let navigate = useNavigate();

    return (
        <section className='login-page'>
            <article className='login-page-logo'>
                <div>
                    <img src={logo} alt='logo' />
                </div>
                <h1>SMARTHABITS</h1>
            </article>
            <article className='login-page-form'>
                <form onSubmit={sendUserInfo}>
                    <input
                        type='email'
                        placeholder='E-postadress'
                        id='userName'
                        className='logInField'
                        onChange={emailHandler}
                        value={email}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Lösenord'
                        id='passWord'
                        className='logInField'
                        onChange={pWordHandler}
                        value={password}
                        required
                    />
                    {errorMsg ? (
                        <p id='errorMsg'>Nu blev det något fel, försök igen!</p>
                    ) : (
                        ''
                    )}
                    <button type='submit' id='logInBtn' className='login-btn'>
                        Logga in
                    </button>
                    <button
                        className='btn-link'
                        onClick={() => navigate('/register')}
                        id='signUp'
                    >
                        Ny här? <span className='span-bold'>Skapa konto</span>
                    </button>
                    <hr />
                    <h4>ELLER</h4>
                    <button
                        className='google-btn'
                        // onClick={signInWithGoogle}
                    >
                        <div className='google-icon-wrapper'>
                            <img
                                className='google-icon'
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                alt='google icon'
                            />
                        </div>
                        <p className='btn-text'>Logga in med Google</p>
                    </button>
                </form>
            </article>
        </section>
    );
}

export default Login;
