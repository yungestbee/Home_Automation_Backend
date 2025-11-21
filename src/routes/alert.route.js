const express = require("express");
const router = express.Router();
const Sib = require("@getbrevo/brevo");
require("dotenv").config();
const Email = require("../models/Email.js");

router.post("/", async (req, res) => {
  try {
    const { time } = req.body;

    // Fetch saved email from DB
    const emailDoc = await Email.findOne();
    if (!emailDoc?.address) {
      return res.status(400).json({
        success: false,
        message: "Recipient email is not set in the database",
      });
    }

    // Brevo client setup
    const client = new Sib.TransactionalEmailsApi();
    client.setApiKey(
      Sib.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Email details
    const emailData = {
      sender: {
        name: "Home Security",
        email: process.env.SENDER_EMAIL, // e.g. your Gmail or any sender
      },
      to: [{ email: emailDoc.address }],
      subject: "🚨 Intrusion Alert Detected!",
      htmlContent: `
        <p>An intrusion was detected at <strong>${time}</strong>.</p>
        <p>Please take immediate action.</p>
      `,
    };

    // Send mail with Brevo
    await client.sendTransacEmail(emailData);

    res.json({
      success: true,
      message: `Intrusion alert sent to ${emailDoc.address}`,
    });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send intrusion alert",
    });
  }
});

module.exports = router;
