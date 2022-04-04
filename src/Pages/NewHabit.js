import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';
import { handleHabitNumber } from '../components/TestFunctions';

function NewHabit() {
    let [habitName, setHabitName] = useState('');
    let [habitGoal, setHabitGoal] = useState('1Idag');
    let [habitNumber, setHabitNumber] = useState();
    let [habitDays, setHabitDays] = useState([]);
    let [habitMsg, setHabitMsg] = useState();
    let navigate = useNavigate();
    let context = useContext(HabitContext).newHabit;

    const handleHabitNumber = (e) => {
        let parsedNumber = parseInt(e.target.value);
        setHabitNumber(parsedNumber);
    };

    const handleHabitDays = (e) => {
        if (e.target.checked) {
            setHabitDays([...habitDays, e.target.id]);
        } else {
            let removeDay = e.target.id;
            setHabitDays(habitDays.filter((day) => removeDay !== day));
        }
    };

    // SEND HABIT
    const saveHabitHandler = (e) => {
        e.preventDefault();

        let newHabit = {
            habitName: habitName,
            habitGoal: habitGoal,
            habitNumber: habitNumber,
            habitDays: habitDays,
            habitMsg: habitMsg,
        };

        context(newHabit);
        navigate('/');
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
