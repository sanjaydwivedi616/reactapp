import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Dashbord</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ProductDetails">Product Details</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Userpost">User Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart <span className="fa fa-shopping-cart"></span></Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
