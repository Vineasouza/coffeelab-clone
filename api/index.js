const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
// const uuid = require("uuid");

const userRouter = require("./src/routes/userRouter");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(process.env.PORT || 3000, (l) => {
  console.clear();
  console.log("Running server... o/\n");
});
