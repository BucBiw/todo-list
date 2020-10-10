import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject } from '../../store/actions/projectAction';



const ProjectItem = ({project}, onClick) => {
    return (
        <li className="collection-item">
            <span className="badge">
                <button className="btn-floating btn-small red" onClick={onClick}>
                    Del
                </button>

            </span>
            <h6 className="flow-text">{project.title}</h6>
        </li>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default connect(null, mapDispatchToProps)(ProjectItem);