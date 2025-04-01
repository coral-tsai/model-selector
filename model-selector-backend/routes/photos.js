const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");

// GET /photos - 取得所有照片
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
