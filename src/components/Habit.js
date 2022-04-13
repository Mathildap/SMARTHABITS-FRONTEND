import React, { useState, useEffect, useContext, useRef } from 'react';
import { FiInfo, FiPlus, FiCheck } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { HabitContext } from '../App';
import { gsap } from 'gsap';
import date from 'date-and-time';
import Info from './Info';

function Habit() {
    let navigate = useNavigate();
    let arrowRef = useRef();
    let habits = useContext(HabitContext).habits;
    let updateHabit = useContext(HabitContext).updateHabit;
    let editHabitId = useContext(HabitContext).editHabitId;

    // STATES
    let [info, setInfo] = useState(false);

    // HANDLE DATE
    const now = new Date();
    let today = date.format(now, 'dddd').toLowerCase();

    // INCREASE
    const updateHabitHandler = (e) => {
        if (e.target.tagName === 'A') {
            return;
        }
        updateHabit(e.target.id);
    };

    // EDIT
    const editHabitHandler = (e) => {
        let id = e.target.parentNode.id;
        let habitInfo;
        for (let habit in habits) {
            if (habits[habit]._id === id) {
                habitInfo = habits[habit];
            }
        }
        editHabitId(habitInfo);
        navigate('/edit/');
    };

    // COLOR DIV
    const colorDiv = (completed, number) => {
        let percent = (completed / number) * 100;
        return percent;
    };

    // COLORS
    let BGColors = [
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
        if (habits === undefined || habits.lenght === 0) {
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
                        onClick={() => navigate('/newhabit')}
                    >
                        <FiPlus className='plus-icon react-icon' />
                    </button>
                    {habits === undefined || habits.length === 0 ? (
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
                {habits === undefined ? (
                    ''
                ) : (
                    <>
                        {habits
                            .sort((a, b) =>
                                a.habitGoal < b.habitGoal ? -1 : 1
                            )
                            .map((habit, i) => (
                                <div key={habit._id}>
                                    {habit.habitDays.map((day) =>
                                        day === today || day === 'none' ? (
                                            <button
                                                className='habit'
                                                key={habit._id}
                                                onClick={updateHabitHandler}
                                                id={habit._id}
                                            >
                                                <div>
                                                    <div
                                                        className='colored-div'
                                                        style={{
                                                            width:
                                                                colorDiv(
                                                                    habit.completed,
                                                                    habit.habitNumber
                                                                ) + '%',
                                                            backgroundImage:
                                                                BGColors[i],
                                                        }}
                                                    >
                                                        <div id={habit._id}>
                                                            <Link
                                                                to={
                                                                    '/edit/' +
                                                                    habit._id
                                                                }
                                                                onClick={
                                                                    editHabitHandler
                                                                }
                                                                style={{
                                                                    color:
                                                                        habit.completed /
                                                                            habit.habitNumber >
                                                                        0
                                                                            ? 'white'
                                                                            : '#474747',
                                                                }}
                                                            >
                                                                {
                                                                    habit.habitName
                                                                }
                                                            </Link>
                                                            <br />
                                                            <p>
                                                                {habit.habitGoal.substring(
                                                                    1
                                                                )}
                                                                :{' '}
                                                                {
                                                                    habit.completed
                                                                }
                                                                /
                                                                {
                                                                    habit.habitNumber
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <FiCheck
                                                        className={
                                                            habit.habitNumber ===
                                                            habit.completed
                                                                ? 'check-icon habit-comp'
                                                                : 'check-icon habit-not-comp'
                                                        }
                                                    />
                                                </div>
                                            </button>
                                        ) : (
                                            ''
                                        )
                                    )}
                                </div>
                            ))}
                    </>
                )}
            </article>
        </section>
    );
}

export default Habit;
