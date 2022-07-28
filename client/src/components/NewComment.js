import {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

/* This component includes the form for writing a new comment to a post.
It gets the id of the post and the sender as props and posts these with the comment text
to the backend. */

function NewComment({id, sender}) {
    const [textData, setTextData] = useState({id, sender})

    const submit = (e) => {
        e.preventDefault()

        fetch("/users/newcomment", {
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
            <form onSubmit={submit} onChange={handleChange}>
                <TextField name="comment" fullWidth id="outlined-multiline-static" label="Write a comment" multiline rows={2} />
                <Button variant="contained" type="submit">Comment</Button>
            </form>
        </div>
    )
}

export default NewComment