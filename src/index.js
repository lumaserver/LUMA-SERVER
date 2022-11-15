require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongodbRoute = process.env.DB_ROUTE;

const userRouter = require("./routes/userRoutes");
const dollRouter = require("./routes/dollRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use("/api/user", userRouter);
app.use("/api/doll", dollRouter);


async function start() {
  try {
    await mongoose.connect(mongodbRoute);
    app.listen(PORT, () => {
      console.log(`API IS LISTENING ON PORT ${PORT}`);
    });
    console.log("Connection executed correctly");
  } catch (error) {
    console.log(`Error cannot connect DB: ${error.message}`);
  }
}

start();
