const { Router, application } = require("express");
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

// http://localhost:3000/pets/1
// petId = 1
// params - parameters in the request' urls
petRouter.get("/:petId", (req, res) => {
  const petId = req.params.petId; //1
  const pet = PETS.find((pet) => pet.id === petId);
  res.json(pet);
});

petRouter.get("/", function (req, res) {
  console.log("getting all pets");

  // return response in json format
  res.json(PETS);
});

// petRouter.put("/:petId", (req, res) => {
//   const { image } = req.files;
//   if (!image) return res.sendStatus(400);
//   image.mv(__dirname + ":/petId" + image.name);
//   res.sendStatus(200);
// });
module.exports = { petRouter };
