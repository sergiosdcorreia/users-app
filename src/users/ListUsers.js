import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import AdCard from './AdCard'
import Pagination from './Pagination'
import PrivateHeader from '../components/PrivateHeader'

import './ListUsers.css'

const ListUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [support, setSupport] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState()

  const { url, text } = support

  useEffect(() => {
    loadUsers(page)
  }, [page])

  const loadUsers = async (page) => {
    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setUsers(response.data))

    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((response) => setSupport(response.support))

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
    <>
      <PrivateHeader />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
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
          </div>
          <AdCard url={url} text={text} />
          <Pagination
            page={page}
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={() => prevPage(1)}
            nextPage={() => nextPage(1)}
          />
        </>
      )}
    </>
  )
}

export default ListUsers
