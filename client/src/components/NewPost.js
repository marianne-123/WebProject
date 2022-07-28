import {useState} from 'react'
import '../App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/* This component includes the form for writing a new post. The sender is sent as a props, 
so the application knows who is writing the comment. The sender and the text are posted to backend. */

function NewPost({sender}) {
    const [textData, setTextData] = useState({sender})

    const submit = (e) => {
        e.preventDefault()

        fetch("/users/newpost", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(textData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    const handleChange = (e) => {
        setTextData({...textData, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <h3>Write a new post</h3>
            <form onSubmit={submit} onChange={handleChange}>
                <TextField name="text" fullWidth id="outlined-multiline-static" label="Write a new post" multiline rows={3} />
                <Button variant="contained" type="submit">Post</Button>
            </form>
        </div>
    )
}

export default NewPost