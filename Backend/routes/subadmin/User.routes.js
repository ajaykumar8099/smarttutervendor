const express = require("express");
const {
  Registered,
  Login,
  sendEmailController,
  verifyuserController,
  changePasswordController,
  getSingleUser,
  editDetailsController,
} = require("../../controller/subAdmin/UserController");
const subadminuserRoute = express.Router();

subadminuserRoute.post("/register", Registered);
subadminuserRoute.post("/login", Login);
subadminuserRoute.post("/sendpasswordlink", sendEmailController);
subadminuserRoute.get("/forgotpassword/:id/:token", verifyuserController);
subadminuserRoute.post("/:id/:token", changePasswordController);
subadminuserRoute.get("/", getSingleUser);
subadminuserRoute.patch("/edit/:id", editDetailsController);
module.exports = { subadminuserRoute };
