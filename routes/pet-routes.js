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

// petRouter.put("/:petId", (req, res) => {
//   const { image } = req.files;
//   if (!image) return res.sendStatus(400);
//   image.mv(__dirname + ":/petId" + image.name);
//   res.sendStatus(200);
// });
module.exports = { petRouter };
