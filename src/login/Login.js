import React, { useState } from 'react'
import { authenticate } from '../auth/Index'
import { Redirect } from 'react-router-dom'
import Header from '../components/Header'

import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  const [error, setError] = useState([])
  const [redirect, setRedirect] = useState(false)


  if (redirect) {
    return <Redirect to="/users" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCredentials = {
      email,
      password,
    }

    loginUser(userCredentials).then((data) => {
      if (data.error) setError([ data.error ])
      else
        authenticate(data, () => {
          setRedirect({ redirect: true })
        })
    })
  }

  const loginUser = async (credentials, token) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(credentials),
      })
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const loginForm = (email, password, error) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="content margin">
          <label>Email</label>
          <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
        </div>
        <div className="content">
          <label>Password</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="content box">
          <div className="error" style={{ display: error ? 'block' : 'none' }}>
            {error}
          </div>
        </div>
        <p className="message">
          Not registered yet? Please{' '}
          <a className="message-link" href="/signup">
            Register
          </a>
        </p>
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
