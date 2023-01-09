const { Router, application } = require("express");
const {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
} = require("../controller/pet-controller");
const { requireLogin } = require("../middleware/require-login");
const petRouter = new Router();

petRouter.post("/", requireLogin, createNewPet);
petRouter.put("/:petId", updatePet);
// http://localhost:3000/pets/1
petRouter.get("/:petId", findPetById);

petRouter.get("/", getAllPets);

petRouter.post("/adopt", requireLogin, adoptPet);

module.exports = { petRouter };
