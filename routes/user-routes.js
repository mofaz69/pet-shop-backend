// this file should contain user routes
const { Router } = require("express");
const userRouter = new Router();
const bcrypt = require("bcrypt");
const userController = require("../controller/user-controller");
const { PetContext } = require("../../frontend/src/context/petContext");

const USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "ajhksdgajhksdgkqwdgkyausdfgkuays",
    firstName: "John",
    lastName: "Cohen",
    phoneNumber: "0585858585",
  },
];

// POST  localhost:3000/user/login
userRouter.post("/login", userController.login);

userRouter.post("/signup", userController.signup, filteredPets);

userRouter.get("/search-pet", userController.searchPet);

module.exports = { userRouter, PetContext };
