import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Wrapper, LinksArea } from './Styled'
import { LinkText } from '../Common/Styled'
import Constants from '../constants'
import api from '../utils/api'

const { ROUTES } = Constants


const Toolbar = ({ location }) => {
  let history = useHistory();
  const logoutHandler = () => {
    api.post(`${Constants.API.LOGOUT}`).then(
      () => {
        history.replace(Constants.ROUTES.LOGIN);
      }
    );
  };

  return (
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
          <LinkText onClick = {logoutHandler}>Log out</LinkText>
        </LinksArea>
      </Wrapper>
    ) : null
  )
}
Toolbar.propTypes = {
  location: PropTypes.object,
}

export default withRouter(Toolbar)
