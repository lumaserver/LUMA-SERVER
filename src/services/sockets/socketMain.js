const server = require("../../index");
const io = server.socketIO;
const jwt = require('jsonwebtoken');

const socketEvents = require("./socketEvents").socketEvents;

io.use(function (socket, next) {
    //console.log(socket)
  if (socket.handshake.query && socket.handshake.query.accessToken) {
    console.log(`If socket ${socket.handshake.query.accessToken}`)
    jwt.verify(
      socket.handshake.query.accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", socketEvents);

//io.on("connection", socketEvents)

module.exports = io;
