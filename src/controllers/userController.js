const userService = require("../services/userService");


//LOGIN
const loginUser=async(req, res) =>{
    const {
        body
      } = req;
    
      if(!body.userId){
        return res.status(400).send({status: "FAILED", data:{error: "Parameter 'userId' can not be empty"}});
      }
      try {
        const user= await userService.getOneUser(body.userId);
        if(user){
            if(!user.isActive){
                updateOneUser(req, res);
            }
            res.send({status:"OK", data: user});
        }else{
            createNewUser(req, res);
        }
      } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", message: "Failed trying the request", data:{error: error?.message || error}});
      }

      

}


//GET ONE
const getOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  if(!userId){
    return res.status(400).send({status: "FAILED", data:{error: "Parameter 'userId' can not be empty"}});
  }

  try {
    const user= await userService.getOneUser(userId);
    if(!user){
        return res.status(404).send({
            status: "FAILED",
            data: { error: `Can't find user with the id ${userId}` },
          });
    }
    res.send({status:"OK", data: user});

  } catch (error) {
    res.status(error?.status || 500).send({status: "FAILED", message: "Failed trying the request", data:{error: error?.message || error}});
  }
};


//POST
const createNewUser = async (req, res) => {
    const { body } = req;
    if(
        !body.name ||
        !body.mode ||
        !body.equipment
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment'"
                }
            });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment
    };

    try {
        const createdWorkout = await workoutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                    message: "Error al realizar la petición:",
                    data: { error: error?.message || error } });
    }
};



//UPDATE
const updateOneUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter 'idUser' can not be empty " },
    });
  }

  try {
    const updatedUser = await userService.updateOneUser(userId, body);

    if (!updatedUser) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `Can't find user with the id` },
      });
    }
    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
    loginUser,
    getOneUser,
  updateOneUser
};
