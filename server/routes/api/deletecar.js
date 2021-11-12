const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");

router.delete("/", (req, res) => {
  Car.deleteOne({ plateNumber: req.query.plateNumber }, (err, doc) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    res.send(doc);
  });
});

module.exports = router;
