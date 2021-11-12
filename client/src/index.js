import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import App from "./Components/App";
import SignIn from "./Components/SignIn";
import RegisterAdmin from "./Components/RegisterAdmin";
import AddCarPanel from "./Components/AddCarPanel";
import Search from "./Components/Search";
import Admin from "./Components/Admin";
import CheckCar from "./Components/CheckCar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/signin" component={SignIn} />
      <Route path="/admin" component={Admin} />
      <Route path="/registeradmin" component={RegisterAdmin} />
      <Route path="/addcar" component={AddCarPanel} />
      <Route path="/addcar" component={AddCarPanel} />
      <Route path="/checkcar" component={CheckCar} />
    </Switch>
  </Router>,

  document.getElementById("root")
);
