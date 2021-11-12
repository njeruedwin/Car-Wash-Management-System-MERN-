import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerPage extends Component {
  render() {
    return (
      <>
        <div className="container">
          {/*left Pane*/}
          <div className="col-md-3">
            <Link to="/signin">
              <button type="buttton" className="btn ">
                Go To Admin Site
              </button>
            </Link>
            <br />
            <br />
            <Link to="/checkcar">
              <button type="buttton" className="btn btn-primary">
                Check My Car
              </button>
            </Link>
            <h2 className="section-detail">Client Panel</h2>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CustomerContent />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CustomerContent extends Component {
  render() {
    return (
      <div class="jumbotron">
        <div class="container">
          <h1
            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
          >
            Welcome to Jirani Car Wash!
          </h1>
          <p>Jirani car wash services, The Best wash your car can get.</p>
          <p>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-toggle="collapse"
              data-target="#demo"
            >
              Learn More
            </button>{" "}
            <div id="demo" class="collapse">
              <p>
                Jirani Car Wash is a car wash service center fully dedicated at
                providing its clients with the best services when it comes to
                put your car clean.
              </p>
              <p>
                With a well motivated and dedicated team with the appropiate
                tools for the job, we sure promise you the best of services.
              </p>
              <p>Located in Juja Area, off Thika super highway.</p>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
