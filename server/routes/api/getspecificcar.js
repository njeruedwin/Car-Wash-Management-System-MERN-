const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.get("/", (req, res) => {
  const { query } = req;
  const { plateNumber } = query;

  Car.find({ plateNumber: plateNumber }).then(
    (cars) => {
      if (cars == 0) {
        return res.send({
          success: false,
          message: "You Do Not Have A Car At Jirani Car Wash",
        });
      }
  
      res.send(cars);
    }).then((error) =>  {
      return res.send({
        success: false,
        message: error,
      });
    });
  
});

module.exports = router;
