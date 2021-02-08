const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const counterSchema = new Schema({
  name: {
    type: String,
    required: "please enter a Counter name",
    trim: true
  }
});

counterSchema.index({
  name: "text"
});

module.exports = mongoose.model("Counter", counterSchema);
