import React, { useState, useRef, useEffect } from 'react'
import LoginForm from '../components/LoginForm';
import { useCookies } from 'react-cookie';
import "../pages/Login.css"
import "../components/LoginForm.css"

export default function SignUp() {

    const roleStudent = useRef()
    const roleTeacher = useRef()

    // sessionStorage.clear()
    

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



    return (
        <div className='login'>
            <div className="login__box">
                <div className="box__role">
                    <div ref={roleStudent} onClick={roleHandler} custom-role="student" className="role__student"> <h3>Student</h3> </div>
                    <div ref={roleTeacher} onClick={roleHandler} custom-role="teacher" className="role__teacher deactivated"> <h3>Teacher</h3> </div>
                </div>
                <div className="box__form">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}