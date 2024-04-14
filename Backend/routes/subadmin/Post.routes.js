const express = require("express");

const {
  getallpostsController,
  createpostController,
  updatepostController,
  deletepostController,
  uploadImage,
  singlePostRequest,
} = require("../../controller/subAdmin/PostController");
const upload = require("../../middleware/multer");

const postRouter = express.Router();




// Route to handle file upload
postRouter.post("/uploadimage",uploadImage);
postRouter.get("/", getallpostsController);
postRouter.post("/create", createpostController);
postRouter.patch("/update/:postID", updatepostController);
postRouter.delete("/delete/:postID", deletepostController);
postRouter.get("/singlePost/:postID",singlePostRequest);
module.exports = { postRouter };
