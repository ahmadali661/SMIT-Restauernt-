import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

export default function Auth() {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='forgot' element={<ForgotPassword/>}/>
        <Route path='*' element={<h1>404 , Error , Wrong Path ,  Page Not Found</h1>}/>
    </Routes>
  )
}
