import React from 'react'

function ProjectDetail(props) {
    const id = props.match.params.id;
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"><h2>ไปทะเล</h2></span>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>ลิสต์ใจเกเร ลำดับที่ {id}</div>
                    <div>03/12/2563 08:30</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
