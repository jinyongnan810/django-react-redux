import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout_user } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
    logout_user: PropTypes.func.isRequired
  };
  render() {
    let links;
    if (this.props.auth.isAuthenticated) {
      const user = this.props.auth.user;
      links = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {this.props.auth.user.username}
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={this.props.logout_user}
              cursor="pointer"
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>;
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Lead Manager
            </a>
            {links}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout_user })(Header);
