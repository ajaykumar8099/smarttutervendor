const { default: mongoose } = require("mongoose");
const { connectionSubadmin } = require("../../db");

const studyMaterialSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    SubAdminName:{ type: String, required:true },
    SubAdminProfileUrl:{ type: String},
    SubAdminNumber:{ type: Number, required: true},
    
    MaterialName: { type: String, required: true },
    MaterialDescription: { type: String, required: true },
    MaterialCategory: { type: String, required: true },
    MaterialZip: { type: String, required: true },
    MaterialImage:{ type: String, required: true },
    Price: { type: Number, required: true },
    
    approve:{type:Boolean, required: true},
    timestamp:{type:Number,default:Date.now},

  },
  {
    versionKey: false,
  }
);

const StudyMaterialModel = connectionSubadmin.model(
  "studymaterial",
  studyMaterialSchema
);
module.exports = { StudyMaterialModel };

