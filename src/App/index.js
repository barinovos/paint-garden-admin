import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../utils/configureStore'
import api from '../utils/api'
import Main from '../Main'

api.setupInterceptors(store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    )
  }
}

export default App
