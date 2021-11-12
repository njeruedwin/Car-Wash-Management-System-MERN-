const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//set up the user schema
const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
});

//set up methods for the user schema
//generate hash
AdminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//compare the passwords
AdminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);
