import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import Login from '../pages/Auth/Login'

export default function PrivateRoute(props) {
    const {isAuthenticated} = useAuthContext()

    const {Component} = props

    if(!isAuthenticated)
        return <Login/>

  return (
    <Component/>
  )
}
