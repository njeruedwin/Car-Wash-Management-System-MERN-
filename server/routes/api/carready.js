const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.patch("/", (req, res) => {
  const { query } = req;
  const { plateNumber } = query;

  Car.updateOne(
    { plateNumber: plateNumber },
    {
      $set: {
        ready: "ready",
      },
    },
    (err, car) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "Car ready",
      });
    }
  );
});

module.exports = router;
