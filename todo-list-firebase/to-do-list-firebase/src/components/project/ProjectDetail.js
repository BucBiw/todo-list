import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment'

function ProjectDetail(props) {
    const { project, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"><h2>{project.title}</h2></span>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>ลิสต์ใจเกเร </div>
                        <div>{moment(project.date).format("Do MMM YYYY")}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container center">
                <p>Loading....</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('map ', state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetail)
