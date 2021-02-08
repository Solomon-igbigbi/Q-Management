const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const departmentSchema = new Schema({
  name: {
    type: String,
    required: "please enter a Department name",
    trim: true
  }
});

departmentSchema.index({
  name: "text"
});

module.exports = mongoose.model("Department", departmentSchema);
