import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Wrapper, LinksArea } from './Styled'
import { LinkText } from '../Common/Styled'
import Constants from '../constants'
import api from '../utils/api'

const { ROUTES } = Constants

const Toolbar = ({ location, history }) => {
  const logoutHandler = () => {
    api.post(`${Constants.API.LOGOUT}`).then(() => {
      history.replace(Constants.ROUTES.LOGIN)
    })
  }

  return (
    <Wrapper>
      <LinksArea>
        <Link to={ROUTES.ROOT}>
          <LinkText bold>Paint.garden</LinkText>
        </Link>
        <Link to={ROUTES.ROOT}>
        </Link>
      </LinksArea>
      <LinksArea>
        <LinkText onClick={logoutHandler}>Log out</LinkText>
      </LinksArea>
    </Wrapper>
  )
}
Toolbar.propTypes = {
  location: PropTypes.object,
}

export default withRouter(Toolbar)
