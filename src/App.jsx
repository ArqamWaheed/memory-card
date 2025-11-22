import { useState, useEffect } from 'react';
function App() {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    fetch("https://api.giphy.com/v1/gifs/search?api_key=9DJ3r9jvTt5JDGWaee7k3T1Hg2SO8xtk&q=OnePieceLuffy", {
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSrc(data.data[0].images.original_still.url);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);


  return (
    <>
    <img src={src} alt="test" />
    </>
  )
}

export default App;
