const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// MongoDB connection URLs from environment variables
const mongoSubadminURL = process.env.mongosubadminURL;
const mongoAdminURL = process.env.mongoadminURL;
const mongoEndUserURL=process.env.mongoenduserURL;
// Connect to the subadmin database
const connectionEndUser = mongoose.createConnection(mongoEndUserURL);
connectionEndUser.on("error",console.error.bind(console, "Connection error:"));
connectionEndUser.once("open",()=> {console.log("Connected to the enduser database");});

// Connect to the subadmin database
const connectionSubadmin = mongoose.createConnection(mongoSubadminURL);
connectionSubadmin.on("error",console.error.bind(console, "Connection error:"));
connectionSubadmin.once("open",()=> {console.log("Connected to the subadmin database");});


// Connect to the admin database
const connectionAdmin = mongoose.createConnection(mongoAdminURL);
connectionAdmin.on("error",console.error.bind(console,"Connection error:"));
connectionAdmin.once("open",()=> {console.log("Connected to the admin database");});

// Export connections for use in other modules
module.exports = { connectionSubadmin, connectionAdmin,connectionEndUser };

