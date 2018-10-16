import 'polyfills';
import 'vendor';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'

// Reset and optimize default browser styles
import './styles/sanitize.css';

// Application root component
import App from './app/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    document.getElementById('app-root')
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./app/App', () => { render(App) });
}
