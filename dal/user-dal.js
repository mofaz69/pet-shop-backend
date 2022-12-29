const { User } = require("../models/user-model");

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select("-password");
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  createUser,
  getUserByEmail,
};
