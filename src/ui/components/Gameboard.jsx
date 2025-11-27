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

const charClickedArr = [];
for (let i = 0; i < 10; i++) {
    charClickedArr.push(false);
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
    const [charClickedStatus, setCharClickedStatus] = useState(charClickedArr);
    const [score, setScore] = useState(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const isLoading = loadedCount < 10;

    function handleImageLoaded() {
        setLoadedCount(prev => prev + 1);
    }

    function shuffleCharactersDOM() {
        const gameboard = document.querySelector('.CharactersDiv');
        const cards = Array.from(gameboard.querySelectorAll('.characterCard'));
        
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        cards.forEach(card => gameboard.appendChild(card));
    }

    function handleImgClick(node) {
        const index = parseInt(node.dataset.index);
        if (charClickedStatus[index] == false) {
            setCharClickedStatus((prev) => {
                const newStatus = [...prev];
                newStatus[index] = true;
                return newStatus;
            });
            incrementScore(score);
        } else {
            setScore(0);
            setCharClickedStatus(charClickedArr);
        }
        shuffleCharactersDOM();
    }

    function incrementScore(score) {
        setScore(score + 1);
    }

    return (
        <div className='Gameboard'>
            <div className="headerDiv">
                <h1>Memory Card Game</h1>
                <p>MAKE SURE TO NOT SELECT THE SAME CHARACTER TWICE!</p>
            </div>
            <ScoreCounter key={0} score={score} setScore={incrementScore}></ScoreCounter>
            
            {isLoading && <div className="loading">Loading characters... {loadedCount}/10</div>}
            
            <div className='CharactersDiv' style={{ display: isLoading ? 'none' : 'flex' }}>    
                {ArrCharacters.map((character, index) => (
                    <Character 
                        character={character} 
                        index={index} 
                        key={keys[index]} 
                        handleImgClick={handleImgClick}
                        onImageLoaded={handleImageLoaded}
                    />
                ))}
            </div>
        </div>
    )
}

export default Gameboard;