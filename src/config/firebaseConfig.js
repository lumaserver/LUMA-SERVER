var admin = require("firebase-admin");

admin.initializeApp({
  project_id: process.env.PROJECT_ID,
  client_email: process.env.CLIENT_ID,
  private_key: process.env.PRIVATE_KEY

});

module.exports= admin;

