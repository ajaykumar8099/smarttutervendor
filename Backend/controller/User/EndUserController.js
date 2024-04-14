const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { EndUserModel } = require("../../model/User.model");
const upload = require("../../middleware/multer");
const deleteFromS3 = require("../../config/deleteFromS3");
const secretKey = process.env.secretKey;
//email config
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "ranjansoumya413@gmail.com",
    pass: "lbvy lerv dnpl muxq",
  },
});

// Register Controller
const Registered = async (req, res) => {
  const { name, pass, email, number} = req.body;

  try {
    // Check if the user already exists

    const existingUser = await EndUserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ msg: "User already exists. Please choose a different mail." });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = new EndUserModel({
      email,
      pass: hashedPassword,
      name,
      number,
     
    });

    // Save the new user to the database
    await newUser.save();

    res.status(200).send({ msg: true});
  } catch (error) {
    // console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

//Login controller
const Login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await EndUserModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign({ userID: user._id }, secretKey,{ expiresIn: '1d' });
      res.status(200).send({ msg: true, token: token });
    } else {
      res.status(401).send({ msg: "Invalid credentials." });
    }
  } catch (error) {
    // console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};



//send email link controller
// const sendEmailController = async (req, res) => {
//   // console.log(req.body);

//   const { email } = req.body;

//   if (!email) {
//     res.status(401).json({ status: 401, msg: "Enter a valid email" });
//   }

//   try {
//     const userfind = await EndUserModel.findOne({ email });

//     //token generate for reset password
//     const token = jwt.sign({ _id: userfind._id }, secretKey, {
//       expiresIn: "120s",
//     });
//     const setusertoken = await EndUserModel.findByIdAndUpdate(
//       { _id: userfind._id },
//       { verifytoken: token },
//       { new: true }
//     );

//     if (setusertoken) {
//       const mailOptions = {
//         from: "ranjansoumya413@gmail.com",
//         to: email,
//         subject: "CODEXPRO Sending Email For Password Reset",
//         text: `This Link Valid for 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           // console.log("error", error);
//           res.status(401).json({ status: 401, msg: "Email not send" });
//         } else {
//           // console.log("Email sent", info.response);
//           res.status(201).json({ status: 201, msg: "Email sent Successfully" });
//         }
//       });
//     }

//     // console.log();
//   } catch (error) {
//     res.status(401).json({ status: 401, msg: "Invalid User" });
//   }
// };
const sendEmailController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await EndUserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "12d",
    });

    await EndUserModel.findByIdAndUpdate(
      { _id: user._id },
      { verifytoken: token },
      { new: true }
    );

    const mailOptions = {
      from: "ranjansoumya413@gmail.com",
      to: email,
      subject: "CODEXPRO Sending Email For Password Reset",
      text: `This Link Valid for 2 MINUTES http://localhost:3000/forgotpassword/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ status: 500, msg: "Email not sent" });
      } else {
        // console.log("Email sent:", info.response);
        return res
          .status(201)
          .json({ status: 201, msg: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, msg: "Internal Server Error" });
  }
};

//verify user for forgot password time
const verifyuserController = async (req, res) => {
  const { id, token } = req.params;
  // console.log(id, token);
  try {
    const validuser = await EndUserModel.findOne({
      _id: id,
      verifytoken: token,
    });
    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);

    if (verifyToken && validuser._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, msg: "Error valide user" });
    }

    // res.status(200).json({ status: 200, msg: "Verification successful" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ status: 500, msg: "Error valide user" });
  }
};

const changePasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { pass } = req.body;
  try {
    const validuser = await EndUserModel.findOne({
      _id: id,
      verifytoken: token,
    });
    const verifyToken = jwt.verify(token, secretKey);

    if (verifyToken && validuser._id) {
      const newpassword = await bcrypt.hash(pass, 10);
      const setnewuserpass = await EndUserModel.findByIdAndUpdate(
        { _id: id },
        { pass: newpassword }
      );
      setnewuserpass.save();

      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, msg: "Error valide user" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: "Error valide user" });
  }
};

const getSingleUser = async (req, res) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(token && token.split(" ")[1], secretKey);
  try {
    if (decoded) {
      const user = await EndUserModel.findById(decoded.userID);
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

const editDetailsController = async (req, res) => {
  const { id } = req.params;
  const user=await EndUserModel.findOne({_id:id});
 const {profileUrl}=req.body;
  try {
    await EndUserModel.findByIdAndUpdate({ _id: id }, req.body);
    if(profileUrl){
      const keysToDelete=extractKeysFromUrls([
        user.profileUrl
      ])
      await deleteFromS3(keysToDelete)
    }
 
    res.send({ msg: true });
  } catch (error) {
    res.send({ msg: false });
  }
};

// if i want to do cartfuncationality check in backend the code is 
// const editDetailsController = async (req, res) => {
//   const { id } = req.params;
//   const { profileUrl } = req.body;

//   try {
//     const user = await EndUserModel.findById(id);

//     // Check if the ID is already in the cart
//     const isAlreadyInCart = user.cart.some(item => item.ID === req.body.cart[0].ID);

//     // If the ID is already in the cart, do not add it again
//     if (isAlreadyInCart) {
//       return res.status(400).json({ msg: "Item is already in the cart." });
//     }

//     // Update the user's cart
//     user.cart.push(req.body.cart[0]);
//     await user.save();

//     // Optionally, handle profileUrl update logic

//     res.status(200).json({ msg: "Item added to cart successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error updating user details." });
//   }
// };

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

// find id and delete in cart 
const deleteFromCartController = async (req, res) => {
  const { id } = req.params; // ID of the user
  const { ID } = req.body; // ID of the item to be removed from the cart

  try {
    // Find the user by ID
    const user = await EndUserModel.findById({_id:id});

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the item exists in the cart
    const index = user.cart.findIndex(item => item.ID === ID);

    if (index === -1) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    // Remove the item from the cart
    user.cart.splice(index, 1);
   
    // Update the user document
    await user.save();

    res.status(200).json({ msg: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = {
  Registered,
  Login,
  sendEmailController,
  verifyuserController,
  changePasswordController,
  getSingleUser,
  editDetailsController,
  uploadImage,
  deleteFromCartController
};
