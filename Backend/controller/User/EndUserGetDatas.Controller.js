const { encodeCategoryForURL, decodeCategoryFromURL } = require("../../ExtraUsedFunctions/DEcodedUrlComponent");
const { PostModel } = require("../../model/Post.model");

const { ProjectModel } = require("../../model/SubAdmin/Project.model");
const {
  StudyMaterialModel,
} = require("../../model/SubAdmin/StudyMaterial.model");

// const EndUsergetallstudymaterialsController = async (req, res) => {
//   try {
//     const studymaterials = await StudyMaterialModel.find({ approve: true });
//     res.status(200).send(studymaterials);
//   } catch (error) {
//     res.send(error.message);
//   }
// };
// STUDYMATRIAL SECTION START

const EndUsergetallstudymaterialsController = async (req, res) => {
  try {
    // Retrieve only data where 'approve' is true
    const {id, category, search, studymaterialCategory, subCategory } = req.query;
    let query = { approve: true };
    if (id) {
      // If ID is provided, fetch the course by ID directly
      const studymaterial = await StudyMaterialModel.findById(id);
      if (!studymaterial) {
        return res.status(404).json({ message: 'studymaterial not found' });
      }
      return res.status(200).json(studymaterial);
    }
    console.log(id);
    if (category) {
      query.MaterialCategory = decodeCategoryFromURL(category);
    }

    if (search) {
      query.TechnologiesUsed = {
        $elemMatch: { text: { $regex: search, $options: "i" } },
      };
    }
    // if (studymaterialCategory) {
    //   query.studymaterialCategory = studymaterialCategory;
    // }

    // if (subCategory) {
    //   query.subCategory = subCategory;
    // }
    const approvedMaterials = await StudyMaterialModel.find(query);
    res.status(200).json(approvedMaterials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// PROJECT SECTION START

const EndUsergetallProjectsController = async (req, res) => {
  try {
    const {id, category, search, courseCategory, subCategory } = req.query;
    let query = { approve: true };

    if (id) {
      // If ID is provided, fetch the course by ID directly
      const course = await ProjectModel.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json(course);
    }
    console.log(id);
    if (category) {
      query.mainCategory = decodeCategoryFromURL(category);
    }

    if (search) {
      query.TechnologiesUsed      = {
        $elemMatch: { text: { $regex: search, $options: "i" } },
      };
    }
    
    if (courseCategory) {
      query.courseCategory = courseCategory;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }
    const Projects = await ProjectModel.find(query);
    res.status(200).send(Projects);
  } catch (error) {
    res.send(error.message);
  }
};
// COURSE SECTION START
// const EndUsergetallCoursesController=async (req, res) => {
//   try {
//     const approvedPosts = await PostModel.find({ approve: true });
//     console.log(req.query);
//     // Check if category filter is provided in query parameters
//     // if (req.query.category) {
//     //   approvedPosts = approvedPosts.filter(material => material.mainCategory == req.query.category);
//     // }
//     console.log(req.query.category);
//     console.log(req.query.search);
//     // Check if search query is provided in query parameters
//     // if (req.query.search) {
//     //   const searchRegex = new RegExp(req.query.search, "i");
//     //   approvedPosts = approvedPosts.filter(material => material.tags.some(tag => searchRegex.test(tag.text)));
//     // }
//     res.status(200).send(approvedPosts);
//   } catch (error) {
//     res.send(error.message);
//   }
// };
const EndUsergetallCoursesController = async (req, res) => {
  try {
    const { id,category, search, courseCategory, subCategory } = req.query;
    let query = { approve: true };
    if (id) {
      // If ID is provided, fetch the course by ID directly
      const course = await PostModel.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    }  
    console.log(id);
    if (category) {
      query.mainCategory = decodeCategoryFromURL(category);
    }
    
    



    console.log(category);

    if (search) {
      query.tags = { $elemMatch: { text: { $regex: search, $options: "i" } } };
    }
    if (courseCategory) {
      query.courseCategory = courseCategory;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }

    const courses = await PostModel.find(query);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  EndUsergetallstudymaterialsController,
  EndUsergetallProjectsController,
  EndUsergetallCoursesController,
};
