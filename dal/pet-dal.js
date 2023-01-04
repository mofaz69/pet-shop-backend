const { Pet } = require("../models/pet-model");

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
//get all pets (use find())

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  adoptPet,
};
