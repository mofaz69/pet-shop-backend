const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, searchPet } = require("../dal/user-dal");
const bcrypt = require("bcrypt");
const { Pet } = require("../models/pet-model");

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

async function signup(req, res) {
  try {
    console.log("Registering user");
    const user = req.body;

    // validate user object
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
    const isUserExist = await getUserByEmail(user.email);
    if (isUserExist) {
      return res.status(400).send({ message: "Email already exist" });
    }

    const hashedPassword = await hashPassword(user.password);
    const newUser = await createUser({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });

    // TODO: return only relevant details
    res.json(newUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

const login = async (request, response) => {
  const { email, password } = request.body;

  if (!password || !email) {
    return res.status(400).send({ message: "Some fields are missing" });
  }

  // check if user exists in our database
  const user = await getUserByEmail(email);
  if (!user) {
    return response.status(400).send({ message: "Invalid Email or Password" });
  }

  // check if password match
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return response.status(400).send({ message: "Invalid Email or Password" });
  }
  const userData = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    favoritePets: user.favoritePets,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(userData, process.env.JWT, { expiresIn: "2 days" });
  const twoDays = 2 * 24 * 60 * 60 * 1000;
  response.cookie("jwt", token, { secure: true, maxAge: twoDays });

  response.json(userData);
};

async function searchPet(req, res) {
  try {
    const { search } = req.query;
    const result = await Pet.searchPet(search);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.code).json({ error: err.error });
  }
}

module.exports = postController;

module.exports = { signup, login, searchPet };
