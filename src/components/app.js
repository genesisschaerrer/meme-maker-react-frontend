import React, {useState, useEffect} from 'react';
import axios from "axios"
import Meme from "./meme"
import { navigate } from 'hookrouter';

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
      console.log(meme)
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
      <div className='app'>
        {renderMemes()}
      </div>
    );
}

export default App
