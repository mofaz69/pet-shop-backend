const { Pet } = require("../models/pet-model");

// (async function () {
//   const pets = await Pet.find();
//   for (const pet of pets) {
//     await Pet.findByIdAndUpdate(pet.id, { fosterer: "" });
//   }
// })();

async function createPet(pet) {
  const newPet = await Pet.create(pet);
  return newPet;
}

async function updatePet(petId, petData) {
  console.log(petId);
  console.log(petData);
  return Pet.findByIdAndUpdate(petId, petData);
}

function getPetById(petId) {
  return Pet.findOne({ petId });
}

async function getAllPets() {
  return await Pet.find();
}
function adoptPet(petId, ownerId) {
  return Pet.findByIdAndUpdate(petId, { owner: ownerId });
}

function fosterPet(petId, fostererId) {
  return Pet.findByIdAndUpdate(petId, { fosterer: fostererId });
}

function returnPet(petId) {
  console.log(petId);
  return Pet.findByIdAndUpdate(petId, { owner: "" });
}
function returnPetFromFoster(petId) {
  return Pet.findByIdAndUpdate(petId, { fosterer: "" });
}

function searchPetByQuery(query) {
  return Pet.find(query);
}

function getPetsByUserId(userId) {
  return Pet.find({ owner: userId });
}

module.exports = {
  returnPetFromFoster,
  createPet,
  getAllPets,
  getPetById,
  searchPetByQuery,
  adoptPet,
  fosterPet,
  updatePet,
  returnPet,
  getPetsByUserId,
};
