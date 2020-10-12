import React from 'react';
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions'

const SignedInLink = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/create'><b>New Todo</b></NavLink></li>
            <li><a onClick={props.signOut}><b>Log Out</b></a></li> 
            <li><NavLink to='/' className='btn btn-floating green lighten-1'>
                {props.profile.initials}
            </NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(SignedInLink);