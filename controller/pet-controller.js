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
  const petData = req.body;

  // validate data
  const validationResult = validatePetData(petData);
  if (validationResult) {
    return res.status(400).send(validationResult);
  }

  // find pet to edit
  const petToEdit = PETS.find((pet) => pet.id === petId);
  if (!petToEdit) {
    return res.status(400).send({ message: "Id not found" });
  }

  // update the pet
  for (const [key, value] of Object.entries(petData)) {
    petToEdit[key] = value;
  }

  res.json(petToEdit);
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
  const petId = req.body.petId;
  const ownerId = req.user._id;
  await petDal.adoptPet(petId, ownerId);
  res.json({ message: "adopted successfully!" });
}
async function unadoptPet(req, res) {
  const petId = req.body.petId;
  await petDal.adoptPet(petId);
  res.json({ message: "unadopted successfully!" });
}

async function savePetToUser(req, res) {
  const petId = req.body.petId;
  const userId = req.user._id;
  await userDal.savePetToUser(petId, userId);
  res.json({ message: "Pet saved successfully!" });
}

// const deletePet = async (req, res) => {
//   try {
//     const { petId } = req.params;
//     const deleted = await Pet.deletePetModal({ _id: petId });
//     if (deleted.deletedPet) {
//       res.send({ ok: true, deletedId: petId });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

module.exports = {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  savePetToUser,
  unadoptPet,
  // deletePet,
};
