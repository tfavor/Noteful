import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import Note from '../note/note';
import './NotePageMain.css'

export default class NotePageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const {noteId} = this.props.match.params;
        const { notes=[] } = this.context;
        const note = notes.find(note => note.id === noteId);
        return (
            <div className='NotePageMain'>
                <h3>{note.name}</h3>
                <div className='notePageContent'>{note.content}</div>
            </div>
        )
    }
}

