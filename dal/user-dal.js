const { User } = require("../models/user-model");

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select("-password");
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

function savePetToUser(petId, userId) {
  return User.findByIdAndUpdate(userId, { $push: { favoritePets: petId } });
}

function getUsers(filter = {}) {
  return User.find(filter).select("-password");
}

module.exports = {
  createUser,
  getUsers,
  savePetToUser,
  getUserByEmail,
};
