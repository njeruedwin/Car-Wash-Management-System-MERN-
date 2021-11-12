const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.get("/", (req, res) => {
  Car.find({}, (err, cars) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(cars);
  });
});

module.exports = router;
