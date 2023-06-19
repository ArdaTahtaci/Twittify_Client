import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import RootUser from './components/NoUser/RootUser';
import { persistor } from "./redux/store.js"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Main from './components/WithUser/Main';

function App() {

  let isLoggedIn = undefined
  isLoggedIn = useSelector(state => state.user.session.isLoggedIn)



  return (
    <div className="App">

      <Routes>

        <Route path="/" element={isLoggedIn ? <Navigate to={"/home"} /> : (<RootUser />)} />
        <Route path="/home" element={isLoggedIn ? (<Main />) : <Navigate to={"/"} />} />

        <Route path='/:userName' element={<Main />}>
          <Route path='following' element={<Main />} />
          <Route path='followers' element={<Main />} />
        </Route>

        <Route path="/:userName/status/:tweetId" element={<Main />} >
          <Route path='likes' element={<Main />} />
          <Route path='retweets' element={<Main />} >
            <Route path='with_comments' element={<Main />} />
          </Route>
        </Route>




      </Routes>


    </div >
  )
}

export default App;
