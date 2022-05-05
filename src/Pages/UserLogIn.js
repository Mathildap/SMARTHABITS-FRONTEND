import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUserHandler, setUserHandler } from '../store/functions';
import { selectUser } from '../store/selectors';

function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // STATES
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errorMsg, setErrorMsg] = useState(false);
    let userState = useSelector(selectUser);

    // CHECK IF USER IS LOGGED IN
    useEffect(() => {
        if (localStorage.getItem('User')) {
            let getUser = JSON.parse(localStorage.getItem('User'));
            setLoggedInUserHandler(getUser, dispatch);
            return;
        }
        if (userState.error) {
            setErrorMsg(true);
        }
    }, [userState, dispatch]);

    // GOOGLE LOGIN
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            let googleUserInfo = {
                email: res.user.email,
                userName: res.user.displayName,
            };
            googleLogin(googleUserInfo);
        } catch (err) {
            console.log(err);
        }
    }

    // GOOGLE LOGIN
    const googleLogin = (info) => {
        fetch('https://smarthabits-mathildap.herokuapp.com/users/googleLogin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ info }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                const googleUser = {
                    userName: jsonRes.username,
                    id: jsonRes.id,
                    googleLogin: jsonRes.googleLogin,
                };
                setUserHandler(googleUser, dispatch);
                localStorage.setItem(
                    'User',
                    JSON.stringify({
                        userName: jsonRes.username,
                        id: jsonRes.id,
                    })
                );
            })
            .catch((err) => console.log(err));
    };

    // SEND INFO TO DB
    const sendUserInfo = (e) => {
        e.preventDefault();
        let info = { email, password };
        setUserHandler(info, dispatch);
    };

    return (
        <section className='login-page'>
            <article className='login-page-logo'>
                <div>
                    <img src={logo} alt='smarthabits logga' width={100} />
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
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        value={email}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Lösenord'
                        id='passWord'
                        className='logInField'
                        onChange={(e) => setPassword(e.target.value)}
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
                        onClick={() => navigate('/registrera')}
                        id='signUp'
                    >
                        Ny här? <span className='span-bold'>Skapa konto</span>
                    </button>
                    <hr />
                    <h4>ELLER</h4>
                    <button className='google-btn' onClick={signInWithGoogle}>
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
