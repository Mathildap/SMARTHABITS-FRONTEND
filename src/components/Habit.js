import React, { useEffect, useContext, useRef } from 'react';
import { FiInfo, FiPlus, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';
import { gsap } from 'gsap';

function Habit() {
    let navigate = useNavigate();
    let habits = useContext(HabitContext).habits;
    let updateHabit = useContext(HabitContext).updateHabit;
    let editHabitId = useContext(HabitContext).editHabitId;
    let arrowRef = useRef();

    const colorDiv = (completed, number) => {
        let percent = (completed / number) * 100;
        return percent;
    };

    const updateHabitHandler1 = (e) => {
        if (e.target.tagName === 'H4') {
            return;
        }
        updateHabit(e.target.id);
    };
    const updateHabitHandler2 = (e) => {
        if (e.target.tagName === 'H4') {
            return;
        }
        updateHabit(e.target.parentNode.id);
    };

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

    let BGColors = [
        'linear-gradient(0deg, rgba(207,196,253,1) 5%, rgba(129,100,255,1) 100%)',
        'linear-gradient(0deg, rgba(255,211,221,1) 5%, rgba(248,72,113,1) 100%)',
        'linear-gradient(0deg, rgba(152,216,204,1) 10%, rgba(38,175,112,1) 100%)',
        'linear-gradient(0deg, rgba(255,234,229,1) 5%, rgba(229,116,87,1) 100%)',
        'linear-gradient(0deg, rgba(198,202,255,1) 5%, rgba(86,98,230,1) 100%)',
    ];

    useEffect(() => {
        gsap.to(arrowRef.current, {
            y: '20',
            repeat: 10,
            duration: 1,
        });
    });

    return (
        <section className='habit-component landning-page-component'>
            <header className='landning-page-component-header'>
                <div>
                    <FiInfo className='info-icon' />
                </div>
                <div>
                    <h2>RUTINER</h2>
                </div>
                <div>
                    <button>
                        <FiPlus
                            className='plus-icon'
                            onClick={() => navigate('/newhabit')}
                        />
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
                                <div
                                    className='habit'
                                    key={habit._id}
                                    onClick={updateHabitHandler1}
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
                                                backgroundImage: BGColors[i],
                                            }}
                                        >
                                            <div
                                                onClick={updateHabitHandler2}
                                                id={habit._id}
                                            >
                                                <h4
                                                    onClick={editHabitHandler}
                                                    style={{
                                                        color:
                                                            habit.completed /
                                                                habit.habitNumber >
                                                            0
                                                                ? 'white'
                                                                : '',
                                                    }}
                                                >
                                                    {habit.habitName}
                                                </h4>
                                                <br />
                                                <p>
                                                    {habit.habitGoal.substring(
                                                        1
                                                    )}
                                                    : {habit.completed}/
                                                    {habit.habitNumber}
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
                                </div>
                            ))}
                    </>
                )}
            </article>
        </section>
    );
}

export default Habit;
