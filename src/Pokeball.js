import * as React from 'react';
import './Pokeball.css';


export default function Pokeball() {

    //Make Pokeball shake when clicked
    const handleClick = () => {
        const pokeballButton = document.getElementById("pokeball__button");
        // pokeballButton.classList.add("pokeball-click");
        // pokeballButton.animate("  1.25s 3;");
        setTimeout(() => {
            pokeballButton.classList.remove("pokeball-click");
        }, 2250);
    };

    return (
        <div id="pokeball" onClick={handleClick}>
            <div class="pokeball-placement" >
                <div class="pokeball" >
                    <div class="pokeball__button" ></div>
                </div>
            </div>
        </div >
    );
}