import React, {useState, useEffect} from 'react'
import "./Login.css"

export default function Login() {

    const [choice, setChoice] = useState('');

    const choiceHandler = (e) => {
        console.log(e.currentTarget.getAttribute("myattribute"))
        let clickEvent = e.currentTarget.getAttribute("myattribute")
        if (clickEvent === "student") {
            setChoice("student")
            return
        }
        else if (clickEvent === "teacher") {
            setChoice("teacher")
            return
        }
        else {
            setChoice("error")
        }
    }

    useEffect(() => {
        console.log(choice)
    }, [choice]);


    if (choice === "student") {
        return (
            <div className='login__student'>
            <div className="student__box">
                <h1>Student</h1>
                <form className='box__form' action="" method="post">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name='username' id='username' autoComplete='given-name' />

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" autoComplete='family-name' />
                </form>
            </div>
        </div>            
        )
    }
    if (choice === "teacher") {
        return (
            <div className='login__teacher'>
            <div className="teacher__box">
                <h1>Teacher</h1>
                <form className='box__form' action="" method="post">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name='username' id='username' autoComplete='given-name' />

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" autoComplete='family-name' />
                </form>
            </div>
        </div>            
        )
    }

    return (
        <div className='login'>
            <div className="login__choice">
                <button myattribute="teacher" onClick={choiceHandler}>Teacher</button>
                <button myattribute="student" onClick={choiceHandler}>Student</button>
            </div>
        </div>
    )
}
