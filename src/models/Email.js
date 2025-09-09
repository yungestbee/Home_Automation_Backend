const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }, // e.g., "door", "light"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);
