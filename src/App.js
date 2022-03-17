import './css/style.css';
import './css/normalize.css';
import date from 'date-and-time';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import SmashScreen from './Pages/SmashScreen';
import Page404 from './Pages/Page404';
import UserLogIn from './Pages/UserLogIn';
import UserRegister from './Pages/UserRegister';
import LandingPage from './Pages/LandingPage';
import Secret from './Pages/Secret';

function App() {
    // - - - - - - - SMASHSCREEN - - - - - - - //
    let [smashScreen, setSmashScreen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSmashScreen(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // - - - - - - -  LOGIN / USER - - - -  - - - //
    let [displayLogin, setDisplayLogin] = useState(true);
    let [user, setUser] = useState('');
    let [errorMsg, setErrorMsg] = useState();
    let [emailExist, setEmailExist] = useState();

    // USER
    const userInfo = (info) => {
        fetch('https://localhost:5000/users/', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ info }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    setErrorMsg('error');
                    return;
                }
                setUser({ userName: jsonRes.username, id: jsonRes.id });
                setErrorMsg();
            });
    };

    // NEW USER
    const newUserInfo = (newUser) => {
        fetch('https://localhost:5000/users/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newUser }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'email exist') {
                    setEmailExist('email exist');
                    return;
                }
                setUser({ userName: jsonRes.username, id: jsonRes.id });
                setEmailExist();
            });
    };

    // GOOGLE LOGIN
    // const googleLogin = (info) => {
    //     fetch(
    //         'https://calendar-backend-mathildap.herokuapp.com/users/googleLogin',
    //         {
    //             method: 'post',
    //             headers: { 'Content-type': 'application/json' },
    //             body: JSON.stringify({ info }),
    //         }
    //     )
    //         .then((resp) => resp.json())
    //         .then((jsonRes) => {
    //             const googleUser = {
    //                 userName: jsonRes.username,
    //                 id: jsonRes.id,
    //                 googleLogin: jsonRes.googleLogin,
    //             };
    //             setUser(googleUser);
    //         })
    //         .catch((err) => console.log(err));
    // };

    // LOG OUT
    const logOutHandler = () => {
        setUser('');
        // if (user.googleLogin === true) {
        //     signOut(auth);
        // }
    };

    return (
        <main>
            {smashScreen ? (
                <SmashScreen />
            ) : (
                <>
                    {displayLogin ? (
                        <Router>
                            <Routes>
                                <Route path='/' element={<UserLogIn />} />
                                <Route
                                    path='/register'
                                    element={<UserRegister />}
                                />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </Router>
                    ) : (
                        <Router>
                            <Routes>
                                <Route path='/' element={<LandingPage />} />
                                <Route path='/secret' element={<Secret />} />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </Router>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
