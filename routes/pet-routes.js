const { Router } = require("express");
const path = require("path");
const multer = require("multer");
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

const staticFilesFolder = path.join(process.cwd(), "static");
const tempDir = path.join(staticFilesFolder, "temp");
const upload = multer({ dest: tempDir });

petRouter.post(
  "/",
  [requireLogin, requireAdmin, upload.single("image")],
  createNewPet
);
petRouter.put(
  "/:petId",
  [requireLogin, requireAdmin, upload.single("image")],
  updatePet
);
petRouter.get("/:petId", findPetById);
petRouter.get("/user/:userId", findPetByUserId);
petRouter.get("/", getAllPets);
petRouter.post("/:petId/adopt", requireLogin, adoptPet);
petRouter.post("/:petId/return", requireLogin, returnPet);
petRouter.post("/:petId/save", requireLogin, savePetToUser);
petRouter.delete("/:petId/save", requireLogin, removePetFromUser);

module.exports = { petRouter };
