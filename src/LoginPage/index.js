import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthToken, tokenName, navigateToSSO } from '../utils/auth'
import Constants from '../constants'
import { getUserInfo } from '../Main/actions'

const LoginPage = ({ history, location, getUserInfo }) => {
  useEffect(() => {
    try {
      const token = location.search.split(`${tokenName}=`)[1]
      if (token) {
        setAuthToken(token)
        // redirect to the root after user data fetched
        getUserInfo(() => history.push(Constants.ROUTES.ROOT))
      } else {
        navigateToSSO()
      }
    } catch (e) {
      navigateToSSO()
    }
  }, [history, location.search, getUserInfo])

  return (
    <h2>
      <i>Redirecting to main page... this should be fast...</i>
    </h2>
  )
}

export default connect(
  null,
  dispatch => bindActionCreators({ getUserInfo }, dispatch),
)(LoginPage)
