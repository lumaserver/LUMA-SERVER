var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY
      ? process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
      clientEmail: process.env.CLIENT_EMAIL,
  })
});

module.exports= admin;

