import { useState, useEffect } from 'react';

function Character({character, index, handleImgClick, onImageLoaded}) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (character !== null) {
      console.log(character);
      fetch(`https://api.giphy.com/v1/stickers/search?api_key=9DJ3r9jvTt5JDGWaee7k3T1Hg2SO8xtk&q=${character}`, {
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setSrc(data.data[0].images.original_still.url);
          onImageLoaded(); 
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    } else {
      setSrc("https://fwmedia.fandomwire.com/wp-content/uploads/2025/07/24022421/Kaido.jpg");
      onImageLoaded(); 
    }
  }, [character]);

  return (
      <div className={`characterCard`} data-index={index} onClick={function(e) 
        {
          handleImgClick(e.target.closest("div"));
        }
      }>
        {src !== null ? <img src={src} alt="test" className={`Image-${index + 1}`} /> : null}
      </div>
  )
}

export default Character;