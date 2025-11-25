import { useState } from 'react';
import Character from './Character';
import ScoreCounter from './ScoreCounter';

function shuffleArray(array = ["Whitebeard", "Luffy", "Zoro", "Sanji", "TrafalgarLaw", "Mihawk", "Usopp", "Doflamingo", "NicoRobin", "Franky"]) {
  const shuffledArray = [...array]; 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Gameboard() {
    const [ArrCharacters] = useState(() => shuffleArray()); 
    const [keys] = useState(() => {
        const keys = [];
        for (let i = 0; i < 10; i++) {
            keys.push(crypto.randomUUID());
        }
        return keys;
    })

    function shuffleCharactersDOM() {
        const gameboard = document.querySelector('.Gameboard');
        const cards = Array.from(gameboard.querySelectorAll('.characterCard'));
        
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        cards.forEach(card => gameboard.appendChild(card));
    }


    function handleImgClick(isClicked) {
        if (isClicked == true) {
            console.log("Wtf");
        }
        shuffleCharactersDOM();
    }

    function incrementScore(cb) {
        cb();
    }

    
    return (
    <div className='Gameboard'>
        {ArrCharacters.map((character, index) => (
            <Character character={null} index={index} key={keys[index]} handleImgClick={handleImgClick}></Character>
        ))}
        <ScoreCounter key={0} incrementScore={incrementScore}></ScoreCounter>
    </div>
    )
}

export default Gameboard;
