import Post from './Post'

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