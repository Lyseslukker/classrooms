import React from 'react'
import "./Landingpage.css"
import { Link } from 'react-router-dom'

export default function Landingpage() {
    return (
        <div className='landingpage'>
            <div className="choice">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    )
}