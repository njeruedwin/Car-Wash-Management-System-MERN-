const express = require("express");
const router = express.Router();
//Import the User and UserSession schema
const Admin = require("../../models/Admin");
const AdminSession = require("../../models/AdminSession");
/*
 *Verify token
 */
router.get("/", (req, res) => {
  //destructore to get token
  //req.query.token
  const { query } = req;
  const { token } = query;

  AdminSession.find({
    _id: token,
    isValid: true,
  })
    .then((session) => {
      if (session == 0) {
        return res.send({
          success: false,
          message: "Session does not exist",
        });
      }

      res.send({
        success: true,
        message: "In Session",
      });
    })
    .catch((error) => {
      return res.send({
        success: false,
        message: error,
      });
    });
});
module.exports = router;
