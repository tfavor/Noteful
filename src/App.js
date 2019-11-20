import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './App.css';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import config from './config';
import ApiContext from './ApiContext';
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import UpdateNote from './UpdateNote/updateNote'

class App extends Component {
  state = {
    notes: [],
    folders: []
  }


  componentDidMount() {
    this.getAllNotes()
}

  getAllNotes() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
  ])
      .then(([notesRes, foldersRes]) => {
          if (!notesRes.ok)
              return notesRes.json().then(e => Promise.reject(e));
          if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e));

          return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
          this.setState({notes, folders});
      })
      .catch(error => {
          console.error({error});
      });
  }

  renderNavRoutes() {
    return (
      <>
      {['/', '/folder/:folderId'].map(path => (
         <Route 
         exact
         key={path}
         path={path}
         component={NoteListNav}/> 
      ))}
        <Route path='/note/:noteId' component={NotePageNav}/>
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
          exact 
          key={path}
          path={path}
          component={NoteListMain}/>
        ))}
        <Route exact
        path='/note/:noteId'
        component={NotePageMain}/>
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        <Route path="/note/:noteId/edit-note" component={UpdateNote} />
      </>
    )
  } 
  handleAddFolder = folder => {
    this.getAllNotes()
  };
  handleAddNote = (note) => {
    this.getAllNotes()
  }
  handleDeleteNote = (id) => {
    const newNotes = this.state.notes.filter(note => note.id !== id)
    this.setState({
      notes: newNotes
    })
  }
  handleDeleteFolder = (id) =>{
    const newFolders = this.state.folders.filter(folder => folder.id !== id)
    const newNotes = this.state.notes.filter(note => note.folder_id !== id)
    this.setState({
      folders: newFolders,
      notes: newNotes
    })
  }
  handleUpdateNote = (newNote) => {
    this.getAllNotes()
  }
  render() {
    
    const value = {
      getAllNotes: this.getAllNotes,
      notes: this.state.notes,
      folders: this.state.folders,
      deleteFolder: this.handleDeleteFolder,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      updateNote: this.handleUpdateNote,
  };
    return (
      <ApiContext.Provider value={value}>
      <div className="App">
        <header>
          <h1>
            <Link className="header-name" to='/'>Noteful</Link>
          </h1>
        </header>
        <div className='nav-main'>
          <nav>{this.renderNavRoutes()}</nav>
          <main>{this.renderMainRoutes()}</main>
        </div>
      </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
