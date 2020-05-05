import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Wrapper, LinksArea } from './Styled'
import { LinkText } from '../Common/Styled'
import Constants from '../constants'

const { ROUTES } = Constants

const Toolbar = ({ location }) =>
  ROUTES.LOGIN !== location.pathname ? (
    <Wrapper>
      <LinksArea>
        <Link to={ROUTES.ROOT}>
          <LinkText bold>Paint.garden</LinkText>
        </Link>
        <Link to={ROUTES.ROOT}>
          <LinkText active={ROUTES.ROOT === location.pathname}>Projects</LinkText>
        </Link>
      </LinksArea>
      <LinksArea>
        <LinkText>Log out</LinkText>
      </LinksArea>
    </Wrapper>
  ) : null

Toolbar.propTypes = {
  location: PropTypes.object,
}

export default withRouter(Toolbar)
