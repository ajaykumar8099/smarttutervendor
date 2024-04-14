
const { adminModel } = require("../../model/Admin.model");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
  const { name, pass, email, number, isVerified,profileUrl } = req.body;

  try {
    // Check if the user already exists

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ msg: "User already exists. Please choose a different mail." });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = new adminModel({
      email,
      pass: hashedPassword,
      name,
      number,
      isVerified,
      profileUrl
    });

    // Save the new user to the database
    await newUser.save();

    res.status(200).send({ msg: "User registered successfully." });
  } catch (error) {
    // console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};


//Login controller
const Login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    
    const user = await adminModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign({ userID: user._id }, secretKey,{ expiresIn: '1d' });
      res.status(200).send({ msg: "Login successful", token: token });
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
//     const userfind = await adminModel.findOne({ email });

//     //token generate for reset password
//     const token = jwt.sign({ _id: userfind._id }, secretKey, {
//       expiresIn: "120s",
//     });
//     const setusertoken = await adminModel.findByIdAndUpdate(
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
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "120s",
    });

    await adminModel.findByIdAndUpdate(
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
    const validuser = await adminModel.findOne({ _id: id, verifytoken: token });
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
    const validuser = await adminModel.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, secretKey);

    if (verifyToken && validuser._id) {
      const newpassword = await bcrypt.hash(pass, 10);
      const setnewuserpass = await adminModel.findByIdAndUpdate(
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
      const user = await adminModel.findById(decoded.userID);
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
  const user=await adminModel.findOne({_id:id});
  const {profileUrl}=(req.body);
  try {
    await adminModel.findByIdAndUpdate({ _id: id }, req.body);
    if(profileUrl){
      const keysToDelete=extractKeysFromUrls([
        user.profileUrl
      ])
      await deleteFromS3(keysToDelete)
    }
  
    res.send({ msg: " Edit successfully" });

  } catch (error) {
    res.send({ msg: "Error updating" });
  }
};
module.exports = {
  Registered,
  Login,
  sendEmailController,
  verifyuserController,
  changePasswordController,
  getSingleUser,
  editDetailsController
};
