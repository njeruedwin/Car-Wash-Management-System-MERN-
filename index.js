const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

require('dotenv').config()
const {MONGODB_URI} = require('./config') //get access to the mongoDB

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//import routes
const signInRoute = require("./server/routes/api/signin");
const createAdminRoute = require("./server/routes/api/createadmin");
const verifyRoute = require("./server/routes/api/verify");
const logOutRoute = require("./server/routes/api/logout");
const addCarRoute = require("./server/routes/api/addcar");
const getSpecificCar = require("./server/routes/api/getspecificcar");
const updateCarRoute = require("./server/routes/api/updatecar");
const deleteCarRoute = require("./server/routes/api/deletecar");
const getCarsRoute = require("./server/routes/api/getcars");
const carReadyRoute = require("./server/routes/api/carready");
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


 // add middleware
// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route

app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//connect to the database
mongoose.connect(
  MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(
  console.log('Connected Successfully')
).catch(error => console.log(error))

//listen to port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
