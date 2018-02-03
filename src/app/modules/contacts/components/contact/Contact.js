import React from 'react';

import './Contact.less';

class Contact extends React.Component {
  render() {
    return (
      <div className="Contact-Container">
        <h2>Starter owner</h2>
        <p>{'It\'s me. My name is Aleksandr. Currently I am only the beginner in React world, so don\'t be so strict on me :) ' +
        'If you have any questions or offers, feel free to contact me through github!'}</p>
        <h2>Contributors</h2>
        <p>{'Currently there are no "official" contributors (except me), but my friend, who already followed this project may be the one in the future :)'}</p>
      </div>
    );
  }
}

export default Contact;
