import '../App.css';
import NewComment from './NewComment'
import Comment from './Comment'
import {useState} from 'react'
import Button from '@mui/material/Button';

/* This component shows individual posts on the page. 
It formats the post to show the sender, date and text. 
Each post has a comment-button, that maps the comments and renders the Comment-component when pressed.
If the user is logged in (meaning if there is a jwt-token), the NewComment-component is shown. */

function Post({post, jwt, sender}) {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="post">
            <p>Sent by <b>{post.sender}</b> on {post.date}</p>
            <p>{post.text}</p>
            <div>
                <Button variant="outlined" onClick={() => setHidden(s => !s)}>Comments</Button>
                {!hidden ? 
                <>{post.comments.map((comment) => (
                    <Comment key={post._id} comment={comment} />
                ))} 
                {jwt && <NewComment id={post._id} sender={sender} /> } 
                </> : null}
            </div>
        </div>
    )
}

export default Post