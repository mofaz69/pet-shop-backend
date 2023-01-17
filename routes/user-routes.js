const { Router } = require("express");
const userRouter = new Router();
const userController = require("../controller/user-controller");
const { requireAdmin } = require("../middleware/require-admin");
const { requireLogin } = require("../middleware/require-login");

userRouter.get("/", [requireLogin, requireAdmin], userController.getAllUsers);
userRouter.get("/:userId/full", userController.getUserById);
userRouter.put("/:userId", requireLogin, userController.updateUser);

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.get("/search-pet", userController.searchPet);

module.exports = { userRouter };
