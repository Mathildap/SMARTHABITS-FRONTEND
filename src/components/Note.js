import React, { useEffect, useState, useRef } from 'react';
import { BiTrash } from 'react-icons/bi';

function Note({ note, saveText, onDelete }) {
    let editRef = useRef();

    // STATES
    let [toggleText, setToggleText] = useState();
    let [text, setText] = useState(note.noteText);

    // CLICK OUTSIDE TEXTAREA SAVES TEXT
    useEffect(() => {
        if (editRef.current === undefined || editRef.current === null) {
            return;
        } else {
            let handler = (event) => {
                if (!editRef.current.contains(event.target)) {
                    let send = { text: text, noteId: note._id };
                    saveText(send);
                }
            };
            document.addEventListener('mousedown', handler);
            return () => {
                document.removeEventListener('mousedown', handler);
            };
        }
    });

    return (
        <div key={note._id}>
            <button
                onClick={() =>
                    setToggleText(toggleText === note._id ? '' : note._id)
                }
                className={`${
                    toggleText === note._id
                        ? 'active-note todo-div'
                        : 'todo-div'
                }`}
                key={note._id}
            >
                <p className='note-title'>{note.noteTitle}</p>
                {toggleText === note._id ? (
                    <button
                        onClick={() => onDelete(note._id)}
                        className='btn-icon delete'
                    >
                        <BiTrash />
                    </button>
                ) : null}
            </button>
            {toggleText === note._id ? (
                <textarea
                    ref={editRef}
                    id={note._id}
                    className='note-text-div'
                    value={text}
                    rows='10'
                    onChange={(e) => setText(e.target.value)}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default Note;
