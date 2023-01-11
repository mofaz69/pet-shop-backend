const { Pet } = require("../models/pet-model");
const { User } = require("../models/user-model");

async function createPet(pet) {
  const newPet = await Pet.create(pet);
  return newPet;
}

function getPetById(petId) {
  return Pet.findOne({ petId });
}

function getAllPets() {
  return Pet.find();
}
function adoptPet(petId, ownerId) {
  console.log(petId);
  console.log(ownerId);
  return Pet.findByIdAndUpdate(petId, { owner: ownerId });
}

function unadoptPet(petId) {
  console.log(petId);
  return Pet.findByIdAndUpdate(petId, { owner: "" });
}

//get all pets (use find())

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  adoptPet,
};
