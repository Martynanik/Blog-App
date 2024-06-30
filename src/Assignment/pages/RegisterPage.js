import React, {useRef, useState} from "react";
import http from "../plugins/http";



const RegisterPage = () =>{
    const nameRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()
    const [error, setError] = useState(null)
    const [created, setCreated] = useState(null)
    // const [username, setUsername] = useState("username")



    async function register() {
        const user = {
            name: nameRef.current.value,
            passwordOne: passRef.current.value,
            passwordTwo: passTwoRef.current.value
        }

        const res = await http.post("/createaccount", user)

        console.log(res)
        if(res.success) {
            console.log("veikia")
            // setUsername("username")
            setCreated("Account Created Successfully")

        } else {
            setError(res.message)
            setCreated("")
        }
    }

    return(
        <div className="d-flex flex-column gap-2 align-items-center">
            <input className="m-2" ref={nameRef} type="text" placeholder="username"/>
            <input className="m-2" ref={passRef} type="text" placeholder="password one"/>
            <input className="m-2" ref={passTwoRef} type="text" placeholder="password two"/>
            <p className="m-2 text-danger">{error}</p>
            <p className="m-2 text-success">{created}</p>

            <button className="m-2" onClick={register}>Register</button>
        </div>
    )
}

export default RegisterPage