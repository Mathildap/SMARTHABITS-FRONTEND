import React from 'react';
import { FiInfo, FiPlus } from 'react-icons/fi';

function Habit() {
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
                    <FiPlus className='plus-icon' />
                </div>
            </header>
        </section>
    );
}

export default Habit;
