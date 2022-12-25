// this file should contain user routes
const { Router } = require("express");
const userRouter = new Router();
const bcrypt = require("bcrypt");

const randomId = () => Math.random().toString(36).slice(2);

const saltRounds = 10;

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

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
  const result = USERS.find((user) => user.email === email);
  bcrypt.compareSync(password, result.password);
  // result: user / undefined
  if (!result) {
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

userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  // when we get the data from the browser, this is how it looks:
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

  const hashedPassword = await hashPassword(user.password);
  console.log(hashedPassword);
  USERS.push({
    id: randomId(),
    email: user.email,
    password: hashedPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
  });

  // TODO: return only relevant details
  res.json(USERS.at(-1));
});
module.exports = { userRouter };
