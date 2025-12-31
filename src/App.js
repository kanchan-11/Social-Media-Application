import './App.css';
import Authentication from './pages/authentication/Authentication';
import HomePage from './pages/homepage/HomePage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useEffect } from 'react'
import Message from './pages/message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Store from './redux/Store';
import { GetUserProfileAction } from './redux/Auth/auth.action';
import { ColorModeProvider } from './theme/ThemeContext';

function App() {
  const { auth } = useSelector(Store => Store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  useEffect(() => {
    dispatch(GetUserProfileAction(jwt))
  }, [dispatch, jwt])
  return (
    <ColorModeProvider>
      <Routes>
        <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path='/message' element={<Message />} />
        <Route path='/*' element={<Authentication />} />
      </Routes>
    </ColorModeProvider>
  );
}

export default App;
