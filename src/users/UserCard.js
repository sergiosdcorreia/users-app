import React from 'react'
import { isAuthenticated } from "../auth/Index"

import "./UserCard.css"

const UserCard = ({ userId, firstName, lastName, email, avatar }) => {
  
  
  const removeUser = () => {
    const token = isAuthenticated().token;
    deleteUser(userId, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        console.log("User deleted")
      }
    })
  }

  const confirmDelete = () => {
    let answer = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (answer) {
        removeUser();
    }
  }

  const deleteUser = async (userId, token) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          'Content-type': 'application/json'
        }
      })
      console.log(response)
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }
  
  return (
    <div className="card">
      <div className="image-container">
        <img className="image" src={avatar} alt={firstName} />
      </div>
      <div className="content-card">
        <button className="delete" onClick={confirmDelete}>&#10006;</button>
        <p className="name">
          {firstName} {lastName}
        </p>
        <p className="email">{email}</p>
      </div>
    </div>
  )
}

export default UserCard
