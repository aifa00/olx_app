import './Header.css';
import { useContext } from 'react';
import { authContext } from '../../store/firebaseContext';
import {getAuth, signOut} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';




function Header() {

  const {user} = useContext(authContext);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    const logoutUser = async () => {
      const auth  = getAuth();
      await signOut(auth);
      navigate('/login');
    }
    logoutUser()
  }
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {
            user ? (
              <div class="dropdown">
                <h4>{user.displayName}</h4>
                <div class="dropdown-content">
                  {user && <span onClick = {handleLogout} >Logout</span>}
                </div>
              </div>
            ) : (
              <Link to='/login'><span>Login</span></Link>
            )
          }          
          <hr />
        </div>        
        <div className="sellMenu">
          <SellButton></SellButton>
          <Link to = {user ? '/create' : '/login'}>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
