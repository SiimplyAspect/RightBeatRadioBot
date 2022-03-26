const mongoose = require("mongoose");

const loggerSchema = mongoose.Schema({
  guildId: String,
  channelId: { type: String, default: null },
  status: { type: Boolean, default: false },
});
module.exports = mongoose.model("log-channels", loggerSchema);
