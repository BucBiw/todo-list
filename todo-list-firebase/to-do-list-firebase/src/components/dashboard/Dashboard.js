import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ProjectList from '../project/ProjectList'
import { auth } from 'firebase';

class Dashboard extends Component {
    render() {
        console.log(this.props.user);
        const { projects, auth, user } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12">
                        <ProjectList projects={projects} user={user} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("DB", state);
    const id = state.firebase.auth.uid;
    const users = state.firestore.data.users;
    const user = users ? users[id] : null;
    return {
        projects: state.firestore.ordered.projects,
        user: user,
        auth: state.firebase.auth
    }
}

export default compose(
    firestoreConnect(() => ['projects', 'users']),
    connect(mapStateToProps)
)(Dashboard)