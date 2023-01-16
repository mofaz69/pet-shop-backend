const petDal = require("../dal/pet-dal");
const userDal = require("../dal/user-dal");

function validatePetData(pet) {
  if (pet.id) {
    return "Cannot set pet id";
  }

  if (
    !pet.name ||
    !pet.type ||
    !pet.color ||
    !pet.height ||
    !pet.weight ||
    !pet.bio ||
    // falsy = null, undefined, 0, '', false
    // !undefined // true
    // !false // true
    pet.hypoallergenic === undefined || // true - valid, false - valid
    !pet.dietaryRestrictions ||
    !pet.breed ||
    !pet.imageUrl
  ) {
    return "pet must have:name, type, color, height, weight, bio, hypoallergenic, dietaryRestrictions, breed";
  }
}

async function createNewPet(req, res) {
  try {
    const pet = req.body;
    console.log(pet);
    const validationResult = validatePetData(pet);
    if (validationResult) {
      return res.status(400).json({ message: validationResult });
    }
    const hypoallergenic = pet.hypoallergenic === "Yes";
    const newPet = await petDal.createPet({ ...pet, hypoallergenic });
    res.json(newPet);
  } catch (err) {
    res.status(500).send(err);
  }
}

function updatePet(req, res) {
  // inputs
  const petId = req.params.petId;
  const petData = {
    ...req.body,
    hypoallergenic: req.body.hypoallergenic === "Yes",
  };

  // validate data
  const validationResult = validatePetData(petData);
  if (validationResult) {
    return res.status(400).send(validationResult);
  }

  petDal.updatePet(petId, petData);

  res.json(petData);
}

function findPetById(req, res) {
  const petId = req.params.petId; //1
  const pet = [].find((pet) => pet.id === petId);
  res.json(pet);
}

async function getAllPets(req, res) {
  console.log("getting all pets");
  const pets = await petDal.getAllPets();
  res.json(pets);
}

async function adoptPet(req, res) {
  const petId = req.params.petId;
  const ownerId = req.user._id;
  await petDal.adoptPet(petId, ownerId);
  res.json({ message: "adopted successfully!" });
}
async function returnPet(req, res) {
  const petId = req.params.petId;
  await petDal.returnPet(petId);
  res.json({ message: "returned pet successfully!" });
}

async function savePetToUser(req, res) {
  const petId = req.params.petId;
  const userId = req.user._id;
  await userDal.savePetToUser(petId, userId);
  res.json({ message: "Pet saved successfully!" });
}

async function removePetFromUser(req, res) {
  const petId = req.params.petId;
  const userId = req.user._id;
  await userDal.removePetFromUser(petId, userId);
  res.json({ message: "Pet removed successfully!" });
}

async function findPetByUserId(req, res) {
  const userId = req.params.userId;
  const pets = await petDal.getPetByUserId(userId);
  res.json(pets);
}

module.exports = {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  savePetToUser,
  returnPet,
  removePetFromUser,
  findPetByUserId,
};
