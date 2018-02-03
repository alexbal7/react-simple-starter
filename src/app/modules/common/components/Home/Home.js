import React from 'react';

import './Home.less';

class Home extends React.Component {
  render() {
    return (
      <div className="Home-Container">
        <h2>Welcome!</h2>
        <p>This is a small application with a bunch of routes and modules to begin develop own React application from scratch!</p>
        <p>Feel free to inspect source code, change it and try something new!</p>
        <p>If you have any suggestions about how to improve this starter - contact me!</p>
      </div>
    );
  }
}

export default Home;
