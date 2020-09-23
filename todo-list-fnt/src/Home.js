import React from 'react';
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <h1>todo-List (Home)</h1>
            </header>
            <Button variant="primary">Log In</Button>
            <Button variant="light">Sign Up</Button>
        </div>
    );
}

export default Home;