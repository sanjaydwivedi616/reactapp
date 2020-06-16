import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {

  logOutUser = () => {
    const logoutUser = localStorage.getItem("userLoginToken")
    localStorage.clear();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark nav-dark">
        <Link className="navbar-brand" to="/Users">Dashbord</Link>
        <ul className="nav navbar-nav navbar-left">
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/Movie_info">Movie</NavLink>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={this.logOutUser}><span className="fa fa-sign-out"></span>Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
