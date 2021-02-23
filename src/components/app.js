import React, {useState, useEffect} from 'react';
import axios from "axios"
import Meme from "./meme"
import { navigate, A } from 'hookrouter';

const App = () => {
  const [memes, setMemes] = useState([])

  useEffect(() => {
    fetch("https://gms-meme-flask-api.herokuapp.com/memes")
      .then(res => res.json())
      .then(data => setMemes(data))
      .catch(err => console.error("Fetch Memes error", err))
  }, [])

   const deleteMeme = id => {
    axios.delete(`https://gms-meme-flask-api.herokuapp.com/delete-meme/${id}`)
      .then(() => setMemes(memes.filter(meme => meme.id !== id)))
      .catch(err => console.error("Delete Meme Error: ", error))
   }

   const editMeme = id => {
     navigate(`/form/${id}`)
   }

  const renderMemes = () => {
    return memes.map(meme => {
      return (
        <Meme
         key={meme.id} 
         {...meme}  
         deleteMeme={deleteMeme}
         editMeme={editMeme}
         />
      )
    })
  }

    return (
      <div className='meme-display'>
        <A className="start-btn" href="/form">Get started</A>
        <div className="meme-wrapper">
        {renderMemes()}
        </div>
      </div>
    );
}

export default App
