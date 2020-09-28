import React from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router } from "react-router-dom";

// import jss from 'jss';
// import preset from 'jss-preset-default';
// import color from 'color';

import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <title>todo List</title>
                <h1>todo-List (Home)</h1>
            </header>

            <Button variant="primary">Log In</Button>
            <Button variant="light">Sign Up</Button>
            <Link to="/App">
                <Button variant="success">Go to App</Button>
            </Link>
        </div>
    );
}

export default Home;