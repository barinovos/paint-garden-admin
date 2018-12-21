import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../utils/configureStore';
import Constants from '../constants';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import ImagesList from '../ImagesList';
import { MainArea } from '../Common/Styled';
const { ROUTES } = Constants;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Toolbar />
            <MainArea>
              <Switch>
                <Route path={ROUTES.ROOT} exact component={ImagesList} />
                <Route path={ROUTES.CANVAS} component={Canvas} />
                <Route path={ROUTES.NOT_FOUND} render={() => <div>Not found</div>} />
              </Switch>
            </MainArea>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
