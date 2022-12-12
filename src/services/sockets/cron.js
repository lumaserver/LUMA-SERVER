const User = require('../userService');
const cron = require('node-cron');

//CRON  para bajar resistencia y concentracion cada hora
cron.schedule('*/59 * * * *', async() => {
    const update = await User.updateAcolitResistanceAndConcentration()
  });