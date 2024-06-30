import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const UserPostsPage = ({addFavorite}) => {
    const {username} = useParams()
    const nav = useNavigate()


    const [data,setData] = useState([])

    useEffect(() => {
        http.get("/getuserposts/"+username)
            .then(res =>{
                console.log(res)
                setData(res.data)
            })
    }, [])

    return (
        <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-wrap">
                {data.map(x => <SinglePost addFavorite={addFavorite} key={x.id} post={x}/>)}
            </div>
            <button onClick={() => nav(-1)}>Go Back</button>
        </div>
    );
};

export default UserPostsPage;