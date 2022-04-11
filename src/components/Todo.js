import React, { useState, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HabitContext } from '../App';
import { BiCheck, BiTrash } from 'react-icons/bi';

function Todo() {
    let newTodo = useContext(HabitContext).newTodo;
    let todos = useContext(HabitContext).todos;
    let onToggle = useContext(HabitContext).onToggle;
    let onDelete = useContext(HabitContext).onDelete;

    // STATES
    let [todoName, setTodoName] = useState();

    const sendTodoHandler = (e) => {
        e.preventDefault();
        newTodo(todoName);
        document.getElementById('newTodoInput').value = '';
    };

    return (
        <section className='habit-component landning-page-component todo-component'>
            <header className='landning-page-component-header'>
                <div />
                <h2>ATT GÖRA</h2>
                <div />
            </header>
            <article className='todos-page'>
                {todos === undefined ? (
                    ''
                ) : (
                    <>
                        <div className='todos-container'>
                            {todos.map((todo) => (
                                <div
                                    className={`${
                                        todo.done === true
                                            ? 'reminder todo-div'
                                            : 'todo-div'
                                    }`}
                                    key={todo._id}
                                >
                                    <p>{todo.todoName}</p>
                                    <div className='icon-div'>
                                        <button
                                            className='icon'
                                            onClick={() =>
                                                onToggle({
                                                    id: todo._id,
                                                    done: todo.done,
                                                })
                                            }
                                        >
                                            <BiCheck />
                                        </button>
                                        <button
                                            className='icon'
                                            onClick={() => onDelete(todo._id)}
                                        >
                                            <BiTrash />
                                        </button>
                                    </div>
                                </div>
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
                            <button type='submit' className='icon'>
                                <FiPlus className='plus-icon' />
                            </button>
                        </form>
                    </>
                )}
            </article>
        </section>
    );
}

export default Todo;
