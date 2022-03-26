const mongoose = require("mongoose");

const offencesSchema = mongoose.Schema({
  userId: String,
  guildId: String,
  issuer: String,
  time: String,
  reason: String,
  action: String,
  offeId: String,
});
module.exports = mongoose.model("users-offences", offencesSchema);
