import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios';

import App from '../App.Component/App';


function Home() {
    const signUserIn = async (response) => {
        console.log('Res---->', response);
        const { name, email, accessToken, userID } = response
        const user = { name, email, accessToken, userID: userID }

        await Axios({
            method: 'post',
            url: 'http://localhost:4000/signin/facebook',
            data: {
                user,
            }
        });
    }

    return (
        <div className='Home'>
            <div>
                <FacebookLogin
                    appId='2107368362741206'
                    fields='name, email'
                    scope='public_profile, email'
                    callback={signUserIn} 
                />
            </div>
        </div>
    );
}

export default Home;