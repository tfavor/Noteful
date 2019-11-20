import React, { Component } from 'react';
import config from '../config';
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext';
import Note from '../note/note';
import './updateNote.css'

export default class UpdateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            title: this.props.location.state.title,
            content: this.props.location.state.content,
            folder_id: this.props.location.state.folder_id,
            folderTitle: this.props.location.state.folderTitle,
        }
      }
    static defaultProps = {
        match: {
          params: {}
        },
        history: {
            goBack: () => {}
        }
      }

 

    static contextType = ApiContext;


    handleNoteUpdate = (e) => {
        e.preventDefault()
        const {noteId} = this.props.match.params;
        let newNote = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            folder_id: this.state.folder_id
        }
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
          })
          .then(data => {
            
            this.context.updateNote(newNote);
            this.props.history.goBack()
            })
        .catch(err => {
        this.setState({
            error: err.message
        });
        });
    }


  
    handleTitleChange(title) {
        this.setState({
            title: title
        })
    }
    handleContentChange(content) {
        this.setState({
            content: content
        })
    }
    renderOptions() {
        return this.context.folders.map(folder => (
            <option
            key={folder.id}>
            {folder.title}
            </option>
        ));
    }

    render() {
        const {noteId} = this.props.match.params;
        const idForNote = parseInt(noteId, 10);
        const { notes=[] } = this.context;
        const note = notes.find(note => note.id === idForNote);
        return (
           <form className='update-note-form' onSubmit={this.handleNoteUpdate}>
               <legend>update note</legend>
               <div className="title-folder">
               <label >
                   <span>title</span>
                   <input id="title" value={this.state.title} onChange={e => this.handleTitleChange(e.target.value)}/>
               </label>
               <label >
                    <span className='new-folder'>folder </span>
                    <select id='new-folderTitle' defaultValue={this.state.folderTitle}>
                        {this.renderOptions()}
                    </select>
                </label>
                </div>
                <label >
                   <span>content</span>
                   <textarea id="content" value={this.state.content} onChange={e => this.handleContentChange(e.target.value)}/>
               </label>
               <button type="submit">save</button>
           </form>
        )
    }
}
