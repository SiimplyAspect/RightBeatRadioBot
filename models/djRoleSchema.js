const mongoose = require("mongoose");

const djRoleSchema = mongoose.Schema({
  guildId: String,
  roleId: String,
  addedBy: String,
  timeAgo: String,
  isEnabled: Boolean,
});
module.exports = mongoose.model("dj-roles", djRoleSchema);
