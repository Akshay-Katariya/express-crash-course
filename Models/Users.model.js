const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: (props) =>
        `Please enter correct email id ${props.value} is invalid email`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
