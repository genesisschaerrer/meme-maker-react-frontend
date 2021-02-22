import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import DropzoneComponent from "react-dropzone-component"
import {navigate} from "hookrouter"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"


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
                text,
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
                    setImage("")
                    setFavorite(false)
                    imageRef.current.dropzone.removeAllFiles()
                })
                .catch(err => console.error("handle submit error: ", err))
            } 
        }

    useEffect(() => {
        if(props.id) {
            fetch(`https://gms-meme-flask-api.herokuapp.com/meme/${props.id}`)
                .then(res => res.json())
                .then(data => {
                    setText(data.text)
                    setBottomText(data.bottom_text)
                    setFavorite(data.favorite)
                })
                .catch(err => console.error("Fetch meme error: ", err ))
        }
    }, [])
    
    return(
        <div>
            <h1>{props.id ? "Edit Meme": "Add Meme"}</h1>

            <form onSubmit={handleSubmit}>
                <DropzoneComponent 
                ref={imageRef}
                config={componentConfig()}
                djsConfig={djsConfig()}
                eventHandlers={handleDrop()}
                > 
                    Drop Meme
                </DropzoneComponent>
                <input 
                type="text"
                placeholder="enter top caption"
                value={topText}
                onChange={e =>  setTopText(e.target.value)}
                />

                <input
                type="text"
                placeholder="enter bottom caption"
                value={bottomText}
                onChange={e => setBottomText(e.target.value)}
                />

                <div>
                    <input
                    type="checkbox"
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    />
                    <span>Favorite?</span>
                </div>

                <button type="submit">{props.id ? "Edit Meme": "Post Meme"}</button>
            </form>
        </div>
    )
}

export default MemeForm