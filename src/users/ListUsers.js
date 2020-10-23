import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AdCard from "./AdCard"
import PrivateHeader from "../components/PrivateHeader"

import "./ListUsers.css"

const ListUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [ad, setAd] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const { company, url, text } = ad

  useEffect(() => {
    loadUsers(page)
  }, [page])

  const loadUsers = async (page) => {
    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setUsers(response.data))

    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setAd(response.ad))

    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setTotalPages(response.total_pages))
    
    setLoading(false)
  }

  const prevPage = number => {
    setPage( page - number );
  };

  const nextPage = number => {
    setPage( page + number );
  };

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
        {
          page > 1 ? 
            <button
              className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
              onClick={() => prevPage(1)}
              >
              Previous
            </button> :
          null
        }
        { 
          page < totalPages ?
            <button
              className="btn btn-raised btn-success mt-5 mb-5"
              onClick={() => nextPage(1)}
              >
              Next
            </button> :
          null
        }
    </div>
  )
}

export default ListUsers
