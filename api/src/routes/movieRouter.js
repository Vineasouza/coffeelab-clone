const express = require("express");

const moviesController = require("../controller/moviesController");

const moviesRouter = express.Router();

moviesRouter.get("/index", moviesController.index);

moviesRouter.post("/create", moviesController.create);

moviesRouter.put("/update/:id", moviesController.update);

moviesRouter.delete("/remove/:id", moviesController.remove);

module.exports = moviesRouter;
