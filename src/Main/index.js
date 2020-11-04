import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import Constants from '../constants'
import Toolbar from '../Toolbar'
import Canvas from '../Canvas'
import Sections from '../Sections'
import Projects from '../Projects'
import LoginPage from '../LoginPage'
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
      <Route
        exact={true}
        path={[ROUTES.ROOT, `${ROUTES.CANVASES}/:project_id`, `${ROUTES.SECTIONS}/:project_id`, ROUTES.PROJECTS]}
        render={() => <Toolbar onLogout={() => logout(history)} />}
      />
      <MainArea>
        <Switch>
          <Route path={ROUTES.ROOT} exact component={Projects} />
          <Route path={`${ROUTES.SECTIONS}/:project_id`} exact component={Sections} />
          <Route path={ROUTES.PROJECTS} exact component={Projects} />
          <Route path={ROUTES.CANVASES + '/:project_id'} component={Projects} />
          <Route path={ROUTES.CANVAS + '/:project_id'} component={Canvas} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route render={() => <div>Not found</div>} />
        </Switch>
      </MainArea>
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
