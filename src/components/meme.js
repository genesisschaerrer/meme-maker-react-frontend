import React, {useState} from "react"

import favorite from "../../static/assets/images/favorite.png"

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


            <div className="buttons-wrapper">
                <button className="delete-btn" onClick={() => props.deleteMeme(props.id)}>Delete</button>
                <button className="edit-btn" onClick={() => props.editMeme(props.id)}>Edit</button>
            </div>

            {props.favorite ? <img className="fav" src={favorite} alt='heart' /> : null}
        </div>
    )
}

export default Meme