import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import config from '../config';
import './NoteListNav.css'
import 'font-awesome/css/font-awesome.min.css';

export default class NoteListNav extends Component {
    static contextType = ApiContext;

    handleDeleteFolder(id) {
        console.log('delete' + this.props.id)
        fetch(`${config.API_ENDPOINT}/folders/${id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
    .then(data => {
        this.context.deleteFolder(id)
        this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
    }

    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='noteListNav'>
                <h2>folders</h2>
                <ul className='noteListNav-list'>
                    {folders.map(folder => 
                        <li
                        key={folder.id}>
                            <NavLink 
                            className="noteListNav-link"
                            to={`/folder/${folder.id}`}>
                                <h3>{folder.title}</h3>
                            </NavLink>
                            <button className="delete" onClick={() => this.handleDeleteFolder(folder.id)}>
                            <i className="fa fa-trash"></i>
                                </button>    
                        </li>
                    )}
                </ul>
                <Link 
                to='/add-folder'>
                <button className="add-button">Add Folder</button>
                </Link>
            </div>
        )
    }    
}