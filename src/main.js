'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// Reset and optimize default browser styles
import './styles/sanitize.css';
// Application root component
import App from './app/App';

ReactDOM.render(<App />, document.getElementById('app-root'));
