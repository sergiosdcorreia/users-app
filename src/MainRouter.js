import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Signup from './login/Signup'
import Login from './login/Login'
import ListUsers from "./users/ListUsers"
import CreateUser from "./users/CreateUser"
import PrivateRoutes from "./auth/PrivateRoutes"

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoutes exact path="/users" component={ListUsers} />
        <PrivateRoutes exact path="/create-user" component={CreateUser} />
      </Switch>
    </div>
  )
}

export default MainRouter
