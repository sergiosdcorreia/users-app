import React, { useEffect, useState } from 'react'
import { authenticate } from "../auth/Index"
import { Redirect } from "react-router-dom"
import Header from "../components/Header"

import "./Login.css"

const Login = () => {
  const [login, setLogin] = useState({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
    error: '',
    redirect: false
  })
  
  const { email, password, error, redirect } = login

  if (redirect) {
    return <Redirect to="/users" />
  }

  const handleChange = (credentials) => (event) => {
    setLogin({ [credentials]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCredentials = {
      email,
      password,
    }

    loginUser(userCredentials)
    .then(data => {
      if(data.error) setLogin({ error: data.error })
      else 
        authenticate(data, () => {
          setLogin({ redirect: true })
        })
    })
  }

  const loginUser = async ( credentials, token ) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(credentials),
      })
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const loginForm = ( email, password, error ) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="content">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className="content">
          <label>Password</label>
          <input
            type="password"
            onChange={handleChange('password')}
            value={password}
          />
        </div>
        <div className="content box">
          <div className="error" style={{display: error ? "block" : "none"}}>{error}</div>
        </div>
        <p className="message">Not registered yet? Please <a className="message-link" href="/signup">Register</a></p>
        <input className="submit" type="submit" value="Login" />
      </form>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2>Login</h2>
        {loginForm(email, password, error)}
      </div>
    </>
  )
}

export default Login

