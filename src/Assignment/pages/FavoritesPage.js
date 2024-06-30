import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";
import http from "../plugins/http";
const FavoritesPage = ({loggedIn, count, setCount}) => {
    const [getFavorites, setFavorites] = useState([])

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites"))

        if(favorites) {
            setFavorites(favorites)
        }

    }, [])

    function removeFavorite(post) {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        favorites = favorites.filter(x => x.id !== post.id)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        setFavorites(favorites)
        setCount(count-1)
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {getFavorites.map(x => <SinglePost removeFavorite={removeFavorite} inFavorites={true}  loggedIn={loggedIn} key={x.id} post={x}/>)}
        </div>
    );
};

export default FavoritesPage;