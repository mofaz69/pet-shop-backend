const { Router, application } = require("express");
const {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  savePetToUser,
  unadoptPet,
} = require("../controller/pet-controller");
const { requireAdmin } = require("../middleware/require-admin");
const { requireLogin } = require("../middleware/require-login");
const petRouter = new Router();

petRouter.post("/", [requireLogin, requireAdmin], createNewPet);
petRouter.put("/:petId", updatePet);
// endpoint: GET + http://localhost:3000/pets/1
petRouter.get("/:petId", findPetById);
petRouter.get("/", getAllPets);
petRouter.post("/adopt", requireLogin, adoptPet);
petRouter.post("/unadopt", requireLogin, unadoptPet);
petRouter.post("/save", requireLogin, savePetToUser);

module.exports = { petRouter };
