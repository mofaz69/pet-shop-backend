const { User } = require("../models/user-model");

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select("-password");
}

async function updateUser(userId, userData) {
  return User.findOneAndReplace({ _id: userId }, userData).select("-password");
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}
async function getUserById(userId) {
  const user = await User.findById(userId).select("-password");
  return user;
}

function savePetToUser(petId, userId) {
  return User.findByIdAndUpdate(
    userId,
    // pushes the petId to favoritesPets array
    { $push: { favoritePets: petId } },
    { returnDocument: "after" }
  );
}

function getUsers(filter = {}) {
  return User.find(filter).select("-password");
}

function removePetFromUser(petId, userId) {
  return User.findByIdAndUpdate(userId, { $pull: { favoritePets: petId } });
}

module.exports = {
  createUser,
  getUsers,
  savePetToUser,
  getUserByEmail,
  removePetFromUser,
  getUserById,
  updateUser,
};
