const jwt = require("jsonwebtoken");
const { SubAdminModel } = require("../../model/SubAdmin.model");
// const deleteFromS3 = require("../../config/deleteFromS3");
const upload = require("../../middleware/multer");
const { StudyMaterialModel } = require("../../model/SubAdmin/StudyMaterial.model");
const deleteFromS3 = require("../../config/deleteFromS3");
const secretKey = process.env.secretKey;

const getallSUbadminsController = async (req, res) => {
  try {
    const subadmins = await SubAdminModel.find();
    res.status(200).send(subadmins);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createstudymaterialController = async (req, res) => {
  try {
    const studymaterial = new StudyMaterialModel(req.body);
    await studymaterial.save();
    res.status(200).send({ msg: "studymaterial created successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const getallstudymaterialsController = async (req, res) => {
  // const token=req.headers.authorization.split(' ')[1];
  // const decoded=jwt.verify(token,secretKey)
  console.log(req.params);
  try {
    // if(decoded){
    const studymaterials = await StudyMaterialModel.find({ userID: req.params.userID });
    res.status(200).send(studymaterials);
    // }
  } catch (error) {
    res.send(error.message);
  }
};

const updatesubadminController = async (req, res) => {
  const { subadminID } = req.params;
  // const post=await StudyMaterialModel.findOne({_id:subadminID});
  try {
    await SubAdminModel.findByIdAndUpdate({ _id: subadminID }, req.body);
    res.send({ msg: " updated successfully" });
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
const deletestudymaterialController = async (req, res) => {
  const { studymaterialID } = req.params;

  try {
    const deletedstudymaterial = await StudyMaterialModel.findByIdAndDelete({
      _id: studymaterialID,
    });
    if (!deletedstudymaterial) {
      return res.status(404).send({ msg: "studymaterial not found" });
    }

    // Delete corresponding AWS S3 objects
    const keysToDelete = extractKeysFromUrls([
      deletedstudymaterial.MaterialZip,
      
    ]);
    console.log(keysToDelete);
    await deleteFromS3(keysToDelete);

    res.send({ msg: "studymaterial deleted successfully" });
  } catch (error) {
    res.send({ msg: "Error deleting" });
  }
};
const updatestudymaterialController = async (req, res) => {
  const { studymaterialID } = req.params;
  // const studymaterial=await StudyMaterialModel.findOne({_id:studymaterialID});
  try {
    const studymaterial = await StudyMaterialModel.findById(studymaterialID);
    if (!studymaterial) {
      return res.status(404).json({ msg: "studymaterial not found" });
    }
    await StudyMaterialModel.findByIdAndUpdate({ _id: studymaterialID }, req.body);
    // Delete corresponding AWS S3 objects
    const keysToDelete = extractKeysFromUrls([
      studymaterial.MaterialZip
    ]);
    await deleteFromS3(keysToDelete);
    res.send({ msg: "studymaterial updated successfully" });
  } catch (error) {
    res.send({ msg: "Error updating" });
  }
};
const updateApproveController = async (req, res) => {
  const { studymaterialID } = req.params;
  // const studymaterial=await StudyMaterialModel.findOne({_id:studymaterialID});
  try {
    const studymaterial = await StudyMaterialModel.findById(studymaterialID);
    console.log(req.body);
    if (!studymaterial) {
      return res.status(404).json({ msg: "studymaterial not found" });
    }
    await StudyMaterialModel.findByIdAndUpdate({ _id: studymaterialID }, req.body);
    // Delete corresponding AWS S3 objects
    res.send({ msg: "studymaterial approve successfully" });
  } catch (error) {
    res.send({ msg: "Error updating" });
  }
};
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
        req.file.mimetype === "application/zip"
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
      } else if (
        fileType === "application" &&
        req.file.mimetype === "application/pdf"
      ) {
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
module.exports = {
  deletestudymaterialController,
  createstudymaterialController,
  getallstudymaterialsController,
  updatesubadminController,
  getallSUbadminsController,
  updatestudymaterialController,
  uploadImage,
  updateApproveController,
};
