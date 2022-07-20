import Post from './Post'

// Nyt hakee vain postauksen tekstin, eli nimi ja aika pitäisi myös saada näkyviin

function Posts({posts}) {
    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post) => (
                <Post post={post.text} />
            ))}

        </div>
    )
}

export default Posts