const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
require("dotenv").config();
const Email = require("../models/Email.js");

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { time } = req.body;

    // Get saved recipient email from DB
    const emailDoc = await Email.findOne();
    if (!emailDoc || !emailDoc.email) {
      return res.status(400).json({
        success: false,
        message: "No recipient email set",
      });
    }

    console.log("Sending intrusion alert...");

    // Send email using Resend
    await resend.emails.send({
      from: "Home Security <alerts@resend.dev>", // You can change this later to your domain
      to: emailDoc.email,
      subject: "🚨 Intrusion Alert!",
      html: `<p><strong>Intrusion detected!</strong><br>Window sensor triggered at <b>${time}</b>.</p>`,
    });

    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.email}`,
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to send intrusion alert",
    });
  }
});

module.exports = router;
