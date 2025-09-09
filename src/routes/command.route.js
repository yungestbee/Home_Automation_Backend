const express = require("express");


const router = express.Router();

// In-memory state for devices
let deviceState = {
  door: "close",
  light: "off",
};

// === Device Control Routes ===

// Update device state
router.post("/device/update", (req, res) => {
  const { door, light } = req.body;
  if (door) deviceState.door = door;
  if (light) deviceState.light = light;
  res.json({ success: true, deviceState });
});

// Get current device state (ESP32 polls this)
router.get("/device/state", (req, res) => {
  res.json(deviceState);
});

module.exports = router;
