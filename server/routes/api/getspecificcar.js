const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.get("/", (req, res) => {
  const { query } = req;
  const { plateNumber } = query;

  Car.find({ plateNumber: plateNumber }).then(
    (err, cars) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }
  
      if (cars == 0) {
        return res.send({
          success: false,
          message: "You Do Not Have A Car At Jirani Car Wash",
        });
      }
  
      res.send(cars);
    });
  
});

module.exports = router;
