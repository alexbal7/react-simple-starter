import React from 'react';
import logo from '../assets/logo.svg';
import './App.less';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Starter</h1>
        </header>
        <p className="App-intro">
          Starter is ready!
        </p>
      </div>
    );
  }
}

export default App;
