const express = require("express");
const cors = require("cors");
// const  WebSocket  = require("ws");
const AWS = require("aws-sdk");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const region = process.env.region;
const Bucket = process.env.Bucket;

const { auth } = require("./middleware/auth.middleware");
const { postRouter } = require("./routes/subadmin/Post.routes");
const { adminRoute } = require("./routes/admin/User.routes");
const { subAdminsRoute } = require("./routes/admin/Subadmis.routes");
const { subadminuserRoute } = require("./routes/subAdmin/User.routes");
const { userRoute } = require("./routes/user/User.routes");
const { categoryRoute } = require("./routes/admin/Categorys.routes");
const { projectRouter } = require("./routes/subadmin/Project.routes");
const { projectAdminRoutes } = require("./routes/admin/Projects.routes");
const {
  studymaterialRouter,
} = require("./routes/subadmin/StudyMaterial.routes");
const {
  studymaterialAdminRoutes,
} = require("./routes/admin/StudyMaterial.routes");
const { default: mongoose } = require("mongoose");
const { PostModel } = require("./model/Post.model");
const { ProjectModel } = require("./model/SubAdmin/Project.model");
const { createCipheriv } = require("crypto");
const { StudyMaterialModel } = require("./model/SubAdmin/StudyMaterial.model");
const {
  adminModel,
  MaincategoryModel,
  SubcategoryModel,
  CoursecategoryModel,
} = require("./model/Admin.model");
const { SubAdminModel } = require("./model/SubAdmin.model");
const { EndUserModel } = require("./model/User.model");

const app = express();
app.use(cors());
app.use(express.json());
// Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // You can set other CORS headers as needed
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
// Create a HTTP server instance from the Express app
const server = createServer(app);
// const io=new Server(server);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const createChangeStream = (model, io) => {
  const changeStream = model.watch();

  changeStream.on("change", (change) => {
    console.log("Change occurred:", change);
    io.emit("dataChange", change);
  });
};



//admin
createChangeStream(adminModel, io);
createChangeStream(MaincategoryModel, io);
createChangeStream(SubcategoryModel, io);
createChangeStream(CoursecategoryModel, io);
//subadmin
createChangeStream(PostModel, io);
createChangeStream(ProjectModel, io);
createChangeStream(StudyMaterialModel, io);
createChangeStream(SubAdminModel, io);
//user
createChangeStream(EndUserModel, io);
// Socket.IO server event handlers
// io.on("connection", (socket) => {
//   console.log("Client connected to Socket.IO server");

//   // Handle incoming messages from client
//   socket.on("message", (message) => {
//     console.log("Received message from client:", message);

//     // Process the message if needed
//   });

//   // Handle Socket.IO connection closing
//   socket.on("disconnect", () => {
//     console.log("Client disconnected from Socket.IO server");
//   });
// });
// Create WebSocket server instance
// const wss = new WebSocket.Server({ server });

// WebSocket server event handlers
// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket server");

//   // Handle incoming messages from client
//   ws.on("message", (message) => {
//     console.log("Received message from client:", message);

//     // Process the message if needed
//   });

//   // Handle WebSocket connection closing
//   ws.on("close", () => {
//     console.log("Client disconnected from WebSocket server");
//   });
// });
// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

// Create S3 service object
const s3 = new AWS.S3();

// Define a route to list objects in the S3 bucket
app.get("/list-objects", (req, res) => {
  let total = 0;

  const params = {
    Bucket: Bucket,
  };

  s3.listObjects(params, (err, data) => {
    if (err) {
      console.error("Error listing objects in S3 bucket:", err);
      res.status(500).send("Error listing objects in S3 bucket");
    } else {
      console.log("Objects in S3 bucket:");
      data.Contents.forEach((object) => {
        // total = total + 1;
        // console.log(total);
        console.log(object.Key);
      });
      res.send(
        "Objects listed in S3 bucket. Check server console for details."
      );
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcom Sub admin backend");
});

/*===================================
==============Admin Routes===========
====================================*/
app.use("/admin", adminRoute);
app.use("/all-sub-admins", subAdminsRoute);
app.use("/category", categoryRoute);
app.use("/adminproject", projectAdminRoutes);
app.use("/adminstudymaterial", studymaterialAdminRoutes);
/*===================================
==============User Routes===========
====================================*/
app.use("/enduser", userRoute);

/*===================================
==============SubAdmin Routes===========
====================================*/
app.use("/subadmin", subadminuserRoute);
app.use(auth);
app.use("/post", postRouter);
app.use("/project", projectRouter);
app.use("/studymaterial", studymaterialRouter);


server.listen(process.env.PORT, async () => {
  try {
    console.log(`Server listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log("No Connection");
  }
});

// Example function to send message to clients
// function notifyClients(message) {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// }
// const wss = new WebSocket.Server({ server });

// // WebSocket server event handlers
// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket server");

//   // Handle incoming messages from client
//   ws.on("message", (message) => {
//     console.log("Received message from client:", message);

//     // Process the message if needed
//   });

//   // Handle WebSocket connection closing
//   ws.on("close", () => {
//     console.log("Client disconnected from WebSocket server");
//   });
// });
