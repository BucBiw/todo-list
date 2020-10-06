import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home.Component/Home'
import App from './App.Component/App';
import {client} from './Apollo/client';
import Switch from 'react-bootstrap/esm/Switch';

ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home}>
          </Route>
          <Route path="/app" component={App}>
            
          </Route>
        </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
