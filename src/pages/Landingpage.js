import React from 'react'
import "./Landingpage.css"
import { Link } from 'react-router-dom'

export default function Landingpage() {
    return (
        <div className='landingpage'>
            <div className="landingpage__choice">
                <Link className='choice__btn choice__login' to="/login">Login</Link>
                <Link className='choice__btn choice__signup' to="/signup">Signup</Link>
            </div>
        </div>
    )
}