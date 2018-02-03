import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navigation.less';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <ul className="Nav-List">
          {this.props.children.map(item => {
            return (
              <li className="Nav-List-Item" key={item.key}>
                <NavLink exact={item.props.exact} to={item.props.to} activeClassName="active">{item.props.children}</NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Navigation;
