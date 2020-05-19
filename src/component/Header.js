import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
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
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/"><span className="fa fa-sign-out"></span>Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
