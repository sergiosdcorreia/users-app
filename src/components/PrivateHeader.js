import React from 'react'
import { withRouter } from "react-router-dom"
import { logout } from "../auth/Index"

import './PrivateHeader.css'

const PrivateHeader = ({ history }) => {
  return (
    <div className="header">
      <h1>Users App</h1>
      <div>
        <a className="create-user" href="/create-user">
            Create user
        </a>
        <a className="logout" onClick={() => logout(() => history.push("/login"))}>
            Log Out
        </a>
      </div>
    </div>
  )
}

export default withRouter(PrivateHeader)
