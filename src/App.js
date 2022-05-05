import './css/style.css';
import './css/normalize.css';
import React from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Firebase/firebase';
import { signOut } from 'firebase/auth';
import SplashScreen from './Pages/SplashScreen';
import Page404 from './Pages/Page404';
import UserLogIn from './Pages/UserLogIn';
import UserRegister from './Pages/UserRegister';
import LandingPage from './Pages/LandingPage';
import NewHabit from './Pages/NewHabit';
import EditHabit from './Pages/EditHabit';
import NewNote from './Pages/NewNote';
import { useSelector } from 'react-redux';
import { selectUser } from './store/selectors';

function App() {
    // - - - - - - - SPLASHSCREEN - - - - - - - //
    let [splashScreen, setSplashScreen] = useState(true);

    // TIMER ON SPLASH SCREEN
    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashScreen(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // - - - - - - -  LOGIN / USER - - - -  - - - //
    let [displayLogin, setDisplayLogin] = useState(true);
    const userState = useSelector(selectUser);

    // CHECK USER -> DISPLAY LANDINGPAGE
    useEffect(() => {
        if (userState.user === '') {
            setDisplayLogin(true);
            return;
        } else {
            setDisplayLogin(false);
        }
    }, [userState]);

    // LOG OUT
    const logOutHandler = () => {
        localStorage.clear('User');
        window.location.reload(false);
        if (userState.googleLogin === true) {
            signOut(auth);
        }
    };

    return (
        <main>
            {splashScreen ? (
                <SplashScreen />
            ) : (
                <>
                    {displayLogin ? (
                        <Router>
                            <Routes>
                                <Route exact path='/' element={<UserLogIn />} />
                                <Route
                                    path='/registrera'
                                    element={<UserRegister />}
                                />
                                <Route path='/404' element={<Page404 />} />
                                <Route
                                    path='/*'
                                    element={<Navigate replace to='/404' />}
                                />
                            </Routes>
                        </Router>
                    ) : (
                        <Router>
                            <Routes>
                                <Route
                                    path='/'
                                    element={
                                        <LandingPage
                                            logOutHandler={logOutHandler}
                                        />
                                    }
                                />
                                <Route path='/nyrutin' element={<NewHabit />} />
                                <Route
                                    path='/rutin/:habitId'
                                    element={<EditHabit />}
                                />
                                <Route
                                    path='/nyanteckning'
                                    element={<NewNote />}
                                />
                                <Route
                                    path='/nukomdufel'
                                    element={<Page404 />}
                                />
                                <Route
                                    path='/*'
                                    element={
                                        <Navigate replace to='/nukomdufel' />
                                    }
                                />
                            </Routes>
                        </Router>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
