import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import DropzoneComponent from "react-dropzone-component"
import {navigate} from "hookrouter"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"
// import "../style/main.scss"
import "../style/meme-form.scss"


const MemeForm = (props) => {
    const imageRef = useRef(null)
    const [text, setText] = useState("")
    const [topText, setTopText] = useState("")
    const [bottomText, setBottomText] = useState("")
    const [favorite, setFavorite] = useState(false)
    const [image, setImage] = useState("")


    const componentConfig = () => {
        return {
            inconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    const djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    const handleDrop = () => {
        return {
            addedfile: file => {
                const formData = new FormData ()

                formData.append("upload_preset", "meme-images")
                formData.append("file", file)

                fetch("https://api.cloudinary.com/v1_1/genesisschaerrer/image/upload", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    setImage(data.secure_url)
                })
                .catch(err => console.log(err))
            }
        }
    }

    const editSubmit = () => {
        fetch(`https://gms-meme-flask-api.herokuapp.com/meme/${props.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                text: new Array(topText, bottomText).join("/*/"),
                favorite,
            })
        })
        .then(() => imageRef.current.dropzone.removeAllFiles())
        .then(() => navigate("/"))
        .catch(err => console.error("PUT error: ", err))
    }


   const handleSubmit = (e) => {
        e.preventDefault()
        
        switch(!props.id) {
            case false: 
                editSubmit();
                break
            default:
                axios.post("https://gms-meme-flask-api.herokuapp.com/add-meme", {
                    text: new Array(topText, bottomText).join("/*/"),
                    favorite,
                    image
                })
                .then(() => {
                    setText("")
                    setBottomText("")
                    setTopText("")
                    setImage("")
                    setFavorite(false)
                    imageRef.current.dropzone.removeAllFiles()
                    
                })
                .then(() => navigate("/"))
                .catch(err => console.error("handle submit error: ", err))
            } 
        }

    useEffect(() => {
        if(props.id) {
            fetch(`https://gms-meme-flask-api.herokuapp.com/meme/${props.id}`)
                .then(res => res.json())
                .then(data => {
                    setTopText(data.text.split("/*/")[0])
                    setBottomText(data.text.split("/*/")[1])
                    setFavorite(data.favorite)
                })
                .catch(err => console.error("Fetch meme error: ", err ))
        }
    }, [])
    
    return(
        <div className="meme-form">
            <h1 className="form-title">{props.id ? "Edit Meme": "Add Meme"}</h1>

            <form  className="form" onSubmit={handleSubmit}>
                <DropzoneComponent 
                ref={imageRef}
                config={componentConfig()}
                djsConfig={djsConfig()}
                eventHandlers={handleDrop()}
                > 
                    <div className="dz-message">Drop Meme Image</div>
                </DropzoneComponent>
                <div className="input-wrapper">
                    <input 
                    className="input"
                    type="text"
                    placeholder="enter top caption"
                    value={topText}
                    onChange={e =>  setTopText(e.target.value)}
                    />

                    <input
                    className="input"
                    type="text"
                    placeholder="enter bottom caption"
                    value={bottomText}
                    onChange={e => setBottomText(e.target.value)}
                    />
                </div>

                <div> 
                    <input
                    type="checkbox"
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    />
                    <span className="fav-text">Favorite?</span>
                </div>

                <button className="btn" type="submit">{props.id ? "Edit Meme": "Post Meme"}</button>
            </form>
        </div>
    )
}

export default MemeForm