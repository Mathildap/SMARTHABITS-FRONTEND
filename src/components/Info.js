import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

function Info({ closeInfo }) {
    let editRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!editRef.current.contains(event.target)) {
                closeInfo('');
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    return (
        <div className='info-container' ref={editRef}>
            <button
                onClick={() => closeInfo('')}
                onKeyPress={() => closeInfo('')}
            >
                <FiX className='close-icon' />
            </button>
            <p>
                Tracka dina rutiner, skriv att-göra listor och anteckna allt
                mellan himmel och jord.
                <br />
                <br />
                Redigera en rutin genom att trycka på namnet eller öka antalet
                genom att trycka på rutan för rutinen.
                <br />
                <br />
                Att-göra-punkter kan du välja att checka av eller radera helt.
            </p>
        </div>
    );
}

export default Info;
