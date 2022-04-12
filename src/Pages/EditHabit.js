import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

function EditHabit({ editHabit, updateHabit, deleteHabit }) {
    let navigate = useNavigate();
    let sendUpdate;

    // STATES
    let [habitComplete, setHabitComplete] = useState(editHabit.completed);

    const increase = () => {
        if (habitComplete <= editHabit.habitNumber - 1) {
            setHabitComplete(habitComplete + 1);
        }
    };

    const decrease = () => {
        if (habitComplete >= 1) {
            setHabitComplete(habitComplete - 1);
        }
    };

    const sendUpdateHandler = () => {
        sendUpdate = { id: editHabit._id, update: habitComplete };
        updateHabit(sendUpdate);
        navigate('/');
    };

    const deleteHabitHandler = () => {
        deleteHabit(editHabit._id);
        navigate('/');
    };

    return (
        <>
            {editHabit === undefined ? (
                ''
            ) : (
                <section className='edit-page'>
                    <header>
                        <h2>Redigera</h2>
                        <div className='buttons'>
                            <button onClick={() => navigate('/')}>
                                Tillbaka
                            </button>
                            <button type='submit' onClick={sendUpdateHandler}>
                                Spara
                            </button>
                        </div>
                    </header>
                    <article className='edit-habit-container'>
                        <div className='header'>
                            <div />
                            <h4>{editHabit.habitName}</h4>
                            <button
                                className='btn-icon'
                                onClick={deleteHabitHandler}
                            >
                                <FiTrash2 className='react-icon' />
                            </button>
                        </div>
                        <p>{editHabit.habitMsg}</p>
                        <div className='edit-count-container'>
                            <p>
                                {habitComplete}/{editHabit.habitNumber}
                            </p>
                            <div>
                                <button className='btn-icon' onClick={decrease}>
                                    <FiMinus className='react-icon' />
                                </button>
                                <button className='btn-icon' onClick={increase}>
                                    <FiPlus className='react-icon' />
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
            )}
        </>
    );
}

export default EditHabit;
