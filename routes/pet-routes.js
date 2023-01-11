const { Router, application } = require("express");
const {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  savePetToUser,
} = require("../controller/pet-controller");
const { requireLogin } = require("../middleware/require-login");
const petRouter = new Router();

petRouter.post("/", requireLogin, createNewPet);
petRouter.put("/:petId", updatePet);
// endpoint: GET + http://localhost:3000/pets/1
petRouter.get("/:petId", findPetById);
petRouter.get("/", getAllPets);
petRouter.post("/adopt", requireLogin, adoptPet);
petRouter.post("/save", requireLogin, savePetToUser);

module.exports = { petRouter };
