import React from 'react'

export default function AdminRoute(props) {
    const {Component} = props
    let admin = JSON.parse(localStorage.getItem("user"))
 
    if(admin && admin.email === "admin@gmail.com"){
        return <Component/>
    }
  return (
    <div>
        <h1>Only admin can see this page.</h1>
    </div>
  )
}