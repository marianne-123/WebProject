import '../App.css';

/* This component shows an individual comment on the page. The comment is sent to it as props. */

function Comment({comment}) {
    return (
        <div className="comment">
            <p>{comment}</p>
        </div>
    )
}

export default Comment