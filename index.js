require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = process.env.PORT || 3000;

// import firebase-admin package
const admin = require("firebase-admin");

// import service account file (helps to know the firebase project details)
const serviceAccount = require("./serviceAccountKey.json");

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
var jsonParser = bodyParser.json();

app.get("/status", (req, res) => {
  res.send("ckeck Status");
});

// Custom Verification Link
app.post("/signup", jsonParser, async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const actionCodeSettings = {
    url: `<hosted_firebase_url_link>`,
    handleCodeInApp: true,
    android: {
      packageName: "<project_id>",
    },
  };
  admin
    .auth()
    .generateSignInWithEmailLink(userData.email, actionCodeSettings)
    .then(async (link) => {
      // We got the Embedded Link (Now we can use this link and send the mail to the user
      // for verifing the Email/account). To send custom mail you can use nodemailer or mail gun.
    })
    .catch((error) => {
      res.json({
        error: false,
        message: error,
      });
    });
});
