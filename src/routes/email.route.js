const express = require("express");
const Email = require("../models/Email"); // import model
const router = express.Router();


// Save or replace email (first-time and updates)
router.post("/email", async (req, res) => {
  try {
    const { address } = req.body;

    // Create or replace the only email document
    const updatedEmail = await Email.findOneAndUpdate(
      {}, // empty filter → find the first doc
      { address, updatedAt: new Date() }, // update with new data
      { upsert: true, new: true } // if no doc, create one
    );

    res.json({ success: true, message: "Email saved/updated", email: updatedEmail });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Get current email
router.get("/email", async (req, res) => {
  try {
    const email = await Email.findOne();
    if (!email) {
      return res.json({ address: null, message: "No email set yet" });
    }
    res.json(email);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



module.exports = router;