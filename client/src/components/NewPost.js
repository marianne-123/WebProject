import {useState} from 'react'

function NewPost() {
    const [textData, setTextData] = useState({})

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
            <h2>Write a new post</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="name" />
                <textarea placeholder="Write a post" name="text" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default NewPost