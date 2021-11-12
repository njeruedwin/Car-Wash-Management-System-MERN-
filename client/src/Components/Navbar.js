import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand ">Jirani Car Wash Management System</a>
          {/*  */}
        </div>
      </nav>
    );
  }
}

export default Navbar;
