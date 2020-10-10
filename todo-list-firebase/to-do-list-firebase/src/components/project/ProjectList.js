import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { deleteProject } from '../../store/actions/projectAction';
import moment from 'moment';

import ProjectItem from './ProjectItem';
const ProjectList = (props) => {
    const { projects, user, } = props
    // const today = firebase.firestore.Timestamp.fromDate(new Date());
    const today = new Date();
    return (

        user && <>
        <div className="row">
            <div className="input-field">
                <div className="col s4 m8">
                    <input type="text" />
                </div>
                <div className="col s4 m4">
                    <button className="pink lighten-1 z-depth-0">Search</button>
                </div>
            </div>
        </div>
        <div className="row">
        <div className="project-list section">
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title center"><h4>Today</h4></span>
                    <ul className="collection">
                        {projects && projects.filter((project) => project.authorFirstName === user.firstName && project.date===moment(today).format("Do MMM YYYY")).map(project => {
                            return (
                                <li key={project.id} className="collection-item">
                                    <span className="badge">
                                        <button className="btn-floating btn-small red" onClick={() => props.deleteProjectx(project.id)}>
                                            Del
                                        </button>
                                    </span>
                                    <h6 className="flow-text">{project.title}</h6>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>




    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectx: (id) =>
            dispatch(deleteProject(id)),
    };
}

export default connect(null, mapDispatchToProps)(ProjectList);