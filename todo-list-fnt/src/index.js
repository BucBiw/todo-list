import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import Switch from 'react-bootstrap/esm/Switch';
import { CookiesProvider } from 'react-cookie';


import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home.Component/Home'
import App from './App.Component/App';
import {allReducers} from './Context/reducer';

const store = createStore(allReducers);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <Switch>
          <Route path="/" component={Home}>
          </Route>
          <Route path="/app" component={App}>
          </Route>
        </Switch>
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
