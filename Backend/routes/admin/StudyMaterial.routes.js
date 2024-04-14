const express = require("express");
const { uploadImage } = require("../../controller/subAdmin/PostController");
const {
  getallstudymaterialsController,
  deletestudymaterialController,
  updatestudymaterialController,
  updateApproveController,
} = require("../../controller/Admin/StudymaterialsController");
const studymaterialAdminRoutes = express.Router();

studymaterialAdminRoutes.get(
  "/getstudymaterial/:userID",
  getallstudymaterialsController
);
studymaterialAdminRoutes.delete(
  "/deletestudymaterial/:studymaterialID",
  deletestudymaterialController
);
studymaterialAdminRoutes.patch(
  "/updatestudymaterial/:studymaterialID",
  updatestudymaterialController
);
studymaterialAdminRoutes.post("/upload", uploadImage);
studymaterialAdminRoutes.patch(
  "/approve/:studymaterialID",
  updateApproveController
);
module.exports = { studymaterialAdminRoutes };
