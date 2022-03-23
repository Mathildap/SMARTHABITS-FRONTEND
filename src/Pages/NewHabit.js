import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';

function NewHabit() {
    let [habitName, setHabitName] = useState('');
    let [habitGoal, setHabitGoal] = useState('dayHabit');
    let [habitNumber, setHabitNumber] = useState();
    let [habitDays, setHabitDays] = useState([]);
    let [habitMsg, setHabitMsg] = useState();
    let navigate = useNavigate();
    let context = useContext(HabitContext);

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
                                id='dayHabit'
                                defaultChecked
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='dayHabit'>
                                Dag
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='weekHabit'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='weekHabit'>
                                Vecka
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='monthHabit'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label
                                className='radio__label'
                                htmlFor='monthHabit'
                            >
                                Månad
                            </label>
                            <input
                                className='radio__input'
                                type='radio'
                                name='myRadio'
                                id='yearHabit'
                                onChange={(e) => setHabitGoal(e.target.id)}
                            />
                            <label className='radio__label' htmlFor='yearHabit'>
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
                    {habitGoal === 'dayHabit' ? (
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