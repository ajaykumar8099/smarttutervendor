const express = require("express");
const {
  Registered,
  Login,
  sendEmailController,
  verifyuserController,
  changePasswordController,
  getSingleUser,
  editDetailsController,
  uploadImage,
  deleteFromCartController,
} = require("../../controller/User/EndUserController");
const {
  EndUsergetallstudymaterialsController,
  EndUsergetallProjectsController,
  EndUsergetallCoursesController,
} = require("../../controller/User/EndUserGetDatas.Controller");
const userRoute = express.Router();
userRoute.post("/uploadimage", uploadImage);
userRoute.post("/register", Registered);
userRoute.post("/login", Login);
userRoute.post("/sendpasswordlink", sendEmailController);
userRoute.get("/forgotpassword/:id/:token", verifyuserController);
userRoute.post("/:id/:token", changePasswordController);
userRoute.get("/", getSingleUser);
userRoute.patch("/edit/:id", editDetailsController);
userRoute.delete("/delete/:id",deleteFromCartController);
// studymaterialRoutes
userRoute.get("/studymaterials", EndUsergetallstudymaterialsController);
userRoute.get("/projects", EndUsergetallProjectsController);
userRoute.get("/courses", EndUsergetallCoursesController);


module.exports = { userRoute };

