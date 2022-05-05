import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setHabitsAction } from '../store/habits/habitActions';
import { selectHabits, selectUser } from '../store/selectors';

function NewHabit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // STATES
    const [habitName, setHabitName] = useState('');
    const [habitGoal, setHabitGoal] = useState('1Idag');
    const [habitNumber, setHabitNumber] = useState();
    let [habitDays, setHabitDays] = useState([]);
    const [habitMsg, setHabitMsg] = useState();
    const userState = useSelector(selectUser);
    const habitsState = useSelector(selectHabits);

    // PARSE STRING TO NUMBER
    const handleHabitNumber = (e) => {
        let parsedNumber = parseInt(e.target.value);
        setHabitNumber(parsedNumber);
    };

    // HANDLE CHOOSED DAYS
    const handleHabitDays = (e) => {
        if (e.target.checked) {
            setHabitDays([...habitDays, e.target.id]);
        } else {
            let removeDay = e.target.id;
            setHabitDays(habitDays.filter((day) => removeDay !== day));
        }
    };

    // NEW HABIT
    const saveHabitHandler = async (e) => {
        e.preventDefault();

        if (habitDays.length === 0) {
            habitDays = ['none'];
        }

        let newHabit = {
            userId: userState.user.id,
            habitName: habitName,
            habitGoal: habitGoal,
            habitNumber: habitNumber,
            habitDays: habitDays,
            habitMsg: habitMsg,
        };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/habits/new',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ newHabit }),
                }
            ).then((resp) => resp.json());

            const stateCopy = habitsState.habits;
            stateCopy.push(res);

            setHabitsAction('SET_HABITS', stateCopy, dispatch);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className='new-habit-page'>
            <form onSubmit={saveHabitHandler}>
                <header>
                    <h2>Skapa ny</h2>
                    <div className='buttons'>
                        <button onClick={() => navigate('/')}>Tillbaka</button>
                        <button type='submit'>Spara</button>
                    </div>
                </header>
                <article>
                    <div className='habit-container'>
                        <label htmlFor='habitName' className='habitname-label'>
                            Namnge din rutin
                        </label>
                        <input
                            type='text'
                            placeholder='Dricka vatten, Yoga, etc.'
                            id='habitName'
                            name='habitName'
                            className='input-field'
                            onChange={(e) => setHabitName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='habit-container'>
                        <p>Mål för rutin</p>
                        <div className='radio'>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='1Idag'
                                defaultChecked
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='1Idag'>
                                Dag
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='2Vecka'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='2Vecka'>
                                Vecka
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='3Månad'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='3Månad'>
                                Månad
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='4År'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='4År'>
                                År
                            </label>
                        </div>
                    </div>
                    <div className='habit-container'>
                        <p>Sätt mål</p>
                        <input
                            type='number'
                            placeholder='Antal'
                            id='habitNumber'
                            className='input-field'
                            onChange={handleHabitNumber}
                            required
                        />
                    </div>
                    {habitGoal === '1Idag' ? (
                        <div className='habit-container'>
                            <p>Välj dagar</p>
                            <div className='checkbox-day'>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='monday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='monday'
                                >
                                    Mån
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='tuesday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='tuesday'
                                >
                                    Tis
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='wednesday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='wednesday'
                                >
                                    Ons
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='thursday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='thursday'
                                >
                                    Tor
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='friday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='friday'
                                >
                                    Fre
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='saturday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='saturday'
                                >
                                    Lör
                                </label>
                                <input
                                    className='checkbox-day__input'
                                    type='checkbox'
                                    name='myCheckbox'
                                    id='sunday'
                                    onChange={handleHabitDays}
                                />
                                <label
                                    className='checkbox-day__label'
                                    htmlFor='sunday'
                                >
                                    Sön
                                </label>
                            </div>
                            <p id='habit-day-info'>
                                Välj vilka dagar rutiner ska gälla, eller lämna
                                tomt för alla dagar
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className='habit-container'>
                        <label htmlFor='habitMsg' className='habitname-label'>
                            Anteckning
                        </label>
                        <textarea
                            type='text'
                            rows={5}
                            id='habitMsg'
                            name='habitMsg'
                            className='input-field msg-field'
                            onChange={(e) => setHabitMsg(e.target.value)}
                        />
                    </div>
                </article>
            </form>
        </section>
    );
}

export default NewHabit;
