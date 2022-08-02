const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  age: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
