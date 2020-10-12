import React, { useState } from 'react';
import { connect } from 'react-redux';
// import firebase from 'firebase'
import { deleteProject } from '../../store/actions/projectAction';
import moment from 'moment';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import M from "materialize-css";

const ProjectList = (props) => {
    const { projects, user, } = props;

    const [search, setsearch] = useState('');
    const [toggle, settoggle] = useState({
        text: "Now -> Future",
        status: true
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);


    const handleChange = (e) => {
        if (e.target.id === 'searchbox') {
            setsearch(e.target.value)
        }
        console.log("search: ", search);
    }
    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.id === 'toggle') {
            if (toggle.status === true) {
                settoggle({
                    text: "Future -> Now",
                    status: false
                });
            } else {
                settoggle({
                    text: "Now -> Future",
                    status: true
                });
            }
        }
        console.log("search: ", toggle.status);
    }
    return (

        user && <div className="container-fluid">
            <div className="row">
                <div className="input-field">
                    {/* Search Box */}
                    <div className="col s2 m9">
                        <input type="text" id="searchbox" placeholder="Search Todo" onChange={handleChange} />
                    </div>
                    <div className="col s2 m3">
                        <button className="secondary-content btn btn-large blue" id="toggle" onClick={handleClick}>
                            {toggle.text}
                        </button>
                    </div>
                </div>

            </div>
            {/* To Do List */}
            <div className="row">
                {toggle.status &&
                    <>
                    {/* Today */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Today</h4></li>
                                    {projects && projects.filter(
                                        (project) => project.authorFirstName === user.firstName &&
                                            project.date === moment(today).format("Do MMM YYYY") &&
                                            (
                                                project.title.startsWith(search) ||
                                                project.title.toLowerCase().startsWith(search) ||
                                                project.title.toUpperCase().startsWith(search)
                                            ))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>                                             </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                        {/* Tomorrow */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Tomorrow</h4></li>
                                    {projects && projects.filter((project) => project.authorFirstName === user.firstName &&
                                        project.date === moment(tomorrow).format("Do MMM YYYY") &&
                                        (
                                            project.title.startsWith(search) ||
                                            project.title.toLowerCase().startsWith(search) ||
                                            project.title.toUpperCase().startsWith(search)
                                        ))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                        {/* Upcoming */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Upcoming</h4></li>
                                    {projects && projects.filter((project) => project.authorFirstName === user.firstName &&
                                        project.date > moment(tomorrow).format("Do MMM YYYY") &&
                                        (
                                            project.title.startsWith(search) ||
                                            project.title.toLowerCase().startsWith(search) ||
                                            project.title.toUpperCase().startsWith(search)
                                        ))
                                        .sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </>
                }
                {
                    !toggle.status && <>
                        {/* Upcoming */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Upcoming</h4></li>
                                    {projects && projects.filter((project) => project.authorFirstName === user.firstName &&
                                        project.date > moment(tomorrow).format("Do MMM YYYY") &&
                                        (
                                            project.title.startsWith(search) ||
                                            project.title.toLowerCase().startsWith(search) ||
                                            project.title.toUpperCase().startsWith(search)
                                        ))
                                        .sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                        {/* Tomorrow */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Tomorrow</h4></li>
                                    {projects && projects.filter((project) => project.authorFirstName === user.firstName &&
                                        project.date === moment(tomorrow).format("Do MMM YYYY") &&
                                        (
                                            project.title.startsWith(search) ||
                                            project.title.toLowerCase().startsWith(search) ||
                                            project.title.toUpperCase().startsWith(search)
                                        ))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                        {/* Today */}
                        <div className="project-list section">
                            <div className="card z-depth-0 project-summary">
                                <ul className="collection with-header">
                                    <li className="collection-header center"><h4>Today</h4></li>
                                    {projects && projects.filter(
                                        (project) => project.authorFirstName === user.firstName &&
                                            project.date === moment(today).format("Do MMM YYYY") &&
                                            (
                                                project.title.startsWith(search) ||
                                                project.title.toLowerCase().startsWith(search) ||
                                                project.title.toUpperCase().startsWith(search)
                                            ))
                                        .map(project => {
                                            return (
                                                <li key={project.id} className="collection-item" id="project-item">
                                                    <span className="badge">
                                                        <button className="secondary-content btn btn-large red" onClick={() => props.deleteProjectx(project.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </span>
                                                    <h6 className="flow-text">{project.title}</h6>
                                                    <h6 className="grey-text lighten-2">{project.date}</h6>                                             </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>




    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectx: (id) =>
            dispatch(deleteProject(id)),
    };
}

export default connect(null, mapDispatchToProps)(ProjectList);