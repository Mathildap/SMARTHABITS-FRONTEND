import './css/style.css';
import './css/normalize.css';
import date from 'date-and-time';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Firebase/firebase';
import { signOut } from 'firebase/auth';
import SmashScreen from './Pages/SmashScreen';
import Page404 from './Pages/Page404';
import UserLogIn from './Pages/UserLogIn';
import UserRegister from './Pages/UserRegister';
import LandingPage from './Pages/LandingPage';
import NewHabit from './Pages/NewHabit';
import EditHabit from './Pages/EditHabit';
export const HabitContext = React.createContext();

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
    let [user, setUser] = useState();
    let [Auth, setAuth] = useState();
    let [errorMsg, setErrorMsg] = useState();
    let [emailExist, setEmailExist] = useState();

    // CHECK IF USER IS LOGGED IN
    useEffect(() => {
        if (localStorage.getItem('User')) {
            let getUser = JSON.parse(localStorage.getItem('User'));
            fetch('http://localhost:5000/users/loggedin', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ getUser }),
            })
                .then((resp) => resp.json())
                .then((jsonRes) => {
                    if (jsonRes === 'error') {
                        setErrorMsg('error');
                        return;
                    }
                    setUser({ userName: jsonRes.username, id: jsonRes.id });
                    setDisplayLogin(false);
                    setErrorMsg();
                });
        }
    }, []);

    // LOG IN USER
    const userInfo = (info) => {
        fetch('http://localhost:5000/users', {
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
                localStorage.setItem(
                    'User',
                    JSON.stringify({
                        userName: jsonRes.username,
                        id: jsonRes.id,
                    })
                );
                setDisplayLogin(false);
                setErrorMsg();
            });
    };

    // NEW USER
    const newUserInfo = (newUser) => {
        fetch('http://localhost:5000/users/new', {
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
                setAuth(true);
                localStorage.setItem(
                    'User',
                    JSON.stringify({
                        userName: jsonRes.username,
                        id: jsonRes.id,
                    })
                );
                setDisplayLogin(false);
                setEmailExist();
            });
    };

    // GOOGLE LOGIN
    const googleLogin = (info) => {
        fetch('http://localhost:5000/users/googleLogin', {
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
                setUser(googleUser);
                setDisplayLogin(false);
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

    // LOG OUT
    const logOutHandler = () => {
        setUser('');
        localStorage.clear('User');
        window.location.reload(false);
        if (user.googleLogin === true) {
            signOut(auth);
        }
    };

    // - - - - - - - HABITS - - - -  - - - //
    let [habits, setHabits] = useState();
    let [editHabit, setEditHabit] = useState();

    // GET HABITS FROM DB
    useEffect(() => {
        fetch('http://localhost:5000/habits/get', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ user }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setHabits(jsonRes);
            });
    }, [user]);

    const newHabitHandler = (info) => {
        let newHabit = {
            userId: user.id,
            habitName: info.habitName,
            habitGoal: info.habitGoal,
            habitNumber: info.habitNumber,
            habitDays: info.habitDays,
            habitMsg: info.habitMsg,
        };

        fetch('http://localhost:5000/habits/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newHabit }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setHabits(jsonRes);
            });
    };

    const updateHabitHandler = (id) => {
        let updateHabit = {
            id: id,
        };
        fetch('http://localhost:5000/habits/update', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ updateHabit }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setHabits(jsonRes);
            });
    };

    const editHabitId = (info) => {
        setEditHabit(info);
    };

    const updateHabit = (info) => {
        setHabits((habits) => habits.filter((habit) => habit._id !== info.id));
        fetch('http://localhost:5000/habits/edit', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ info }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setHabits((habits) => habits.concat(jsonRes));
            });
    };

    const deleteHabit = (i) => {
        let info = { userId: user.id, id: i };
        fetch('http://localhost:5000/habits/delete', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ info }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setHabits(jsonRes);
            });
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
                                <Route
                                    exact
                                    path='/'
                                    element={
                                        <UserLogIn
                                            userInfo={userInfo}
                                            googleLogin={googleLogin}
                                            errorMsg={errorMsg}
                                        />
                                    }
                                />
                                <Route
                                    path='/register'
                                    element={
                                        <UserRegister
                                            emailExist={emailExist}
                                            newUserInfo={newUserInfo}
                                            Auth={Auth}
                                        />
                                    }
                                />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </Router>
                    ) : (
                        <HabitContext.Provider
                            value={{
                                newHabit: newHabitHandler,
                                habits: habits,
                                updateHabit: updateHabitHandler,
                                editHabitId: editHabitId,
                            }}
                        >
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
                                    <Route
                                        path='/newhabit'
                                        element={<NewHabit />}
                                    />
                                    <Route
                                        path='/edit/'
                                        element={
                                            <EditHabit
                                                editHabit={editHabit}
                                                updateHabit={updateHabit}
                                                deleteHabit={deleteHabit}
                                            />
                                        }
                                    />
                                    <Route path='*' element={<Page404 />} />
                                </Routes>
                            </Router>
                        </HabitContext.Provider>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
