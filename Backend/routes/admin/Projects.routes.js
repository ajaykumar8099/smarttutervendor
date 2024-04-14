const express = require("express");
const {
  getallprojectsController,
  deleteprojectController,
  updateprojectController,
  updateApproveController,
} = require("../../controller/Admin/ProjectsController");
const { uploadImage } = require("../../controller/subAdmin/PostController");
const projectAdminRoutes = express.Router();

projectAdminRoutes.get("/getproject/:userID", getallprojectsController);
projectAdminRoutes.delete("/deleteproject/:projectID", deleteprojectController);
projectAdminRoutes.patch("/updateproject/:projectID", updateprojectController);
projectAdminRoutes.post("/upload", uploadImage);
projectAdminRoutes.patch("/approve/:projectID", updateApproveController);
module.exports = { projectAdminRoutes };
