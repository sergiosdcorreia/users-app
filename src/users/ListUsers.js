import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AdCard from './AdCard'
import PrivateHeader from '../components/PrivateHeader'

import './ListUsers.css'

const ListUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [ad, setAd] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState()

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

    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setCurrentPage(response.page))

    setLoading(false)
  }

  const prevPage = (number) => {
    setPage(page - number)
  }

  const nextPage = (number) => {
    setPage(page + number)
  }

  return (
    <div>
      <PrivateHeader />
      {loading ? (
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
          <AdCard company={company} url={url} text={text} />
        </div>
      )}
      <div className="pagination">
        {page > 1 ? (
          <button className="btn" onClick={() => prevPage(1)}>
            <span>&#8249;</span>
          </button>
        ) : <div className="btn-container"></div>}

        <div className="current-page">
          <span>Page {currentPage}</span>
        </div>

        {page < totalPages ? (
          <button className="btn" onClick={() => nextPage(1)}>
            <span>&#8250;</span>
          </button>
        ) : <div className="btn-container"></div>}
      </div>
    </div>
  )
}

export default ListUsers
