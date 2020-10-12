import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';

const Navbar = (props) => {
    const { auth, profile } = props
    // console.log("auth: ", auth);
    const links = auth.uid ? <SignedInLink profile={profile} /> : <SignedOutLink />;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Todo List</Link>
                {links}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);