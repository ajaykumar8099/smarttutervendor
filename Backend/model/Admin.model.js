const mongoose = require("mongoose");
const { connectionAdmin } = require("../db");
/*============================================================
====================== ADMIN USER CATEGORY========================
============================================================*/
const userSchema = mongoose.Schema(
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

const adminModel = connectionAdmin.model("smarttuteradmin", userSchema);
/*============================================================
====================== MAIN CATEGORY========================
============================================================*/
const mainCategorySchema = mongoose.Schema({
  category: { type: String, required: true },
  timestamp:{type:Number,default:Date.now},

});

const MaincategoryModel = connectionAdmin.model(
  "maincategory",
  mainCategorySchema
);
/*============================================================
====================== SUB CATEGORY========================
============================================================*/
const subCategorySchema = mongoose.Schema({
  category: { type: String, required: true },
  timestamp:{type:Number,default:Date.now},

});

const SubcategoryModel = connectionAdmin.model(
  "subcategory",
  subCategorySchema
);
/*============================================================
====================== COURSE CATEGORY========================
============================================================*/
const CourseCategorySchema = mongoose.Schema({
  category: { type: String, required: true },
  timestamp:{type:Number,default:Date.now},

});

const CoursecategoryModel = connectionAdmin.model(
  "coursecategory",
  CourseCategorySchema
);

module.exports = {
  adminModel,
  MaincategoryModel,
  SubcategoryModel,
  CoursecategoryModel,
};
