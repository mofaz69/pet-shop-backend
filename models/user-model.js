const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  favoritePets: {
    type: [String],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
