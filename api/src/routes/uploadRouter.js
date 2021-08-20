const express = require("express");
const uploadRouter = express.Router();

const multer = require("../middlewares/multer");

const uploadController = require("../controller/uploadController");

uploadRouter.post(
  "/create",
  multer.upload.single("file"),
  uploadController.create
);

module.exports = uploadRouter;
