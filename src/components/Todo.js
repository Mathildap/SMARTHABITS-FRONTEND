import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';

export default function Todo({ todo, onToggle, deleteTodo }) {
    return (
        <div
            className={`${
                todo.done === true ? 'reminder todo-div' : 'todo-div'
            }`}
            key={todo._id}
        >
            <p>{todo.todoName}</p>
            <div className='icon-div'>
                <button
                    className='btn-icon'
                    onClick={() =>
                        onToggle({
                            id: todo._id,
                            done: todo.done,
                        })
                    }
                >
                    <BiCheck className='react-icon' />
                </button>
                <button className='btn-icon' onClick={deleteTodo} id={todo._id}>
                    <BiTrash className='react-icon todo-icon' id={todo._id} />
                </button>
            </div>
        </div>
    );
}
