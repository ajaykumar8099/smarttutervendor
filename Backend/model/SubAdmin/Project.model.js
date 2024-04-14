const { default: mongoose } = require("mongoose");
const { connectionSubadmin } = require("../../db");

const projectSchema = mongoose.Schema(
  {
    ProjectTitle: { type: String, required: true },
    ProjectDescription: { type: String, required: true },
    userID: { type: String, required: true },
    SubAdminName:{ type: String, required:true },
    SubAdminProfileUrl:{ type: String},
    SubAdminNumber:{ type: Number, required: true},

    
    Abstract200Words: { type: String, required: true },
    TechnologiesUsed: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    OutputScreens: { type: String, },
    UploadCodeFile: { type: String, },
    UploadDocumentFile: { type: String, },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    courseCategory: { type: String, required: true },
    Price: { type: Number, required: true },
    approve:{type:Boolean, required: true},
    timestamp:{type:Number,default:Date.now},

  },
  {
    versionKey: false,
  }
);

const ProjectModel = connectionSubadmin.model("porject", projectSchema);
module.exports = { ProjectModel };
