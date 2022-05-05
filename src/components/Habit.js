import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import date from 'date-and-time';

export default function Habit({ habit, i, updateHabitHandler, BGColors }) {
    // HANDLE DATE
    const now = new Date();
    const today = date.format(now, 'dddd').toLowerCase();

    // COLOR DIV DEPENDING ON COMPLETED NUMBER
    const colorDiv = (completed, number) => {
        let percent = (completed / number) * 100;
        return percent;
    };

    return (
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
                                    backgroundImage: BGColors[i],
                                }}
                            >
                                <div id={habit._id}>
                                    <Link
                                        to={'/rutin/' + habit._id}
                                        style={{
                                            color:
                                                habit.completed /
                                                    habit.habitNumber >
                                                0
                                                    ? 'white'
                                                    : '#474747',
                                        }}
                                    >
                                        {habit.habitName}
                                    </Link>
                                    <br />
                                    <p>
                                        {habit.habitGoal.substring(1)}:{' '}
                                        {habit.completed}/{habit.habitNumber}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <FiCheck
                                className={
                                    habit.habitNumber === habit.completed
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
    );
}
