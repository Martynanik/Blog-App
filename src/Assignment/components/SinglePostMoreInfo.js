import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
const SinglePostMoreInfo = ({post, logged}) =>{
    const nav = useNavigate()

    const imageRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const [updateOn, setUpdateOn] = useState(false)
    const timestamp = post.timestamp
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('lt-LT', options);

    useEffect(() => {
        if(updateOn) {
            imageRef.current.value = post.image
            titleRef.current.value = post.title
            descriptionRef.current.value = post.description
        }
    }, [updateOn])

    async function update() {
        const user = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            secretKey: localStorage.getItem("secret"),
            id: post.id
        }
        const res = await http.post("/updatepost", user)

        if(res.success) {
            setUpdateOn(false)
        }

    }

    return(
        <div className="border d-flex p-2 gap-2">
            <img className="big-img" src={post.image} alt=""/>
            <div className="d-flex flex-column">
                <h3>Title: {post.title}</h3>
                <p>Username: {post.username}</p>
                <p>Date: {formattedDate} </p>
                <p>Description: {post.description}</p>
                {logged === post.username &&
                    <button style={{width: '200px'}} onClick={() => setUpdateOn(!updateOn)}>UPDATE POST</button>}
                {updateOn &&
                    <div className="d-flex flex-column p-5 gap-2">
                        <input style={{width: '200px'}}  type="text" ref={imageRef} placeholder="image"/>
                        <input style={{width: '200px'}}  type="text" ref={titleRef} placeholder="title"/>
                        <input style={{width: '200px'}}  type="text" ref={descriptionRef} placeholder="description"/>

                        <button style={{width: '200px'}}  onClick={()=>update()}>Update Post</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default SinglePostMoreInfo