const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.get("/", (req, res) => {
  Car.find({}).then((err, cars) => {

    res.send(cars);
  }).catch((error) => {
    return res.send({
      success: false,
      message: error,
    });
  });
});

module.exports = router;
