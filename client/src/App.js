import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DataItem from './components/DataItem'
import Data from './components/Data'
import Login from './components/Login'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({})

  
  useEffect(() => {
    fetch("/api/data")
      .then(response => response.json())
      .then(json => setData(json))

  }, [])

  /* 
  Tämä näytetään vain kirjautuneille. Eli näin myös projektissa!
  {jwt ? `Welcome ${user.username}!` : ""} */

  return (
    <Router>
      <div className="App">
        <h1>Project</h1>
        <h2>{jwt ? `Welcome ${user.username}!` : ""}</h2>
        <table>
            <thead><tr><td>ID</td><td>NAME</td></tr></thead>
            <tbody>
              {data.map((d) => (
                <DataItem key={d.id} data={d} />
              ))}
            </tbody>

          </table>
          <Routes>
            <Route path="/data/:id" element={<Data />}/>
          </Routes>
          {!user?.id?.length > 0 &&   // tämä testaa onko käyttäjä kirjautunut, jos joo niin ei näytetä, voi käyttää samaa ku h2
          <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>
          }
      </div>
    </Router>
  );
}

export default App;
