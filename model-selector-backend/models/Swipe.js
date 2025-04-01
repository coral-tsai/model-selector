const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema({
  userId: String, // 之後可改用真登入 ID
  photoUrl: String, // 你滑的圖片
  direction: String, // 'left' or 'right'
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Swipe", swipeSchema);
