const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.delete("/", (req, res) => {
  Car.deleteOne({ plateNumber: req.query.plateNumber })
    .then((doc) => {
      res.send(doc);
    })
    .catch((error) => {
      return res.send({
        success: false,
        message: error,
      });
    });
});

module.exports = router;
