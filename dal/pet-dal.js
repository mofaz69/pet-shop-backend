const { Pet } = require("../models/pet-model");

// async function updateTypes() {
//   const pets = await getAllPets();
//   for (const pet of pets) {
//     pet.weight = +pet.weight;
//     pet.height = pet.height;
//     await Pet.findByIdAndUpdate(pet._id, {
//       weight: +pet.weight,
//       height: +pet.height,
//     });
//     console.log("saved: " + pet.name);
//   }
// }
// updateTypes();

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
  console.log(petId);
  console.log(ownerId);
  return Pet.findByIdAndUpdate(petId, { owner: ownerId });
}

function returnPet(petId) {
  console.log(petId);
  return Pet.findByIdAndUpdate(petId, { owner: "" });
}

function searchPetByQuery(query) {
  return Pet.find(query);
}

function getPetsByUserId(userId) {
  return Pet.find({ owner: userId });
}

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  searchPetByQuery,
  adoptPet,
  updatePet,
  returnPet,
  getPetsByUserId,
};
