import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { fetchHabits } from '../store/functions';
import { useDispatch, useSelector } from 'react-redux';
import { selectHabits, selectUser } from '../store/selectors';
import { setHabitsAction } from '../store/habits/habitActions';

function EditHabit() {
    let navigate = useNavigate();
    let { habitId } = useParams();
    let dispatch = useDispatch();

    // STATES
    let [editHabit, setEditHabit] = useState();
    let [habitComplete, setHabitComplete] = useState();
    let habitsState = useSelector(selectHabits);
    let userState = useSelector(selectUser);

    useEffect(() => {
        let array = habitsState.habits;
        const habit = array.find((h) => h._id === habitId);
        if (habit) {
            setEditHabit(habit);
            setHabitComplete(habit.completed);
        }
    }, []);

    // INCREASE NUMBER
    const increase = () => {
        if (habitComplete <= editHabit.habitNumber - 1) {
            setHabitComplete(habitComplete + 1);
        }
    };

    // DECREASE NUMBER
    const decrease = () => {
        if (habitComplete >= 1) {
            setHabitComplete(habitComplete - 1);
        }
    };

    // SEND UPDATE TO DB AND NAVIGATE BACK
    const updateHabitHandler = async () => {
        let sendInfo = {
            id: editHabit._id,
            update: habitComplete,
            userId: userState.user.id,
        };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/habits/edit',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ sendInfo }),
                }
            ).then((resp) => resp.json());

            if (res === 'error') {
                return;
            }

            const stateCopy = habitsState.habits;
            const newArray = stateCopy.map((habit) => {
                if (habit._id === editHabit._id) {
                    const updatedItem = {
                        ...habit,
                        completed: habitComplete,
                    };
                    return updatedItem;
                }
                return habit;
            });

            setHabitsAction('SET_HABITS', newArray, dispatch);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    // DELETE HABIT
    const deleteHabit = async () => {
        let info = { userId: userState.user.id, id: editHabit._id };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/habits/delete',
                {
                    method: 'delete',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ info }),
                }
            ).then((resp) => resp.json());

            if (res === 'error') {
                console.log(res);
                return;
            }

            const stateCopy = habitsState.habits;
            const itemIndex = stateCopy.findIndex(
                (habit) => habit._id === editHabit._id
            );
            stateCopy.splice(itemIndex, 1);
            setHabitsAction('SET_HABITS', stateCopy, dispatch);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
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
                            <button type='submit' onClick={updateHabitHandler}>
                                Spara
                            </button>
                        </div>
                    </header>
                    <article className='edit-habit-container'>
                        <div className='header'>
                            <div />
                            <h4>{editHabit.habitName}</h4>
                            <button className='btn-icon' onClick={deleteHabit}>
                                <FiTrash2 className='react-icon trash-icon' />
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
