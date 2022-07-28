import {useState} from 'react'
import '../App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/* This component includes the register-form. 
When user presses submit, the userdata from the form is sent to backend. */

function Register() {
    const [userData, setUserData] = useState({})

    const submit = (e) => {
        e.preventDefault()
        console.log("Getting here")

        fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })

    }

    /* Function for changing data */
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div className="form">
            <h3>Register</h3>
            <form onSubmit={submit} onChange={handleChange}>
                <TextField type="text" id="outlined-basic" label="Username" variant="outlined" size="small" name="username" />
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" size="small"  name="password" />
                <Button variant="contained" type="submit">Register</Button>
            </form>
        </div>
    )
}

export default Register