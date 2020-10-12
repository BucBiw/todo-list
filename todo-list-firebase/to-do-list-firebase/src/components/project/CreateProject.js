import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'react-materialize';
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import firebase from 'firebase'


import { createProject } from '../../store/actions/projectAction'

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

class CreateProject extends Component {
    state = {
        title: '',
        date: moment(Date()).format("Do MMM YYYY")
    }

    handleChange = (e) => {
        if(e.target.id === 'date'){
            this.setState({
                [e.target.id]: moment(e.target.value).format("Do MMM YYYY")
            })
        }else{
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Todo</h5>
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

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)