// this file should contain user routes
const { Router } = require("express");
const userRouter = new Router();
const userController = require("../controller/user-controller");
const { requireAdmin } = require("../middleware/require-admin");
const { requireLogin } = require("../middleware/require-login");

userRouter.get("/", [requireLogin, requireAdmin], userController.getAllUsers);
// POST  localhost:3000/user/login
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.get("/search-pet", userController.searchPet);

module.exports = { userRouter };
