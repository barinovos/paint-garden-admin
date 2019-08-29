import React from 'react'
import { Provider } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { BrowserRouter as Router } from 'react-router-dom'

import store from '../utils/configureStore'
import api from '../utils/api'
import Main from '../Main'

api.setupInterceptors(store)

class App extends React.Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router>
            <Main />
          </Router>
        </Provider>
      </DragDropContextProvider>
    )
  }
}

export default App
