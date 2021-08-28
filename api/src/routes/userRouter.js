const express = require("express");

const { authByRoles } = require("../middlewares/auth");

const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup", userController.create);

userRouter.post("/login", userController.login);

module.exports = userRouter;
