import React from 'react';

import './About.less';

class About extends React.Component {
  render() {
    return (
      <div className="About-Container">
        <h2>About</h2>
        <p>{'I recently started studying React and created this starter only for educational purposes. ' +
        'I think it is the best way to clearify most things for yourself. ' +
        'Also this project is "sandbox" for developers, which could be used in their researches.'}</p>
      </div>
    );
  }
}

export default About;
