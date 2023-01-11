const { User } = require("../models/user-model");

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select("-password");
}

function getUserByEmail(email) {
  return User.findOne({ email });
}

function savePetToUser(petId, userId) {
  return User.findByIdAndUpdate(userId, { $push: { favoritePets: petId } });
}

module.exports = {
  createUser,
  savePetToUser,
  getUserByEmail,
};
