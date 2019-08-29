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
        <LinkText bold>Paint.garden</LinkText>
        <Link to={ROUTES.ROOT}>
          <LinkText active={ROUTES.ROOT === location.pathname}>All images</LinkText>
        </Link>
      </LinksArea>
      <LinksArea>
        <Link to={ROUTES.CANVAS}>
          <LinkText active={ROUTES.CANVAS === location.pathname}>Canvas</LinkText>
        </Link>
        <LinkText>Log out</LinkText>
      </LinksArea>
    </Wrapper>
  ) : null

Toolbar.propTypes = {
  location: PropTypes.object,
}

export default withRouter(Toolbar)
