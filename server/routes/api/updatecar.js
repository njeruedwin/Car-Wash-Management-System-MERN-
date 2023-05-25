const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.patch("/", (req, res) => {
  const { body } = req;
  const { plateNumber, carOwner, carType, priceCharged } = body;

  Car.updateOne(
    { plateNumber: plateNumber },
    {
      $set: {
        plateNumber,
        carOwner,
        carType,
        priceCharged,
      },
    }
  )
    .then((car) => {
      res.send({
        success: true,
        message: "Car successfuly updated",
      });
    })
    .catch((err) => {
      return res.send({
        success: false,
        message: "Server Error",
      });
    });
});

module.exports = router;
