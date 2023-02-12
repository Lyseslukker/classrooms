import React, { useState, useEffect} from 'react'

export default function LoginForm() {

    // STATES
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });


    useEffect(() => {
        console.log(login)
    }, [login]);
    
    // HANDELERS
    const loginFormHandler = (e) => {
        e.preventDefault()
        const screen = {
            width: window.screen.width,
            angle: window.screen.orientation.angle
        }
        // const screenString = JSON.stringify(screen)

        let myLoginObject = {
            credentials: login,
            screen: screen
        }
        
        fetch("http://localhost:3500/login", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myLoginObject),
            mode: "cors",
            credentials: "include"
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    const emailHandler = (e) => {
        setLogin({
            ...login,
            email: e.currentTarget.value
        })
    }
    
    const passwordHandler = (e) => {
        setLogin({
            ...login,
            password: e.currentTarget.value
        })
    }


    return (
        <form onSubmit={loginFormHandler} className='loginform'>
            <div className="loginform__email formBoxes">
                <label htmlFor="email">Email: </label>
                <input onChange={emailHandler} type="email" name="email" id="email" />
            </div>

            <div className="loginform__password formBoxes">
                <label htmlFor="password">Password: </label>
                <input onChange={passwordHandler} type="password" name="password" id="password" />
            </div>

            <button className='formBtn'>Login</button>
        </form>
    )
}