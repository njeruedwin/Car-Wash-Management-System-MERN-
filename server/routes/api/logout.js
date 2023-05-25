const express = require("express");
const router = express.Router();
//Import the User and UserSession schema
const Admin = require("../../models/Admin");
const AdminSession = require("../../models/AdminSession");
/*
 *Log Out
 */
router.get("/", (req, res) => {
  //destructore to get token
  //req.query.token
  const { query } = req;
  const { token } = query;

  AdminSession.findOneAndUpdate(
    {
      _id: token,
      isValid: true,
    },
    {
      $set: { isValid: false },
    },
).then((session) => {
  
  if (session == null) {
    return res.send({
      success: false,
      message: "Session does not exist",
    });
  }

  res.send({
    success: true,
    message: "Logged Out",
  });
}
).catch((error) => {
  return res.send({
    success: false,
    message: error,
  });
}); });
module.exports = router;
