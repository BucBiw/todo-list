import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from '@apollo/client';


import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home.Component/Home'
import App from './App.Component/App';
import {client} from './Apollo/client';

ReactDOM.render(
    <ApolloProvider client={client}>
      <Home />
      {/* <App /> */}
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
