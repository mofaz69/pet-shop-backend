// this file should contain user routes
const { Router } = require("express");
const userRouter = new Router();

const randomId = () => Math.random().toString(36).slice(2);

function hashPassword(plainPassword) {
  // hash password using bcrypt
  const hashedPassword = plainPassword;

  return hashedPassword;
}

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

/// login \ signin
// post | /signin

// get data from body (email, plainPassword)
// hash password
// check in db for a match of both email and hashed password
// if foud, return the user data (without the password)
// if not return error status, saying that username or password are incorrect

userRouter.post("/signup", (req, res) => {
  const user = req.body;
  //   {
  //     email: "user@example.com",
  //     password: "123456",
  //     passwordRepeat: "123456",
  //     firstName: "John",
  //     lastName: "Cohen",
  //     phoneNumber: "0585858585",
  //   },
  //
  console.log("Registering user");

  // validate user object
  // // check password length
  // check that two passwords match
  // check email
  if (
    !user.password ||
    !user.email ||
    !user.firstName ||
    !user.lastName ||
    !user.phoneNumber
  ) {
    return res.status(400).send({ message: "Some fields are missing" });
  }
  if (user.password !== user.passwordRepeat) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  if (user.password.length < 6) {
    return res
      .status(400)
      .send({ message: "Passwords too short, minimum 6 chars" });
  }

  if (USERS.find((u) => u.email === user.email)) {
    return res.status(400).send({ message: "Email already exist" });
  }

  const hashedPassword = hashPassword(user.password);
  USERS.push({
    id: randomId(),
    email: user.email,
    password: hashedPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
  });

  res.json(USERS.at(-1));
});
module.exports = { userRouter };

// this file should contain user routes

/// login \ signin

// register \ signup
