import React from 'react';

const ProjectItem = ({ project }) => {
    return (
    <a href="#!" className="collection-item todo-item"><span className="badge"></span>{project.title}</a>
    );
}

export default ProjectItem;