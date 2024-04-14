const express = require("express");
const {
  MainCategory,
  SubCategory,
  CourseCategory,
  getMainCategory,
  getSubCategory,
  getCourseCategory,
  deleteMainCategory,
  deleteSubCategory,
  deleteCourseCategory,
} = require("../../controller/Admin/CategorysController");

const categoryRoute = express.Router();

categoryRoute.post("/main", MainCategory);
categoryRoute.post("/sub", SubCategory);
categoryRoute.post("/course", CourseCategory);
categoryRoute.get("/main", getMainCategory);
categoryRoute.get("/sub", getSubCategory);
categoryRoute.get("/course", getCourseCategory);
categoryRoute.delete("/main/:categoryID", deleteMainCategory);
categoryRoute.delete("/sub/:categoryID", deleteSubCategory);
categoryRoute.delete("/course/:categoryID", deleteCourseCategory);

module.exports = { categoryRoute };
