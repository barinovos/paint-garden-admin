// for pure call to Auth without headers attached
import axios from 'axios'
import Constants from '../constants'

// cookie name for our App
const cookieName = 'paint_garden_token'
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

export const authenticate = (apiUrl, credentials) =>
  axios.post(`${apiUrl}${Constants.API.LOGIN}`, credentials).then(({ data }) => setCookie(data.data.token))

export const navigateToLogin = () => {
  deleteCookie()
  window.location.href = `${window.location.origin}${Constants.ROUTES.LOGIN}`
}