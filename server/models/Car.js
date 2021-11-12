const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    default: "",
    required: true,
  },
  carOwner: {
    type: String,
    default: "",
    required: true,
  },
  carType: {
    type: String,
    default: "",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  priceCharged: {
    type: String,
    default: "",
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
    required: false,
  },
  ready: {
    type: String,
    default: "",
    required: false,
  },
});

module.exports = mongoose.model("Car", CarSchema);
