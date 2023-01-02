const { Pet } = require("../models/pet-model");

async function createPet(pet) {
  await Pet.create(pet);
  return Pet.findById({ petId: pet.petId });
}

function getPetById(petId) {
  return Pet.findOne({ petId });
}

//get all pets (use find())

module.exports = {
  createPet,
  getPetById,
};
