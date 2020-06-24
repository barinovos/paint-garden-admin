import React, { useState } from 'react'

import { Wrapper, RegisterInput, Logo, Title, ButtonText, PrivacyPolicyText, LinkText, RegisterText } from './Styled'
import { LoginButton, ErrorMessage } from '../Common/Styled'

import { Link } from 'react-router-dom'
import { register } from '../utils/auth'
import api from '../utils/api'
import logo from '../assets/logo.svg'
import Constants from '../constants'

const { ROUTES } = Constants
const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  // if (getAuthToken()) return history.push('/')

  const setErrorText = ({ name, email, password }) => {
    if (!email) {
      return setError({ email: true, message: 'Please, fill in the email' })
    }

    if (!password) {
      setError({ password: true, message: 'Please, fill in the password' })
    }

    if (!name) {
      setError({ name: false, message: 'Please, fill in the name' })
    }

    if (!password && !email) {
      return setError({ email: true, password: true, message: 'Please, fill in the email and password' })
    }

    if (!name && !email) {
      return setError({ email: true, name: true, message: 'Please, fill in the name and email' })
    }

    if (!name && !password) {
      return setError({ password: true, name: true, message: 'Please, fill in the name and password' })
    }

    if (!name && !password && !email) {
      return setError({
        password: true,
        name: true,
        email: true,
        message: 'Please, fill in the name and password and email',
      })
    }
  }

  const onRegister = () => {
    if (credentials.email && credentials.name && credentials.password) {
      return register(api.apiUrl, credentials)
        .then(() => history.push(Constants.ROUTES.ROOT))
        .catch(er => {
          setError({
            message: 'Oops something went wrong, check your data and send again.',
          })
        })
    }
    setErrorText(credentials)
  }

  const onChange = (value, prop) => {
    setCredentials({ ...credentials, [prop]: value })
    if (error) setError(null)
  }

  const onKeyUp = ev => ev.keyCode === 13 && onRegister()

  return (
    <Wrapper onSubmit={onRegister}>
      <Logo src={logo} alt={'Logo'} />
      <Title>Register</Title>
      <RegisterInput
        error={error && error.name}
        value={credentials.name}
        placeholder="Name"
        onChange={ev => onChange(ev.target.value, 'name')}
        onKeyUp={onKeyUp}
      />
      <RegisterInput
        error={error && error.email}
        value={credentials.email}
        placeholder="Email"
        onChange={ev => onChange(ev.target.value, 'email')}
        onKeyUp={onKeyUp}
      />
      <RegisterInput
        error={error && error.password}
        type="password"
        value={credentials.password}
        placeholder="Password"
        onChange={ev => onChange(ev.target.value, 'password')}
        onKeyUp={onKeyUp}
      />
      <LoginButton type="submit" onClick={onRegister}>
        <ButtonText>Register</ButtonText>
      </LoginButton>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <PrivacyPolicyText>
        By clicking here you agree to thee terms of our{' '}
        <Link to={ROUTES.POLICY}>
          <LinkText>Privacy policy</LinkText>
        </Link>
      </PrivacyPolicyText>
      <RegisterText>
        Allready have an account?{' '}
        <Link to={ROUTES.LOGIN}>
          <LinkText>Log in</LinkText>
        </Link>
      </RegisterText>
    </Wrapper>
  )
}

export default RegisterPage
