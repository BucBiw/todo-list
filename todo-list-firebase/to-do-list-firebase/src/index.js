import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { isLoaded  } from 'react-redux-firebase';
import { Provider, useSelector } from 'react-redux';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer'
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), // redux binding for firebase
      reduxFirestore(firebase, fbConfig) // redux bindings for firestore
    )
  );

  const profileSpecificProps = {
    userProfile: 'users', // where profiles are stored in database,
    useFirestoreForProfile: true,
    enableRedirectHandling: false,
    resetBeforeLogin: false
  }

  const rrfProps = {
    firebase,
    config: profileSpecificProps,
    dispatch: store.dispatch,
    createFirestoreInstance
  };

  const AuthIsLoaded = ({children}) => {
      const auth = useSelector(state => state.firebase.auth)
      if(!isLoaded(auth))
        return <div>Loading Screen...</div>;

    return children;

  }

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();