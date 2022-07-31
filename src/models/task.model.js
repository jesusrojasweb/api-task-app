const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("task", taskSchema);
