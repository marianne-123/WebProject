import '../App.css';
import NewComment from './NewComment'
import Comment from './Comment'
import {useState} from 'react'
import Button from '@mui/material/Button';


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