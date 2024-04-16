import './Signup.css';
import Logo from '../../olx-logo.png';

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {firebaseContext} from '../../store/firebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';

export default function Signup() {

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [commonError, setCommonError] = useState('');
  const [loading, setLoading] = useState('');
  const {db} = useContext(firebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    if (userName.trim() !== '' && email.trim() !== '' && phone.toString().trim() !== '' && 
    password.trim() !== '' && !userNameError && !emailError && !phoneError && !passwordError)  {


      const createUser = async () => {
        try {
          setLoading('loading...')
          const auth = getAuth();
  
          const userCredentials = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
        
          await updateProfile(auth.currentUser, {
            displayName: userName
          });         
  
          const collRef = collection(db, 'users');
          await addDoc(collRef, {
            id: userCredentials.user.uid,
            username: userName,
            phone,
          })
          setLoading('');
  
          navigate('/login');
  
        } catch (error) {
          setLoading('');
          setCommonError(error.message.replace('Firebase: ', ''));
          console.log(error.message);
        }
      }
  
      createUser();


    } else {


      if (!userName) {
        setUserNameError ('This field is required');
      } 
      if (!email) {
        setEmailError ('This field is required');     
      }
      if (!phone) {
        setPhoneError ('This field is required');     
      }
      if (!password) {
        setPasswordError ('This field is required');
      }

    }

    
  }



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>
          <input
            className="input"
            type="text"            
            name="name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (e.target.value === '') {
                setUserNameError('This field is required')
              } else {
                setUserNameError('');
              }
            }}
          />          
          {userNameError && <span className='error'>{userNameError}</span>}
          </div>
          
          <br />
          
          <label htmlFor="fname">Email</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>
          <input
            className="input"
            type="email"            
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              if (e.target.value === '') {
                setEmailError('This field is required')
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                setEmailError('Enter a valid email')
              } else {
                setEmailError('');
              }

            }}            
          />       
          {emailError && <span className='error'>{emailError}</span>}
          </div>
          <br />
          
          <label htmlFor="lname">Phone</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>
          <input
            className="input"
            type="phone"            
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (e.target.value === '') {
                setPhoneError('This field is required')
              } else if (!/^[0-9]+$/.test(e.target.value)) {
                setPhoneError('Enter a valid phone number')
              } else {
                setPhoneError('');
              }
            }}
          />          
          {phoneError && <span className='error'>{phoneError}</span>}
          </div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>
          <input
            className="input"
            type="password"          
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              if (!e.target.value) {
                setPasswordError('This filed is required');
              } else if (password.length < 6) {
                setPasswordError('Password must be 6 characters long');
              } else {
                setPasswordError('');
              }
            }}
          />          
          {passwordError && <span className='error'>{passwordError}</span>}
          </div>
          <br />      

          {
            loading ? <span className='loading'>{loading}</span> : <button>Signup</button>
          }
          {commonError && <span className='error'>{commonError}</span>}
        </form>
        <Link to = '/login'><span>Login</span></Link>
      </div>
    </div>
  );
}
