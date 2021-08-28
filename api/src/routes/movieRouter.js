const express = require("express");

const { auth } = require("../middlewares/auth");

const moviesController = require("../controller/moviesController");

const moviesRouter = express.Router();

moviesRouter.get("/index", auth, moviesController.index);

moviesRouter.post("/create", auth, moviesController.create);

moviesRouter.put("/update/:id", auth, moviesController.update);

moviesRouter.delete("/remove/:id", auth, moviesController.remove);

module.exports = moviesRouter;
