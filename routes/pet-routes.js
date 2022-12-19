const { Router } = require("express");
const petRouter = new Router();

//Type (dog, cat), Name, Adoption Status, Picture, Height, Weight, Color, Bio, Hypoallergenic (yes/no), dietary restrictions,
// breed of animal (Poodle, Siamese)
const PETS = [
  {
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

petRouter.get("/", function (req, res) {
  console.log("getting all pets");

  // return response in json format
  res.json(PETS);
});

petRouter.post("/", function (req, res) {
  const pet = req.body;
  // check if pet has all details
  PETS.push(pet);
  res.send("success");
});

module.exports = { petRouter };
