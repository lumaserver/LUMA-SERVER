const User = require('../userService');
const server = require("../../index");

const cron = require('node-cron');
const io = server.socketIO;

//import io from './socketMain'
//const io = server.socketIO;

events = (socket) => {
  console.log({ Clientsocket: socket.id });
  socket.emit("new_user", socket.id);

  socket.on("slider", (data) => {
    console.log(data);
    socket.broadcast.emit("slider", data);
  });
  // TEST BROADCAST
  socket.on("test_broadcast", async (data) => {
    try {
      socket.broadcast.emit("test_broadcast", data);
    } catch (error) {
      console.log(error);
      socket.emit("test_broadcastError", error);
    }
    
  });

  //CHANGE USER DATA
  socket.on("changeAcolitAttributes", async (data) => {
    try {
      console.log(data)
      const changedAcolit = await User.updateUser(data)
      socket.broadcast.emit("changeAcolitAttributes", changedAcolit);
    } catch (error) {
      console.log(error);
      socket.emit("changeAcolitAttributes", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
};

//CRON  para bajar resistencia y concentracion cada hora
/*cron.schedule('* * * *', async() => {
  try {
    await User.updateAcolitResistanceAndConcentration()
    const modifyAllAcolit = await User.getAllActiveUsers()
    console.log("*************************************************")
    io.emit('changeAllAcolitAttributes', modifyAllAcolit)
  } catch (error) {
    console.log(error);
  }
  
});*/

exports.socketEvents = events;