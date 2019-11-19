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
        const idForFolder = parseInt(folderId, 10)
        const { notes=[], folders=[] } = this.context;
        const notesForFolder = (!idForFolder) ? notes : notes.filter(note => note.folder_id === idForFolder);
        const folder = folders.find(folder => folder.id === idForFolder)
        return (
            <div className="NoteListMain">
              {folder === undefined ? <h2>all notes</h2> : <h2>{folder.title} > notes</h2>}
               <ul>
                    {notesForFolder.map(note =>
                    <li key={note.id}>
                      <Note 
                      className="link"
                      id={note.id}
                      name={note.title}
                      />
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
