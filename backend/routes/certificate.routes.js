const express = require('express');
const router = express.Router();
const Certificate = require('../models/certificate.model');

// ดึงข้อมูล Certificate ทั้งหมด
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
