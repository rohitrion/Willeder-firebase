
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from './Component/firebase';
import Reset from './Component/Reset';

function App() {

  const [username, setusername] = useState() //display name
  const [log, setlog] = useState()            //login user
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setusername(user.displayName)
        navigate('/data')
        setlog(user)
      } else {
        setusername('')
      }
    })
  }, [])

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/data" element={<Home name={username} log={log} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>

    </div>
  );
}

export default App;
