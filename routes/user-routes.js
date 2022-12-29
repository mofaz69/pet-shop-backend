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
userRouter.post("/login", async (request, response) => {
  // email: "user@example.com"
  // password: "123456"
  const { email, password } = request.body;

  if (!password || !email) {
    return res.status(400).send({ message: "Some fields are missing" });
  }

  // check if user exists in our database
  const result = USERS.find((user) => user.email === email);
  if (!result) {
    return response.status(400).send({ message: "Invalid Email or Password" });
  }

  // check if password is correct
  const passwordIsValid = bcrypt.compareSync(password, result.password);
  if (!passwordIsValid) {
    return response.status(400).send({ message: "Invalid Email or Password" });
  }

  response.json({
    email: result.email,
    id: result.id,
    firstName: result.firstName,
    lastName: result.lastName,
    phoneNumber: result.phoneNumber,
  });
});

// get data from body (email, plainPassword)
// hash password
// check in db for a match of both email and hashed password
// if found, return the user data (without the password)
// if not return error status, saying that username or password are incorrect

userRouter.post("/signup", userController.signup);

module.exports = { userRouter };
