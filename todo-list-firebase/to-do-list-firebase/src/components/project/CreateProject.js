import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'react-materialize';


import { createProject } from '../../store/actions/projectAction'

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

class CreateProject extends Component {
    state = {
        title: '',
        date: Date()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        //console.log(this.state);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createProject(this.state);
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="White">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <DatePicker
                            label="Date"
                            value={this.state.date}
                            id="date"
                            onChange={(e) => {
                                this.handleChange({
                                    target: {
                                        id: "date",
                                        value: e
                                    }
                                })
                            }}
                        />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(null, mapDispatchToProps)(CreateProject)