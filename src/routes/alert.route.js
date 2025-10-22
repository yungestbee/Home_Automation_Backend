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

router.post("/", async (req, res) => {
  try {
    const { time } = req.body;
    // const date = new Date(parseInt(time));

    // Get saved email
    const emailDoc = await Email.findOne();
    if (!emailDoc || !emailDoc.email) {
      return res
        .status(400)
        .json({ success: false, message: "No recipient email set" });
    }

    // Send email
    await transporter.sendMail({
      from: `"Home Security" <${emailDoc.email}>`,
      to: emailDoc.email,
      subject: "🚨 Intrusion Alert!",
      text: `Intrusion detected by the window at ${time}`,
    });

    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.email}`,
    });
    console.log("email sent");
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send intrusion alert" });
  }
});

module.exports = router;
