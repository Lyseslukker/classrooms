import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "./Home.css"
import NewClassroom from './NewClassroom'

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    // Used to navigate "Programmatically"
    const navigate = useNavigate()

    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        // Checkup effect
        // console.log(sessionStorage.getItem("sid"))
        fetch("http://localhost:3500/home", {
            method: 'GET',
            headers: {
                'csrf': sessionStorage.getItem("sid")
            },
            mode: "cors",
            credentials: "include"
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.status === "rejected") {
                setRedirect(true) 
            }
            if (data.status === "fulfilled") {
                setData(data.data)
            }
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);


    const addNewClassroom = () => {
        // toast.success("Created a classroom 👨‍🎓")
        // console.log("Adding new classroom")
        // <Navigate to="/newclassroom" />
        navigate("/newclassroom")
    }



    if (redirect === true) {
        return <Navigate to="/login" />
    }
    if (error === true) {
        <h1>Something went wrong, refresh page.</h1>
    }
    if (loading === true) {
        <h1>Loading ... </h1>
    }
    if (data) {
        return (
            <div className='home'>
                <div className="home__classrooms">
                    <div onClick={addNewClassroom} className="classrooms__addClassroom classrooms__classroom">
                        <p>Create new Classroom</p>
                    </div>
                    {
                        data.map((classroom, index) => {
                            return (
                                <div key={index} className="classrooms__classroom">
                                    <p>Name:<br /> <b>{classroom.classroom_name}</b></p>
                                    <p>Owner:<br /> <b>{classroom.owner_name}</b></p>
                                    <p>Classroom ID:<br /> <b>{classroom.classroomid}</b></p>
                                </div>
                            )
                        })
                    }
                </div>
                <ToastContainer />
            </div>
        )
    }
}