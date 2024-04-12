const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    // _id : ObjectId,
    ID : String,
    PW : String,
    Name : String
  })
);

module.exports = User;