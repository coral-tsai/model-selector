const express = require("express");
const router = express.Router();
const Swipe = require("../models/Swipe");

router.post("/", async (req, res) => {
  try {
    const swipe = new Swipe(req.body);
    await swipe.save();
    res.status(201).json({ message: "Swipe saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

router.post("/", async (req, res) => {
  console.log("🟢 收到 swipe：", req.body); // <== 新增這行

  try {
    const swipe = new Swipe(req.body);
    await swipe.save();
    res.status(201).json({ message: "Swipe saved!" });
  } catch (err) {
    console.error("❌ 儲存失敗：", err.message); // <== 新增這行
    res.status(500).json({ error: err.message });
  }
});
