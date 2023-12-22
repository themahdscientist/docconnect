import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { Spin } from 'antd'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Logout from './components/Logout'
import Auth from './components/Auth'
import Guest from './components/Guest'

function App() {
  const { loading } = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading && (<Spin size='large' fullscreen />)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Auth><Home /></Auth>} />
        <Route path='/logout' element={<Auth><Logout /></Auth>} />
        <Route path='/login' element={<Guest><Login /></Guest>} />
        <Route path='/register' element={<Guest><Register /></Guest>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
