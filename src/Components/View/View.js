import {useEffect, useState, useContext} from 'react';
import { firebaseContext } from '../../store/firebaseContext';
import { collection, getDocs, query, where } from 'firebase/firestore';


import './View.css';
import { PostContext } from '../../store/PostContext';
function View() {

  const {postDetails} = useContext(PostContext);
  const [userDetails, setUserDetails] = useState({});
  const {db} = useContext(firebaseContext);

  useEffect ((() => {

    const fetchUserDetails = async () => {    
      try {
        const collRef = collection(db, 'users');
        const q = query(collRef, where ('id', '==', postDetails.userId));
        const snapshot = await getDocs(q);

        let result;

        snapshot.forEach((doc) => {        
          result = doc.data(); 
        });

        setUserDetails(result);

        console.log(userDetails);
        
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchUserDetails();

  }), [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="postImg"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {
          userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
          )
        }
      </div>
    </div>
  );
}
export default View;
