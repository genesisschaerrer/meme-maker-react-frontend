import React, {useState} from "react"

const Meme = props => {
    const [topText, setTopText] = useState("")
    const [bottomText, setBottomTex] = useState("")
    const text = props.text.split("/*/")


    return(
        <div className="meme">
                <div className="meme-text" style={{
                    "backgroundImage": "url("+ props.image +")",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center",
                    "width": "300px",
                    "height": "300px"
                }}><div className="text">{text[0]}</div><div className="text">{text[1]}</div></div>

            {props.favorite ? <img className="fav" src={"https://library.kissclipart.com/20180830/fuw/kissclipart-twinkle-little-star-clip-art-clipart-twinkle-twin-0d72b7a5dc286d1e.jpg"} alt='heart' /> : null}

            <button onClick={() => props.deleteMeme(props.id)}>Delete</button>
            <button onClick={() => props.editMeme(props.id)}>Edit</button>
        </div>
    )
}

export default Meme