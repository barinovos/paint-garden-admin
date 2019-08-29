import React, { useState } from 'react'

import { Wrapper, LoginInput, Logo, Title, ErrorMessage } from './Styled'
import { Button } from '../Common/Styled'

import { authenticate } from '../utils/auth'
import api from '../utils/api'
import logo from '../assets/logo.svg'
import Constants from '../constants'

const LoginPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  })
  const [error, setError] = useState(null)
  // if (getAuthToken()) return history.push('/')

  const setErrorText = ({ login, password }) => {
    if (!login) {
      if (!password) {
        return setError({ login: true, password: true, message: 'Please, fill in the username and password' })
      }
      return setError({ login: true, message: 'Please, fill in the username' })
    }
    setError({ password: true, message: 'Please, fill in the password' })
  }

  const onLogin = () => {
    if (credentials.login && credentials.password) {
      return authenticate(api.apiUrl, credentials)
        .then(() => history.push(Constants.ROUTES.ROOT))
        .catch(() =>
          setError({
            message: 'Sorry, unknown username/password combination',
          }),
        )
    }
    setErrorText(credentials)
  }

  const onChange = (value, prop) => {
    setCredentials({ ...credentials, [prop]: value })
    if (error) setError(null)
  }

  return (
    <Wrapper>
      <Logo src={logo} alt={'Logo'} />
      <Title>Welcome to Paint.Garden</Title>
      <LoginInput
        error={error && error.login}
        value={credentials.login}
        placeholder="Username / email"
        onChange={ev => onChange(ev.target.value, 'login')}
      />
      <LoginInput
        error={error && error.password}
        type="password"
        value={credentials.password}
        placeholder="Password"
        onChange={ev => onChange(ev.target.value, 'password')}
      />
      <Button onClick={onLogin}>Log In</Button>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Wrapper>
  )
}

export default LoginPage
