const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const Email = require("../models/Email.js");

// Create a reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your Gmail App Password
  },
});

router.post("/", async (req, res) => {
  console.log("about to send")
  try {
    const { time } = req.body;

    // Check if recipient email is stored in DB
    const emailDoc = await Email.findOne();
    if (!emailDoc || !emailDoc.address) {
      return res
        .status(400)
        .json({ success: false, message: "No recipient email set" });
    }

    // Send email
    const mailOptions = {
      from: `"Home Security" <${process.env.EMAIL_USER}>`,
      to: emailDoc.address,
      subject: "🚨 Intrusion Alert!",
      html: `<p>Intrusion detected by the window at ${time}</p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent to:", emailDoc.address);
    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.address}`,
    });
  } catch (err) {
    console.log("❌ Error sending email:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send intrusion alert" });
  }
});

module.exports = router;
