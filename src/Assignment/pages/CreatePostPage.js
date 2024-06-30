import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";


const CreatePostPage = () => {
    const imageRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const [error, setError] = useState("")

    const nav = useNavigate()

    async function create() {
        const user = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            secretKey: localStorage.getItem("secret")
        }

        const res = await http.post("/createpost", user)

        console.log(res)
        if(res.success) {
            nav("/")
        } else{
            setError(res.message)
        }
    }


    return (
        <div className="d-flex flex-column p-5">
            <input  className="m-2" type="text" ref={imageRef} placeholder="image"/>
            <input  className="m-2" type="text" ref={titleRef} placeholder="title"/>
            <input  className="m-2" type="text" ref={descriptionRef} placeholder="description"/>
            <button  className="m-2" onClick={create}>Create Post</button>
            {error && <div className="text-center text-danger">{error}</div>}
        </div>
    );
};

export default CreatePostPage;