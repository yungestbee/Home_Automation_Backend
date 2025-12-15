const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const Email = require("../models/Email.js");

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { time } = req.body;

    // Fetch recipient email
    const emailDoc = await Email.findOne();
    if (!emailDoc?.address) {
      return res.status(400).json({
        success: false,
        message: "Recipient email is not set in the database",
      });
    }

    const msg = {
      to: emailDoc.address,
      from: process.env.SENDER_EMAIL, // sandbox sender
      subject: "🚨 Intrusion Alert!",
      html: `
        <h3>Security Alert</h3>
        <p>An intrusion was detected at <strong>${time}</strong>.</p>
        <p>Please take immediate action.</p>
      `,
    };

    await sgMail.send(msg);

    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.address}`,
    });

    console.log("✅ Email sent via SendGrid");
  } catch (error) {
    console.error("❌ SendGrid error:", error.response?.body || error.message);
    res.status(500).json({
      success: false,
      error: "Failed to send intrusion alert",
    });
  }
});

module.exports = router;
