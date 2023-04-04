import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Feed from './components/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login';
import HomeLayout from './layout';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])


  return (
    <>
      {!user ?
        <Login />
        :
        <HomeLayout />
      }
    </>
  );
}

export default App;
