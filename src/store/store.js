import { applyMiddleware, createStore, combineReducers } from 'redux';
import { habitReducer } from './habits/habitReducer';
import { userReducer } from './users/usersReducer';
import { todosReducer } from './todos/todosReducer';
import { notesReducer } from './notes/notesReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducers = combineReducers({
    habitReducer: habitReducer,
    userReducer: userReducer,
    todosReducer: todosReducer,
    notesReducer: notesReducer,
});

// export const store = createStore(
//     rootReducers,
//     applyMiddleware(thunk, logger) /* preloadedState, */ +
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);
