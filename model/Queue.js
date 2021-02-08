const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const queueSchema = new Schema({
  name: {
    type: String,
    required: "please enter your first name"
  },

  department: {
    type: String,
    required: "please select a department"
  },
  token: String,
  called: String,
  counter: String
});

queueSchema.index({
  name: "text",
  department: "text",
  token: "text",
  called: "text",
  counter: "text"
});

module.exports = mongoose.model("Queue", queueSchema);
