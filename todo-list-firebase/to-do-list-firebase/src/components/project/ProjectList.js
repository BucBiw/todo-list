import React from 'react';

import ProjectItem from './ProjectItem';

const ProjectList = () => {
    return (
        <div className="project-list section">
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"><h4>To Do List</h4></span>
                    <div class="collection">
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                        <ProjectItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectList;