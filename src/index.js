import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, {firebaseContext} from './store/firebaseContext';
import { db, storage } from './firebase/config';
import Post from './store/PostContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <firebaseContext.Provider value={{db, storage}}>
      <Context>
        <Post>
          <App />
        </Post>       
      </Context>
    </firebaseContext.Provider>
  </React.StrictMode>
);
