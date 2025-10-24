const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
require("dotenv").config();
const Email = require("../models/Email.js");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { time } = req.body;
    const emailDoc = await Email.findOne();
    if (!emailDoc || !emailDoc.email) {
      return res
        .status(400)
        .json({ success: false, message: "No recipient email set" });
    }

    await resend.emails.send({
      from: "Home Security <onboarding@resend.dev>",
      to: emailDoc.email,
      subject: "🚨 Intrusion Alert!",
      html: `<p>Intrusion detected by the window at ${time}</p>`,
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
