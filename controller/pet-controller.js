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
    pet.hypoallergenic === undefined ||
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
  try {
    const petId = req.params.petId;
    const petData = {
      ...req.body,
      hypoallergenic: req.body.hypoallergenic === "Yes",
    };

    const validationResult = validatePetData(petData);
    if (validationResult) {
      return res.status(400).send(validationResult);
    }

    petDal.updatePet(petId, petData);

    res.json(petData);
  } catch (err) {
    res.status(500).send(err);
  }
}

function findPetById(req, res) {
  try {
    const petId = req.params.petId;
    const pet = [].find((pet) => pet.id === petId);
    res.json(pet);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await petDal.getAllPets();
    res.json(pets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function adoptPet(req, res) {
  try {
    const petId = req.params.petId;
    const ownerId = req.user._id;
    await petDal.adoptPet(petId, ownerId);
    res.json({ message: "adopted successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function returnPet(req, res) {
  try {
    const petId = req.params.petId;
    await petDal.returnPet(petId);
    res.json({ message: "returned pet successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function savePetToUser(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.user._id;
    await userDal.savePetToUser(petId, userId);
    res.json({ message: "Pet saved successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function removePetFromUser(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.user._id;
    await userDal.removePetFromUser(petId, userId);
    res.json({ message: "Pet removed successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function findPetByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const pets = await petDal.getPetByUserId(userId);
    res.json(pets);
  } catch (err) {
    res.status(500).send(err);
  }
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
