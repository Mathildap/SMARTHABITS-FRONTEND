import './css/style.css';
import './css/normalize.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
export const HabitContext = React.createContext();

function App() {
    // - - - - - - - SMASHSCREEN - - - - - - - //
    let [splashScreen, setSplashScreen] = useState(true);

    // TIMER
    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashScreen(false);
        }, 1200);
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
            fetch(
                'https://smarthabits-mathildap.herokuapp.com/users/loggedin',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ getUser }),
                }
            )
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
        fetch('https://smarthabits-mathildap.herokuapp.com/users', {
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
        fetch('https://smarthabits-mathildap.herokuapp.com/users/new', {
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
    const logOutHandler = (e) => {
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
        fetch('https://smarthabits-mathildap.herokuapp.com/habits/get', {
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

    // NEW HABIT
    const newHabitHandler = (info) => {
        if (info.habitDays.length === 0) {
            info.habitDays = ['none'];
        }

        let newHabit = {
            userId: user.id,
            habitName: info.habitName,
            habitGoal: info.habitGoal,
            habitNumber: info.habitNumber,
            habitDays: info.habitDays,
            habitMsg: info.habitMsg,
        };

        fetch('https://smarthabits-mathildap.herokuapp.com/habits/new', {
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

    // UPDATE HABIT
    const updateHabitHandler = (id) => {
        let info = { id: id, userId: user.id };

        fetch('https://smarthabits-mathildap.herokuapp.com/habits/update', {
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

    // EDIT HABIT
    const editHabitId = (info) => {
        setEditHabit(info);
    };

    const updateHabit = (info) => {
        let sendInfo = { id: info.id, update: info.update, userId: user.id };

        fetch('https://smarthabits-mathildap.herokuapp.com/habits/edit', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ sendInfo }),
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

    const idReload = (habitId) => {
        if (editHabit === undefined) {
            fetch(
                'https://smarthabits-mathildap.herokuapp.com/habits/edit/' +
                    habitId,
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ user: user.id }),
                }
            )
                .then((resp) => resp.json())
                .then((jsonRes) => {
                    if (jsonRes === 'error') {
                        console.log(jsonRes);
                        return;
                    }
                    setEditHabit(jsonRes);
                });
        }
    };

    // DELETE HABIT
    const deleteHabit = (i) => {
        let info = { userId: user.id, id: i };
        fetch('https://smarthabits-mathildap.herokuapp.com/habits/delete', {
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

    // - - - - - - - TODO - - - -  - - - //
    let [todos, setTodos] = useState();

    // GET TODOS FROM DB
    useEffect(() => {
        fetch('https://smarthabits-mathildap.herokuapp.com/todos/get', {
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
                setTodos(jsonRes);
            });
    }, [user]);

    // NEW TODO
    const sendTodo = (info) => {
        let newTodo = {
            userId: user.id,
            todoName: info,
        };

        fetch('https://smarthabits-mathildap.herokuapp.com/todos/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newTodo }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setTodos(jsonRes);
            });
    };

    // TOGGLE TODO
    const toggleTodo = (info) => {
        let trueOrFalse;

        if (info.done === true) {
            trueOrFalse = false;
        } else {
            trueOrFalse = true;
        }

        let todo = { id: info.id, done: trueOrFalse, userId: user.id };

        fetch('https://smarthabits-mathildap.herokuapp.com/todos/update', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ todo }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setTodos(jsonRes);
            });
    };

    // DELETE TODO
    const deleteTodo = (info) => {
        let todo = { id: info, userId: user.id };

        fetch('hhttps://smarthabits-mathildap.herokuapp.com/todos/delete', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ todo }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setTodos(jsonRes);
            });
    };

    // - - - - - - - NOTES - - - -  - - - //
    let [notes, setNotes] = useState();

    // GET NOTES FROM DB
    useEffect(() => {
        fetch('https://smarthabits-mathildap.herokuapp.com/notes/get', {
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
                setNotes(jsonRes);
            });
    }, [user]);

    // NEW NOTE
    const newNote = (info) => {
        let newNote = {
            userId: user.id,
            noteTitle: info,
        };

        fetch('https://smarthabits-mathildap.herokuapp.com/notes/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newNote }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    console.log(jsonRes);
                    return;
                }
                setNotes(jsonRes);
            });
    };

    // UPDATE NOTE TEXT
    const updateNoteText = (note) => {
        let info = { userId: user.id, noteId: note.id, text: note.text };

        fetch('https://smarthabits-mathildap.herokuapp.com/notes/updatetext', {
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
                setNotes(jsonRes);
            });
    };

    // DELETE NOTE
    const deleteNote = (note) => {
        let info = { userId: user.id, noteId: note };

        fetch('https://smarthabits-mathildap.herokuapp.com/notes/delete', {
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
                setNotes(jsonRes);
            });
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
                                <Route
                                    exact
                                    path='/SMARTHABITS-FRONTEND/'
                                    element={
                                        <UserLogIn
                                            userInfo={userInfo}
                                            googleLogin={googleLogin}
                                            errorMsg={errorMsg}
                                        />
                                    }
                                />
                                <Route
                                    path='/SMARTHABITS-FRONTEND/registrera'
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
                                newTodo: sendTodo,
                                todos: todos,
                                onToggle: toggleTodo,
                                onDelete: deleteTodo,
                                newNote: newNote,
                                notes: notes,
                                notesHandler: updateNoteText,
                                deleteNoteHandler: deleteNote,
                            }}
                        >
                            <Router>
                                <Routes>
                                    <Route
                                        path='/SMARTHABITS-FRONTEND/'
                                        element={
                                            <LandingPage
                                                logOutHandler={logOutHandler}
                                            />
                                        }
                                    />
                                    <Route
                                        path='/SMARTHABITS-FRONTEND/nyrutin'
                                        element={<NewHabit />}
                                    />
                                    <Route
                                        path='/SMARTHABITS-FRONTEND/rutin/:habitId'
                                        element={
                                            <EditHabit
                                                editHabit={editHabit}
                                                updateHabit={updateHabit}
                                                deleteHabit={deleteHabit}
                                                idReload={idReload}
                                            />
                                        }
                                    />
                                    <Route
                                        path='/SMARTHABITS-FRONTEND/nyanteckning'
                                        element={<NewNote />}
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
