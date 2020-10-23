import React from 'react'
import { isAuthenticated } from "../auth/Index"

import "./UserCard.css"

const UserCard = ({ userId, firstName, lastName, email, avatar }) => {
  
  const removeUser = () => {
    const token = isAuthenticated().token;
    deleteUser(userId, token).then(data => {
      if(data.error) {
        console.log(data.error);
      }
    })
  }

  const deleteUser = async (userId, token) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/2`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      return console.log(err)
    }
  }
  
  return (
    <div className="card">
      <div className="image-container">
        <img className="image" src={avatar} alt={firstName} />
      </div>
      <div className="content">
        <button className="delete" onClick={deleteUser}>&#10006;</button>
        <p className="name">
          {firstName} {lastName}
        </p>
        <p className="email">{email}</p>
      </div>
    </div>
  )
}

export default UserCard
