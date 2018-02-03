import React from 'react';

import oops from 'assets/oops.gif';
import './NotFound.less';

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound-Container">
        <img src={oops} />
      </div>
    );
  }
}

export default NotFound;
