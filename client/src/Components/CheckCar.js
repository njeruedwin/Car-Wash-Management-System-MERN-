import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export class CheckCar extends Component {
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
            <h2 className="section-detail">Check Car Status</h2>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CheckCarContent />{" "}
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CheckCarContent extends Component {
  constructor() {
    super();

    this.state = {
      carReady: false,
      plateNumber: "",
      showDetail: false,
      message: "",
    };

    this.valueChange = this.valueChange.bind(this);
    this.getCarStatus = this.getCarStatus.bind(this);
  }

  valueChange = (event) => {
    this.setState({
      plateNumber: event.target.value,
    });
  };

  getCarStatus = () => {
    this.setState({
      showDetail: true,
    });
    console.log(this.state.plateNumber);
    axios
      .get(
        "http://localhost:5000/api/getspecificcar?plateNumber=" +
          this.state.plateNumber
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          return this.setState({
            message: "You Do Not Have A Car at Jirani Car Wash",
          });
        }
        if (res.data[0].ready === "") {
          return this.setState({
            message: "Car not ready",
          });
        }
        if (res.data[0].ready === "ready") {
          return this.setState({
            message: "Your Car Is Ready For Pick-Up",
          });
        }
      });
  };
  render() {
    if (this.state.showDetail) {
      return (
        <div class="well">
          <h4>{this.state.message}</h4> <br />
          <button
            className="btn btn-default"
            onClick={() =>
              this.setState({
                showDetail: false,
              })
            }
          >
            Back
          </button>
        </div>
      );
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Check Your Car</h3>
        </div>
        <div className="panel-body">
          <div role="form">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Plate Number"
                onChange={this.valueChange}
              />
              <br />
              <button className="btn btn-primary" onClick={this.getCarStatus}>
                Check Car
              </button>

              <span className="help-block">
                Enter your car plate number for results:Use lower case
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckCar;
