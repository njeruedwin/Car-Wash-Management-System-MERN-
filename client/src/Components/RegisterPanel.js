import React, { Component } from "react";
import { Link } from "react-router-dom";
import PanelNavbar from "../Components/PanelNavbar";
import axios from "axios";

class RegisterPanel extends Component {

  render() {
    return (
      <>
        <PanelNavbar />
        <Link to="/addcar">
          <button type="button" className="mybtn btn btn-default ">
            Add Car
            <span className="button-addon">+</span>
          </button>
        </Link>
        <br />
        <br />
        {/*table*/}
        <Table />
      </>
    );
  }
}

class Table extends Component {
  constructor() {
    super();

    this.state = {
      deleteButtonClicked: false,
      cars: [],
      deleteCar: [],
      deleteCarPlateNumber: "",

      //For Update Purposes
      carType: "",
      carOwner: "",
      plateNumber: "",
      priceCharged: "",
      updated: false,
    };

    this.registerTable = this.registerTable.bind(this);
    this.groupButtons = this.groupButtons.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.carStatus = this.carStatus.bind(this);
    this.setTableToDelete = this.setTableToDelete.bind(this);
    this.setDataToUpdate = this.setDataToUpdate.bind(this);
    this.getTableToDelete = this.getTableToDelete.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.carReady = this.carReady.bind(this);
  }

  componentDidMount = () => {
    console.log("Table component has mounted");
    axios.get("http://localhost:5000/api/admin/getcars").then((res) => {
      console.log(res)
     
      this.setState({
        cars: res.data,
      });
    });
  };

  componentDidUpdate(prevProp, prevState){
    if(this.state.updated !== prevProp.updates){
      console.log("Table component has updated");
      axios.get("http://localhost:5000/api/admin/getcars").then((res) => {
        console.log(res)
       
        this.setState({
          cars: res.data,
        });
      });
    }
  }

  registerTable = () => {
    return this.state.cars.map((car) => {
      return (
        <tr key={car.id}>
          <td>{car.carType}</td>
          <td>{car.carOwner}</td>
          <td>{car.plateNumber}</td>
          <td>{car.date}</td>
          <td>{car.priceCharged}</td>
          <td>{this.groupButtons(car.plateNumber)}</td>
          <td>{this.carStatus(car.plateNumber, car.ready)}</td>
        </tr>
      );
    });
  };

  groupButtons = (plateNumber) => {
    return (
      <div className="btn-group">
        {this.deleteModal(this.state.deleteCarPlateNumber)}
        {this.updateModal()}
        <button
          type="button"
          className="btn btn-default"
          data-toggle="modal"
          data-target="#updatemodal"
          onClick={() => this.setDataToUpdate(plateNumber)}
        >
          edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#deletemodal"
          onClick={() => this.setTableToDelete(plateNumber)}
        >
          Delete
        </button>
      </div>
    );
  };

  carStatus = (plateNumber, ready) => {
    return (
      <label class="checkbox-inline">
        {ready ? (
          <input
            type="checkbox"
            name="optionsRadiosinline"
            id="Status"
            value="Ready"
            checked
            onChange={() => this.carReady(plateNumber)}
          />
        ) : (
          <input
            type="checkbox"
            name="optionsRadiosinline"
            id="Status"
            value="Ready"
            onChange={() => this.carReady(plateNumber)}
          />
        )}
      </label>
    );
  };

  deleteModal = (plateNumber) => {
    return (
      <div>
        <div
          class="modal fade"
          id="deletemodal"
          tabindex="3"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Delete Record
                </h4>
              </div>
              <div class="modal-body ">
                <div class="alert alert-danger">
                  Caution ! Are You sure you want to delete the record
                </div>
                <div className="table-responsive">
                  <table className="table table-stripped">
                    <thead>
                      <th>Car Type</th>
                      <th>Car Owner</th>
                      <th>Plate Number</th>
                      <th>Date In</th>
                    </thead>
                    <tbody>{this.getTableToDelete()}</tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-danger"
                  onClick={() => this.deleteRecord(plateNumber)}
                >
                  delete record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateModal = () => {
    return (
      <div>
        <div
          class="modal fade"
          id="updatemodal"
          tabindex="3"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Update Record
                </h4>
              </div>
              <div class="modal-body ">
                <div>
                  <div class="bs-example bs-example-form" role="form">
                    <div class="input-group">
                      <div class="alert alert-info">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-hidden="true"
                        >
                          &times;
                        </button>
                        Info! Cannot update plate number
                      </div>
                    </div>

                    <div class="input-group">
                      <label>Car Owner</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="car owner"
                        name="carOwner"
                        value={this.state.carOwner}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">@</span>
                    </div>
                    <br />
                    <div class="input-group">
                      <label>Car Type</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="car type"
                        name="carType"
                        value={this.state.carType}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">@</span>
                    </div>
                    <br />
                    <label>Price Charged</label>
                    <div class="input-group">
                      <span class="input-group-addon">Ksh</span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="car price"
                        name="priceCharged"
                        value={this.state.priceCharged}
                        onChange={this.updateValue}
                      />
                      <span class="input-group-addon">.00</span>
                    </div>
                    <br />
                    <div className="input-group"></div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-primary"
                    onClick={() => this.updateRecord()}
                  >
                    update Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setTableToDelete = (plateNumber) => {
    axios
      .get(
        "http://localhost:5000/api/getspecificcar?plateNumber=" + plateNumber
      )
      .then((res) => {
        this.setState({
          deleteCar: res.data,
          deleteCarPlateNumber: plateNumber,
        });
      });
  };

  setDataToUpdate = (plateNumber) => {
    axios
      .get(
        "http://localhost:5000/api/getspecificcar?plateNumber=" + plateNumber
      )
      .then((res) => {
        res.data.map((car) => {
         return this.setState({
            carType: car.carType,
            carOwner: car.carOwner,
            plateNumber: car.plateNumber,
            priceCharged: car.priceCharged,
          });
        });
      });
  };

  getTableToDelete = () => {
    return this.state.deleteCar.map((car) => {
      return (
        <tr key={car.id}>
          <td>{car.carType}</td>
          <td>{car.carOwner}</td>
          <td>{car.plateNumber}</td>
          <td>{car.date}</td>
        </tr>
      );
    });
  };

  deleteRecord = (plateNumber) => {
    axios
      .delete(
        "http://localhost:5000/api/admin/deletecar?plateNumber=" + plateNumber
      )
      .then(
        this.setState({
          cars: this.state.cars.filter(
            (car) => car.plateNumber !== plateNumber
          ),
        })
      );
  };

  updateRecord = () => {
    const data = this.state;
    return axios.patch("http://localhost:5000/api/admin/updatecar", data).then(
      this.setState({
        updated: !this.state.updated,
      })
    );
  };

  carReady = (plateNumber) => {
    return axios
      .patch(
        "http://localhost:5000/api/admin/carready?plateNumber=" + plateNumber
      )
      .then((res) => {
        console.log(res);
        console.log(plateNumber);
      });
  };

  render() {
    if (this.state.updated === true) {
      axios.get("http://localhost:5000/api/admin/getcars").then((res) => {
      
        this.setState({
          cars: res.data,
          updated: false,
        });
      });
    }
    return (
      <div className="table-section">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title main-font">Cars in the Register</h3>
          </div>
          <div className="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Car Type</th>
                  <th>Car Owner</th>
                  <th>Plate Number</th>
                  <th>Date In</th>
                  <th>Price Charged</th>
                  <th>Actions</th>
                  <th>Ready</th>
                </tr>
              </thead>
              <tbody>{this.registerTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPanel;
