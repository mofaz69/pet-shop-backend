const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: "",
  },
  fosterer: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: true,
  },
  dietaryRestrictions: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Pet = mongoose.model("pets", petSchema);

module.exports = { Pet };
