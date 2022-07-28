import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Login from './components/Login'
import Register from './components/Register'
import Posts from './components/Posts'
import './App.css';
import NewPost from './components/NewPost';

/* This is the main view of the app
Depending on whether the user is logged in or not (if there is a jwt token or not), 
the page shows the register/login forms (separate components)
or a personalized welcome message and a textarea for posting new messages. 
Posts are also visible on this page. (Posts and textarea for new posts are also separate components) */

function App() {
  const [data, setData] = useState([])
  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({})

/* Fetching the posts and their comments from the backend and setting them to data-variable */
  useEffect(() => {
    fetch("/users/posts")
      .then(response => response.json())
      .then(json => setData(json))

  }, [data]) 
 
  return (
      <div className="App">
        <AppBar position="static">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fancy Forum
          </Typography>
        </AppBar>
        <div className="content">
          <h2>{jwt ? `Welcome ${user}!` : ""}</h2>
          {!jwt && 
            <div> 
              <h2>Welcome!</h2>
              <p>If you do not have an account, you can register here.
                If you have already registered, you can login. 
              </p>
              <Register />
              <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>
            </div>
            }
          {jwt && 
            <NewPost sender={user} />
          }
          <Posts posts={data} jwt={jwt} sender={user}/>
        </div>
      </div>

  );
}

export default App;
