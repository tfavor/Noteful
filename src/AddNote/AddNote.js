import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './AddNote.css'
import config from '../config';
import ApiContext from '../ApiContext';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
      }
      static contextType = ApiContext;

    handleNoteSubmit = (e) => {
        e.preventDefault()
        let target = e.target['folderName'].value;
        let folderForNote = this.context.folders.find(folder => folder.name === target)
        let folderId = folderForNote.id
        const note = {
            folderId: folderId,
            name: e.target['name'].value,
            content: e.target['content']. value,
            id: Math.random().toString(),
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(note),
          })
    .then(data => {
      this.context.addNote(note);
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
}

    renderOptions() {
        return this.context.folders.map(folder => (
            <option>
            {folder.name}
            </option>
        ));
    }


    render() {
        return (
            <form className='add-note-form' onSubmit={this.handleNoteSubmit}>
                <legend>New Note</legend>
                <fieldset>
                <label for='new-note-name'>
                    <span className='name'>name: </span>
                    <input type='text' id='name'></input>
                </label>
                <label for='new-note-Content'>
                    <span className='content'>content: </span>
                    <input type='text' id='content'></input>
                </label>
                <label for='folder-choice'>
                    <span className='folder'>folder: </span>
                    <select id='folderName'>
                        {this.renderOptions()}
                    </select>
                </label>
                <button type='submit'>Add</button>
                </fieldset>
            </form>
        )
    }
}
