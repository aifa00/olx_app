import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {authContext, firebaseContext } from '../../store/firebaseContext';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [price, setPrice] = useState(null);
  const [priceError, setPriceError] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [commonError, setCommonError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const {user} = useContext(authContext);
  const {db, storage} = useContext(firebaseContext);


  const handleOnclick = (e) => {

    e.preventDefault();

    if (name.trim() !== '' && category.trim() !== '' && price.toString().trim() !== '' && image !=='' && !nameError && !categoryError && !priceError && !imageError) {

      const submitForm = async () => {
        try {
          setLoading('uploading...')
          const storageRef = ref (storage, `/image/${image.name}`);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          console.log(url);
  
          const collRef = collection(db, 'products');
          await addDoc(collRef, {
            userId: user.uid,
            name,
            category,
            price,
            url,
            createdAt:new Date().toDateString(),
          });
          
          setLoading('');
          navigate('/');

        } catch (error) {
          setCommonError('Something went wrong!')
          console.log(error.message);
        }
      }
  
      submitForm();

    } else {

      if (!name) {
        setNameError ('This field is required');     
      }
      if (!category) {
        setCategoryError ('This field is required');
      }
      if (!price) {
        setPriceError ('This field is required');     
      }
      if (!image) {
        setImageError ('Please select an image');
      }


    }   
  }


  return (
    <Fragment>
      <Header />
      <div>      
       
        <div className="centerDiv">

          <div style={{textAlign: 'center', marginBottom: '25px'}}>
            <h3>SELL &nbsp;ITEM</h3>
          </div>

          <label htmlFor="fname">Name</label>
          <br />
          <div className="subDiv">
            <input
              className="input"
              type="text"
              id="fname"
              name="Name" 
              value={name}
              onChange={(e) => {
                setName (e.target.value);
                if (e.target.value === '') {
                  setNameError('This field is required')
                } else {
                  setNameError('');
                }
              }}
            />         
            {nameError && <span className='error'>{nameError}</span>}
          </div>
          
          <label htmlFor="fname">Category</label>
          <br />
          <div className="subDiv">
            <input
              className="input"
              type="text"
              id="fname"
              name="category"  
              onChange={(e) => {
                setCategory (e.target.value);
                if (e.target.value === '') {
                  setCategoryError('This field is required')
                } else {
                  setCategoryError('');
                }
              }}            
            />
            {categoryError && <span className='error'>{categoryError}</span>}       
          </div>
          
          <label htmlFor="fname">Price</label>
          <br />
          <div className="subDiv">
            <input 
            className="input"
            type="number"
            id="fname" 
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (e.target.value === '') {
                setPriceError('This field is required')
              } else if (!/^[0-9]+$/.test(e.target.value)) {
                setPriceError('Enter a valid price')
              } else {
                setPriceError('');
            }
            }}
            />
            {priceError && <span className='error'>{priceError}</span>}
          </div>         

          <br />
          {image && <img alt="Post image" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}      
            <br />
            <input 
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0])
              if (!e.target.files[0]) {
                setImageError('This field is required')
              } else {
                setImageError('');
              }
            }}
            />
            <br />
            {imageError && <span className='error'>{imageError}</span>}
            <br />

            <div  className='loading'>
            {loading ? <span>{loading}</span> : <button onClick={handleOnclick} className="uploadBtn">Upload and Submit</button>}
            </div>
            
            {commonError && <span className='error'>{commonError}</span>}

        </div>
      </div>
    </Fragment>
  );
};

export default Create;
