import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';

import './Header.less';
import logo from 'assets/logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopSpin: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver() {
    this.setState({
      stopSpin: true
    });
  }

  handleMouseLeave() {
    this.setState({
      stopSpin: false
    });
  }

  render() {
    return (
      <header className="Container">
        <img src={logo} className={"Logo" + (this.state.stopSpin ? " no-animation" : "")}
             onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}
             alt="logo"/>
        <h1 className="Title">{this.props.title}</h1>
        <Navigation>
          <Link exact to="/" key="home">Home</Link>
          <Link to="/info" key="info">Information about starter</Link>
          <Link to="/contact" key="contact">Contact us</Link>
          <Link to="/about" key="about">About</Link>
        </Navigation>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
