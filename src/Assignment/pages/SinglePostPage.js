import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import SinglePostMoreInfo from "../components/SinglePostMoreInfo";

const SinglePostPage = ({addFavorite, logged}) => {
    const {username, id} = useParams()
    const nav = useNavigate()
    const [data,setData] = useState(null)


    useEffect(() => {
        http.get(`/getsinglepost/${username}/${id}`)
            .then(res =>{
                console.log(res)
                setData(res.data)
            })
    }, [])

    return (
        <div>
            {data && <SinglePostMoreInfo logged={logged} addFavorite={addFavorite} post={data}/>}
            <button onClick={() => nav(-1)}>Go Back</button>
        </div>
    );
};

export default SinglePostPage;