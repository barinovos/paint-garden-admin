import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Constants from '../constants'
import Toolbar from '../Toolbar'
import Canvas from '../Canvas'
import Projects from '../Projects'
import LoginPage from '../LoginPage'
import Modal from '../Modal'
import { getUserInfo, logout } from './actions'
import { MainArea } from '../Common/Styled'
import { Logo, LoaderView } from './Styled'

import logo from '../assets/logo.svg'

const { ROUTES } = Constants

const Main = ({ user, getUserInfo, history, logout }) => {
  // check for Auth, only once
  const needAuthCheck = !user && ROUTES.LOGIN !== history.location.pathname
  useEffect(() => {
    if (needAuthCheck) getUserInfo()
  })

  if (needAuthCheck)
    return (
      <LoaderView>
        <Logo src={logo} />
      </LoaderView>
    )

  return (
    <Fragment>
      <Route exact={true} path={[ROUTES.ROOT, ROUTES.PROJECTS]} component={Toolbar} />
      <MainArea>
        <Switch>
          <Route path={ROUTES.ROOT} exact component={Projects} />
          <Route path={ROUTES.PROJECTS} exact component={Projects} />
          <Route path={ROUTES.CANVAS + '/:canvasId'} component={Canvas} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route render={() => <div>Not found</div>} />
        </Switch>
      </MainArea>
      <Modal />
    </Fragment>
  )
}

Main.propTypes = {
  user: PropTypes.object,
  authCheck: PropTypes.func,
  history: PropTypes.object,
}

export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({ getUserInfo, logout }, dispatch),
)(withRouter(Main))
