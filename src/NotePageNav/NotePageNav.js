import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import Note from '../note/note';

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
        const note = notes.find(note => note.id === noteId) || {};
        const folder = folders.find(folder => folder.id === note.folderId);
        return (
            <div className="NotePageNav">
                {folder && (<h2>{folder.name}</h2>)}
                <button onClick={this.props.history.goBack}>go back</button>
            </div>
        )
    }
}
