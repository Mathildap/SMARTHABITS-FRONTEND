import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { fetchTodos } from '../store/functions';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos, selectUser } from '../store/selectors';
import { setTodosAction } from '../store/todos/todosActions';
import Todo from './Todo';

function Todos() {
    let dispatch = useDispatch();

    // STATES
    let [todoName, setTodoName] = useState();
    let todosState = useSelector(selectTodos);
    let userState = useSelector(selectUser);

    // GET TODOS
    const getTodosHandler = async () => {
        if (todosState.todos.length === 0) {
            const res = await fetchTodos(userState.user.id);
            setTodosAction('SET_TODOS', res, dispatch);
        } else {
            console.log('todos exist');
        }
    };

    useEffect(() => {
        getTodosHandler();
    }, []);

    // SEND TODO TO DB
    const sendTodoHandler = async (e) => {
        e.preventDefault();

        let newTodo = {
            userId: userState.user.id,
            todoName: todoName,
        };

        document.getElementById('newTodoInput').value = '';

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/todos/new',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ newTodo }),
                }
            ).then((resp) => resp.json());
            if (res === 'error') {
                console.log(res);
            }

            const stateCopy = todosState.todos;
            stateCopy.push(res);
            setTodosAction('SET_TODOS', stateCopy, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    // TOGGLE TODO
    const onToggle = async (info) => {
        let todo = {
            id: info.id,
            done: !info.done,
            userId: userState.user.id,
        };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/todos/update',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ todo }),
                }
            ).then((resp) => resp.json());
            if (res === 'error') {
                console.log(res);
            }

            const stateCopy = todosState.todos;
            const newArray = stateCopy.map((todo) => {
                if (todo._id === info.id) {
                    const updatedItem = {
                        ...todo,
                        done: !info.done,
                    };
                    return updatedItem;
                }
                return todo;
            });
            setTodosAction('SET_TODOS', newArray, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    // DELETE TODO
    const deleteTodo = async (e) => {
        let id;
        if (e.target.id === '') {
            id = e.target.parentNode.id;
        } else {
            id = e.target.id;
        }

        let todo = { id: id, userId: userState.user.id };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/todos/delete',
                {
                    method: 'delete',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ todo }),
                }
            ).then((resp) => resp.json());
            if (res === 'error') {
                console.log(res);
            }

            const stateCopy = todosState.todos;
            const itemIndex = stateCopy.findIndex((todo) => todo._id === id);
            stateCopy.splice(itemIndex, 1);
            setTodosAction('SET_TODOS', stateCopy, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className='habit-component landning-page-component todo-component'>
            <header className='landning-page-component-header'>
                <div />
                <h2>ATT GÖRA</h2>
                <div />
            </header>
            <article className='todos-page'>
                {todosState.todos === undefined ? (
                    ''
                ) : (
                    <>
                        <div className='todos-container'>
                            {todosState.todos.map((todo) => (
                                <Todo
                                    todo={todo}
                                    key={todo._id}
                                    onToggle={onToggle}
                                    deleteTodo={deleteTodo}
                                />
                            ))}
                        </div>
                        <form
                            onSubmit={sendTodoHandler}
                            className='new-todo-container'
                        >
                            <input
                                type='text'
                                id='newTodoInput'
                                placeholder='Betala sneakers på Klarna, Boka padelmatch, etc.'
                                onChange={(e) => setTodoName(e.target.value)}
                                required
                            />
                            <button type='submit' className='btn-icon'>
                                <FiPlus className='react-icon' />
                            </button>
                        </form>
                    </>
                )}
            </article>
        </section>
    );
}

export default Todos;
