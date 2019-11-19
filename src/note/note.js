import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import config from '../config';
import './note.css'


export default class Note extends Component {

    static contextType = ApiContext;
    
    handleDeleteNote = (e) => {
        const id = this.props.id
        console.log('delete' + this.props.id)
        fetch(`${config.API_ENDPOINT}/notes/${id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
    .then(data => {
        this.context.deleteNote(id)
        this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
    }

    render() {
        return (
            <div className='note'>
                <Link
                className="note-link"
                to={`/note/${this.props.id}`}>
                <h3>{this.props.name}</h3>
                <p>{this.props.modified}</p>
                </Link>
                <button className="note-delete" onClick={this.handleDeleteNote}>
                <i className="fa fa-trash"></i>
                </button>
            </div>
        )
    }
}