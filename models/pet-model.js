const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  // id is auto-generated and called "_id"
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
  picture: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
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

async function deletePetModel(petId) {
  try {
    const deleted = await Pet.deleteOne({ _id: petId });
    console.log(deleted);
    return deleted;
  } catch (err) {
    console.log(err);
  }
}
const Pet = mongoose.model("pets", petSchema, deletePetModel);

module.exports = { Pet };
