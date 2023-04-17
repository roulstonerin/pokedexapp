import * as React from 'react';

import './Pokeball.css';


export default function Pokeball() {
    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 2250);
    };

    return (
        <div id="pokeball" onClick={handleClick}>
            <div
                className={`pokeball-placement${clicked ? ' clicked' : ''}`}
            >
                <div className="pokeball">
                    <div className="pokeball-button"></div>
                </div>
            </div>
        </div>
    );
}

