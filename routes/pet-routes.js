const { Router, application } = require("express");
const {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
} = require("../controller/pet-controller");
const petRouter = new Router();

//Type (dog, cat), Name, Adoption Status, Picture, Height, Weight, Color, Bio, Hypoallergenic (yes/no), dietary restrictions,
// breed of animal (Poodle, Siamese)
const PETS = [
  {
    id: "1",
    type: "cat",
    name: "avi",
    color: "white",
    adoptionStatus: "",
    picture: "",
    height: 182,
    weight: 80,
    bio: "found in east jerusalem",
    hypoallergenic: false,
    dietaryRestrictions: "none",
    breed: "Siamese",
  },
];

petRouter.post("/", createNewPet);
petRouter.put("/:petId", updatePet);
// http://localhost:3000/pets/1
petRouter.get("/:petId", findPetById);

petRouter.get("/", getAllPets);

// petRouter.put("/:petId", (req, res) => {
//   const { image } = req.files;
//   if (!image) return res.sendStatus(400);
//   image.mv(__dirname + ":/petId" + image.name);
//   res.sendStatus(200);
// });
module.exports = { petRouter };
