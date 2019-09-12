import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import './NoteListNav.css'

export default class NoteListNav extends Component {
    static contextType = ApiContext;
    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='noteListNav'>
                <ul className='noteListNav-list'>
                    {folders.map(folder => 
                        <li
                        key={folder.id}>
                            <NavLink 
                            to={`/folder/${folder.id}`}>
                                <h3>{folder.name}</h3>
                            </NavLink>    
                        </li>
                    )}
                </ul>
                <Link 
                to='/add-folder'>
                <button>Add Folder</button>
                </Link>
            </div>
        )
    }    
}