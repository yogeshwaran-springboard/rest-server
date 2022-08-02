const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = Schema({
  title: String,
  description: String,
  completed: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo };
