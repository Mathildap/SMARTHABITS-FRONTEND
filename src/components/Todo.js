import React, { useState, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HabitContext } from '../App';
import { BiCheck, BiTrash } from 'react-icons/bi';

function Todo() {
    let [todoName, setTodoName] = useState();
    let newTodo = useContext(HabitContext).newTodo;
    let todos = useContext(HabitContext).todos;
    let onToggle = useContext(HabitContext).onToggle;
    let onDelete = useContext(HabitContext).onDelete;

    const sendTodoHandler = () => {
        newTodo(todoName);
        document.getElementById('newTodoInput').value = '';
    };

    return (
        <section className='habit-component landning-page-component todo-component'>
            <header className='landning-page-component-header'>
                <div></div>
                <div>
                    <h2>ATT GÖRA</h2>
                </div>
                <div></div>
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
                                        <button>
                                            <BiCheck
                                                className='icon'
                                                onClick={() =>
                                                    onToggle({
                                                        id: todo._id,
                                                        done: todo.done,
                                                    })
                                                }
                                            />
                                        </button>
                                        <button>
                                            <BiTrash
                                                className='icon'
                                                onClick={() =>
                                                    onDelete(todo._id)
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='new-todo-container'>
                            <input
                                type='text'
                                id='newTodoInput'
                                placeholder='Betala sneakers på Klarna, Boka padelmatch, etc.'
                                onChange={(e) => setTodoName(e.target.value)}
                                required
                            />
                            <button onClick={sendTodoHandler}>
                                <FiPlus className='plus-icon' />
                            </button>
                        </div>
                    </>
                )}
            </article>
        </section>
    );
}

export default Todo;
