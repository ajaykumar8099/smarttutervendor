const express = require("express");
const {
  getallSUbadminsController,
  updatesubadminController,
  getallpostsController,
  deletepostController,
  updatepostController,
  uploadImage,
  updateApproveController,
} = require("../../controller/Admin/SubadminUsersController");
const subAdminsRoute = express.Router();

subAdminsRoute.get("/", getallSUbadminsController);
subAdminsRoute.patch("/authenticate/:subadminID", updatesubadminController);
subAdminsRoute.get("/getpost/:userID", getallpostsController);
subAdminsRoute.delete("/deletepost/:postID", deletepostController);
subAdminsRoute.patch("/updatepost/:postID", updatepostController);
subAdminsRoute.post("/upload", uploadImage);
subAdminsRoute.patch("/approve/:postID", updateApproveController);
module.exports = { subAdminsRoute };
