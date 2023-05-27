import React, { Component } from "react";
import PanelNavbar from "../Components/PanelNavbar";
import { Redirect } from "react-router-dom";
import "../css/admin.css";
import axios from "axios";

import {environment} from '../environment/environment.prod'

class AddCarPanel extends Component {
  render() {
    return (
      <>
        <div className="container">
          {/*left Pane*/}
          <div className="col-md-3">
            <h2 className="section-detail">Add Car Panel</h2>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CarForm />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CarForm extends Component {
  constructor(props) {
    super(props);
    this.API = environment.API;

    this.state = {
      plateNumber: "",
      carOwner: "",
      carType: "",
      priceCharged: "",

      formError: false,
      errorMessage: "",

      submit: false,
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitData = () => {
    const car = this.state;
    console.log(car);

    axios.post(`${this.API}/admin/addcar`, car).then((res) => {
      if (!res.data.success) {
        return this.setState({
          errorMessage: res.data.message,
        });
      }

      this.setState({
        submit: true,
      });
    });
  };
  render() {
    if (this.state.submit) {
      return <Redirect to="/admin" />;
    }
    return (
      <>
        <PanelNavbar />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title main-font">
              Car Form : Register New Car
            </h3>
          </div>
          <div className="panel-body">
            <div>
              <div class="bs-example bs-example-form" role="form">
                <div class="input-group">
                  <div class="alert alert-danger">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                    Warning! Plate Number cannot later be updated
                  </div>
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="plate number"
                    name="plateNumber"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="car owner"
                    name="carOwner"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="car type"
                    name="carType"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">@</span>
                </div>
                <br />
                <div class="input-group">
                  <span class="input-group-addon">Ksh</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="car price"
                    name="priceCharged"
                    onChange={this.onValueChange}
                  />
                  <span class="input-group-addon">.00</span>
                </div>
                <br />
                {this.state.errorMessage ? (
                  <div class="alert alert-danger">
                    {this.state.errorMessage}
                  </div>
                ) : (
                  ""
                )}
                <div className="input-group">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.submitData}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AddCarPanel;
