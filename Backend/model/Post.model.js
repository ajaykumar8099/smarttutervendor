const { default: mongoose } = require("mongoose");
const { connectionSubadmin } = require("../db");

const postSchema = mongoose.Schema(
  {
    postName: { type: String, required: true },
    postMessage: { type: String, required: true },
    //subadmin Details
    userID: { type: String, required: true },
    SubAdminName:{ type: String, required:true },
    SubAdminProfileUrl:{ type: String},
    SubAdminNumber:{ type: Number, required: true},


    
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    zipUrl: { type: String, required: true },
    price: { type: Number, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    courseCategory: { type: String, required: true },
    tags: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    approve:{type:Boolean, required: true},
    timestamp:{type:Number,default:Date.now},
  },
  {
    versionKey: false,
  }
);

const PostModel = connectionSubadmin.model("post", postSchema);
module.exports = { PostModel };
