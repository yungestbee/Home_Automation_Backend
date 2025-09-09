const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  device: { type: String, required: true }, // e.g., "door", "light"
  action: { type: String, required: true }, // e.g., "open", "close", "on", "off"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Command", commandSchema);
