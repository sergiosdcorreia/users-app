import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AdCard from "./AdCard"
import PrivateHeader from "../components/PrivateHeader"

import "./ListUsers.css"

const ListUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [ad, setAd] = useState({})

  const { company, url, text } = ad

  console.log(users)
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    await fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((response) => setUsers(response.data))

    await fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((response) => setAd(response.ad))
    
    setLoading(false)
  }

  return (
    <div>
      <PrivateHeader />
      {
      loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="UserCard">
          {users.map((user, i) => (
            <UserCard
              key={user.id}
              userId={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              avatar={user.avatar}
            />
          ))}
          <AdCard
            company={company}
            url={url}
            text={text}
          />
        </div>
      )}
    </div>
  )
}

export default ListUsers
