import { useEffect, useContext, useState } from 'react';
import { firebaseContext } from '../../store/firebaseContext';
import { PostContext } from '../../store/PostContext';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {

  const {setPostDetails} = useContext(PostContext);
  const {db} = useContext(firebaseContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const collRef = collection(db, 'products');
        const snapshot = await getDocs(collRef)
        const result = [];
        snapshot.docs.forEach(doc => {
          result.push({id: doc.id, ...doc.data()})
        });
        setProducts(result);
        console.log(products);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();

  },[]);


  const viewPost = (product) => {
    setPostDetails(product);
    navigate('/viewpost');    
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
      <h2 className='heading'>Fresh recommendations</h2>
        <div className="cards">

        {
          products.map((product) => {
            return (
              <div className="card" onClick={() => viewPost(product)}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src = {product.url} alt="postImg" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category} </p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>              
            )
          })
        }

        </div>
      </div>

    </div>
  );
}

export default Posts;
