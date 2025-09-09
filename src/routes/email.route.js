const express = require("express");
const Email = require("../models/Email"); // import model
const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).send("Email is required");

    // Ensure only one email is stored
    await Email.deleteMany({});
    const emailDoc = new Email({ address });
    await emailDoc.save();

    res.json({ success: true, email: address });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to save email");
  }
});

// Get current email
router.get("/", async (req, res) => {
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
