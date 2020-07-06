import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { connect } from "react-redux"

class Header extends Component {

  logOutUser = () => {
    localStorage.clear();
    this.props.userLoginStatusFasle();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark nav-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" style={{ height: "35px" }} /></Link>
          {this.props.userLoginState.login ?
            <>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Users" exact>User Details</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/UserPostDetails">User Posts</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Product">Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/CovideIndiaCase">Covide 19 Case</NavLink>
                  </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={this.logOutUser}><span className="fa fa-sign-out"></span>Logout</Link>
                  </li>
                </ul> </div>
            </> :
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            </ul>
          }
        </div>
      </nav >
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoginState: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoginStatusFasle: () => dispatch({ type: 'userLogout' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
