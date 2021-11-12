const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.post("/", (req, res) => {
  const { body } = req;
  const { plateNumber, carOwner, carType, priceCharged } = body;

  if (!plateNumber) {
    return res.send({
      success: false,
      message: "plate-number field empty",
    });
  }
  if (!carOwner) {
    return res.send({
      success: false,
      message: "car owner field empty",
    });
  }
  if (!carType) {
    return res.send({
      success: false,
      message: "car type field empty",
    });
  }
  if (!priceCharged) {
    return res.send({
      success: false,
      message: "price charged field empty",
    });
  }

  //add the car to the DB
  const newCar = new Car({
    plateNumber,
    carOwner,
    carType,
    priceCharged,
  });

  newCar.save((err, car) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send({
      success: true,
      message: "New car saved",
    });
  });
});

module.exports = router;
