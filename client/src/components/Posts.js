import Post from './Post'

/* This component shows the posts on the page. It gets the post-data as props {posts}. 
It also receives the token and sender (user logged in) as props.
All the data is then sent one post at a time to Post-component. */

function Posts({posts, jwt, sender}) {
    return (
        <div>
            <h3>Posts</h3>
            {posts.map((post) => (
                <Post key={post._id} post={post} jwt={jwt} sender={sender} />
            ))}

        </div>
    )
}

export default Posts