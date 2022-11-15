const mongoose = require("mongoose");
const { Schema } = mongoose;

const dollSchema = new Schema({
  isMissionFinished: Boolean,
  isMissionPending: Boolean,
  bodyPart: [
    {
      bodyName: String,
      bodyData: {
        isFound: Boolean,
        xPosition: mongoose.Types.Decimal128,
        yPosition: mongoose.Types.Decimal128,
        image: String,
      },
    },
  ],
});

module.exports = mongoose.model("Doll", dollSchema);