import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Wrapper, LinksArea, HiddenInput } from './Styled';
import { LinkText, Button } from '../Common/Styled';
import Constants from '../constants';
const { ROUTES } = Constants;

const Toolbar = ({ location }) => (
  <Wrapper>
    <LinkText>Anthromes</LinkText>
    <LinksArea>
      <Link to={ROUTES.CANVAS}>
        <LinkText active={ROUTES.CANVAS === location.pathname}>Canvas</LinkText>
      </Link>
      <Link to={ROUTES.ROOT}>
        <LinkText active={ROUTES.ROOT === location.pathname}>All images</LinkText>
      </Link>
      <Button>
        Upload image
        <HiddenInput />
      </Button>
      <LinkText>Log out</LinkText>
    </LinksArea>
  </Wrapper>
);

Toolbar.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Toolbar);
