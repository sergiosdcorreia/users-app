import React, { useState } from 'react'
import Header from '../components/Header'

const Signup = () => {

  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('pistol')
  const [error, setError] = useState([])
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCredentials = {
      email,
      password
    }

    signupUser(userCredentials).then((data) => {
      if (data.error) setError([ data.error ])
      else
        setEmail('')
        setPassword('')
        setMessage("Successfully registered! ")
    })
  }

  const signupUser = async (credentials) => {
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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
          { message ? message : 'Already Signup? ' } 
          Please{' '}
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
