const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // id is auto-generated and called "_id"
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
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
  collection: { User },
  timestamps: true,
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
