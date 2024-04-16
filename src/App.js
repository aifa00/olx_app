import './App.css';
import Home from './Pages/Home.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Create from './Pages/Create.js';
import ViewPost from './Pages/ViewPost.js';
import { useContext, useEffect } from 'react';
import {authContext} from './store/firebaseContext.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router,Routes, Navigate, Route } from 'react-router-dom';


function App() {

  const {user, setUser} = useContext(authContext);

  useEffect(()=> {
    const AuthenticateUser = async () => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          setUser(user); 
        })        
      } catch (error) {
        console.log(error.message);
      }
    }
    AuthenticateUser();
  })

  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/> }/>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/> }/>
          <Route path='/create' element={user ? <Create /> : <Login />}/>
          <Route path='/viewpost' Component={ViewPost}/>
        </Routes>
      </Router>
    </>
  )
}

export default App