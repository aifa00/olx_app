import './Login.css';
import Logo from '../../olx-logo.png';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



function Login() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [commonError, setCommonError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {

    e.preventDefault();

    if (email.trim() !== '' && password.trim() !== '' && !emailError && !passwordError)  {

      const loginUser = async () => {
        try {
          setLoading('signing in...')
          const auth = getAuth();
          const userCredentials = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
          setLoading('');    
          navigate('/');
        } catch (error) {
          setLoading('');
          setCommonError(error.message.replace('Firebase: ', ''));
          console.log(error.message);
        }
      }
  
      loginUser();

    } else {

      if (!email) {
        setEmailError ('This field is required');     
      }
      if (!password) {
        setPasswordError ('This field is required');
      }

    }
    
  }



  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>

          <input
            className="input"
            type="email"
            id="fname"
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

          <label htmlFor="lname">Password</label>
          <br />
          <div style={{display:'flex', flexDirection: 'column',alignItems:'start'}}>
          <input
            className="input"
            type="password"
            id="lname"
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
          <br /><br/>
          {loading ? <span className='loading'>{loading}</span> : <button>Login</button>}
          {commonError && <span className='error'>{commonError}</span>}
        </form>
        <Link to='/signup'><span>Signup</span></Link>
      </div>
    </div>
  );
}

export default Login;
