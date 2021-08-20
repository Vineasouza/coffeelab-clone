const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const userRouter = require("./src/routes/userRouter");
const moviesRouter = require("./src/routes/movieRouter");
const uploadRouter = require("./src/routes/uploadRouter");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Compartilhando a pasta public para upload de imagens
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/movies", moviesRouter);
app.use("/upload", uploadRouter);

app.listen(process.env.PORT || 3000, (l) => {
  console.clear();
  console.log("Running server... o/\n");
});
