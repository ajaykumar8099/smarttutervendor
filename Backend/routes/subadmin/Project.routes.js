const express = require("express");
const {
  uploadImage,
  getallprojectsController,
  createprojectController,
  updateprojectController,
  deleteprojectController,
  singleProjectRequest,
} = require("../../controller/subAdmin/ProjectController");

const projectRouter = express.Router();

projectRouter.post("/uploadProjectfile", uploadImage);
projectRouter.get("/", getallprojectsController);
projectRouter.post("/create", createprojectController);
projectRouter.patch("/update/:projectID", updateprojectController);
projectRouter.delete("/delete/:projectID", deleteprojectController);
projectRouter.get("/singleProject/:projectID", singleProjectRequest);
module.exports = { projectRouter };
