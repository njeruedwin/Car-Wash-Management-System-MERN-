const express = require("express");
const router = express.Router();

//import the model
const Admin = require("../../models/Admin");

router.post("/", (req, res) => {
  let { body } = req;
  let { userName, password } = body;

  //make sure the fields are not null

  if (!userName) {
    res.send({
      success: false,
      message: "username Field is empty",
    });
  }
  if (!password) {
    res.send({
      success: false,
      message: "username Field is empty",
    });
  }

  //make sure that the username does not exist
  Admin.find({ userName: userName })
    .then((admins) => {
      if (admins != 0) {
        return res.send({
          success: false,
          message: "The username already exists",
        });
      }

      //the admin is new
      //save the admin
      const newAdmin = new Admin({
        userName,
        password,
      });

      //encrypt the password
      newAdmin.password = newAdmin.generateHash(password);

      newAdmin
        .save()
        .then((err, admin) => {
          res.send({
            success: true,
            message: "New Admin Registered",
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: error,
          });
        });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: error,
      });
    });
});

module.exports = router;
