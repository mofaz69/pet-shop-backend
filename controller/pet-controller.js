const { createPet, getPetById } = require("../dal/pet-dal");

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
    !pet.breed
  ) {
    return "pet must have:name, type, color, height, weight, bio, hypoallergenic, dietaryRestrictions, breed";
  }
}

// create new pet
petRouter.post("/", function (req, res) {
  const pet = req.body;
  const validationResult = validatePetData(pet);
  if (validationResult) {
    return res.status(400).send(validationResult);
  }

  // check if pet has all details

  PETS.push(pet);
  res.send("success");
});

petRouter.put("/:petId", (req, res) => {
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
});

// petRouter.put("/:petId", (req, res) => {
//   const { image } = req.files;
//   if (!image) return res.sendStatus(400);
//   image.mv(__dirname + ":/petId" + image.name);
//   res.sendStatus(200);
// });
module.exports = { petRouter };
