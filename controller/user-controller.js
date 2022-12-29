const { createUser, getUserByEmail } = require("../dal/user-dal");
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(saltRounds);
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

module.exports = { signup };
