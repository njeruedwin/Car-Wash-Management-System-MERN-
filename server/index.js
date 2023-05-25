const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const signInRoute = require("./routes/api/signin");
const createAdminRoute = require("./routes/api/createadmin");
const verifyRoute = require("./routes/api/verify");
const logOutRoute = require("./routes/api/logout");
const addCarRoute = require("./routes/api/addcar");
const getSpecificCar = require("./routes/api/getspecificcar");
const updateCarRoute = require("./routes/api/updatecar");
const deleteCarRoute = require("./routes/api/deletecar");
const getCarsRoute = require("./routes/api/getcars");
const carReadyRoute = require("./routes/api/carready");
const { verify } = require("jsonwebtoken");

//set routes
app.use("/api/admin/signin", signInRoute);
app.use("/api/admin/createadmin", createAdminRoute);
app.use("/api/admin/logout", logOutRoute);
app.use("/api/admin/verify", verifyRoute);
app.use("/api/admin/addcar", addCarRoute);
app.use("/api/getspecificcar", getSpecificCar);
app.use("/api/admin/updatecar", updateCarRoute);
app.use("/api/admin/deletecar", deleteCarRoute);
app.use("/api/admin/getcars", getCarsRoute);
app.use("/api/admin/carready", carReadyRoute);

//connect to the database
mongoose.connect(
  "mongodb://localhost/carwashsystem",
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(
  console.log('Connected Successfully')
)

//listen to port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
