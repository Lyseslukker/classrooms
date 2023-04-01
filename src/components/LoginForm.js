import React, { useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom';


export default function LoginForm() {
    const clientNewDate = new Date()
    const clientHours = clientNewDate.getHours()
    const clientMinutes = clientNewDate.getMinutes()
    const clientSeconds = clientNewDate.getSeconds()
    const clientStamp = clientNewDate.toString()
    
    // Client Left to 23:59:59 (hours:minutes.seconds)
    const hoursLeft = 23 - clientHours
    const minutesLeft = 59 - clientMinutes
    const secondsLeft = 59 - clientSeconds
    
    // Client Left to 23:59:59 (miliseconds)
    // Hours -> Miliseconds
    const hoursInMili = hoursLeft * 3600000
    // Minutes -> Miliseconds
    const minutesInMili = minutesLeft * 60000
    // Seconds -> Miliseconds
    const secondsInMili = secondsLeft * 1000
    // Combined for maxAge for clients cookie
    const cookieMaxAge = hoursInMili + minutesInMili + secondsInMili

    console.log("Client: " + clientHours + ":" + clientMinutes)
    console.log("Time left for client till 23:59.59: " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s")
    console.log("Client cookie maxAge in miliseconds: " + cookieMaxAge)
    console.log(clientNewDate.getTimezoneOffset())

    // STATES
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log(login)
    }, [login]);

    
    // HANDELERS
    const loginFormHandler = (e) => {
        e.preventDefault()
        // For screen size
        const screen = {
            width: window.screen.width,
            angle: window.screen.orientation.angle
        }
        // Client timeObject
        const TimeObject = {
            clientHoursLeft: hoursLeft,
            clientMinutesLeft: minutesLeft,
            clientSecondsLeft: secondsLeft,
            clientStamp: clientStamp,
            clientCookieMaxAge: cookieMaxAge
        }        
        // Final object for post request
        let myLoginObject = {
            credentials: login,
            screen: screen,
            clientTimeObject: TimeObject
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
            sessionStorage.setItem("sid", data.csrf)
            console.log("Everthing set up!")
            if (data.redirect === true) {
                setRedirect(true)
            }
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

    if (!redirect) {
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
    if (redirect) {
        return <Navigate to="/home" />
    }
}