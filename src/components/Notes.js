import React, { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, selectUser } from '../store/selectors';
import { fetchNotes } from '../store/functions';
import { setNotesAction } from '../store/notes/notesActions';
import Note from './Note';

function Notes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // STATES
    const userState = useSelector(selectUser);
    const notesState = useSelector(selectNotes);

    const getNotesHandler = async () => {
        if (notesState.notes.length === 0) {
            const response = await fetchNotes(userState.user.id);
            setNotesAction('SET_NOTES', response, dispatch);
        } else {
            console.log('notes exist');
        }
    };

    useEffect(() => {
        getNotesHandler();
    }, []);

    // UPDATE TEXT
    const saveText = async (i) => {
        const info = {
            userId: userState.user.id,
            noteId: i.noteId,
            text: i.text,
        };

        const stateCopy = notesState.notes;
        const findNote = stateCopy.find((note) => note._id === i.noteId);
        if (findNote.noteText === i.text) {
            console.log('spara inte!');
            return;
        }

        try {
            await fetch(
                'https://smarthabits-mathildap.herokuapp.com/notes/updatetext',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ info }),
                }
            ).then((resp) => resp.json());

            const stateCopy = notesState.notes;
            const findNote = stateCopy.find((note) => note._id === i.noteId);
            findNote.noteText = i.text;

            const newArray = stateCopy.map((note) => {
                if (note._id === i.noteId) {
                    const updatedItem = {
                        ...note,
                        noteText: findNote.noteText,
                    };
                    return updatedItem;
                }
                return note;
            });

            setNotesAction('SET_NOTES', newArray, dispatch);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    // DELETE NOTE
    const onDelete = async (id) => {
        const info = { userId: userState.user.id, noteId: id };

        try {
            await fetch(
                'https://smarthabits-mathildap.herokuapp.com/notes/delete',
                {
                    method: 'delete',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ info }),
                }
            ).then((resp) => resp.json());

            const stateCopy = notesState.notes;
            const itemIndex = stateCopy.findIndex((note) => note.id === id);
            stateCopy.splice(itemIndex, 1);
            setNotesAction('SET_NOTES', stateCopy, dispatch);
        } catch (err) {
            console.log(err);
            return;
        }
    };

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
                {!notesState.notes ? null : (
                    <div className='todos-container'>
                        {notesState.notes.map((note) => (
                            <Note
                                note={note}
                                saveText={saveText}
                                onDelete={onDelete}
                                key={note._id}
                            />
                        ))}
                    </div>
                )}
            </article>
        </section>
    );
}

export default Notes;
