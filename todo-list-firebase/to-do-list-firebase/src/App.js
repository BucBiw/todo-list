import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetail from './components/project/ProjectDetail'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp'
import CreateProject from './components/project/CreateProject'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetail}/>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/create' component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
