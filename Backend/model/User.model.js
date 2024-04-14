const mongoose = require("mongoose");
const { connectionEndUser } = require("../db");

const enduserSchema = mongoose.Schema(
  {
    profileUrl: { type: "string" ,default:""},
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    number: { type: Number, required: true },
    cart:{type:Array,default:[]},
    orders: {type:Array,default:[]},
    verifytoken: {
      type: String,default:""
    },
    cartLength: { type: Number, default: 0 },
    timestamp: { type: Number, default: Date.now },
    randomString: { type: String,default:"" },
  },

  {
    versionKey: false,
  }
);

const EndUserModel = connectionEndUser.model("user", enduserSchema);

module.exports = { EndUserModel };
