// for pure call to Auth without headers attached
import Constants from '../constants'

// cookie name for our App
const cookieName = 'paint_garden_token'
// token query name
export const tokenName = 'access_token'
// to clean the cookie - default date
const defaultTime = 'Thu, 01 Jan 1970 00:00:00 GMT'

const setCookie = token => {
  document.cookie = `${cookieName}=${token}`
}

const deleteCookie = () => {
  document.cookie = `${cookieName}=; expires=${defaultTime}`
}

const getCookieByName = cookieName => {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + cookieName + '=')
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift()
}

export const getAuthToken = () => getCookieByName(cookieName)

export const setAuthToken = token => setCookie(token)

export const navigateToSSO = () => {
  deleteCookie()
  window.location.href = `https://sso.paint.garden/authenticate?redirect_uri=${window.location.origin}${Constants.ROUTES.LOGIN}`
}

export const getLogoutURL = () => 'https://sso.paint.garden/logout'