const { Router, application } = require("express");
const {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  savePetToUser,
  returnPet,
  removePetFromUser,
  findPetByUserId,
} = require("../controller/pet-controller");
const { requireAdmin } = require("../middleware/require-admin");
const { requireLogin } = require("../middleware/require-login");
const petRouter = new Router();

petRouter.post("/", [requireLogin, requireAdmin], createNewPet);
petRouter.put("/:petId", [requireLogin, requireAdmin], updatePet);
petRouter.get("/:petId", findPetById);
petRouter.get("/user/:userId", findPetByUserId);
petRouter.get("/", getAllPets);
petRouter.post("/:petId/adopt", requireLogin, adoptPet);
petRouter.post("/:petId/return", requireLogin, returnPet);
petRouter.post("/:petId/save", requireLogin, savePetToUser);
petRouter.delete("/:petId/save", requireLogin, removePetFromUser);

module.exports = { petRouter };
