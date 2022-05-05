import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNotes, selectUser } from '../store/selectors';
import { setNotesAction } from '../store/notes/notesActions';

function NewNote() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    // STATES
    let [noteTitle, setNoteTitle] = useState();
    let notesState = useSelector(selectNotes);
    let userState = useSelector(selectUser);

    // NEW NOTE
    const submitHandler = async () => {
        let newNote = {
            userId: userState.user.id,
            noteTitle: noteTitle,
        };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/notes/new',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ newNote }),
                }
            ).then((resp) => resp.json());

            const stateCopy = notesState.notes;
            stateCopy.push(res);
            setNotesAction('SET_NOTES', stateCopy, dispatch);

            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className='new-habit-page'>
            <header>
                <h2>Skapa ny</h2>
                <div className='buttons'>
                    <button onClick={() => navigate('/')}>Tillbaka</button>
                    <button onClick={submitHandler}>Spara</button>
                </div>
            </header>
            <article>
                <div className='habit-container'>
                    <label htmlFor='NoteTitle' className='habitname-label'>
                        Rubrik
                    </label>
                    <input
                        type='text'
                        placeholder='🍌 Slut i kylen, 📽 Filmtips ...'
                        id='noteTitle'
                        name='noteTitle'
                        className='input-field'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                    />
                </div>
            </article>
        </section>
    );
}

export default NewNote;
