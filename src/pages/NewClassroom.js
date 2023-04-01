import React, {useState} from 'react'


export default function NewClassroom() {

    const [classname, setClassname] = useState();

    const classnameHandler = (e) => {
        setClassname(e.target.value)
    }


    const formHandler = (e) => {
        e.preventDefault()

        const tempObject = {
            classname: classname
        }
        const objectString = JSON.stringify(tempObject)

        fetch("http://localhost:3500/createclass", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'csrf': sessionStorage.getItem("sid")
            },
            mode: "cors",
            credentials: "include",
            body: objectString
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }



    return (
        <div className='newclassroom'>
            <h1>Add new classroom: </h1>

            <form onSubmit={formHandler} method="post">
                <label htmlFor="">Classroom name: </label>
                <input onChange={classnameHandler} type="text" name="classname" id="classname" />

                <button type="submit">Create</button>               
            </form>
        </div>
    )
}