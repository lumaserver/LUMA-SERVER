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
      io.emit("changeAcolitAttributes", changedAcolit);
    } catch (error) {
      console.log(error);
      socket.emit("changeAcolitAttributes", error);
    }
  });

  //CHANGE ACOLIT ISINSIDE

  socket.on("changeCriptStatus", async (email) => {
    try {
      //console.log(email)
      const changedAcolitIsInside = await userService.changeCryptValue(email)

      const allUsers = await userService.getAllActiveUsers();
      joshua = allUsers.filter((allUsers) => {
        return allUsers.isJoshua == true;
      });
      io.emit("changeCriptStatus", changedAcolitIsInside);

      //io.to(joshua).emit("changeCriptStatus", changedAcolitIsInside);
      console.log(`Events Inside ${changedAcolitIsInside}`)
    } catch (error) {
      console.log(error);
      socket.emit("changeCriptStatus", error);
    }
  });

  //START DOLL MISSION
  socket.on("startDollMission", async () => {
    try {
      await dollService.createDollAndDollPiece()
        /*.then(async () => {
          const newDoll = await dollService.getAllDollPieces();
          console.log(newDoll)
        })*/
        const newDoll = await dollService.getAllDollPieces();
          console.log(newDoll)
      io.emit("startDollMission", newDoll);
    } catch (error) {
      console.log(error);
      socket.emit("startDollMissionError", error);
    }
  })

  //CHANGE DOLL MISSION STATUS
  socket.on("changeDollMissionStatus", async (data) => {
    try {
      const changeDollMissionStatus = await dollService.updateMissionStatus(data)
      //console.log(`events ${changeDollMissionStatus}`)
      io.emit("changeDollMissionStatus", changeDollMissionStatus);
    } catch (error) {
      console.log(error);
      socket.emit("changeDollMissionStatus", error);
    }
  });

  //CHANGE DOLL PIECES
  socket.on("changeDollPiece", async (data) => {
    try {
      const changeDollPiece = await dollService.updateDollPiece(data)
      //console.log(`events doll pieces ${changeDollPiece}`)
      io.emit("changeDollPiece", changeDollPiece);
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
cron.schedule('*/59 * * * *', async () => {
  try {
    await userService.updateAcolitResistanceAndConcentration()
    const modifyAllAcolit = await userService.getAllActiveUsers()
    console.log("*************************************************")
    io.emit('changeAllAcolitAttributes', modifyAllAcolit)
  } catch (error) {
    console.log(error);
  }

});

exports.socketEvents = events;