const jwt = require("jsonwebtoken");
const userDal = require("../dal/user-dal");
const bcrypt = require("bcrypt");
const { searchPetByQuery, getPetsByUserId } = require("../dal/pet-dal");
const { Pet } = require("../models/pet-model");

async function hashPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    res.status(500).send(err);
  }
}

function validateUserData(user) {
  try {
    if (
      !user.password ||
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.phoneNumber
    ) {
      return "Some fields are missing";
    }

    if (user.password !== user.passwordRepeat) {
      return "Passwords do not match";
    }
    if (user.password.length < 6) {
      return "Passwords too short, minimum 6 chars";
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUserData = req.body;
    const userId = req.params.userId;

    const validationErrorMessage = validateUserData(updatedUserData);
    if (validationErrorMessage) {
      return res.status(400).send({ message: validationErrorMessage });
    }

    if (updatedUserData.email !== req.user.email) {
      const emailAlreadyExist = await userDal.getUserByEmail(
        updatedUserData.email
      );
      if (emailAlreadyExist) {
        return res
          .status(400)
          .send({ message: "New email address already used" });
      }
    }

    const hashedPassword = await hashPassword(updatedUserData.password);
    const updatedUser = await userDal.updateUser(userId, {
      ...updatedUserData,
      password: hashedPassword,
      isAdmin: req.user.isAdmin,
    });
    res.json(updatedUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

async function signup(req, res) {
  try {
    const user = req.body;

    const validationErrorMessage = validateUserData(user);
    if (validationErrorMessage) {
      return res.status(400).send({ message: validationErrorMessage });
    }

    const isUserExist = await userDal.getUserByEmail(user.email);
    if (isUserExist) {
      return res.status(400).send({ message: "Email already exist" });
    }

    const hashedPassword = await hashPassword(user.password);
    const newUser = await userDal.createUser({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });
    res.json(newUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!password || !email) {
      return res.status(400).send({ message: "Some fields are missing" });
    }
    const user = await userDal.getUserByEmail(email);
    if (!user) {
      return response
        .status(400)
        .send({ message: "Invalid Email or Password" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return response
        .status(400)
        .send({ message: "Invalid Email or Password" });
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
  } catch (err) {
    res.status(500).send(err);
  }
};

async function searchPet(req, res) {
  try {
    const { search } = req.query;
    const result = await searchPetByQuery(search);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userDal.getUsers();
    const ownedPets = {};
    for (const user of users) {
      ownedPets[user._id] = await getPetsByUserId(user._id);
    }
    res.json({ users, ownedPets });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  const { userId } = req.params;
  try {
    const user = await userDal.getUserById(userId);
    res.json({
      user: { ...user.toObject(), ownedPets: await getPetsByUserId(user._id) },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  signup,
  login,
  searchPet,
  getAllUsers,
  getUserById,
  updateUser,
};
