import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch } from 'react-router-dom'
import Constants from '../constants'
import Toolbar from '../Toolbar'
import Canvas from '../Canvas'
import Sections from '../Sections'
import LoginPage from '../LoginPage'
import { authCheck } from './actions'
import { MainArea } from '../Common/Styled'
import { Logo, LoaderView } from './Styled'
import logo from '../assets/logo.svg'
const { ROUTES } = Constants

const Main = ({ auth, authCheck }) => {
  // check for Auth, only once
  const needAuthCheck = !auth.isAuthenticated && ROUTES.LOGIN !== window.location.pathname
  useEffect(() => {
    if (needAuthCheck) authCheck()
  })

  if (needAuthCheck)
    return (
      <LoaderView>
        <Logo src={logo} />
      </LoaderView>
    )

  return (
    <Fragment>
      <Toolbar />
      <MainArea>
        <Switch>
          <Route path={ROUTES.ROOT} exact component={Sections} />
          <Route path={ROUTES.CANVAS} component={Canvas} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.NOT_FOUND} render={() => <div>Not found</div>} />
        </Switch>
      </MainArea>
    </Fragment>
  )
}

Main.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
  authCheck: PropTypes.func,
  location: PropTypes.object
}

export default connect(
  ({ auth }) => ({ auth }),
  dispatch => bindActionCreators({ authCheck }, dispatch),
)(Main)
