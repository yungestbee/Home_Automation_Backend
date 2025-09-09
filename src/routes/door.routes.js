// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// // You can load this from a .env file or config
// const ESP32_IP = "http://192.168.43.198"; // Replace with process.env.ESP32_IP if using dotenv

// router.post("/open", async (req, res) => {
//   try {
//     await axios.get(`${ESP32_IP}/door/open`);
//     res.send("Door opened");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Failed to open door");
//   }
// });

// router.post("/close", async (req, res) => {
//   try {
//     await axios.get(`${ESP32_IP}/door/close`);
//     res.send("Door closed");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Failed to close door");
//   }
// });

// router.post("/light/on", async (req, res) => {
//   try {
//     await axios.get(`${ESP32_IP}/light/on`);
//     res.send("Light turned on");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Failed to turn on light");
//   }
// });

// router.post("/light/off", async (req, res) => {
//   try {
//     await axios.get(`${ESP32_IP}/light/off`);
//     res.send("Light turned off");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Failed to turn off light");
//   }
// });

// module.exports = router;
