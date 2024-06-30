import React, {useState} from "react";
import {Link} from "react-router-dom";



const Toolbar = ({logged, favorites, setLoggedIn}) =>{
    const [activeButton, setActiveButton] = useState("home"); // State to track active button

    return (
        <div className="mb-2">
            <div className="p-2 border">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <div>
                         <Link className={activeButton === "home" ? 'active' : ''} onClick={()=>setActiveButton("home")} to="/">Home</Link>
                    </div>

                    <div className="d-flex gap-2 align-items-center">
                        {!logged && <Link className={activeButton === "login" ? 'active' : ''} onClick={()=>setActiveButton("login")} to="/login">Login</Link>}
                        {!logged && <Link className={activeButton === "register" ? 'active' : ''} onClick={()=>setActiveButton("register")} to="/register">Registration</Link>}
                        {logged && <Link className={activeButton === "create" ? 'active' : ''} onClick={()=>setActiveButton("create")} to="/create">Create Post</Link>}
                        <Link className={activeButton === "favorites" ? 'active' : ''} onClick={()=>setActiveButton("favorites")} to="/favorites">Favorites ({favorites})</Link>
                        <div className="d-flex flex-column">
                            {logged && <div onClick={()=> setLoggedIn(null)} className="text-center text-success t">Log out</div>}
                            {logged && `logged in as ${logged}`}
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Toolbar