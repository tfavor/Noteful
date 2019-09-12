import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import Note from '../note/note';
import './NoteListMain.css'

export default class NoteListMain extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = ApiContext;
    
    render() {
        const {folderId} = this.props.match.params;
        const { notes=[] } = this.context;
        const notesForFolder = (!folderId) ? notes : notes.filter(note => note.folderId === folderId);
        return (
            <div className="NoteListMain">
               <ul>
                    {notesForFolder.map(note =>
                    <li key={note.id}>
                      <Note 
                      id={note.id}
                      name={note.name}
                      modified={note.modified}/>
                    </li>
                    )}
                </ul>
                <Link
                to='/add-note'>
                <button>Add Note</button>
                </Link>
            </div>
        )
    }
}
