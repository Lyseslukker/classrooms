import React, { useState, useRef } from 'react'
import "./SignUp.css"
import SignupForm from '../components/SignupForm';

export default function SignUp() {

    console.log("SignUp.js loaded")

    const roleStudent = useRef()
    const roleTeacher = useRef()
    const [signupState, setSignupState] = useState(false);

    const signupStateHandler = (state) => {
        setSignupState(state)
    }


    const [role, setRole] = useState("student")

    const roleHandler = (e) => {
        // console.log(e.currentTarget.getAttribute("custom-role"))
        let role = e.currentTarget.getAttribute("custom-role")
        if (role === "student") {
            setRole("student")

            roleTeacher.current.classList.add("deactivated")
            roleStudent.current.classList.remove("deactivated")

        }
        if (role === "teacher") {
            setRole("teacher")
            roleStudent.current.classList.add("deactivated")
            roleTeacher.current.classList.remove("deactivated")
        }
    }


    if (signupState === false) {
        return (
            <div className='signup'>
                <div className="signup__box">
                    <div className="box__role">
                        <div ref={roleStudent} onClick={roleHandler} custom-role="student" className="role__student"> <h3>Student</h3> </div>
                        <div ref={roleTeacher} onClick={roleHandler} custom-role="teacher" className="role__teacher deactivated"> <h3>Teacher</h3> </div>
                    </div>
                    <div className="box__form">
                        <SignupForm signupFunction={signupStateHandler} role={role} />
                    </div>
                </div>
            </div>
        )
    }

    if (signupState === true) {
        return (
            <div className='numb'>
                <h1>Success</h1>
            </div>
        )
    }

    return (
        <div className="hmm">
            <h1>Loading</h1>
        </div>
    )
}