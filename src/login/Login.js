/** @jsx jsx */
import React, { useState } from 'react'
import { authenticate } from '../auth/Index'
import { Redirect } from 'react-router-dom'
import Header from '../components/Header'
import { css, jsx } from '@emotion/core'

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  const [error, setError] = useState([])
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Redirect to="/users" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCredentials = {
      email,
      password,
    }

    loginUser(userCredentials).then((data) => {
      if (data.error) setError([data.error])
      else
        authenticate(data, () => {
          setRedirect({ redirect: true })
        })
    })
  }

  const loginUser = async (credentials, token) => {
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(credentials),
      })
      return response.json()
    } catch (err) {
      return console.log(err)
    }
  }

  const loginForm = (email, password, error) => {
    return (
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            padding: 0 32px;
            margin: 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
          `}
        >
          <label
            css={css`
              font-family: 'Roboto', sans-serif;
              font-size: 16px;
              letter-spacing: 1.5px;
              color: #eee;
              margin-bottom: 4px;
            `}
          >
            Email
          </label>
          <input
            css={css`
              height: 20px;
            `}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div
          css={css`
            padding: 0 32px;
            margin: 0;
            text-align: left;
            display: flex;
            flex-direction: column;
          `}
        >
          <label
            css={css`
              font-family: 'Roboto', sans-serif;
              font-size: 16px;
              letter-spacing: 1.5px;
              color: #eee;
              margin-bottom: 4px;
            `}
          >
            Password
          </label>
          <input
            css={css`
              height: 20px;
            `}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div
          css={css`
            padding: 0 32px;
            margin: 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            height: 16px;
          `}
        >
          <div
            css={{
              fontFamily: 'Roboto',
              fontSize: '12px',
              letterSpacing: '1.1px',
              color: '#EDE04D',
              textAlign: 'left',
              display: error ? 'block' : 'none',
            }}
          >
            {error}
          </div>
        </div>
        <p
          css={css`
            font-family: 'Roboto', sans-serif;
            font-size: 12px;
            letter-spacing: 1.1px;
            color: #eee;
          `}
        >
          Not registered yet? Please{' '}
          <a
            css={css`
              font-family: 'Roboto', sans-serif;
              font-size: 12px;
              color: #eee;
              margin-bottom: 32px;
            `}
            href="/signup"
          >
            Register
          </a>
        </p>
        <input
          css={css`
            background-color: #2a93ff;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-family: 'Roboto', sans-serif;
            font-size: 15px;
            font-weight: bold;
            padding: 0 23px;
            line-height: 40px;
            letter-spacing: 1.1px;
            height: 100%;
            text-decoration: none;
            border: none;
            border-radius: 20px;
            margin-top: 12px;

            &:focus {
              outline: none;
            }
          `}
          type="submit"
          value="Login"
        />
      </form>
    )
  }

  return (
    <React.Fragment>
      <Header />
      <div
        css={css`
          background: rgba(80, 80, 80, 1);
          background: -moz-linear-gradient(
            top,
            rgba(80, 80, 80, 1) 0%,
            rgba(55, 55, 55, 1) 100%
          );
          background: -webkit-gradient(
            left top,
            left bottom,
            color-stop(0%, rgba(80, 80, 80, 1)),
            color-stop(100%, rgba(55, 55, 55, 1))
          );
          background: -webkit-linear-gradient(
            top,
            rgba(80, 80, 80, 1) 0%,
            rgba(55, 55, 55, 1) 100%
          );
          background: -o-linear-gradient(
            top,
            rgba(80, 80, 80, 1) 0%,
            rgba(55, 55, 55, 1) 100%
          );
          background: -ms-linear-gradient(
            top,
            rgba(80, 80, 80, 1) 0%,
            rgba(55, 55, 55, 1) 100%
          );
          background: linear-gradient(
            to bottom,
            rgba(80, 80, 80, 1) 0%,
            rgba(55, 55, 55, 1) 100%
          );
          box-shadow: 3px 3px 8px #222;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 320px;
          margin: 0 auto;
          margin-top: 80px;

          @media only screen and (max-width: 420px) {
            width: auto;
            padding: 32px 16px;
            margin-left: 16px;
            margin-right: 16px;
          }
        `}
      >
        <h2
          css={css`
            font-family: 'Roboto', sans-serif;
            letter-spacing: 1.5px;
            color: #eee;
            margin: 0;
            margin-bottom: 20px;
          `}
        >
          Login
        </h2>
        {loginForm(email, password, error)}
      </div>
    </React.Fragment>
  )
}

export default Login
