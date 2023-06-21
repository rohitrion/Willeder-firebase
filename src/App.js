
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from './Component/firebase';
import Reset from './Component/Reset';

function App() {
  const [username, setUsername] = useState(''); // Display name
  const [log, setLog] = useState(false); // Indicates if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
        setLog(true);
      } else {
        setUsername('');
        setLog(false);
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
       <Route path='/data' element={log ? <Home name={username} log={log} /> : <Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;



