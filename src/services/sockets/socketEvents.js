const server = require("../../index");
const userService = require("../userService");
const dollService = require("../dollService");

const cron = require('node-cron');
const io = server.socketIO;

events = (socket) => {
  console.log({ Clientsocket: socket.id });
 

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
  let joshua = null;

  socket.on("changeAcolitAttributes", async (data) => {
    try {
      console.log(data)
      const changedAcolit = await userService.updateUser(data)
      if (data.idSocket != null) {
        const allUsers = await userService.getAllActiveUsers();
        joshua = allUsers.filter((allUsers) => {
          return allUsers.isJoshua == true;
        });
        io.to(joshua).emit("newUser", changedAcolit);
      }
      socket.broadcast.emit("changeAcolitAttributes", changedAcolit);
    } catch (error) {
      console.log(error);
      socket.emit("changeAcolitAttributes", error);
    }
  });

//CHANGE DOLL MISSION STATUS
  socket.on("changeDollMissionStatus", async (data) => {
    try {
      console.log(data)
      const changeDollMissionStatus = await dollService.updateMissionStatus(data)
      socket.broadcast.emit("changeDollMissionStatus", changeDollMissionStatus);
    } catch (error) {
      console.log(error);
      socket.emit("changeDollMissionStatus", error);
    }
  });

  //CHANGE DOLL PIECES
  socket.on("changeDollPiece", async (data) => {
    try {
      console.log(data)
      const changeDollPiece = await dollService.updateDollPiece(data)
      socket.broadcast.emit("changeDollPiece", changeDollPiece);
    } catch (error) {
      console.log(error);
      socket.emit("changeDollPiece", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
};

//CRON  para bajar resistencia y concentracion cada hora
cron.schedule('*/59 * * * *', async() => {
  try {
    await User.updateAcolitResistanceAndConcentration()
    const modifyAllAcolit = await userService.getAllActiveUsers()
    console.log("*************************************************")
    io.emit('changeAllAcolitAttributes', modifyAllAcolit)
  } catch (error) {
    console.log(error);
  }
  
});

exports.socketEvents = events;