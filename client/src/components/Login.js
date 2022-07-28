import {useState} from 'react'
import '../App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/* This component includes the login-form. 
When user presses submit, the userdata from the form is sent to backend. 
If the user is authenticated, a token is sent as a response from the backend and set to JWT.
Also the user itself (meaning the username) is set. */

function Login({setJwt, jwt, setUser}) {
    const [userData, setUserData] = useState({})

    const submit = (e) => {
        e.preventDefault()

        fetch("/users/login", {
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
                if(data.token) {
                    setJwt(data.token)
                    setUser(data.username) 
                }
            })

    }

    /* Function for changing the text fields */
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div className="form">
            <h3>Login</h3>
            <form onSubmit={submit} onChange={handleChange}>
                <TextField type="text" id="outlined-basic" label="Username" variant="outlined" size="small" name="username" />
                <TextField type="password" id="outlined-basic" label="Password" variant="outlined" size="small" name="password" />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </div>
    )
}

export default Login
