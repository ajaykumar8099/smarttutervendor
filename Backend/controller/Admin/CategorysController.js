const {
  MaincategoryModel,
  SubcategoryModel,
  CoursecategoryModel,
} = require("../../model/Admin.model");

const MainCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const existingCategory = await MaincategoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).send({ msg: "Main Category already exists" });
    }
    const newCategory = new MaincategoryModel({ category });
    await newCategory.save();
    res.status(200).send({ msg: "Main Category saved successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
const SubCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const existingCategory = await SubcategoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).send({ msg: "Sub Category already exists" });
    }
    const newCategory = new SubcategoryModel({ category });
    await newCategory.save();
    res.status(200).send({ msg: "Sub Category saved successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
const CourseCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const existingCategory = await CoursecategoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).send({ msg: "Course Category already exists" });
    }
    const newCategory = new CoursecategoryModel({ category });
    await newCategory.save();
    res.status(200).send({ msg: "Course Category saved successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getMainCategory = async (req, res) => {
  try {
    const mainCategorys = await MaincategoryModel.find();
    res.status(200).send(mainCategorys);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const SubCategorys = await SubcategoryModel.find();
    res.status(200).send(SubCategorys);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
const getCourseCategory = async (req, res) => {
  try {
    const CourseCategorys = await CoursecategoryModel.find();
    res.status(200).send(CourseCategorys);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const deleteMainCategory=async (req, res) => {
    const { categoryID } = req.params;
  
    try {
      await MaincategoryModel.findByIdAndDelete({ _id: categoryID });
      res.send({ msg: "Main Category deleted successfully" });
    } catch (error) {
      res.send({ msg: "Error deleting" });
    }
  };
  const deleteSubCategory=async (req, res) => {
    const { categoryID } = req.params;
  
    try {
      await SubcategoryModel.findByIdAndDelete({ _id: categoryID });
      res.send({ msg: "Sub Category deleted successfully" });
    } catch (error) {
      res.send({ msg: "Error deleting" });
    }
  };
  const deleteCourseCategory=async (req, res) => {
    const { categoryID } = req.params;
  
    try {
      await CoursecategoryModel.findByIdAndDelete({ _id: categoryID });
      res.send({ msg: "Course Category deleted successfully" });
    } catch (error) {
      res.send({ msg: "Error deleting" });
    }
  };
module.exports = {
  MainCategory,
  SubCategory,
  CourseCategory,
  getMainCategory,
  getSubCategory,
  getCourseCategory,
  deleteMainCategory,
  deleteSubCategory,
  deleteCourseCategory
};
