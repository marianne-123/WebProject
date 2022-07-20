import {useState, useEffect} from 'react';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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

  }, [])
  // tähän joku, että hakee useammin uusia postauksia. nyt hakee uudet vain kun sivu päivittyy...

  /* 
  Tämä näytetään vain kirjautuneille. Eli näin myös projektissa!
  {jwt ? `Welcome ${user.username}!` : ""} */

  return (
      <div className="App">
        <h1>Project X</h1>
        <h2>{jwt ? `Welcome ${user.username}!` : ""}</h2>
        <Register />
        {!user?.id?.length > 0 &&   // tämä testaa onko käyttäjä kirjautunut, jos joo niin ei näytetä, voi käyttää samaa ku h2
          <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>
          }
        <NewPost />
        <Posts posts={data}/>
      </div>

  );
}

export default App;
