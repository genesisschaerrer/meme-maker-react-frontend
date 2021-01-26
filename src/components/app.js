import React, {useState, useEffect} from 'react';
import Meme from "./meme"

const App = () => {
  const [memes, setMemes] = useState([])

  useEffect(() => {
    fetch("https://gms-meme-flask-api.herokuapp.com/memes")
      .then(res => res.json())
      .then(data => setMemes(data))
      .catch(err => console.error("Fetch Memes error", err))
  }, [])

  const renderMemes = () => {
    return memes.map(meme => {
      console.log(meme)
      return (
        <Meme key={meme.id} {...meme} />
      )
    })
  }

    return (
      <div className='app'>
        {renderMemes()}
      </div>
    );
}

export default App
