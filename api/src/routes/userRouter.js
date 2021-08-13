const express = require("express");

const { authByRoles } = require("../middlewares/auth");

const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/list", authByRoles([0]), userController.index);

userRouter.post("/signup", userController.create);

userRouter.post("/login", userController.login);

module.exports = userRouter;
