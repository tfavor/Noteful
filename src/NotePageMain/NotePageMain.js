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
        const idForNote = parseInt(noteId, 10)
        const { notes=[], folders=[] } = this.context;
        const note = notes.find(note => note.id === idForNote);
        const folder = folders.find(folder => folder.id === note.folder_id)
        return (
            <div className='NotePageMain'>
                <h3>{folder.title} > {note.title}</h3>
                <Link
                className="edit-link"
                to={{
                    pathname: `/note/${note.id}/edit-note`,
                    state: {
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        folder_id: note.folder_id,
                        folderTitle: folder.title,
                    }
                    }}>
                <button>edit note</button>
                </Link>
                <div className='notePageContent'>{note.content}</div>
            </div>
        )
    }
}

