import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import './note.css'


export default class Note extends Component {
    static contextType = ApiContext;
    render() {
        return (
            <div className='note'>
                <Link
                to={`/note/${this.props.id}`}>
                <h3>{this.props.name}</h3>
                <p>{this.props.modified}</p>
                </Link>
            </div>
        )
    }
}