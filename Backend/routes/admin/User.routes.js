const express = require("express");
const {
  Registered,
  sendEmailController,
  verifyuserController,
  changePasswordController,
  getSingleUser,
  Login,
  editDetailsController,
} = require("../../controller/Admin/UserController");
const adminRoute = express.Router();

adminRoute.post("/register", Registered);
adminRoute.post("/login", Login);
adminRoute.post("/sendpasswordlink", sendEmailController);
adminRoute.get("/forgotpassword/:id/:token", verifyuserController);
adminRoute.post("/:id/:token", changePasswordController);
adminRoute.get("/", getSingleUser);
adminRoute.patch("/edit/:id", editDetailsController);

module.exports = { adminRoute };
