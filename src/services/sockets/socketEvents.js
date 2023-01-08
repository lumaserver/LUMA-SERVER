const server = require("../../index");
const userService = require("../userService");
const dollService = require("../dollService");
const firebaseAuth = require('../../middleware/userMiddleware');

const cron = require('node-cron');
const { RESISTANCE_EXHAUSTED_VALUE } = require("../../constants");
const io = server.socketIO;

events = (socket) => {
  console.log({ Clientsocket: socket.id });
  let idSocket = { idSocket: socket.id }

  //CHANGE USER DATA
  
  socket.on("changeAcolitAttributes", async (data) => {
    try {
      console.log(data)
      const changedAcolit = await userService.updateUser(data)
      io.emit("changeAcolitAttributes", changedAcolit);
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });
  //CREATE NEW USER

  socket.on("createNewUser", async (data) => {

    try {
      const user = {
        ...idSocket,
        ...data
      }
      //console.log(`createNewUser Events ${user}`)
      const newUser = await firebaseAuth(user);
      if(newUser){
        const admins = await userService.getAllAdmin();
        io.to(newUser.idSocket).emit("createNewUser", newUser);
        admins.forEach(admin=>{
          io.to(admin.idSocket).emit("createNewUser", newUser);
        })
      }else{
        socket.emit("toastNotification", { title: "error", message: "Invalid user, please try again", noUser: "no use", toastType: "showErrorToast"})
      }
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });

  //UPDATE ID SOCKET WHEN USER ARE LOGED

  socket.on("updateIdSocket", async (data) => {
    try {
      const user = {
        ...idSocket,
        email: data
      }
      console.log(`updateIdSocket ${user.email} and ${user.idSocket}`)
        await userService.updateUser(user);  
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
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

      //console.log(`Events Inside ${changedAcolitIsInside}`)
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });

  // LOG OUT, ID SOCKET IN NULL

  socket.on("logOut", async (data) => {
    try {
      console.log(`log out ${data.email} and ${data.idSocket} and isActive ${data.isActive}`)
        await userService.updateUser(data);  
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });

  //START DOLL MISSION
  socket.on("startDollMission", async () => {
    try {
      await dollService.createDollAndDollPiece()
      const newDoll = await dollService.getAllDollPieces();
      // console.log(`startDollMission Events ${newDoll}`)
      io.emit("startDollMission", newDoll);
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
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
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });

  //CHANGE RESET DOLL MISSION
  socket.on("resetDollMission", async () => {
    try {
      await dollService.deleteDollAndDollPieces()
      //console.log(`events ${changeDollMissionStatus}`)
      io.emit("resetDollMission", null);
    } catch (error) {
      console.log(error);
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
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
      socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
};

//CRON  para bajar resistencia y concentracion cada hora
/*
cron.schedule('* * * * *', async () => {
  try {
    await userService.updateAcolitResistanceAndConcentration()
    const modifyAllAcolit = await userService.getAllActiveUsers()
    console.log("*************************************************")
    io.emit('changeAllAcolitAttributes', modifyAllAcolit)
    // console.log(modifyAllAcolit)

  } catch (error) {
    console.log(error);
    socket.emit("toastNotification", { title: "error", message: error, toastType: "showErrorToast" });

  }

});*/

exports.socketEvents = events;