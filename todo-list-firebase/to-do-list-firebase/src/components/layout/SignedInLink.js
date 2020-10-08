import React from 'react';
import { NavLink} from 'react-router-dom';

const SignedInLink = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>New Todo</NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li> 
            <li><NavLink to='/' className='btn btn-floating green lighten-1'>BT</NavLink></li>
        </ul>
    );
}

export default SignedInLink;