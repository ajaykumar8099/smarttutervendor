const express = require("express");
const {
  uploadImage,
  getallStudyMaterialsController,
  createStudyMaterialController,
  updateStudyMaterialController,
  deleteStudyMaterialController,
  singleStudyMaterialRequest,
} = require("../../controller/subAdmin/StudyMaterialControlller");


const studymaterialRouter = express.Router();

studymaterialRouter.post("/uploadstudymaterialfile", uploadImage);
studymaterialRouter.get("/", getallStudyMaterialsController);
studymaterialRouter.post("/create", createStudyMaterialController);
studymaterialRouter.patch("/update/:studymaterialID", updateStudyMaterialController);
studymaterialRouter.delete("/delete/:studymaterialID", deleteStudyMaterialController);
studymaterialRouter.get(
  "/singlestudymaterial/:studymaterialID",
  singleStudyMaterialRequest
);
module.exports = { studymaterialRouter };
