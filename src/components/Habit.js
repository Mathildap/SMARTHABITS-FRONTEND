import React, { useContext } from 'react';
import { FiInfo, FiPlus, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HabitContext } from '../App';

function Habit() {
    let navigate = useNavigate();
    let habits = useContext(HabitContext).habits;

    const colorDiv = (completed, number) => {
        let percent = (completed / number) * 100;
        return percent;
    };

    let BGColors = [
        {
            background:
                'linear-gradient(0deg, rgba(207,196,253,1) 5%, rgba(129,100,255,1) 100%)',
            id: 1,
        },
        {
            background:
                'linear-gradient(0deg, rgba(255,211,221,1) 5%, rgba(248,72,113,1) 100%)',
            id: 2,
        },
        {
            background:
                'linear-gradient(0deg, rgba(152,216,204,1) 10%, rgba(38,175,112,1) 100%)',
            id: 3,
        },
        {
            background:
                'linear-gradient(0deg, rgba(255,234,229,1) 5%, rgba(229,116,87,1) 100%)',
            id: 4,
        },
        {
            background:
                'linear-gradient(0deg, rgba(198,202,255,1) 5%, rgba(86,98,230,1) 100%)',
            id: 5,
        },
    ];

    return (
        <section className='habit-component landning-page-component'>
            <header className='landning-page-component-header'>
                <div>
                    <FiInfo className='info-icon' />
                </div>
                <div>
                    <h2>RUTINER</h2>
                </div>
                <button>
                    <FiPlus
                        className='plus-icon'
                        onClick={() => navigate('/newhabit')}
                    />
                </button>
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
                                <div className='habit' key={habit._id}>
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
                                                    BGColors[i].background,
                                            }}
                                        >
                                            <div>
                                                <h4
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
