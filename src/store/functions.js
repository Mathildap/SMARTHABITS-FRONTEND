import { setUserAction } from './users/usersActions';

export const fetchHabits = async (user) => {
    try {
        const response = await fetch(
            `https://smarthabits-mathildap.herokuapp.com/habits/get/${user}`,
            {
                method: 'get',
            }
        ).then((resp) => resp.json());
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const fetchTodos = async (user) => {
    try {
        const response = await fetch(
            `https://smarthabits-mathildap.herokuapp.com/todos/get/${user}`,
            {
                method: 'get',
            }
        ).then((resp) => resp.json());
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const fetchNotes = async (user) => {
    try {
        const response = await fetch(
            `https://smarthabits-mathildap.herokuapp.com/notes/get/${user}`,
            {
                method: 'get',
            }
        ).then((resp) => resp.json());
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const setUserHandler = async (info, dispatch) => {
    try {
        const response = await fetch(
            'https://smarthabits-mathildap.herokuapp.com/users',
            {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ info }),
            }
        ).then((resp) => resp.json());

        if (response === 'error') {
            return setUserAction('ERROR_USER', response, dispatch);
        }

        localStorage.setItem(
            'User',
            JSON.stringify({
                userName: response.username,
                id: response.id,
            })
        );
        return setUserAction('SET_USER', response, dispatch);
    } catch (err) {
        console.log(err);
    }
};

export const setLoggedInUserHandler = async (getUser, dispatch) => {
    try {
        const response = await fetch(
            'https://smarthabits-mathildap.herokuapp.com/users/loggedin',
            {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ getUser }),
            }
        ).then((resp) => resp.json());
        setUserAction('SET_USER', response, dispatch);
        localStorage.setItem(
            'User',
            JSON.stringify({
                userName: response.username,
                id: response.id,
            })
        );
    } catch (err) {
        console.log(err);
    }
};
