// this file should contain user routes
const { Router } = require("express");
const userRouter = new Router();
const bcrypt = require("bcrypt");
const userController = require("../controller/user-controller");

// function hashPassword(plainPassword) {
//   // hash password using bcrypt

//   const hashedPassword = plainPassword;

//   return hashedPassword;
// }

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

// get data from body (email, plainPassword)
// hash password
// check in db for a match of both email and hashed password
// if found, return the user data (without the password)
// if not return error status, saying that username or password are incorrect

userRouter.post("/signup", userController.signup);

module.exports = { userRouter };
