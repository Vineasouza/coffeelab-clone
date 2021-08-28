const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRouter = require("./src/routes/userRouter");
const moviesRouter = require("./src/routes/movieRouter");
const uploadRouter = require("./src/routes/uploadRouter");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/movies", moviesRouter);
app.use("/upload", uploadRouter);

// Compartilhando a pasta uploads para upload de imagens
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.listen(process.env.PORT || 3000, (l) => {
  console.clear();
  console.log("Running server... o/\n");
});
