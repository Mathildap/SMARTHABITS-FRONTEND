import React, { useState, useEffect, useRef } from 'react';
import { FiInfo, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Info from './Info';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits } from '../store/functions';
import { selectHabits, selectUser } from '../store/selectors';
import { setHabitsAction } from '../store/habits/habitActions';
import Habit from './Habit';

function Habits() {
    const navigate = useNavigate();
    const arrowRef = useRef();
    const dispatch = useDispatch();
    const userState = useSelector(selectUser);
    const habitsState = useSelector(selectHabits);

    // STATES
    const [info, setInfo] = useState(false);

    // GET HABITS
    const getHabitsHandler = async () => {
        if (habitsState.habits.length === 0) {
            const response = await fetchHabits(userState.user.id);
            setHabitsAction('SET_HABITS', response, dispatch);
        } else {
            console.log('habits exist');
        }
    };

    useEffect(() => {
        getHabitsHandler();
    }, []);

    // UPDATE HABIT
    const updateHabitHandler = async (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'P') {
            return;
        }

        const info = { id: e.target.id, userId: userState.user.id };

        try {
            const res = await fetch(
                'https://smarthabits-mathildap.herokuapp.com/habits/update',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ info }),
                }
            ).then((resp) => resp.json());

            if (res === 'error') {
                return;
            }
            const stateCopy = habitsState.habits;
            const newArray = stateCopy.map((habit) => {
                if (habit._id === e.target.id) {
                    const updatedItem = {
                        ...habit,
                        completed: habit.completed + 1,
                    };
                    return updatedItem;
                }
                return habit;
            });

            setHabitsAction('SET_HABITS', newArray, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    // ARRAY OF COLORS
    const BGColors = [
        'linear-gradient(0deg, rgba(207,196,253,0.4) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,179,179,1) 5%, rgba(255,0,91,1) 100%)',

        'linear-gradient(0deg, rgba(144,223,176,1) 5%, rgba(30,153,98,1) 100%)',
        'linear-gradient(0deg, rgba(252,184,124,1) 5%, rgba(231,99,75,1) 100%)',
        'linear-gradient(0deg, rgba(106,203,224,0.5) 5%, rgba(87,104,234,1) 100%)',
        'linear-gradient(0deg, rgba(253,173,189,1) 5%, rgba(245,11,154,1) 100%)',
        'linear-gradient(0deg, rgba(207,196,253,0.4) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,179,179,1) 5%, rgba(255,0,91,1) 100%)',

        'linear-gradient(0deg, rgba(144,223,176,1) 5%, rgba(30,153,98,1) 100%)',
        'linear-gradient(0deg, rgba(252,184,124,1) 5%, rgba(231,99,75,1) 100%)',
        'linear-gradient(0deg, rgba(106,203,224,0.5) 5%, rgba(87,104,234,1) 100%)',
        'linear-gradient(0deg, rgba(253,173,189,1) 5%, rgba(245,11,154,1) 100%)',
        'linear-gradient(0deg, rgba(207,196,253,0.4) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,179,179,1) 5%, rgba(255,0,91,1) 100%)',

        'linear-gradient(0deg, rgba(144,223,176,1) 5%, rgba(30,153,98,1) 100%)',
        'linear-gradient(0deg, rgba(252,184,124,1) 5%, rgba(231,99,75,1) 100%)',
        'linear-gradient(0deg, rgba(106,203,224,0.5) 5%, rgba(87,104,234,1) 100%)',
        'linear-gradient(0deg, rgba(253,173,189,1) 5%, rgba(245,11,154,1) 100%)',
        'linear-gradient(0deg, rgba(207,196,253,0.4) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,179,179,1) 5%, rgba(255,0,91,1) 100%)',

        'linear-gradient(0deg, rgba(144,223,176,1) 5%, rgba(30,153,98,1) 100%)',
        'linear-gradient(0deg, rgba(252,184,124,1) 5%, rgba(231,99,75,1) 100%)',
        'linear-gradient(0deg, rgba(106,203,224,0.5) 5%, rgba(87,104,234,1) 100%)',
        'linear-gradient(0deg, rgba(253,173,189,1) 5%, rgba(245,11,154,1) 100%)',
        'linear-gradient(0deg, rgba(207,196,253,0.4) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,179,179,1) 5%, rgba(255,0,91,1) 100%)',

        'linear-gradient(0deg, rgba(144,223,176,1) 5%, rgba(30,153,98,1) 100%)',
        'linear-gradient(0deg, rgba(252,184,124,1) 5%, rgba(231,99,75,1) 100%)',
        'linear-gradient(0deg, rgba(106,203,224,0.5) 5%, rgba(87,104,234,1) 100%)',
        'linear-gradient(0deg, rgba(253,173,189,1) 5%, rgba(245,11,154,1) 100%)',
    ];

    // SVG ANIMATION
    useEffect(() => {
        if (
            habitsState.habits === undefined ||
            habitsState.habits.lenght === 0
        ) {
            gsap.to(arrowRef.current, {
                y: '20',
                repeat: 10,
                duration: 1,
            });
        }
    });

    return (
        <section className='habit-component landning-page-component'>
            {info ? <Info closeInfo={() => setInfo(false)} /> : ''}
            <header className='landning-page-component-header'>
                <button
                    className='btn-icon'
                    type='submit'
                    onClick={() => setInfo(true)}
                >
                    <FiInfo className='info-icon react-icon' />
                </button>
                <h2>RUTINER</h2>
                <div>
                    <button
                        className='btn-icon'
                        onClick={() => navigate('/nyrutin')}
                    >
                        <FiPlus className='plus-icon react-icon' />
                    </button>
                    {habitsState.habits === undefined ||
                    habitsState.habits.length === 0 ? (
                        <div className='svg-arrow' ref={arrowRef}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30.061'
                                height='30.85'
                                viewBox='0 0 30.061 30.85'
                            >
                                <path
                                    id='Icon_awesome-arrow-up'
                                    data-name='Icon awesome-arrow-up'
                                    d='M2.411,19.98.883,18.451a1.646,1.646,0,0,1,0-2.334L14.261,2.732a1.646,1.646,0,0,1,2.334,0L29.973,16.11a1.646,1.646,0,0,1,0,2.334l-1.529,1.529a1.654,1.654,0,0,1-2.362-.028l-7.9-8.29V31.444A1.649,1.649,0,0,1,16.533,33.1h-2.2a1.649,1.649,0,0,1-1.652-1.652V11.655l-7.9,8.3a1.642,1.642,0,0,1-2.362.028Z'
                                    transform='translate(-0.397 -2.246)'
                                    fill='#deeaff'
                                />
                            </svg>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </header>
            <article className='habit-container'>
                {habitsState.loading ? (
                    <h4>LADDAR...</h4>
                ) : (
                    <>
                        {habitsState.error ? (
                            <h4>HITTAR INGA RUTINER..</h4>
                        ) : (
                            <>
                                {habitsState.habits === undefined ? (
                                    ''
                                ) : (
                                    <>
                                        {habitsState.habits
                                            .sort((a, b) =>
                                                a.habitGoal < b.habitGoal
                                                    ? -1
                                                    : 1
                                            )
                                            .map((habit, i) => (
                                                <Habit
                                                    habit={habit}
                                                    i={i}
                                                    updateHabitHandler={
                                                        updateHabitHandler
                                                    }
                                                    BGColors={BGColors}
                                                    key={habit._id}
                                                />
                                            ))}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </article>
        </section>
    );
}

export default Habits;
