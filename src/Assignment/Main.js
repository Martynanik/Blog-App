import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPostsPage from "./pages/UserPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritesPage from "./pages/FavoritesPage";

const Main = () =>{
    const [loggedIn, setLoggedIn] = useState(null)
    const [loggedOut, setLoggedOut]= useState(true)
    const [favoritesCount, setFavoritesCount] = useState(0)
    function addFavorite(item) {
        const favorites = JSON.parse(localStorage.getItem("favorites"))

        if(favorites) {
            const itemExist = favorites.find(x => x.id === item.id)
            if(itemExist) return


            favorites.push(item)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            setFavoritesCount(favoritesCount+1)
        }

        if(!favorites) {
            localStorage.setItem("favorites", JSON.stringify([item]))
            setFavoritesCount(favoritesCount+1)
        }
    }


    return(
        <div className="p-2">
            <BrowserRouter>
                <Toolbar favorites={favoritesCount} logged={loggedIn} setLoggedIn={setLoggedIn}/>
                <Routes>
                    <Route element={<LoginPage setLog={setLoggedIn}/>} path="/login"/>
                    <Route element={<RegisterPage/>} path="/register"/>
                    <Route element={<BlogPage addFavorite={addFavorite}
                                              loggedIn={loggedIn}/>} path="/"/>
                    <Route element={<SinglePostPage logged={loggedIn}
                                                    addFavorite={addFavorite}/>}
                           path="/post/:username/:id"/>
                    <Route element={<UserPostsPage addFavorite={addFavorite}/>} path="/userposts/:username"/>
                    <Route element={<CreatePostPage/>} path="/create"/>
                    <Route element={<FavoritesPage loggedIn={loggedIn}
                                                   setCount={setFavoritesCount}
                                                   count={favoritesCount}/>} path="/favorites"/>

                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default Main