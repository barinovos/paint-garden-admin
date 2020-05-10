import React, { useState } from 'react'

import { Wrapper, LoginInput, Logo, Title, ErrorMessage, ButtonText, PrivacyPolicyText, LinkText, RegisterText } from './Styled'
import { LoginButton} from '../Common/Styled'

import { Link } from 'react-router-dom'
import { authenticate } from '../utils/auth'
import api from '../utils/api'
import logo from '../assets/logo.svg'
import Constants from '../constants'

const { ROUTES } = Constants
const LoginPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  // if (getAuthToken()) return history.push('/')

  const setErrorText = ({ email, password }) => {
    if (!email) {
      if (!password) {
        return setError({ email: true, password: true, message: 'Please, fill in the username and password' })
      }
      return setError({ email: true, message: 'Please, fill in the username' })
    }
    setError({ password: true, message: 'Please, fill in the password' })
  }

  const onLogin = () => {
    if (credentials.email && credentials.password) {
      return authenticate(api.apiUrl, credentials)
        .then(() => history.push(Constants.ROUTES.ROOT))
        .catch(er => {
          //console.log(er)
          setError({
            message: 'Sorry, unknown username/password combination',
          })
        })
    }
    setErrorText(credentials)
  }

  const onChange = (value, prop) => {
    setCredentials({ ...credentials, [prop]: value })
    if (error) setError(null)
  }

  const onKeyUp = ev => ev.keyCode === 13 && onLogin()

  return (
    <Wrapper onSubmit={onLogin}>
      <Logo src={logo} alt={'Logo'} />
      <Title>Login</Title>
      <LoginInput
        error={error && error.email}
        value={credentials.email}
        placeholder="Username / email"
        onChange={ev => onChange(ev.target.value, 'email')}
        onKeyUp={onKeyUp}
      />
      <LoginInput
        error={error && error.password}
        type="password"
        value={credentials.password}
        placeholder="Password"
        onChange={ev => onChange(ev.target.value, 'password')}
        onKeyUp={onKeyUp}
      />
      <LoginButton type="submit" onClick={onLogin}>
        <ButtonText>Log In</ButtonText>
      </LoginButton>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <PrivacyPolicyText>By clicking here you agree to thee terms of our <Link to={ROUTES.POLICY}><LinkText>Privacy policy</LinkText></Link></PrivacyPolicyText>
      <RegisterText>Don't have an account? <Link to={ROUTES.REGISTER}><LinkText>Register</LinkText></Link></RegisterText>
    </Wrapper>
  )
}

export default LoginPage
