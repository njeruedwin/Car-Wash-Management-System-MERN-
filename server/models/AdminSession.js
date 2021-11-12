const mongoose = require("mongoose");

const AdminSessionSchema = new mongoose.Schema({
  adminId: {
    type: String,
    default: "",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("AdminSession", AdminSessionSchema);
