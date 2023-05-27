import React, { Component } from "react";
import { Link } from "react-router-dom";

class PanelNavbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-default " role="navigation">
        <div>
          <ul class="nav navbar-nav">
            <li>
              <Link to="/admin">
                <span style={{ textDecoration: "none" }}>Register Panel</span>
              </Link>
            </li>

            <li>
              <span ></span>
            </li>

            <li>
              <Link to="/addcar">
                <span style={{ textDecoration: "none" }}>
                  Add Car Panel
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default PanelNavbar;
