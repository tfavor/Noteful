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
            name: '',
            touched: false
        }
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

    updateName(name) {
        this.setState({ name: name, touched: true });
      }

    validateName() {
    const name = this.state.name;
    if (name === '') {
      return 'Name is required'
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
                   <input type='text' id='new-folder-name' name='name' onChange={e => this.updateName(e.target.value)}/>
                   { this.state.touched && <VerifyFolder message={this.validateName()}/>}
                </label>
                <button type='submit' disabled={this.validateName()}>Add</button>
                </fieldset>
            </form>
        )
    }
}