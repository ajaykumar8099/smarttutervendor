const mongoose = require("mongoose");
const { connectionSubadmin } = require("../db");

const subAdminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    number: { type: Number, required: true },
    isVerified: { type: Boolean, required: true },
    verifytoken: {
      type: String,
    },
    profileUrl: { type: String },
    timestamp:{type:Number,default:Date.now},

  },
  {
    versionKey: false,
  }
);

const SubAdminModel = connectionSubadmin.model("user", subAdminSchema);

module.exports = { SubAdminModel };
