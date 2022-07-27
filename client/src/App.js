import {useState, useEffect} from 'react';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Login from './components/Login'
import Register from './components/Register'
import Posts from './components/Posts'
import './App.css';
import NewPost from './components/NewPost';


function App() {
  const [data, setData] = useState([])
  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({})


  useEffect(() => {
    fetch("/users/posts")
      .then(response => response.json())
      .then(json => setData(json))

  }, [data]) 
  // tähän joku, että hakee uusia postauksia.
  // data toimii, mut sit hakee koko ajan :DDD
 
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
