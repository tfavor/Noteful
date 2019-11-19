import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './AddFolder.css';
import config from '../config';
import ApiContext from '../ApiContext';
import Error from '../ErrorBoundry';
import VerifyFolder from '../verifyFolder/VerifyFolder'

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            touched: false
        }
      }

    static contextType = ApiContext;


    handleFolderSubmit = (e) => {
      console.log(this.state.title)
        e.preventDefault()
        const folder = {
            title: this.state.title/*e.target['title'].value,*/
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
      this.context.addFolder(data);
      this.props.history.push('/')
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
    }

    updateTitle(title) {
        this.setState({ title: title, touched: true });
      }

    validateTitle() {
    const title = this.state.title;
    if (title === '') {
      return 'Title is required'
    }
}

    render() {
        console.log(this.state);
            return (
            <form className='add-folder-form' onSubmit={e => this.handleFolderSubmit(e)}>
                <legend>New Forlder</legend>
                <fieldset>
                <label for='new-folder-name'>
                    <span className=''>name: </span>
                   <input type='text' id='new-folder-title' name='title' onChange={e => this.updateTitle(e.target.value)}/>
                   { this.state.touched && <VerifyFolder message={this.validateTitle()}/>}
                </label>
                <button type='submit' disabled={this.validateTitle()}>Add</button>
                </fieldset>
            </form>
        )
    }
}