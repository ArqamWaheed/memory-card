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
    const [gameState, setGameState] = useState(null); // null, 'won', 'lost'
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
            const newClickedStatus = [...charClickedStatus];
            newClickedStatus[index] = true;
            setCharClickedStatus(newClickedStatus);
            
            const newScore = score + 1;
            setScore(newScore);
            
            // Check if won (all 10 clicked)
            if (newScore === 10) {
                setGameState('won');
            }
        } else {
            // Lost - clicked same character twice
            setGameState('lost');
        }
        shuffleCharactersDOM();
    }

    function restartGame() {
        setScore(0);
        setCharClickedStatus(charClickedArr.map(() => false));
        setGameState(null);
        shuffleCharactersDOM();
    }

    return (
        <div className='Gameboard'>
            <div className="headerDiv">
                <h1>Memory Card Game</h1>
                <p>MAKE SURE TO NOT SELECT THE SAME CHARACTER TWICE!</p>
            </div>
            <ScoreCounter key={0} score={score}></ScoreCounter>
            
            {isLoading && <div className="loading">Loading characters... {loadedCount}/10</div>}
            
            {gameState === 'won' && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>🎉 YOU WON! 🎉</h2>
                        <p>You remembered all 10 characters!</p>
                        <button onClick={restartGame}>Play Again</button>
                    </div>
                </div>
            )}
            
            {gameState === 'lost' && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>💥 GAME OVER 💥</h2>
                        <p>You clicked the same character twice!</p>
                        <p>Final Score: {score}</p>
                        <button onClick={restartGame}>Try Again</button>
                    </div>
                </div>
            )}
            
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