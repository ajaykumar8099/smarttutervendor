

const jwt = require("jsonwebtoken");
const { ProjectModel } = require("../../model/SubAdmin/Project.model");
const deleteFromS3 = require("../../config/deleteFromS3");
const upload = require("../../middleware/multer");
const secretKey = process.env.secretKey;

const createprojectController = async (req, res) => {
  try {
    const project = new ProjectModel(req.body);
    await project.save();
    res.status(200).send({ msg: "Project created successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const getallprojectsController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, secretKey);
  try {
    if (decoded) {
      const posts = await ProjectModel.find({ userID: decoded.userID });
      res.status(200).send(posts);
    }
  } catch (error) {
    res.send(error.message);
  }
};

const updateprojectController = async (req, res) => {
  const { projectID } = req.params;
  console.log(projectID);
  // const project=await ProjectModel.findOne({_id:projectID});
  try {
    const project =await ProjectModel.findById(projectID);
    if(!project) {
      return res.status(404).json({ msg: "project not found" });
    }
    await ProjectModel.findByIdAndUpdate({ _id: projectID }, req.body);
    // Delete corresponding AWS S3 objects
    const keysToDelete = extractKeysFromUrls([
      project.OutputScreens,
      project.UploadDocumentFile,
      project.UploadCodeFile,
    ]);
    await deleteFromS3(keysToDelete)
    res.send({ msg: "project updated successfully" });
  } catch (error) {
    res.send({ msg: "Error updating" });
  }
};
// Function to extract keys from URLs
const extractKeysFromUrls = (urls) => {
  // Assuming the URL format is "https://your-bucket-name.s3.YOUR_AWS_REGION.amazonaws.com/key"
  return urls.map((url) => {
    const parts = url.split("/");
    const key = parts[parts.length - 1]; // Extract the last part of the URL as the key
    return decodeURIComponent(key); // Decode the URL component
  });
};
const deleteprojectController = async (req, res) => {
  const { projectID } = req.params;

  try {
    const deletedPost = await ProjectModel.findByIdAndDelete({ _id: projectID });
    if (!deletedPost) {
      return res.status(404).send({ msg: "Project not found" });
    }

    // Delete corresponding AWS S3 objects
    const keysToDelete = extractKeysFromUrls([
      deletedPost.OutputScreens,
      deletedPost.UploadCodeFile,
      deletedPost.UploadDocumentFile,
    ]);
    console.log(keysToDelete);
    await deleteFromS3(keysToDelete);

    res.send({ msg: "Project deleted successfully" });
  } catch (error) {
    res.send({ msg: "Error deleting" });
  }
};

// Route to handle file upload
// const uploadImage = async (req, res) => {
//   try {
//     upload.single("image")(req, res, async function (err) {
//       if (err) {
//         return res
//           .status(400)
//           .json({ message: "Upload failed", error: err.message });
//       }
//       const imageUrl = req.file.location;
//       // Save imageUrl to database or perform other operations
//       return res.status(200).json({ imageUrl: imageUrl });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// Route to handle file upload
const uploadImage = async (req, res) => {
  try {
    upload.single("file")(req, res, async function (err) {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload failed", error: err.message });
      }

      // Check the file type
      const fileType = req.file.mimetype.split("/")[0]; // Get the file type (e.g., "image", "video", "application")

      let fileUrl;

      // Handle different file types
      if (fileType === "image") {
        // Handle image file
        fileUrl = req.file.location;
      } else if (
        fileType === "application" &&
        req.file.mimetype === "application/zip" || req.file.mimetype === "application/x-zip-compressed"
      ) {
        // Handle zip file
        // Perform operations specific to zip files
        // For example, you can store the file in a different location or extract its contents
        fileUrl = req.file.location; // Assuming you are storing the zip file itself
      } else if (fileType === "video") {
        // Handle video file
        // Perform operations specific to video files
        // For example, you can generate thumbnails, transcode the video, etc.
        fileUrl = req.file.location; // Assuming you are storing the video file itself
      }else if (fileType === "application" && req.file.mimetype === "application/pdf") {
        // Handle PDF file
        // Perform operations specific to PDF files
        // For example, you can store the PDF file, extract text, etc.
        fileUrl = req.file.location; // Assuming you are storing the PDF file itself
      } else {
        // Unsupported file type
        return res.status(400).json({ message: "Unsupported file type" });
      }

      // Save file URL to database or perform other operations
      return res.status(200).json({ fileUrl: fileUrl });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const singleProjectRequest = async(req, res) => {
  const {projectID} = req.params;

  try {
    const post=await ProjectModel.findOne({_id: projectID});
    res.status(200).send(post);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  uploadImage,
  deleteprojectController,
  createprojectController,
  getallprojectsController,
  updateprojectController,
  singleProjectRequest,
};
