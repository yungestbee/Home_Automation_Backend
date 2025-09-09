const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const Email = require("../models/Email.js");



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
});


router.post("/intrusion", async (req, res) => {
  try {
    const { sensor, time } = req.body;

    // Get saved email
    const emailDoc = await Email.findOne();
    if (!emailDoc || !emailDoc.address) {
      return res
        .status(400)
        .json({ success: false, message: "No recipient email set" });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailDoc.address,
      subject: "🚨 Intrusion Alert!",
      text: `Intrusion detected by ${sensor} at ${time}`,
    });

    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.address}`,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send intrusion alert" });
  }
});


module.exports = router;
