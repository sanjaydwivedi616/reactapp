import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { connect } from "react-redux"
import { USER_LOGOUT_REQUEST } from "../redux/login/loginType"

class Header extends Component {

  logOutUser = () => {
    localStorage.clear();
    this.props.userLoginStatusFasle();
  }

  render() {
    let LoginData = localStorage.getItem("userLoginToken");

    return (
      <nav className="navbar navbar-expand-lg navbar-dark nav-dark">
        <div className="container-fluid">
          {LoginData ?
            <>
              <NavLink className="navbar-brand" to="/user-list"><img src={logo} alt="Logo" style={{ height: "35px" }} /></NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user-list" exact>User Details</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user-post">User Posts</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/product">Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/covide-cases-india">Covide 19 Case</NavLink>
                  </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={this.logOutUser}><span className="fa fa-sign-out"></span>Logout</Link>
                  </li>
                </ul>
              </div>
            </> :
            <>
              <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" style={{ height: "35px" }} /></Link>
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
              </ul>
            </>
          }
        </div>
      </nav>
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
    userLoginStatusFasle: () => dispatch({ type: USER_LOGOUT_REQUEST })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
