import React from 'react';
import { FiInfo, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Habit() {
    let navigate = useNavigate();

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
        </section>
    );
}

export default Habit;
