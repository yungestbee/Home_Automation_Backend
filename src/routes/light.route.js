// const express = require("express");
// const axios = require("axios");
// const Command = require("./models/Command");

// const router = express.Router();
// const ESP32_IP = process.env.ESP32_IP || "http://192.168.43.198";

// // Save command + forward to ESP32
// async function sendCommand(device, action, endpoint, res) {
//   try {
//     // 1. Save to DB
//     const newCommand = new Command({ device, action });
//     await newCommand.save();

//     // 2. Send to ESP32
//     await axios.get(`${ESP32_IP}${endpoint}`);

//     res.send(`${device} ${action}`);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(`Failed to ${action} ${device}`);
//   }
// }

// router.post("/door/open", (req, res) =>
//   sendCommand("door", "open", "/door/open", res)
// );

// router.post("/door/close", (req, res) =>
//   sendCommand("door", "close", "/door/close", res)
// );

// router.post("/light/on", (req, res) =>
//   sendCommand("light", "on", "/light/on", res)
// );

// router.post("/light/off", (req, res) =>
//   sendCommand("light", "off", "/light/off", res)
// );

// // Fetch latest command (ESP32 will use this)
// router.get("/latest", async (req, res) => {
//   try {
//     const lastCommand = await Command.findOne().sort({ createdAt: -1 });
//     if (!lastCommand) return res.status(404).send("No command found");
//     res.json(lastCommand);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Failed to fetch latest command");
//   }
// });

// module.exports = router;
