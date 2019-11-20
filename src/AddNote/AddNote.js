import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './AddNote.css'
import config from '../config';
import ApiContext from '../ApiContext';
import VerifyFolder from '../verifyFolder/VerifyFolder'
/*import { getDefaultWatermarks } from 'istanbul-lib-report';
import { getEnabledCategories } from 'trace_events';*/

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            touched: false,
        }
      }
      static contextType = ApiContext;

    handleNoteSubmit = (e) => {
        e.preventDefault()
        let target = e.target['folderTitle'].value;
        let folderForNote = this.context.folders.find(folder => folder.title === target)
        let folder_id = folderForNote.id
        const note = {
            id: Math.random(),
            folder_id: folder_id,
            title: this.state.title,
            content: e.target['content']. value,
        }
       this.submitNewNote(note)
    }

    submitNewNote(note) {
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(note),
          })
          .then(data => {
            this.props.history.push('/')
            this.context.addNote(note);
            })
        .catch(err => {
        this.setState({
            error: err.message
        });
        });
    }

    renderOptions() {
        return this.context.folders.map(folder => (
            <option
            key={folder.id}>
            {folder.title}
            </option>
        ));
    }

    updateTitle(title) {
        this.setState({ title: title, touched: true });
      }

      updateContent(content) {
        this.setState({ content: content });
      }

    validateTitle() {
    const title = this.state.title;
    if (title === '') {
      return 'Title is required'
    }
}


    render() {
        return (
            <form className='add-note-form' onSubmit={this.handleNoteSubmit}>
                <legend>New Note</legend>
                <div className="title-folder">
                <label>
                    <span className='ntitle'>title: </span>
                    <input type='text' id='title' onChange={e => this.updateTitle(e.target.value)}/>
                    { this.state.touched && <VerifyFolder message={this.validateTitle()}/>}
                </label>
                <label >
                    <span className='folder'>folder: </span>
                    <select id='folderTitle'>
                        {this.renderOptions()}
                    </select>
                </label>
                </div>
                <label >
                    <span className='content'>content: </span>
                    <textarea type='text' id='content'></textarea>
                </label>
                <button type='submit' disabled={this.validateTitle()}>Add</button>
                
            </form>
        )
    }
}
