import React from 'react';

import './Info.less';

class Info extends React.Component {
  render() {
    return (
      <div className="Info-Container">
        <h2>Information about starter</h2>
        <p>This starter was developed to introduce simple and fast way how to use React in new and already existing applications.</p>
        <p>There are some overheading constructions that could be realized in simpler way (like Logo spin stopping on interact)
          to just show you how to work and do more complicated things in React.</p>
        <p>Also application structure, that is not the best (e.g. module <b>contact</b> with only <b>contact</b> component),
          is just for demonstrating purposes. My point of view, it is the best way to structure SPA applications.</p>
        <p>This starter includes:</p>
        <ul>
          <li>Webpack bundler with defined development and production builds</li>
          <li>JavaScript code linter (ESLint)</li>
          <li>Babel transpiler with IE8 support and new constructions</li>
          <li>React Router for in-application and bookmarkable navigation</li>
          <li>React Hot Reload for fast development process</li>
          <li>React Loadable for code-splitting and lazy modules</li>
        </ul>
      </div>
    );
  }
}

export default Info;
