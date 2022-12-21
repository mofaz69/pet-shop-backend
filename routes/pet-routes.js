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

// exports.CreateUser = (PETS) => {
//   const user = new User(PETS);
//   return user.save();
// };

// exports.getById = (req, res) => {
//   UserModel.findById(req.params.userId).then((results) => {
//     res.status(200).send(results);
//   });
// };
// exports.findById = (id) => {
//   return User.findById(id).then((results) => {
//     results = result.toJSON();
//     delete results._id;
//     delete results._v;
//     return results;
//   });
// };

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

petRouter.post("/", function (req, res) {
  const pet = req.body;
  // check if pet has all details
  PETS.push(pet);
  res.send("success");
});

module.exports = { petRouter };
