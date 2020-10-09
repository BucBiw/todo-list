import React from 'react';
import {Link} from 'react-router-dom'

import ProjectItem from './ProjectItem';

const ProjectList = ({ projects }) => {
    return (
        <div className="project-list section">
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"><h4>To Do List</h4></span>
                    <div className="collection">
                        { projects && projects.map(project => {
                            return (
                                <Link to={'/project/' + project.id} key={project.id}>
                                    <ProjectItem project={project} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectList;