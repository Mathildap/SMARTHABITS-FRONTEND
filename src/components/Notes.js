import React, { useState, useContext, useEffect, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';
import { BiTrash } from 'react-icons/bi';

function Notes() {
    let navigate = useNavigate();
    let editRef = useRef();
    let notes = useContext(HabitContext).notes;
    let updateNoteText = useContext(HabitContext).notesHandler;
    let onDelete = useContext(HabitContext).deleteNoteHandler;

    // STATES
    let [toggleText, setToggleText] = useState();
    let [text, setText] = useState();

    // SEND TEXT TO APP.JS
    const saveText = () => {
        if (text === undefined) {
            return;
        } else {
            updateNoteText(text);
            setText();
        }
    };

    // CLICK OUTSIDE TEXTAREA SAVES TEXT
    useEffect(() => {
        if (editRef.current === undefined || editRef.current === null) {
            return;
        } else {
            let handler = (event) => {
                if (!editRef.current.contains(event.target)) {
                    saveText();
                }
            };

            document.addEventListener('mousedown', handler);

            return () => {
                document.removeEventListener('mousedown', handler);
            };
        }
    });

    return (
        <section className='habit-component landning-page-component todo-component notes-component'>
            <header className='landning-page-component-header'>
                <div></div>
                <h2>ANTECKNINGAR</h2>
                <button
                    className='btn-icon'
                    onClick={() => navigate('/nyanteckning')}
                >
                    <FiEdit className='react-icon new-icon' />
                </button>
            </header>

            <article className='todos-page'>
                {notes === undefined ? (
                    ''
                ) : (
                    <div className='todos-container'>
                        {notes.map((note) => (
                            <div key={note._id}>
                                <button
                                    onClick={() =>
                                        setToggleText(
                                            toggleText === note._id
                                                ? ''
                                                : note._id
                                        )
                                    }
                                    className={`${
                                        toggleText === note._id
                                            ? 'active-note todo-div'
                                            : 'todo-div'
                                    }`}
                                    key={note._id}
                                >
                                    <p className='note-title'>
                                        {note.noteTitle}
                                    </p>
                                    {toggleText === note._id ? (
                                        <button
                                            onClick={() => onDelete(note._id)}
                                            className='btn-icon delete'
                                        >
                                            <BiTrash />
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </button>
                                {toggleText === note._id ? (
                                    <textarea
                                        ref={editRef}
                                        id={note._id}
                                        className='note-text-div'
                                        value={
                                            text
                                                ? note._id === text.id
                                                    ? text.text
                                                    : ''
                                                : note.noteText
                                        }
                                        rows='10'
                                        onChange={(e) =>
                                            setText({
                                                id: e.target.id,
                                                text: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </article>
        </section>
    );
}

export default Notes;
