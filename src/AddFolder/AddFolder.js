import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './AddFolder.css';
import config from '../config';
import ApiContext from '../ApiContext';
import Error from '../ErrorBoundry';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
      }

    static contextType = ApiContext;


handleFolderSubmit = (e) => {
        e.preventDefault()
        const folder = {
            id: Math.random().toString(),
            name: e.target['name'].value,
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
          })
    .then(data => {
      console.log(data);
      this.context.addFolder(folder);
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
}

    render() {
        return (
            <form className='add-folder-form' onSubmit={this.handleFolderSubmit}>
                <legend>New Forlder</legend>
                <fieldset>
                <label for='new-folder-name'>
                    <span className=''>name: </span>
                   <input type='text' id='new-folder-name' name='name'/>
                </label>
                <button type='submit'>Add</button>
                </fieldset>
            </form>
        )
    }
}