const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

// Called before saving a user
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
