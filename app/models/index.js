const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.reservation = require("./reservation.model");
db.user = require("./user.model");

module.exports = db;