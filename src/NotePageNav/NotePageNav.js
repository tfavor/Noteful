import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import Note from '../note/note';
import './NotePageNav.css'

export default class NotePageNav extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }    
    static contextType = ApiContext;
    render() {
        const { notes, folders } = this.context;
        const {noteId} = this.props.match.params;
        const idFotNote = parseInt(noteId, 10)
        const note = notes.find(note => note.id === idFotNote) || {};
        const folder = folders.find(folder => folder.id === note.folder_id);
        return (
            <div className="NotePageNav">
                {folder && (<h2>{folder.title}</h2>)}
                <button onClick={this.props.history.goBack}>go back</button>
            </div>
        )
    }
}
