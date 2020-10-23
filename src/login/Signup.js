import React, { useState } from 'react'
import Header from '../components/Header'

import './Signup.css'

const Signup = () => {
  const [signup, setSignup] = useState({
    email: 'eve.holt@reqres.in',
    password: 'pistol',
    error: '',
  })

  const { email, password, error } = signup

  const handleChange = (credentials) => (event) => {
    setSignup({ [credentials]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCredentials = {
      email,
      password,
    }

    signupUser(userCredentials).then((data) => {
      if (data.error) setSignup({ error: data.error })
      else
        setSignup({
          email: '',
          password: '',
          error: '',
        })
    })
  }

  const signupUser = async (credentials) => {
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const signupForm = (email, password, error) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="content margin">
          <label>Email</label>
          <input type="email" onChange={handleChange('email')} value={email} />
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
          <div className="error" style={{ display: error ? 'block' : 'none' }}>
            {error}
          </div>
        </div>
        <p className="message">
          Already Signup? Please{' '}
          <a className="message-link" href="./">
            Login
          </a>
        </p>
        <input className="submit" type="submit" value="Register" />
      </form>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2>Signup</h2>
        {signupForm(email, password, error)}
      </div>
    </>
  )
}

export default Signup
