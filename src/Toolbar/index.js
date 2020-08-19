import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Wrapper, LinksArea } from './Styled'
import { LinkText } from '../Common/Styled'
import Constants from '../constants'

const { ROUTES } = Constants

const Toolbar = ({ onLogout }) => (
  <Wrapper>
    <LinksArea>
      <Link to={ROUTES.ROOT}>
        <LinkText bold>Paint.garden</LinkText>
      </Link>
    </LinksArea>
    <LinksArea>
      <LinkText onClick={onLogout}>Log out</LinkText>
    </LinksArea>
  </Wrapper>
)

Toolbar.propTypes = {
  onLogout: PropTypes.func,
}

export default Toolbar
