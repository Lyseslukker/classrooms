import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import "./SignupForm.css"

export default function SignupForm({ role, signupFunction, signupStateHandler }) {

    const [redirect, setRedirect] = useState(false);

    const submitBtnRef = useRef()
    const emailRef = useRef()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    // If true show errorBox, if false hide it
    const [errorMessageBox, setErrorMessageBox] = useState(false);

    // For visual aid (( undefined=blank, fulfilled=Success, text=Error  ))
    const [formValidation, setFormValidation] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: ''
    });

    // Signup State
    const [signup, setSignup] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        role: role
    });

    // Underlining Inputs with errors
    useEffect(() => {
        console.log("formValidation state: ", formValidation)
        // Email
        if (formValidation.email !== "fulfilled" || formValidation.email !== '') {
            emailRef.current.setAttribute("id","inputError")
        }
        if (formValidation.email === "fulfilled" || formValidation.email === '') {
            emailRef.current.removeAttribute("id")
        }

        // Firstname
        if (formValidation.firstname !== "fulfilled" || formValidation.firstname !== '') {
            firstnameRef.current.setAttribute("id","inputError")
        }
        if (formValidation.firstname === "fulfilled" || formValidation.firstname === '') {
            firstnameRef.current.removeAttribute("id")
        }

        // Lastname
        if (formValidation.lastname !== "fulfilled" || formValidation.lastname !== '') {
            lastnameRef.current.setAttribute("id","inputError")
        }
        if (formValidation.lastname === "fulfilled" || formValidation.lastname === '') {
            lastnameRef.current.removeAttribute("id")
        }

        // Password
        if (formValidation.password !== "fulfilled" || formValidation.password !== '') {
            passwordRef.current.setAttribute("id","inputError")
        }
        if (formValidation.password === "fulfilled" || formValidation.password === '') {
            passwordRef.current.removeAttribute("id")
        }

        // Confirm Password
        if (formValidation.confirmPassword !== "fulfilled" || formValidation.confirmPassword !== '') {
            confirmPasswordRef.current.setAttribute("id","inputError")
        }
        if (formValidation.confirmPassword === "fulfilled" || formValidation.confirmPassword === '') {
            confirmPasswordRef.current.removeAttribute("id")
        }

    }, [formValidation]);



    // Input Handlers
    const email = (e) => {
        setSignup({
            ...signup,
            email: e.currentTarget.value
        })
    }
    const name = (e) => {
        setSignup({
            ...signup,
            firstname: e.currentTarget.value
        })
    }
    const lastname = (e) => {
        setSignup({
                ...signup,
                lastname: e.currentTarget.value
        })
    }
    const password = (e) => {
        setSignup({
            ...signup,
            password: e.currentTarget.value
        })
    }
    const confirmPassword = (e) => {
        setSignup({
            ...signup,
            confirmPassword: e.currentTarget.value
        })
    }


    // Visual Aid
    const SignupResponse = (responseObject) => {
        // console.log("SignupReponse function Object: ", responseObject)
        responseObject.forEach((promise) => {
            // Rejected
            if (promise.status === "rejected") {
                // console.log(`${promise.reason.class}: `, promise.reason.message)
                // Email
                if (promise.reason.class === "email") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            email: promise.reason.message
                        }
                    })                
                }
                // Firstname
                if (promise.reason.class === "firstname") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            firstname: promise.reason.message
                        }
                    })                
                }
                // Lastname
                if (promise.reason.class === "lastname") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            lastname: promise.reason.message
                        }
                    })                
                }
                // Password
                if (promise.reason.class === "password") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            password: promise.reason.message
                        }
                    })
                }
                // Confirm Password
                if (promise.reason.class === "confirmPassword") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            confirmPassword: promise.reason.message
                        }
                    })
                }
            }
            // Fulfilled
            if (promise.status === "fulfilled") {
                // console.log(`${promise.value[0].class}: `, promise.status)
                if (promise.value[0].class === "email") {
                    // setFormValidation({...formValidation, email: "Fulfilled"})
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            email: "fulfilled"
                        }
                    })
                }
                if (promise.value[0].class === "firstname") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            firstname: "fulfilled"
                        }
                    })
                }
                if (promise.value[0].class === "lastname") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            lastname: "fulfilled"
                        }
                    })
                }
                if (promise.value[0].class === "password") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            password: "fulfilled"
                        }
                    })
                }
                if (promise.value[0].class === "confirmPassword") {
                    setFormValidation((prev) => {
                        return {
                            ...prev,
                            confirmPassword: "fulfilled"
                        }
                    })
                }
            }
        })
    }


    // POST Fetch
    const submitHandler = (e) => {
        e.preventDefault()
        
        fetch("http://localhost:3500/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signup)
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("Reponse: ", data)
            if (data.reason === "redirect") {
                setRedirect(true)
            }
            const errorOrNot = data.filter((state) => {
                return state.status === "rejected"
            })
            // Error messages
            errorOrNot.length > 0 ? setErrorMessageBox(true) : setErrorMessageBox(false)
            // If all fields are correct
            if (errorOrNot.length === 0) {
                console.log("Tried to set it to true")
                signupFunction(true)
            }
            SignupResponse(data)
            console.log(errorOrNot)
        })
        .catch((err) => {
            console.error(err)
        })
    }


    if (redirect === true) {
        return <Navigate to="/login" />
    }
    

    if (role === "student" || role === "teacher") {
        return (
            <div className="signupFormBox">
                <form onSubmit={submitHandler} className='studentForm' id='studentForm' action="" method="post">

                    <div className="studentForm__usernameBox formBoxes">
                        <label htmlFor="email">Email ( Needed for confirmation later ): </label>
                        <input ref={emailRef} className='email' onChange={email} type="email" name="email" id="email" placeholder='Email address ..' />
                    </div>

                    <div className="studentForm__firstnameBox formBoxes">
                        <label htmlFor="firstname">First name: </label>
                        <input ref={firstnameRef} className='firstname' onChange={name} type="text" name="firstname" id="firstname" placeholder='Real name ..' />    
                    </div>

                    <div className="studentForm__lastnameBox formBoxes">
                        <label htmlFor="lastname">Last name: </label>
                        <input ref={lastnameRef} className='lastname' onChange={lastname} type="text" name="lastname" id="lastname" placeholder='Real name ..' />
                    </div>

                    <div className="studentForm__passwordBox formBoxes">
                        <label htmlFor="password">Password: </label>
                        <input ref={passwordRef} className='password' onChange={password} type="password" name="password" id="password" placeholder='Password for login ..' />
                    </div>

                    <div className="studentForm__confirmPasswordBox formBoxes">
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input ref={confirmPasswordRef} className='confirmPassword' onChange={confirmPassword} type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password ..' />
                    </div>
                    
                    <button ref={submitBtnRef} className='formBtn' form='studentForm' type="submit">Submit</button>
                </form>

                {
                    errorMessageBox === true
                    // If true show errorMessages
                    ?   <div className="errorMessages">
                            {/* ERROR MESSAGE */}
                            {
                                formValidation.email === "fulfilled" ? null
                                : formValidation.email === "" ? null 
                                :   <div className="errorBox">
                                        <h4>Email: </h4> 
                                        <ol>
                                            <li>{formValidation.email}</li>
                                        </ol>
                                    </div>
                            }
                            {
                                formValidation.firstname === "fulfilled" ? null
                                : formValidation.firstname === "" ? null 
                                :   <div className="errorBox">
                                        <h4>Firstname: </h4> 
                                        <ol>
                                            <li>{formValidation.firstname}</li>
                                        </ol>
                                    </div>
                            }
                            {
                                formValidation.lastname === "fulfilled" ? null
                                : formValidation.lastname === "" ? null 
                                :   <div className="errorBox">
                                        <h4>Lastname: </h4> 
                                        <ol>
                                            <li>{formValidation.lastname}</li>
                                        </ol>
                                    </div>
                            }
                            {
                                formValidation.password === "fulfilled" ? null
                                : formValidation.password === "" ? null 
                                :    <div className="errorBox">
                                        <h4>Password: </h4> 
                                        <ol>
                                            <li>{formValidation.password}</li>
                                        </ol>
                                    </div>
                            }
                            {
                                formValidation.confirmPassword === "fulfilled" ? null
                                : formValidation.confirmPassword === "" ? null 
                                :   <div className="errorBox">
                                        <h4>Confirmation Password: </h4> 
                                        <ol>
                                            <li>{formValidation.confirmPassword}</li>
                                        </ol>
                                    </div>
                            }
                        </div>
                    // If not true hide
                    : null
                }
                
                
            </div>
        )
    }


    return (
        <div className="error">
            <h1>Something went wrong</h1>
        </div>
    )
}