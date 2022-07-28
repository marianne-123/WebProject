import '../App.css';

function Comment({comment}) {
    return (
        <div className="comment">
            <p>{comment}</p>
        </div>
    )
}

export default Comment