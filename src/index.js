require("dotenv").config();

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const lowerResistance = require('./services/sockets/socketEvents');

const mongodbRoute = process.env.DB_ROUTE;

const userRouter = require("./routes/userRoutes");
const dollRouter = require("./routes/dollRoutes");
const allDataRouter = require("./routes/allDataRoute");
const tokenRouter = require("./routes/tokenRouter");


const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 30000,
  cors: {
    origin: "*",
  },
});
exports.socketIO = io;

app.use(bodyParser.json());


app.use("/api/user", userRouter);
app.use("/api/doll", dollRouter);
app.use("/api/token", tokenRouter);

app.use("", allDataRouter);


async function start() {
  try {
    await mongoose.connect(mongodbRoute);
    server.listen(PORT, () => {
      console.log(`API IS LISTENING ON PORT ${PORT}`);
    });
    console.log("Connection executed correctly");
  } catch (error) {
    console.log(`Error cannot connect DB: ${error.message}`);
  }
}

require("./services/sockets/socketMain");
start();
