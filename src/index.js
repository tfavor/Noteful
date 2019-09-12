import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundry from './ErrorBoundry'

ReactDOM.render(
    <ErrorBoundry>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ErrorBoundry>,
    document.getElementById('root')
  )


