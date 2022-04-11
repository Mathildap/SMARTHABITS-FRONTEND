import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';

function NewNote() {
    let navigate = useNavigate();
    let sendNote = useContext(HabitContext).newNote;

    // STATES
    let [noteTitle, setNoteTitle] = useState();

    // SUBMIT
    const submitHandler = () => {
        sendNote(noteTitle);
        navigate('/');
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
