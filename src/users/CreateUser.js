import React, { useState } from 'react'
import { authenticate } from '../auth/Index'
import { Redirect } from 'react-router-dom'
import Header from '../components/Header'

const CreateUser = () => {
  const [createUser, setCreateUser] = useState({
    name: 'morpheus',
    job: 'leader',
    error: '',
  })

  const { name, job, error, redirect } = createUser

  if (redirect) {
    return <Redirect to="/users" />
  }

  const handleChange = (user) => (event) => {
    setCreateUser({ [user]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUserDetails = {
      name,
      job,
    }

    newUser(newUserDetails).then((data) => {
      if (data.error) setCreateUser({ error: data.error })
      else
        authenticate(data, () => {
          setCreateUser({ redirect: true })
        })
    })
  }

  const newUser = async (user) => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const createUserForm = (name, job, error) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="content">
          <label>Name</label>
          <input type="text" onChange={handleChange('name')} value={name} />
        </div>
        <div className="content">
          <label>Job</label>
          <input type="text" onChange={handleChange('job')} value={job} />
        </div>
        <div className="content box">
          <div className="error" style={{ display: error ? 'block' : 'none' }}>
            {error}
          </div>
        </div>
        <input className="submit" type="submit" value="Create user" />
      </form>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2>Create User</h2>
        {createUserForm(name, job, error)}
      </div>
    </>
  )
}

export default CreateUser
