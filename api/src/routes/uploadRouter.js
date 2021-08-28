const express = require("express");
const uploadRouter = express.Router();

const { auth } = require("../middlewares/auth");

const multer = require("../middlewares/multer");

const uploadController = require("../controller/uploadController");

uploadRouter.post(
  "/create",
  auth,
  multer.upload.single("file"),
  uploadController.create
);

module.exports = uploadRouter;
