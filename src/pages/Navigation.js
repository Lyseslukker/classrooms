import React from 'react'
import "./Navigation.css"
import { Link, Outlet} from 'react-router-dom';
import { BsFillBookmarkFill, BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';

export default function Navigation() {
    return (
        <div className='navigation'>
            <nav className='nav'>
                <div className="nav__group">
                    {/* <Link> <BsFillBookmarkFill /> </Link>
                    <Link> <FaChalkboardTeacher /> </Link> */}
                    <BsFillBookmarkFill />
                </div>
                <div className="nav__darkmode">
                    {/* <Link className='darkmode__moon'> <BsFillMoonFill />  </Link> */}
                    {/* <Link className='darkmode__sun'> <BsSunFill />  </Link> */}
                    <BsSunFill />
                </div>
            </nav>

            <Outlet />
        </div>
    )
}