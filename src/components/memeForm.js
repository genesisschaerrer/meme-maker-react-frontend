import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import DropzoneComponent from "react-dropzone-component"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"


const MemeForm = (props) => {
    const imageRef = useRef(null)
    const [text, setText] = useState("")
    const [favorite, setFavorite] = useState(false)
    const [image, setImage] = useState("")

    const componentConfig = () => {
        return {
            inconFiletyps: [".jpg", ".png"],
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

   const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://gms-meme-flask-api.herokuapp.com/add-meme", {
            text,
            favorite,
            image
        })
        .then(() => {
            setText("")
            setImage("")
            setFavorite(false)
            imageRef.current.dropzone.removeAllFiles()
        })
        .catch(err => console.error("handle submit error: ", err))
    }
    
    return(
        <div>
            <h1>Add a Meme</h1>

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
                placeholder="enter caption"
                value={text}
                onChange={e => setText(e.target.value)}
                />

                <div>
                    <input
                    type="checkbox"
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    />
                    <span>Favorite?</span>
                </div>

                <button type="submit">Post Meme</button>
            </form>
        </div>
    )
}

export default MemeForm